import { FooterContent } from "@/components/Footer";
import { UserNavBar } from "@/components/User/UserNavBar";

export default function VenueProfileLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section >
      <div>
        <UserNavBar/>
        {children}
        <FooterContent/>
      </div>
    </section>
    );
  }
  