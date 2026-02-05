"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  getWaitlistEntries,
  getWaitlistStats,
  getAllWaitlistEntries,
  logoutAction,
  type BusinessType,
  type TurnoverRange,
  type PaginatedResult,
} from "@/app/actions/admin";
import { WaitlistEntry } from "@/db/schema";

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  sole_proprietorship: "Sole Proprietorship",
  llp_partnership: "LLP / Partnership",
  private_limited: "Private Limited",
  unregistered: "Unregistered",
};

const TURNOVER_LABELS: Record<string, string> = {
  below_50l: "Below 50 Lakhs",
  "50l_to_2cr": "50 Lakhs - 2 Crore",
  "2cr_to_5cr": "2 Crore - 5 Crore",
  above_5cr: "Above 5 Crore",
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatPhone(phone: string): string {
  return `+91 ${phone}`;
}

export function AdminDashboard() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [businessType, setBusinessType] = useState<BusinessType | "">("");
  const [turnoverRange, setTurnoverRange] = useState<TurnoverRange | "">("");
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [stats, setStats] = useState<{
    total: number;
    byBusinessType: Record<string, number>;
    byTurnoverRange: Record<string, number>;
  } | null>(null);

  const pageSize = 10;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [result, statsData] = await Promise.all([
        getWaitlistEntries({
          search,
          businessType,
          turnoverRange,
          page: currentPage,
          pageSize,
        }),
        getWaitlistStats(),
      ]);

      setEntries(result.entries);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [search, businessType, turnoverRange, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleBusinessTypeChange = (value: BusinessType | "") => {
    setBusinessType(value);
    setCurrentPage(1);
  };

  const handleTurnoverChange = (value: TurnoverRange | "") => {
    setTurnoverRange(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setBusinessType("");
    setTurnoverRange("");
    setCurrentPage(1);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const XLSX = await import("xlsx");
      const allEntries = await getAllWaitlistEntries();
      const data = allEntries.map((entry) => ({
        ID: entry.id,
        Name: entry.name,
        Phone: entry.phone,
        "Business Type": BUSINESS_TYPE_LABELS[entry.businessType] || entry.businessType,
        "Turnover Range": TURNOVER_LABELS[entry.turnoverRange] || entry.turnoverRange,
        Submitted: new Date(entry.createdAt).toLocaleString("en-IN"),
      }));
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Waitlist");
      XLSX.writeFile(wb, `waitlist-export-${new Date().toISOString().slice(0, 10)}.xlsx`);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/images/cashbook-logo.svg"
                alt="CashBook"
                width={120}
                height={28}
              />
              <span className="text-text-secondary text-sm hidden sm:inline">
                Admin Dashboard
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="text-sm text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
              >
                {isExporting ? "Exporting..." : "Export Excel"}
              </button>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-sm text-text-secondary hover:text-text transition-colors"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-border/50">
              <p className="text-text-secondary text-xs mb-1">Total Signups</p>
              <p className="text-2xl font-bold text-primary">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-border/50">
              <p className="text-text-secondary text-xs mb-1">Private Limited</p>
              <p className="text-2xl font-bold text-text">
                {stats.byBusinessType.private_limited || 0}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-border/50">
              <p className="text-text-secondary text-xs mb-1">Above 5 Cr Turnover</p>
              <p className="text-2xl font-bold text-text">
                {stats.byTurnoverRange.above_5cr || 0}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-border/50">
              <p className="text-text-secondary text-xs mb-1">This Filter</p>
              <p className="text-2xl font-bold text-text">{totalCount}</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-border/50 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full h-10 px-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Business Type Filter */}
            <div className="w-full lg:w-48">
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Business Type
              </label>
              <select
                value={businessType}
                onChange={(e) =>
                  handleBusinessTypeChange(e.target.value as BusinessType | "")
                }
                className="w-full h-10 px-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white"
              >
                <option value="">All Types</option>
                <option value="sole_proprietorship">Sole Proprietorship</option>
                <option value="llp_partnership">LLP / Partnership</option>
                <option value="private_limited">Private Limited</option>
                <option value="unregistered">Unregistered</option>
              </select>
            </div>

            {/* Turnover Filter */}
            <div className="w-full lg:w-48">
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Turnover Range
              </label>
              <select
                value={turnoverRange}
                onChange={(e) =>
                  handleTurnoverChange(e.target.value as TurnoverRange | "")
                }
                className="w-full h-10 px-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white"
              >
                <option value="">All Ranges</option>
                <option value="below_50l">Below 50 Lakhs</option>
                <option value="50l_to_2cr">50 Lakhs - 2 Crore</option>
                <option value="2cr_to_5cr">2 Crore - 5 Crore</option>
                <option value="above_5cr">Above 5 Crore</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="h-10 px-4 text-sm text-text-secondary hover:text-text border border-border rounded-lg hover:bg-background-alt transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">No entries found</p>
              {(search || businessType || turnoverRange) && (
                <button
                  onClick={clearFilters}
                  className="mt-2 text-primary hover:underline text-sm"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-background-alt border-b border-border">
                    <tr>
                      <th className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-6 py-3">
                        Name
                      </th>
                      <th className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-6 py-3">
                        Phone
                      </th>
                      <th className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-6 py-3">
                        Business Type
                      </th>
                      <th className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-6 py-3">
                        Turnover
                      </th>
                      <th className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-6 py-3">
                        Submitted
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {entries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-background/50">
                        <td className="px-6 py-4 text-sm font-medium text-text">
                          {entry.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">
                          {formatPhone(entry.phone)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary">
                            {BUSINESS_TYPE_LABELS[entry.businessType]}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                            {TURNOVER_LABELS[entry.turnoverRange]}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">
                          {formatDate(entry.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-border">
                {entries.map((entry) => (
                  <div key={entry.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-text">{entry.name}</p>
                        <p className="text-sm text-text-secondary">
                          {formatPhone(entry.phone)}
                        </p>
                      </div>
                      <p className="text-xs text-text-secondary">
                        {formatDate(entry.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary">
                        {BUSINESS_TYPE_LABELS[entry.businessType]}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                        {TURNOVER_LABELS[entry.turnoverRange]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-background-alt border-t border-border">
              <div className="text-sm text-text-secondary">
                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize, totalCount)} of {totalCount}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? "bg-primary text-white"
                            : "hover:bg-white border border-border"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
