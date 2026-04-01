"use client";

import { useState } from "react";
import { FaPaperPlane, FaCheckCircle, FaLightbulb } from "react-icons/fa";

export default function RequestProductPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    productName: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/product-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit request");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", productName: "", description: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2]">
      {/* Hero Section */}
      <section className="bg-[#1A3C2A] text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4451A]/15 text-[#D4451A] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <FaLightbulb className="text-xs" />
            Product Requests
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FFF9F2] mb-4">
            Can&apos;t Find What You Need?
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Let us know what products you&apos;d like us to carry
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {submitted ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-3xl text-emerald-500" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#1A3C2A] mb-3">
                Request Submitted!
              </h2>
              <p className="text-gray-600 mb-8">
                Thank you for your suggestion. We review product requests regularly
                and will do our best to stock the items our customers want.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4451A] hover:bg-[#B83A15] text-white rounded-lg font-medium transition-colors shadow-sm shadow-[#D4451A]/25"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10"
            >
              <h2 className="text-xl font-serif font-bold text-[#1A3C2A] mb-6">
                Request a Product
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Name <span className="text-[#D4451A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#D4451A] focus:ring-1 focus:ring-[#D4451A] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email <span className="text-gray-400 text-xs font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#D4451A] focus:ring-1 focus:ring-[#D4451A] outline-none transition-colors"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    We&apos;ll notify you when the product becomes available
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Product Name <span className="text-[#D4451A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.productName}
                    onChange={(e) => setForm({ ...form, productName: e.target.value })}
                    placeholder="e.g., 1921 Morgan Silver Dollar"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#D4451A] focus:ring-1 focus:ring-[#D4451A] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description / Details
                  </label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Any specific details about the product you're looking for (grade, year, condition, quantity, etc.)"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#D4451A] focus:ring-1 focus:ring-[#D4451A] outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#D4451A] hover:bg-[#B83A15] text-white rounded-lg font-medium transition-colors shadow-sm shadow-[#D4451A]/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPaperPlane className="text-sm" />
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          )}

          {/* Info text below form */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Popular requests are reviewed weekly by our team
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
