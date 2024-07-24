import { UserNavigationbar } from "@/components/UserNavigationbar";

export default function BookingLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
            <UserNavigationbar/>
          {children}
      </section>
    );
  }
  