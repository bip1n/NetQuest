import { UserNavBar } from "@/components/User/UserNavBar";

export default function BookingLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
          <UserNavBar/>
          {children}
      </section>
    );
  }
  