import "@/styles/globals.css";

export default function SignupLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
          {children}
      </section>
    );
  }
  