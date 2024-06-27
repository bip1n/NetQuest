export default function VenueProfileLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section >
      <div>
        {children}
      </div>
    </section>
    );
  }
  