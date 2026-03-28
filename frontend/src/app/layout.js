import "./globals.css";

export const metadata = {
  title: "CircuitSetu",
  description: "Open Source Circuit Simulator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>

        {children}

      </body>
    </html>
  );
}