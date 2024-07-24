import { FooterContent } from "@/components/Footer";
import { VenueOwnerNavbar } from "@/components/VenueOwner/VenueOwnerNavbar";

export default function BookingLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section >
        <VenueOwnerNavbar/>
          {children}
        <FooterContent/>
      </section>
    );
  }
  