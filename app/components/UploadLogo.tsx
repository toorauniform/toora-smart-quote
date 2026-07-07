"use client";

import { useState } from "react";
import { analyzeImage, type ColorAnalysis } from "../lib/colorAnalyzer";
import { analyzeImageCoverage, type ImageAnalysis } from "../lib/imageAnalyzer";
import { analyzeDetail, type DetailAnalysis } from "../lib/detailAnalyzer";
import { analyzeShape, type ShapeAnalysis } from "../lib/shapeAnalyzer";
import { classifyLogo, type LogoClassifyResult } from "../lib/logoClassifier";
import { analyzeStroke, type StrokeAnalysis } from "../lib/strokeAnalyzer";
import { analyzeVision, type VisionAnalysis } from "../lib/visionAnalyzer";

type ImageInfo = {
  width: number;
  height: number;
  ratio: string;
  complexity: string;
  colorAnalysis: ColorAnalysis;
  coverage: ImageAnalysis;
  detailAnalysis: DetailAnalysis;
  shape: ShapeAnalysis;
  logoClass: LogoClassifyResult;
  stroke: StrokeAnalysis;
  vision: VisionAnalysis;
};

type Props = {
  onAnalyze?: (info: ImageInfo) => void;
};

export default function UploadLogo({ onAnalyze }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    const img = new Image();

    img.onload = () => {
      const ratioNumber = img.width / img.height;

      const colorAnalysis = analyzeImage(img.width, img.height);
      const coverage = analyzeImageCoverage(img.width, img.height);

      const detailAnalysis = analyzeDetail(
        img.width,
        img.height,
        colorAnalysis.colorCount,
        coverage.logoCoverage
      );

      const shape = analyzeShape(img.width, img.height);

      const stroke = analyzeStroke(
        img.width,
        img.height,
        coverage.logoCoverage,
        detailAnalysis.edgeScore
      );

      const logoClass = classifyLogo(
        ratioNumber,
        colorAnalysis.colorCount,
        coverage.logoCoverage
      );

      const vision = analyzeVision(
        img.width,
        img.height,
        colorAnalysis.colorCount,
        coverage.logoCoverage,
        detailAnalysis.edgeScore
      );

      const info = {
        width: img.width,
        height: img.height,
        ratio: ratioNumber.toFixed(2),
        complexity: ratioNumber > 2.5 ? "Logo ngang, nét dài" : "Trung bình",
        colorAnalysis,
        coverage,
        detailAnalysis,
        shape,
        logoClass,
        stroke,
        vision,
      };

      setImageInfo(info);
      onAnalyze?.(info);
    };

    img.src = imageUrl;
  }

  return (
    <div className="mb-6">
      <label className="mb-2 block font-semibold">Logo khách hàng</label>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full rounded-xl border p-3"
      />

      {preview && (
        <div className="mt-4 rounded-2xl border bg-white p-4">
          <p className="mb-2 text-sm text-slate-500">Xem trước logo</p>

          <img
            src={preview}
            alt="Logo preview"
            className="max-h-64 rounded-xl object-contain"
          />

          {imageInfo && (
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">
              <h3 className="mb-2 font-bold">AI phân tích ảnh ban đầu</h3>

              <p>Kích thước ảnh: <b>{imageInfo.width} × {imageInfo.height}px</b></p>
              <p>Tỷ lệ ngang/cao: <b>{imageInfo.ratio}</b></p>
              <p>Nhận xét: <b>{imageInfo.complexity}</b></p>
              <p>Số màu AI ước tính: <b>{imageInfo.colorAnalysis.colorCount} màu</b></p>
              <p>Độ phủ logo: <b>{imageInfo.coverage.logoCoverage}%</b></p>
              <p>Màu chính: <b>{imageInfo.colorAnalysis.dominantColor}</b></p>
              <p>Độ phức tạp: <b>{imageInfo.colorAnalysis.complexity}</b></p>
              <p>Điểm chi tiết: <b>{imageInfo.detailAnalysis.edgeScore}/100</b></p>
              <p>Mức chi tiết: <b>{imageInfo.detailAnalysis.detail}</b></p>
              <p>Hình dạng: <b>{imageInfo.shape.shape}</b></p>
              <p>Hệ số hình dạng: <b>{imageInfo.shape.factor}</b></p>
              <p>Loại logo: <b>{imageInfo.logoClass.type}</b></p>
              <p>Nhận diện: <b>{imageInfo.logoClass.description}</b></p>
              <p>Độ dày nét: <b>{imageInfo.stroke.stroke}</b></p>
              <p>Điểm nét: <b>{imageInfo.stroke.strokeScore}</b></p>
              <p>Hệ số nét: <b>{imageInfo.stroke.factor}</b></p>

              <hr className="my-3" />

              <h4 className="font-bold">Vision AI</h4>
              <p>Số đối tượng: <b>{imageInfo.vision.objectCount}</b></p>
              <p>Tỷ lệ chữ: <b>{imageInfo.vision.textRatio}%</b></p>
              <p>Tỷ lệ Fill: <b>{imageInfo.vision.fillRatio}%</b></p>
              <p>Tỷ lệ Outline: <b>{imageInfo.vision.outlineRatio}%</b></p>
              <p>Vision Score: <b>{imageInfo.vision.complexity}</b></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}