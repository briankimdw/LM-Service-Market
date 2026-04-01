"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaStar } from "react-icons/fa";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  featured: boolean;
  createdAt: string;
}

const emptyForm = { name: "", text: "", rating: 5, featured: true };

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials?all=true");
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch {
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        const res = await fetch(`/api/testimonials/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          const updated = await res.json();
          setTestimonials((prev) =>
            prev.map((t) => (t.id === editingId ? updated : t))
          );
        }
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          await fetchTestimonials();
        }
      }
      resetForm();
    } catch {
      alert("Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (t: Testimonial) => {
    setForm({ name: t.name, text: t.text, rating: t.rating, featured: t.featured });
    setEditingId(t.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert("Failed to delete testimonial");
    }
  };

  const toggleFeatured = async (t: Testimonial) => {
    try {
      const res = await fetch(`/api/testimonials/${t.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !t.featured }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTestimonials((prev) =>
          prev.map((item) => (item.id === t.id ? updated : item))
        );
      }
    } catch {
      alert("Failed to update testimonial");
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < rating ? "text-[#D4451A]" : "text-gray-300"}
      />
    ));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A3C2A]">
            Testimonials
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {testimonials.length} testimonials
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setShowForm(true);
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4451A] hover:bg-[#B83A15] text-white rounded-lg transition-all font-medium shadow-sm shadow-[#D4451A]/25 text-sm"
          >
            <FaPlus className="text-xs" />
            {showForm ? "Cancel" : "Add Testimonial"}
          </button>
        </div>
      </div>

      {/* Inline Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4"
        >
          <h2 className="text-base font-bold text-[#1A3C2A]">
            {editingId ? "Edit Testimonial" : "New Testimonial"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#D4451A] focus:ring-1 focus:ring-[#D4451A] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <select
                value={form.rating}
                onChange={(e) =>
                  setForm({ ...form, rating: parseInt(e.target.value) })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#D4451A] focus:ring-1 focus:ring-[#D4451A] outline-none"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} Star{n !== 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Testimonial Text
            </label>
            <textarea
              required
              rows={3}
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#D4451A] focus:ring-1 focus:ring-[#D4451A] outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="rounded border-gray-300 text-[#D4451A] focus:ring-[#D4451A]"
            />
            <label htmlFor="featured" className="text-sm text-gray-700">
              Featured on homepage
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-[#D4451A] hover:bg-[#B83A15] text-white rounded-lg font-medium text-sm disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No testimonials yet. Add your first one above.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{t.name}</h3>
                  <div className="flex gap-0.5 mt-1">{renderStars(t.rating)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFeatured(t)}
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      t.featured
                        ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                        : "bg-gray-50 text-gray-500 ring-1 ring-gray-200"
                    }`}
                    title={t.featured ? "Click to unfeature" : "Click to feature"}
                  >
                    {t.featured ? "Featured" : "Hidden"}
                  </button>
                  <button
                    onClick={() => handleEdit(t)}
                    className="p-1.5 text-gray-400 hover:text-[#D4451A] transition-colors"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id, t.name)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{t.text}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
