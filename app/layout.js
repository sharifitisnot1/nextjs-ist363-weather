import Header from "../components/Header";

import "../sass/global.scss";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
