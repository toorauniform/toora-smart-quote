function vnd(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

export default function DashboardPage() {
  return (
    <main className="text-slate-900">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-slate-600">
        Tổng quan hoạt động của TOORA Smart Quote.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow">
          <p className="text-sm text-slate-500">Doanh thu hôm nay</p>
          <p className="mt-2 text-2xl font-bold">{vnd(0)}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow">
          <p className="text-sm text-slate-500">Doanh thu tháng</p>
          <p className="mt-2 text-2xl font-bold">{vnd(0)}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow">
          <p className="text-sm text-slate-500">Lợi nhuận gộp</p>
          <p className="mt-2 text-2xl font-bold">{vnd(0)}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow">
          <p className="text-sm text-slate-500">AI Accuracy</p>
          <p className="mt-2 text-2xl font-bold">Đang học</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold">Hoạt động gần đây</h2>
          <p className="mt-3 text-slate-500">
            Chưa có dữ liệu. Sau khi lưu báo giá, hoạt động sẽ hiện ở đây.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold">Việc cần làm</h2>
          <ul className="mt-3 list-disc pl-5 text-slate-600">
            <li>Kết nối Supabase</li>
            <li>Lưu báo giá đầu tiên</li>
            <li>Upload logo khách hàng</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
