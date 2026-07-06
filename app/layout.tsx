import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "TOORA Smart Quote",
  description: "AI Embroidery ERP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-slate-100">
        <div className="flex min-h-screen">

          {/* Sidebar */}

          <aside className="w-64 bg-slate-900 text-white p-6">

            <h1 className="text-2xl font-bold mb-8">
              TOORA
            </h1>

            <nav className="space-y-3">

              <Link href="/" className="block hover:text-cyan-300">
                🏠 Dashboard
              </Link>

              <Link href="/quotes" className="block hover:text-cyan-300">
                💰 Báo giá
              </Link>

              <Link href="/logos" className="block hover:text-cyan-300">
                🖼 Logo
              </Link>

              <Link href="/customers" className="block hover:text-cyan-300">
                👤 Khách hàng
              </Link>

              <Link href="/orders" className="block hover:text-cyan-300">
                📦 Đơn hàng
              </Link>

              <Link href="/expenses" className="block hover:text-cyan-300">
                💵 Chi phí
              </Link>

              <Link href="/reports" className="block hover:text-cyan-300">
                📊 Báo cáo
              </Link>

              <Link href="/settings" className="block hover:text-cyan-300">
                ⚙ Cài đặt
              </Link>

            </nav>

          </aside>

          {/* Content */}

          <main className="flex-1 p-8">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}