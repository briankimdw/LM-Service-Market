"use client";

import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaChartLine,
  FaEnvelope,
  FaStar,
  FaToggleOn,
  FaDollarSign,
  FaCashRegister,
  FaCamera,
  FaExclamationTriangle,
  FaEdit,
} from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { formatPrice } from "@/lib/spot-prices";
import SalesChart from "@/components/admin/SalesChart";
import RecentSales from "@/components/admin/RecentSales";
import QuickAddModal from "@/components/admin/QuickAddModal";
import RecordSaleModal from "@/components/admin/RecordSaleModal";

interface LowStockItem {
  id: string;
  title: string;
  quantity: number;
}

interface Stats {
  totalListings: number;
  activeListings: number;
  soldItems: number;
  inventoryValue: number;
  newInquiries: number;
  subscribers: number;
  lowStockItems: LowStockItem[];
}

interface AnalyticsData {
  salesByDay: { date: string; count: number; revenue: number }[];
  totalRevenue: number;
  totalSales: number;
  averageSalePrice: number;
  topCategories: { category: string; revenue: number }[];
  recentSales: {
    id: string;
    coinListingId: string;
    salePrice: number;
    soldAt: string;
    coinListing: { title: string; category: string; images: string };
  }[];
}

type Period = 7 | 30 | 90;

const statCards = [
  {
    key: "totalListings" as const,
    label: "Total Listings",
    icon: FaBoxOpen,
    color: "text-[#1A3C2A]",
    bg: "bg-[#1A3C2A]/10",
  },
  {
    key: "activeListings" as const,
    label: "Active Listings",
    icon: FaToggleOn,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    key: "soldItems" as const,
    label: "Sold Items",
    icon: FaStar,
    color: "text-[#D4451A]",
    bg: "bg-[#D4451A]/10",
  },
  {
    key: "inventoryValue" as const,
    label: "Inventory Value",
    icon: FaChartLine,
    color: "text-[#D4451A]",
    bg: "bg-yellow-50",
    isPrice: true,
  },
  {
    key: "newInquiries" as const,
    label: "New Inquiries",
    icon: FaEnvelope,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    key: "subscribers" as const,
    label: "Subscribers",
    icon: HiUsers,
    color: "text-[#1A3C2A]",
    bg: "bg-[#1A3C2A]/10",
  },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [period, setPeriod] = useState<Period>(30);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [recordSaleOpen, setRecordSaleOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setAnalyticsLoading(true);
    fetch(`/api/admin/analytics?period=${period}`)
      .then((res) => res.json())
      .then((data) => setAnalytics(data))
      .catch(() => {})
      .finally(() => setAnalyticsLoading(false));
  }, [period]);

  const maxCategoryRevenue =
    analytics?.topCategories?.[0]?.revenue || 1;

  return (
    <div>
      {/* Header with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A3C2A]">
            Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">Overview of your store</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRecordSaleOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm"
          >
            <FaCashRegister className="text-xs" /> Record Sale
          </button>
          <button
            onClick={() => setQuickAddOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4451A] hover:bg-[#B83A15] text-white rounded-lg transition-all font-medium shadow-sm shadow-[#D4451A]/25 hover:shadow-md hover:shadow-[#D4451A]/30 text-sm"
          >
            <FaCamera className="text-xs" /> Quick Add
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.key}
              className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md hover:shadow-gray-100 transition-shadow duration-200"
            >
              <div
                className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center`}
              >
                <Icon className={`text-lg ${card.color}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{card.label}</p>
                {loading ? (
                  <div className="h-7 w-20 bg-gray-100 rounded animate-pulse mt-1" />
                ) : (
                  <p className="text-2xl font-bold text-[#1A3C2A]">
                    {card.isPrice
                      ? formatPrice(stats?.[card.key] ?? 0)
                      : (stats?.[card.key] ?? 0).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Revenue card */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md hover:shadow-gray-100 transition-shadow duration-200">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
            <FaDollarSign className="text-lg text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Revenue ({period}d)
            </p>
            {analyticsLoading ? (
              <div className="h-7 w-20 bg-gray-100 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-2xl font-bold text-[#1A3C2A]">
                {formatPrice(analytics?.totalRevenue ?? 0)}
              </p>
            )}
          </div>
        </div>

        {/* Avg Sale Price card */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md hover:shadow-gray-100 transition-shadow duration-200">
          <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
            <FaCashRegister className="text-lg text-orange-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Avg Sale Price</p>
            {analyticsLoading ? (
              <div className="h-7 w-20 bg-gray-100 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-2xl font-bold text-[#1A3C2A]">
                {formatPrice(analytics?.averageSalePrice ?? 0)}
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Low Stock Alerts */}
      {!loading && stats?.lowStockItems && stats.lowStockItems.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[#1A3C2A] mb-3 flex items-center gap-2 uppercase tracking-wide">
            <FaExclamationTriangle className="text-amber-500" />
            Low Stock Alerts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stats.lowStockItems.map((item) => (
              <div
                key={item.id}
                className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                    {item.title}
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    {item.quantity === 0
                      ? "Out of stock"
                      : `Only ${item.quantity} left`}
                  </p>
                </div>
                <a
                  href={`/admin/inventory/${item.id}`}
                  className="flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-900 transition-colors"
                >
                  <FaEdit /> Edit
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Period Selector + Sales Chart */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#1A3C2A] uppercase tracking-wide">
            Sales Revenue
          </h2>
          <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg">
            {([7, 30, 90] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  period === p
                    ? "bg-white text-[#1A3C2A] shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {p}d
              </button>
            ))}
          </div>
        </div>
        {analyticsLoading ? (
          <div className="h-[240px] flex items-center justify-center">
            <div className="h-6 w-6 border-2 border-[#D4451A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <SalesChart
            data={
              analytics?.salesByDay.map((d) => ({
                date: d.date,
                revenue: d.revenue,
              })) || []
            }
          />
        )}
      </div>

      {/* Bottom section: Top Categories + Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Categories */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-[#1A3C2A] mb-4 uppercase tracking-wide">
            Top Categories
          </h2>
          {analyticsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : analytics?.topCategories && analytics.topCategories.length > 0 ? (
            <div className="space-y-3">
              {analytics.topCategories.map((cat, i) => (
                <div key={cat.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {i + 1}. {cat.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatPrice(cat.revenue)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D4451A] rounded-full transition-all duration-500"
                      style={{
                        width: `${(cat.revenue / maxCategoryRevenue) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-6">
              No category data yet
            </p>
          )}
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold text-[#1A3C2A] mb-4 uppercase tracking-wide">
            Recent Sales
          </h2>
          {analyticsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
                  </div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <RecentSales sales={analytics?.recentSales || []} />
          )}
        </div>
      </div>

      {/* Quick Add Modal */}
      <QuickAddModal
        isOpen={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
        onCreated={() => {
          // Refresh stats
          fetch("/api/admin/stats")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch(() => {});
        }}
      />

      {/* Record Sale Modal */}
      <RecordSaleModal
        isOpen={recordSaleOpen}
        onClose={() => setRecordSaleOpen(false)}
        onSaleRecorded={() => {
          // Refresh analytics and stats
          fetch("/api/admin/stats")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch(() => {});
          fetch(`/api/admin/analytics?period=${period}`)
            .then((res) => res.json())
            .then((data) => setAnalytics(data))
            .catch(() => {});
        }}
      />
    </div>
  );
}
