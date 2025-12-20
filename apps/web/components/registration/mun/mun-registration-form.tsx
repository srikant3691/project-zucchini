"use client";

import { type User } from "@repo/firebase-config";
import { MunRegistrationSchema, type MunRegistration } from "@repo/shared-types";
import { useApi } from "@repo/shared-utils";
import CloudinaryUploader from "../../cloudinary-uploader";
import { FormSection } from "../../ui";
import {
  basicInfoFields,
  collegeInfoFields,
  munDetailsFields,
  emergencyFields,
} from "../../../config/register/mun";
import { useFormState, renderFormFields, SubmitButton, ErrorDisplay } from "../../../utils/form";
import { useState, useEffect } from "react";

interface MunRegistrationFormProps {
  user: User;
  onComplete: (
    studentType: string,
    committeeChoice: string,
    registrationData: MunRegistration,
    isNitrStudent: boolean
  ) => void;
  stepTitle?: string;
  initialData?: Partial<MunRegistration>;
  hideCommitteeChoice?: boolean;
  buttonText?: string;
  clearUserDetails?: boolean;
  isNitrStudent: boolean;
  setIsNitrStudent: (value: boolean) => void;
  onBack?: () => void;
}

export default function MunRegistrationForm({
  user,
  onComplete,
  stepTitle,
  initialData,
  hideCommitteeChoice = false,
  buttonText = "Continue to Payment",
  clearUserDetails = false,
  isNitrStudent,
  setIsNitrStudent,
  onBack,
}: MunRegistrationFormProps) {
  const processedInitialData: Partial<MunRegistration> = initialData
    ? {
        ...initialData,
        dateOfBirth:
          initialData.dateOfBirth &&
          typeof initialData.dateOfBirth === "string" &&
          (initialData.dateOfBirth as string).includes("T")
            ? new Date(initialData.dateOfBirth)
            : initialData.dateOfBirth,
      }
    : {};

  const { formData, errors, handleInputChange, validateForm, setErrors, setFormData } =
    useFormState<MunRegistration>(
      {
        email: clearUserDetails ? "" : processedInitialData?.email || user.email || "",
        name: clearUserDetails ? "" : processedInitialData?.name || user.displayName || "",
        gender: processedInitialData?.gender || undefined,
        studentType: processedInitialData?.studentType || undefined,
        committeeChoice: processedInitialData?.committeeChoice || undefined,
        hasParticipatedBefore: processedInitialData?.hasParticipatedBefore || false,
        agreedToTerms: undefined as any,
        ...processedInitialData,
      },
      MunRegistrationSchema
    );

  useEffect(() => {
    if (isNitrStudent) {
      setFormData((prev) => ({
        ...prev,
        studentType: "COLLEGE",
        institute: "National Institute of Technology Rourkela",
        university: "National Institute of Technology Rourkela",
        city: "Rourkela",
        state: "Odisha",
      }));
    }
  }, [isNitrStudent, setFormData]);

  const { loading: isSubmitting, error: submitError } = useApi({});

  const handleFieldChange = (field: keyof MunRegistration, value: any) => {
    handleInputChange(field, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const registrationData = {
      ...formData,
      dateOfBirth:
        typeof formData.dateOfBirth === "string"
          ? new Date(formData.dateOfBirth)
          : formData.dateOfBirth,
    } as MunRegistration;

    onComplete(formData.studentType!, formData.committeeChoice!, registrationData, isNitrStudent);
  };

  const getSubmitButtonText = (): string => {
    if (formData.committeeChoice === "MOOT_COURT" && !hideCommitteeChoice) {
      return "Enter Teammate 1 Details";
    }

    if (buttonText === "Continue to Payment" && isNitrStudent) {
      return "Register";
    }

    return buttonText;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isNitrStudent}
            onChange={(e) => setIsNitrStudent(e.target.checked)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
          />
          <span className="ml-2 text-sm font-semibold text-blue-900">
            {stepTitle ? `Is ${stepTitle} from NIT Rourkela?` : "I am from NIT Rourkela"}
          </span>
        </label>
        {isNitrStudent && (
          <p className="mt-2 text-xs text-blue-700">
            College information will be auto-filled and locked.
            {!hideCommitteeChoice && " You won't need to pay registration fees."}
          </p>
        )}
      </div>

      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderFormFields(
            basicInfoFields.map((field) => ({
              ...field,
              readonly: field.name === "email" ? !clearUserDetails : field.readonly,
            })),
            formData,
            errors,
            handleFieldChange
          )}
        </div>
      </FormSection>

      <FormSection title="College / Institute Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderFormFields(
            collegeInfoFields.map((field) => ({
              ...field,
              readonly:
                isNitrStudent &&
                (field.name === "studentType" ||
                  field.name === "institute" ||
                  field.name === "university" ||
                  field.name === "city" ||
                  field.name === "state"),
            })),
            formData,
            errors,
            handleFieldChange
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              College/University ID Card <span className="text-red-500">*</span>
            </label>
            <CloudinaryUploader
              maxFiles={1}
              value={formData.idCard}
              onUploadComplete={(url) => handleFieldChange("idCard", url)}
            />
            {errors.idCard && <p className="mt-1 text-sm text-red-600">{errors.idCard}</p>}
          </div>
        </div>
      </FormSection>

      {!hideCommitteeChoice && (
        <FormSection title="MUN Details">
          <div className="space-y-6">
            {munDetailsFields.map((field) => (
              <div key={field.name}>
                {renderFormFields([field], formData, errors, handleFieldChange)}
                {formData.studentType === "SCHOOL" && (
                  <p className="mt-1 text-sm text-amber-600">
                    Note: School students are not eligible for Overnight Crisis Committees
                  </p>
                )}
                {formData.committeeChoice === "MOOT_COURT" && (
                  <p className="mt-1 text-sm text-blue-600">
                    Note: For MOOT Court, you will register as team leader and provide details of 2
                    teammates
                  </p>
                )}
              </div>
            ))}

            <div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasParticipatedBefore || false}
                  onChange={(e) => handleFieldChange("hasParticipatedBefore", e.target.checked)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  I have participated in NITRUTSAV before
                </span>
              </label>
            </div>
          </div>
        </FormSection>
      )}

      <FormSection title="Emergency & Safety Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderFormFields(emergencyFields, formData, errors, handleFieldChange)}
        </div>
      </FormSection>

      <FormSection title="Declaration & Consent">
        <div className="space-y-3">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreedToTerms === true}
              onChange={(e) => handleFieldChange("agreedToTerms", e.target.checked)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded mt-1"
            />
            <span className="ml-2 text-sm text-gray-700">
              I confirm that the information provided is correct and I agree to follow NITRUTSAV
              rules & code of conduct <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.agreedToTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.agreedToTerms}</p>
          )}
        </div>
      </FormSection>

      <ErrorDisplay error={submitError} />

      <div className="flex justify-between items-center pt-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            ← Back
          </button>
        )}

        <div className={onBack ? "" : "ml-auto"}>
          <button
            type="submit"
            disabled={false}
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {getSubmitButtonText()}
          </button>
        </div>
      </div>
    </form>
  );
}
