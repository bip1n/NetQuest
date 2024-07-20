"use client"
import {VenueOwnerNavbar} from "@/components/VenueOwner/VenueOwnerNavbar"
import {FooterContent} from "@/components/Footer"
import Dashboard from "@/components/VenueOwner/Dashboard";
export const VenuePage = () => {
    return (
      <main >
        <VenueOwnerNavbar/>
        <Dashboard/>
        <FooterContent/>
      </main>
    );
  };
  
export default VenuePage;