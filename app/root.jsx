import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useMatches,
} from "@remix-run/react";
import { FaExclamationCircle } from "react-icons/fa";

import styles from "./styles/app.css";

export const meta = () => ({
  charset: "utf-8",
  title: "My Expenses - Remix",
  viewport: "width=device-width,initial-scale=1",
});

function Document({ title, children }) {
  const matches = useMatches();
  const disableJS = matches.some((match) => match.handle?.disableJS);
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <Meta />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body className="h-screen bg-gradient-to-b from-purple-600 to-blue-700 text-white">
        <main className="max-w-5xl container mx-auto">{children}</main>
        <ScrollRestoration />
        {!disableJS && <Scripts />}
        <LiveReload />
      </body>
    </html>
  );
}
export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
export function CatchBoundary() {
  const response = useCatch();
  console.log(response);
  return (
    <Document title={response.statusText}>
      <main className="flex flex-col justify-center items-center pt-20 space-y-4">
        <FaExclamationCircle size={48} />
        <h1 className="text-3xl">
          {response.status} - {response.statusText}
        </h1>
        <p>
          {response.data?.message ||
            "Something went wrong. Please try again later..."}
        </p>
        <p>
          Back to{" "}
          <Link to="/" className="text-purple-300">
            safety
          </Link>
        </p>
      </main>
    </Document>
  );
}
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

//it will generated anywhere in app. like delete or add expense
export function ErrorBoundary({ error }) {
  // console.log(response);
  return (
    <Document title="An error occurred">
      <main className="flex flex-col justify-center items-center pt-20 space-y-4">
        <FaExclamationCircle size={48} />
        <h1 className="text-3xl">An error occurred</h1>
        <p>
          {error.message || "Something went wrong. Please try again later!"}
        </p>
        <p>
          Back to{" "}
          <Link to="/" className="text-purple-300">
            safety
          </Link>
        </p>
      </main>
    </Document>
  );
}
