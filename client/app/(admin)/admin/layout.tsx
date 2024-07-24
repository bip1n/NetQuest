import { AdminNavBar } from "@/components/Admin/AdminNavBar";
import { FooterContent } from "@/components/Footer";
export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
          <AdminNavBar/>
          {children}
          <FooterContent/>
      </section>
    );
  }
  