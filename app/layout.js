import Header from "../components/Header";

import "../sass/global.scss";

export const metadata = {
  title: "Ist 363 Weather App",
  description: "React Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />

        {children}
      </body>
    </html>
  );
}
