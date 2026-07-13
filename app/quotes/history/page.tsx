"use client";

import { useEffect, useMemo, useState } from "react";
import {
  deleteQuote,
  loadQuotes,
  type SavedQuote,
} from "../../lib/quoteStorage";
import { vnd } from "../../lib/quoteEngine";

export default function QuoteHistoryPage() {
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);
  const [search, setSearch] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<SavedQuote | null>(null);

  useEffect(() => {
    setQuotes(loadQuotes());
  }, []);

  const filteredQuotes = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return quotes;

    return quotes.filter((quote) => {
      return (
        quote.id.toLowerCase().includes(keyword) ||
        quote.customer.toLowerCase().includes(keyword) ||
        quote.logoName.toLowerCase().includes(keyword)
      );
    });
  }, [quotes, search]);

  function handleDelete(id: string) {
    const ok = confirm(`Bạn có chắc muốn xóa báo giá ${id}?`);
    if (!ok) return;

    deleteQuote(id);
    const updatedQuotes = loadQuotes();
    setQuotes(updatedQuotes);

    if (selectedQuote?.id === id) {
      setSelectedQuote(null);
    }
  }

  return (
    <main className="p-8 text-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Lịch sử báo giá</h1>
          <p className="mt-2 text-slate-600">
            Quản lý các báo giá đã lưu trong TOORA Studio.
          </p>
        </div>

        <a
          href="/quotes"
          className="rounded-xl bg-slate-900 px-5 py-3 font-bold text-white"
        >
          + Tạo báo giá mới
        </a>
      </div>

      <div className="mt-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo mã báo giá, khách hàng hoặc logo..."
          className="w-full rounded-xl border p-3"
        />
      </div>

      {selectedQuote && (
        <div className="mt-6 rounded-2xl border bg-slate-50 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">
                Chi tiết báo giá {selectedQuote.id}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Ngày tạo:{" "}
                {new Date(selectedQuote.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>

            <button
              onClick={() => setSelectedQuote(null)}
              className="rounded-xl border px-4 py-2 font-bold"
            >
              Đóng
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Khách hàng</p>
              <p className="mt-1 text-lg font-bold">
                {selectedQuote.customer || "Chưa nhập"}
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Logo</p>
              <p className="mt-1 text-lg font-bold">
                {selectedQuote.logoName || "Chưa nhập"}
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Số lượng</p>
              <p className="mt-1 text-lg font-bold">
                {selectedQuote.quantity}
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Số mũi</p>
              <p className="mt-1 text-lg font-bold">
                {selectedQuote.stitches.toLocaleString("vi-VN")} mũi
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Giá AI</p>
              <p className="mt-1 text-lg font-bold">
                {vnd(selectedQuote.aiPrice)}
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Giá báo khách</p>
              <p className="mt-1 text-lg font-bold">
                {vnd(selectedQuote.sellingPrice)}
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Doanh thu</p>
              <p className="mt-1 text-lg font-bold">
                {vnd(selectedQuote.revenue)}
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Tổng giá vốn</p>
              <p className="mt-1 text-lg font-bold">
                {vnd(selectedQuote.totalCost)}
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Lợi nhuận</p>
              <p className="mt-1 text-lg font-bold text-green-600">
                {vnd(selectedQuote.profit)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Mã</th>
              <th className="p-4 text-left">Ngày</th>
              <th className="p-4 text-left">Khách hàng</th>
              <th className="p-4 text-left">Logo</th>
              <th className="p-4 text-right">SL</th>
              <th className="p-4 text-right">Giá báo</th>
              <th className="p-4 text-right">Doanh thu</th>
              <th className="p-4 text-right">Lợi nhuận</th>
              <th className="p-4 text-right">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filteredQuotes.map((quote) => (
              <tr key={quote.id} className="border-t hover:bg-slate-50">
                <td className="p-4 font-bold">{quote.id}</td>

                <td className="p-4">
                  {new Date(quote.createdAt).toLocaleDateString("vi-VN")}
                </td>

                <td className="p-4">{quote.customer || "Chưa nhập"}</td>
                <td className="p-4">{quote.logoName || "Chưa nhập"}</td>
                <td className="p-4 text-right">{quote.quantity}</td>

                <td className="p-4 text-right font-bold">
                  {vnd(quote.sellingPrice)}
                </td>

                <td className="p-4 text-right">{vnd(quote.revenue)}</td>

                <td className="p-4 text-right font-bold text-green-600">
                  {vnd(quote.profit)}
                </td>

                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedQuote(quote)}
                    className="mr-2 rounded-lg border px-3 py-1 font-bold"
                  >
                    Xem
                  </button>

                  <button
                    onClick={() => handleDelete(quote.id)}
                    className="rounded-lg bg-red-600 px-3 py-1 font-bold text-white"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredQuotes.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            Không tìm thấy báo giá nào.
          </div>
        )}
      </div>
    </main>
  );
}