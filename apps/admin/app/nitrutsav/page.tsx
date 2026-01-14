"use client";

import { useState, useCallback, useMemo } from "react";
import { Users, CheckCircle, Clock, School, Search } from "lucide-react";
import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  nitrutsavColumns,
  NitrutsavRegistration,
} from "@/components/ui/data-table/nitrutsav-columns";
import { NitrutsavRegistrationModal } from "@/components/nitrutsav-registration-modal";
import { useNitrutsavRegistrations } from "@/lib/queries";
import { useDebouncedSearch } from "@/lib/hooks/use-debounced-search";
import { searchNitrutsavUsers } from "@/lib/api";

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

type FilterTab = "all" | "nitr" | "non-nitr";

export default function NitrutsavPage() {
  const { data, isLoading } = useNitrutsavRegistrations();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [selectedRegistration, setSelectedRegistration] = useState<NitrutsavRegistration | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = useCallback((registration: NitrutsavRegistration) => {
    setSelectedRegistration(registration);
    setModalOpen(true);
  }, []);

  const registrations = useMemo(
    () => (data?.registrations || []) as unknown as NitrutsavRegistration[],
    [data?.registrations]
  );
  const stats = data?.stats;

  const searchFields = useMemo(
    () => ["email", "name", "phone"] as (keyof NitrutsavRegistration)[],
    []
  );

  const handleDatabaseSearch = useCallback(async (query: string) => {
    const results = await searchNitrutsavUsers(query);
    return results as unknown as NitrutsavRegistration[];
  }, []);

  const {
    results: searchResults,
    isSearching,
    isFromDatabase,
  } = useDebouncedSearch({
    data: registrations,
    searchQuery,
    searchFields,
    debounceMs: 400,
    minQueryLength: 2,
    onDatabaseSearch: handleDatabaseSearch,
  });

  // Filter results based on selected tab
  const filteredResults = useMemo(() => {
    if (filterTab === "all") return searchResults;
    if (filterTab === "nitr") return searchResults.filter((r) => r.isNitrStudent);
    return searchResults.filter((r) => !r.isNitrStudent);
  }, [searchResults, filterTab]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        title="NITRUTSAV Registrations"
        subtitle={
          stats
            ? `Total: ${stats.total} | Male: ${stats.male} | Female: ${stats.female}`
            : undefined
        }
        Icon={Users}
      />

      <main className="mx-auto px-6 py-8">
        {stats && (
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Registrations"
              value={stats.total}
              icon={Users}
              color="bg-blue-500/20 text-blue-400"
            />
            <StatCard
              title="Payment Verified"
              value={stats.verified}
              icon={CheckCircle}
              color="bg-emerald-500/20 text-emerald-400"
            />
            <StatCard
              title="Payment Pending"
              value={stats.pending}
              icon={Clock}
              color="bg-amber-500/20 text-amber-400"
            />
            <StatCard
              title="NITR Students"
              value={stats.nitrStudents}
              icon={School}
              color="bg-purple-500/20 text-purple-400"
            />
          </div>
        )}

        {/* Filter Tabs and Search Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
            <button
              onClick={() => setFilterTab("all")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filterTab === "all" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterTab("nitr")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filterTab === "nitr"
                  ? "bg-purple-500/20 text-purple-400"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              NITR
            </button>
            <button
              onClick={() => setFilterTab("non-nitr")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filterTab === "non-nitr"
                  ? "bg-orange-500/20 text-orange-400"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Non-NITR
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-400"></div>
              </div>
            )}
          </div>
        </div>

        <DataTable columns={nitrutsavColumns} data={filteredResults} onRowClick={handleRowClick} />
      </main>

      <NitrutsavRegistrationModal
        registration={selectedRegistration}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
