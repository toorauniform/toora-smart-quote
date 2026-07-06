"use client";

import { useState } from "react";
import UploadLogo from "../components/UploadLogo";
import { calculateQuote, vnd, type QuoteResult } from "../lib/quoteEngine";

type Complexity = "low" | "medium" | "high";

export default function QuotesPage() {
  const [customer, setCustomer] = useState("");
  const [logoName, setLogoName] = useState("");
  const [width, setWidth] = useState("");
  const [qty, setQty] = useState("");
  const [complexity, setComplexity] = useState<Complexity>("medium");
  const [result, setResult] = useState<QuoteResult | null>(null);

  function calculate() {
    const quote = calculateQuote({
      widthMm: Number(width || 0),
      quantity: Number(qty || 1),
      complexity,
      colorCount: 1,
    });

    setResult(quote);
  }

  return (
    <main className="text-slate-900">
      <h1 className="text-3xl font-bold">Báo giá</h1>
      <p className="mt-2 text-slate-600">
        Upload logo, nhập kích thước và số lượng để báo giá thêu.
      </p>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow">
        <h2 className="text-xl font-bold">Smart Quote Engine v0.2</h2>
        <p className="mt-2 text-slate-600">
          Engine đã được tách riêng để sau này gắn AI và dữ liệu Wilcom.
        </p>

        <div className="mt-6">
          <UploadLogo onAnalyze={(info) => setComplexity(info.complexity)} />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="rounded-xl border p-3"
            placeholder="Tên khách hàng"
          />

          <input
            value={logoName}
            onChange={(e) => setLogoName(e.target.value)}
            className="rounded-xl border p-3"
            placeholder="Tên logo"
          />

          <input
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="rounded-xl border p-3"
            placeholder="Chiều ngang thêu mm"
          />

          <input
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="rounded-xl border p-3"
            placeholder="Số lượng"
          />
        </div>

        <button
          onClick={calculate}
          className="mt-5 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white"
        >
          Ước tính báo giá
        </button>

        {result && (
          <div className="mt-6 rounded-2xl bg-slate-50 p-5">
            <h3 className="font-bold">Kết quả báo giá</h3>

            <div className="mt-3 grid gap-2 text-sm">
              <p>
                Khách hàng: <b>{customer || "Chưa nhập"}</b>
              </p>
              <p>
                Logo: <b>{logoName || "Chưa nhập"}</b>
              </p>
              <p>
                Độ khó AI: <b>{complexity}</b>
              </p>
              <p>
                Số mũi ước tính:{" "}
                <b>{result.estimatedStitches.toLocaleString("vi-VN")} mũi</b>
              </p>
              <p>
                Đơn giá đề nghị: <b>{vnd(result.unitPrice)} / sản phẩm</b>
              </p>
              <p>
                Doanh thu: <b>{vnd(result.revenue)}</b>
              </p>
              <p>
                Chi phí trực tiếp ước tính: <b>{vnd(result.directCost)}</b>
              </p>
              <p>
                Lợi nhuận gộp: <b>{vnd(result.grossProfit)}</b>
              </p>
              <p>
                Biên lợi nhuận gộp: <b>{result.grossMargin}%</b>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
