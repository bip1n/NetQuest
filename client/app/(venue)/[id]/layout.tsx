import { FooterContent } from "@/components/Footer";
import { UserNavigationbar } from "@/components/UserNavigationbar";

export default function VenueProfileLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section >
      <div>
        <UserNavigationbar/>
        {children}
        <FooterContent/>
      </div>
    </section>
    );
  }
  