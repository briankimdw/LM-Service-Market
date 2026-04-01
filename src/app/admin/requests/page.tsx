"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaSave } from "react-icons/fa";

interface ProductRequest {
  id: string;
  name: string;
  email: string;
  productName: string;
  description: string;
  status: string;
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
}

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-50 text-blue-600 ring-blue-200" },
  { value: "reviewed", label: "Reviewed", color: "bg-amber-50 text-amber-600 ring-amber-200" },
  { value: "stocked", label: "Stocked", color: "bg-emerald-50 text-emerald-600 ring-emerald-200" },
  { value: "declined", label: "Declined", color: "bg-gray-100 text-gray-500 ring-gray-200" },
];

function getStatusStyle(status: string) {
  return statusOptions.find((s) => s.value === status)?.color || "bg-gray-100 text-gray-500 ring-gray-200";
}

function getStatusLabel(status: string) {
  return statusOptions.find((s) => s.value === status)?.label || status;
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<ProductRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});
  const [savingNotes, setSavingNotes] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/product-requests");
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/product-requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
      }
    } catch {
      alert("Failed to update status");
    }
  };

  const saveNotes = async (id: string) => {
    setSavingNotes(id);
    try {
      const res = await fetch(`/api/product-requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: editingNotes[id] ?? "" }),
      });
      if (res.ok) {
        const updated = await res.json();
        setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
        setEditingNotes((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }
    } catch {
      alert("Failed to save notes");
    } finally {
      setSavingNotes(null);
    }
  };

  const handleDelete = async (id: string, productName: string) => {
    if (!confirm(`Delete request for "${productName}"?`)) return;
    try {
      await fetch(`/api/product-requests/${id}`, { method: "DELETE" });
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Failed to delete request");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A3C2A]">Product Requests</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {requests.length} request{requests.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : requests.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No product requests yet.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Status badge and product name */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ring-1 ${getStatusStyle(req.status)}`}
                    >
                      {getStatusLabel(req.status)}
                    </span>
                    <h3 className="font-semibold text-gray-900 text-base">
                      {req.productName}
                    </h3>
                  </div>

                  {/* Requester info */}
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-1">
                    <span>From: <span className="text-gray-700 font-medium">{req.name}</span></span>
                    {req.email && (
                      <span className="text-gray-400">({req.email})</span>
                    )}
                  </div>

                  {/* Description */}
                  {req.description && (
                    <p className="text-sm text-gray-600 mt-2 bg-gray-50 rounded-lg p-3">
                      {req.description}
                    </p>
                  )}

                  {/* Status change buttons */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="text-xs text-gray-400 mr-1">Set status:</span>
                    {statusOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateStatus(req.id, opt.value)}
                        disabled={req.status === opt.value}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                          req.status === opt.value
                            ? "bg-gray-100 text-gray-400 cursor-default"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {/* Admin notes */}
                  <div className="mt-3">
                    <label className="text-xs font-medium text-gray-500 block mb-1">
                      Admin Notes
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={
                          editingNotes[req.id] !== undefined
                            ? editingNotes[req.id]
                            : req.adminNotes
                        }
                        onChange={(e) =>
                          setEditingNotes((prev) => ({
                            ...prev,
                            [req.id]: e.target.value,
                          }))
                        }
                        placeholder="Add notes..."
                        className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-[#D4451A] focus:ring-1 focus:ring-[#D4451A] outline-none"
                      />
                      {editingNotes[req.id] !== undefined && (
                        <button
                          onClick={() => saveNotes(req.id)}
                          disabled={savingNotes === req.id}
                          className="px-3 py-1.5 bg-[#D4451A] hover:bg-[#B83A15] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
                        >
                          <FaSave className="text-xs" />
                          {savingNotes === req.id ? "Saving..." : "Save"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-400 mt-3">
                    Submitted {new Date(req.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Delete button */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleDelete(req.id, req.productName)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
