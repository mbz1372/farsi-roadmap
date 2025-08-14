import React from "react";

/** SHIM: version without @roadmapsh/editor dependency */
export default function GenerateRoadmap() {
  return (
    <div className="rounded-xl border border-dashed p-6 text-center">
      <h3 className="text-lg font-bold mb-2">ساخت خودکار نقشه‌راه</h3>
      <p className="opacity-70 mb-4">
        این قابلیت فعلاً غیرفعال است (پکیج داخلی editor موجود نیست).
      </p>
      <button
        disabled
        className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 cursor-not-allowed"
        title="به‌زودی"
      >
        به‌زودی
      </button>
    </div>
  );
}
