"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  Hash,
  Gift,
} from "lucide-react";
import type { NitrutsavRegistration } from "@/components/ui/data-table/nitrutsav-columns";

interface NitrutsavRegistrationModalProps {
  registration: NitrutsavRegistration | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function InfoRow({
  icon: Icon,
  label,
  value,
  badge,
  badgeColor,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | null | undefined;
  badge?: boolean;
  badgeColor?: string;
}) {
  if (!value) return null;

  return (
    <div className="flex items-start gap-3 py-2">
      <div className="rounded-lg p-2 bg-zinc-800">
        <Icon className="h-4 w-4 text-zinc-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-zinc-500 uppercase tracking-wide">{label}</p>
        {badge ? (
          <span
            className={`inline-block mt-1 text-sm font-medium px-2 py-0.5 rounded ${badgeColor || "bg-zinc-700 text-zinc-300"}`}
          >
            {value}
          </span>
        ) : (
          <p className="text-sm text-zinc-100 wrap-break-word">{value}</p>
        )}
      </div>
    </div>
  );
}

export function NitrutsavRegistrationModal({
  registration,
  open,
  onOpenChange,
}: NitrutsavRegistrationModalProps) {
  if (!registration) return null;

  const formattedDate = registration.registeredAt
    ? new Date(registration.registeredAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 min-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <span>{registration.name}</span>
          </DialogTitle>
        </DialogHeader>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2 mt-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              registration.gender === "MALE"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-pink-500/20 text-pink-400"
            }`}
          >
            {registration.gender}
          </span>
          {registration.isNitrStudent && (
            <span className="text-xs font-medium px-2 py-1 rounded bg-purple-500/20 text-purple-400">
              NITR Student
            </span>
          )}
        </div>

        {/* Payment Status */}
        <div className="mt-4 p-3 rounded-lg bg-zinc-800/50 border border-zinc-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Payment Status</span>
            {registration.isNitrStudent ? (
              <span className="text-xs font-medium px-2 py-1 rounded bg-zinc-700 text-zinc-300">
                NITR Student - N/A
              </span>
            ) : registration.isPaymentVerified ? (
              <span className="text-xs font-medium px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Payment Verified
              </span>
            ) : (
              <span className="text-xs font-medium px-2 py-1 rounded bg-amber-500/20 text-amber-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Pending
              </span>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="mt-4 space-y-1 divide-y divide-zinc-800">
          <InfoRow icon={Mail} label="Email" value={registration.email} />
          <InfoRow icon={Phone} label="Phone" value={registration.phone} />
          <InfoRow icon={Building} label="Institute" value={registration.institute} />
          <InfoRow icon={GraduationCap} label="University" value={registration.university} />
          <InfoRow icon={Hash} label="Roll Number" value={registration.rollNumber} />
          {registration.referralCode && (
            <InfoRow
              icon={Gift}
              label="Referral Code"
              value={registration.referralCode}
              badge
              badgeColor="bg-cyan-500/20 text-cyan-400"
            />
          )}
          <InfoRow icon={Calendar} label="Registered At" value={formattedDate} />
        </div>

        {/* ID Card Display */}
        {registration.idCard && (
          <div className="mt-4">
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">ID Card</p>
            <img
              src={registration.idCard}
              alt="ID Card"
              className="h-72 w-auto  rounded-lg border border-zinc-700"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
