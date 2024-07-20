import "@/styles/globals.css";
import { Link } from "@nextui-org/link";

export const FooterContent = () => {
  return (
    <>
    <footer className="w-full flex items-center justify-center py-3">
      <Link
        className="flex items-center gap-1 text-current"
        href="/team"
        title="nextui.org homepage"
      >
        <span className="text-default-600">Designed by</span>
        <p className="text-primary">Team Inferno</p>
      </Link>
    </footer>
    </>
            
  );
}