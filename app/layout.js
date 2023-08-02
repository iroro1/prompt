import Nav from "./components/Nav";
import Provider from "./components/Provider";
import "./styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover and share ai prompts",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <Nav />

          {/* <Provider /> */}
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
