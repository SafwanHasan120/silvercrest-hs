import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-200">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}