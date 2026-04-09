import Navbar from "@/src/components/layout/admin/nav-bar";
import { AdminNavbarProvider } from "@/src/contexts/admin-nav-bar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminNavbarProvider>
      <Navbar />
      <section>{children}</section>
    </AdminNavbarProvider>
  );
}
