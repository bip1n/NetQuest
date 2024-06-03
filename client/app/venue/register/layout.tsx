export default function RegisterVenueLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <section className="flex flex-col items-center justify-center gap-4 pt-0 pb-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          {children}
        </div>
      </section>
    );
  }
  