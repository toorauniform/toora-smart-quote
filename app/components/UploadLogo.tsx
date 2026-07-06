"use client";

import { useState } from "react";

type ImageInfo = {
  width: number;
  height: number;
  ratio: string;
  complexity: string;
};

export default function UploadLogo() {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    const img = new Image();
    img.onload = () => {
      const ratio = img.width / img.height;

      let complexity = "Trung bình";
      if (ratio > 2.5) complexity = "Logo ngang, nét dài";
      if (ratio < 0.8) complexity = "Logo cao, chi tiết dọc";

      setImageInfo({
        width: img.width,
        height: img.height,
        ratio: ratio.toFixed(2),
        complexity,
      });
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

              <p>
                Kích thước ảnh:{" "}
                <b>
                  {imageInfo.width} × {imageInfo.height}px
                </b>
              </p>

              <p>
                Tỷ lệ ngang/cao: <b>{imageInfo.ratio}</b>
              </p>

              <p>
                Nhận xét: <b>{imageInfo.complexity}</b>
              </p>

              <p className="mt-2 text-slate-500">
                Đây là bước AI nền tảng. Sau này TOORA sẽ dùng dữ liệu này để
                ước tính số mũi sát hơn.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}