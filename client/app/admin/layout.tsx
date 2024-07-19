import { AdminNavigationBar } from "@/components/Admin/AdminNavigationBar";
export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        <AdminNavigationBar/>
          {children}
      </section>
    );
  }
  