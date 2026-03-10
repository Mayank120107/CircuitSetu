import "./globals.css";

export const metadata = {
  title: "Circuit Setu",
  description: "Open Source Circuit Simulator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <header className="header">
          <h2>Circuit Setu</h2>

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