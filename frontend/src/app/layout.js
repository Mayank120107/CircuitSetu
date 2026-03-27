import "./globals.css";

export const metadata = {
  title: "CircuitSetu",
  description: "Open Source Circuit Simulator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>

        <header className="header">
          <h2>CircuitSetu</h2>

          <nav>
            <button>Home</button>
            <button>Examples</button>
            <button>Docs</button>
          </nav>
        </header>

        {children}

      </body>
    </html>
  );
}