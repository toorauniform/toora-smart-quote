"use client";

import { useState } from "react";
import UploadLogo from "../components/UploadLogo";
import { QuoteResultCard } from "../components/QuoteResult";
import {
  calculateQuote,
  type QuoteResult,
} from "../lib/quoteEngine";

type AiInfo = {
  colorCount: number;
  logoCoverage: number;
  detailScore: number;
  shapeFactor: number;
  strokeFactor: number;
  visionScore: number;
};

export default function QuotesPage() {
  const [customer, setCustomer] = useState("");
  const [logoName, setLogoName] = useState("");
  const [width, setWidth] = useState("");
  const [qty, setQty] = useState("");

  const [aiInfo, setAiInfo] = useState<AiInfo>({
    colorCount: 1,
    logoCoverage: 20,
    detailScore: 30,
    shapeFactor: 1,
    strokeFactor: 1,
    visionScore: 40,
  });

  const [result, setResult] = useState<QuoteResult | null>(null);

  function calculate() {
    const quote = calculateQuote({
      widthMm: Number(width || 0),
      quantity: Number(qty || 1),
      colorCount: aiInfo.colorCount,
      logoCoverage: aiInfo.logoCoverage,
      detailScore: aiInfo.detailScore,
      shapeFactor: aiInfo.shapeFactor,
      strokeFactor: aiInfo.strokeFactor,
      visionScore: aiInfo.visionScore,
    });

    setResult(quote);
  }

  return (
    <main className="p-8 text-slate-900">

      <h1 className="text-3xl font-bold">
        Báo giá
      </h1>

      <p className="mt-2 text-slate-600">
        Upload logo để AI phân tích và báo giá.
      </p>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow">

        <h2 className="text-xl font-bold">
          Smart Quote Engine v1.0
        </h2>

        <p className="mt-2 text-slate-500">
          AI phân tích logo, ước tính số mũi,
          thời gian máy và giá vốn.
        </p>

        <div className="mt-6">
          <UploadLogo
            onAnalyze={(info) =>
              setAiInfo({
                colorCount: info.colorAnalysis.colorCount,
                logoCoverage: info.coverage.logoCoverage,
                detailScore: info.detailAnalysis.edgeScore,
                shapeFactor: info.shape.factor,
                strokeFactor: info.stroke.factor,
                visionScore: info.vision.complexity,
              })
            }
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">

          <input
            className="rounded-xl border p-3"
            placeholder="Tên khách hàng"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Tên logo"
            value={logoName}
            onChange={(e) => setLogoName(e.target.value)}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Chiều ngang (mm)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Số lượng"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />

        </div>

        <button
          onClick={calculate}
          className="mt-6 rounded-xl bg-slate-900 px-6 py-3 font-bold text-white"
        >
          Ước tính báo giá
        </button>

        {result && (
          <QuoteResultCard
            customer={customer}
            logoName={logoName}
            aiInfo={aiInfo}
            result={result}
             quantity={Number(qty || 1)}
          />
        )}

      </div>

    </main>
  );
}