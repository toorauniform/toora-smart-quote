"use client";

import { useEffect, useState } from "react";
import { buildQuantityPricing } from "../lib/quantityPricing";
import { vnd, type QuoteResult } from "../lib/quoteEngine";
import { generateQuoteId, saveQuote } from "../lib/quoteStorage";

type AiInfo = {
  colorCount: number;
  logoCoverage: number;
  detailScore: number;
  shapeFactor: number;
  strokeFactor: number;
  visionScore: number;
};

type Props = {
  customer: string;
  logoName: string;
  aiInfo: AiInfo;
  result: QuoteResult;
  quantity: number;
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h4 className="mb-4 text-lg font-bold text-slate-900">{title}</h4>
      <div className="grid gap-2 text-sm text-slate-700">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 py-2">
      <span>{label}</span>
      <b className="text-right text-slate-900">{value}</b>
    </div>
  );
}

export function QuoteResultCard({
  customer,
  logoName,
  aiInfo,
  result,
  quantity,
}: Props) {
  const [sellingPrice, setSellingPrice] = useState(result.unitPrice);

  useEffect(() => {
    setSellingPrice(result.unitPrice);
  }, [result.unitPrice]);

  const qty = Number(quantity || 1);
  const safeSellingPrice = Number(sellingPrice || 0);
  const safeUnitPrice = Number(result.unitPrice || 0);
  const safeCostPerPiece = Number(result.cost.totalCost || 0);

  const revenue = safeSellingPrice * qty;
  const totalCost = safeCostPerPiece * qty;
  const profit = revenue - totalCost;
  const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;
  const priceDiff = safeSellingPrice - safeUnitPrice;

  const quantityPrices = buildQuantityPricing(safeSellingPrice);

  function handleSaveQuote() {
    const id = generateQuoteId();

    saveQuote({
      id,
      createdAt: new Date().toISOString(),
      customer,
      logoName,
      quantity: qty,
      stitches: result.estimatedStitches,
      aiPrice: result.unitPrice,
      sellingPrice: safeSellingPrice,
      totalCost,
      revenue,
      profit,
    });

    alert(`Đã lưu báo giá ${id}`);
  }

  return (
    <div className="mt-8 rounded-3xl bg-slate-50 p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900">Kết quả báo giá</h3>
        <p className="mt-1 text-sm text-slate-500">
          Có thể chỉnh đơn giá báo khách, xem lợi nhuận và bảng giá số lượng.
        </p>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-slate-900 p-5 text-white">
          <p className="text-sm text-slate-300">Tổng mũi</p>
          <p className="mt-2 text-2xl font-bold">
            {result.estimatedStitches.toLocaleString("vi-VN")}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Giá vốn/SP</p>
          <p className="mt-2 text-2xl font-bold">{vnd(result.cost.totalCost)}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">AI đề nghị</p>
          <p className="mt-2 text-2xl font-bold">{vnd(result.unitPrice)}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Giá đang báo</p>
          <p className="mt-2 text-2xl font-bold">{vnd(safeSellingPrice)}</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Đơn giá báo khách">
          <Row label="AI đề nghị" value={vnd(result.unitPrice)} />

          <div className="py-2">
            <label className="mb-2 block text-sm">Đơn giá báo khách</label>
            <input
              type="text"
              value={sellingPrice.toLocaleString("vi-VN")}
              onChange={(e) => {
                const value = e.target.value.replace(/\./g, "").replace(/,/g, "");
                setSellingPrice(Number(value) || 0);
              }}
              className="w-full rounded-xl border p-3 text-lg font-bold"
            />
            <p className="mt-2 text-sm text-slate-500">
              Giá hiển thị: <b>{vnd(sellingPrice)}</b>
            </p>
          </div>

          <Row label="Chênh lệch so với AI" value={vnd(priceDiff)} />
          <Row label="Doanh thu" value={vnd(revenue)} />
          <Row label="Tổng giá vốn" value={vnd(totalCost)} />
          <Row label="Lợi nhuận" value={vnd(profit)} />
          <Row label="Margin" value={`${margin}%`} />

          <button
            onClick={handleSaveQuote}
            className="mt-5 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white"
          >
            💾 Lưu báo giá
          </button>

          <div className="mt-5">
            <h4 className="mb-3 font-bold text-slate-900">
              Bảng giá theo số lượng
            </h4>

            <div className="overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-3 text-left">Số lượng</th>
                    <th className="p-3 text-left">Giảm</th>
                    <th className="p-3 text-right">Đơn giá</th>
                    <th className="p-3 text-right">Thành tiền</th>
                  </tr>
                </thead>

                <tbody>
                  {quantityPrices.map((row) => (
                    <tr key={row.quantity} className="border-t hover:bg-slate-50">
                      <td className="p-3">{row.quantity}</td>
                      <td className="p-3">{row.discountPercent}%</td>
                      <td className="p-3 text-right font-bold">
                        {vnd(row.unitPrice)}
                      </td>
                      <td className="p-3 text-right font-bold">
                        {vnd(row.totalPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card title="AI phân tích logo">
          <Row label="Số màu" value={`${aiInfo.colorCount} màu`} />
          <Row label="Độ phủ logo" value={`${aiInfo.logoCoverage}%`} />
          <Row label="Điểm chi tiết" value={`${aiInfo.detailScore}/100`} />
          <Row label="Vision Score" value={aiInfo.visionScore} />
          <Row label="Độ khó AI" value={result.difficulty} />
        </Card>

        <Card title="Ước tính mũi thêu">
          <Row label="Tổng số mũi" value={`${result.estimatedStitches.toLocaleString("vi-VN")} mũi`} />
          <Row label="Satin" value={`${result.satinStitches.toLocaleString("vi-VN")} mũi`} />
          <Row label="Fill" value={`${result.fillStitches.toLocaleString("vi-VN")} mũi`} />
          <Row label="Running" value={`${result.runningStitches.toLocaleString("vi-VN")} mũi`} />
        </Card>

        <Card title="Giá vốn sản xuất">
          <Row label="Chi phí chỉ" value={vnd(result.cost.threadCost)} />
          <Row label="Chi phí điện" value={vnd(result.cost.electricityCost)} />
          <Row label="Nhân công" value={vnd(result.cost.laborCost)} />
          <Row label="Khấu hao máy" value={vnd(result.cost.machineCost)} />
          <Row label="Kim" value={vnd(result.cost.needleCost)} />
          <Row label="Keo / vải lót" value={vnd(result.cost.backingCost)} />
          <Row label="Đóng gói" value={vnd(result.cost.packingCost)} />
          <Row label="Giá vốn / sản phẩm" value={vnd(result.cost.totalCost)} />
        </Card>
      </div>
    </div>
  );
}