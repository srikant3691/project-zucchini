interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  className?: string;
  readonly?: boolean;
  disabled?: boolean;
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  placeholder = "Select an option",
  required = false,
  helperText,
  className = "",
  readonly = false,
  disabled = false,
}: SelectFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={readonly || disabled}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          error ? "border-red-500" : "border-gray-300"
        } ${readonly || disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && <p className="mt-1 text-sm text-gray-600">{helperText}</p>}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
