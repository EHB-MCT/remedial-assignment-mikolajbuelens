import "./styles/globals.css";
import "./styles/reset.css";

export const metadata = {
  title: "Stock Market Simulator",
  description: "A web application for simulating stock market trading.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
