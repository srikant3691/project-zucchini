"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Users,
  Crown,
  CheckCircle,
  Clock,
  Briefcase,
} from "lucide-react";
import type { MunRegistration } from "@/components/ui/data-table/mun-columns";

interface MunRegistrationModalProps {
  registration: MunRegistration | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const committeeLabels: Record<string, string> = {
  UNHRC: "UNHRC",
  UNGA_DISEC: "UNGA DISEC",
  ECOSOC: "ECOSOC",
  AIPPM: "AIPPM",
  IP_PHOTOGRAPHER: "IP - Photographer",
  IP_JOURNALIST: "IP - Journalist",
  UNSC_OVERNIGHT_CRISIS: "UNSC Overnight Crisis",
  AIPPM_OVERNIGHT_CRISIS: "AIPPM Overnight Crisis",
  MOOT_COURT: "Moot Court",
};

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

export function MunRegistrationModal({
  registration,
  open,
  onOpenChange,
}: MunRegistrationModalProps) {
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
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            {registration.isTeamLeader && <Crown className="h-5 w-5 text-amber-400" />}
            <span>{registration.name}</span>
          </DialogTitle>
        </DialogHeader>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2 mt-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              registration.committeeChoice === "MOOT_COURT"
                ? "bg-purple-500/20 text-purple-400"
                : "bg-orange-500/20 text-orange-400"
            }`}
          >
            {committeeLabels[registration.committeeChoice] || registration.committeeChoice}
          </span>
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              registration.studentType === "COLLEGE"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {registration.studentType}
          </span>
          {registration.isTeamLeader && (
            <span className="text-xs font-medium px-2 py-1 rounded bg-amber-500/20 text-amber-400 flex items-center gap-1">
              <Crown className="h-3 w-3" />
              Team Leader
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
          <InfoRow
            icon={User}
            label="Gender"
            value={registration.gender}
            badge
            badgeColor={
              registration.gender === "MALE"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-pink-500/20 text-pink-400"
            }
          />
          <InfoRow icon={Building} label="Institute" value={registration.institute} />
          <InfoRow
            icon={MapPin}
            label="Location"
            value={`${registration.city}, ${registration.state}`}
          />
          <InfoRow
            icon={Briefcase}
            label="Preferred Portfolio"
            value={registration.preferredPortfolio}
            badge
            badgeColor="bg-cyan-500/20 text-cyan-400"
          />
          {registration.teamId && (
            <InfoRow
              icon={Users}
              label="Team ID"
              value={registration.teamId}
              badge
              badgeColor="bg-zinc-700 text-zinc-300"
            />
          )}
          <InfoRow icon={Calendar} label="Registered At" value={formattedDate} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
