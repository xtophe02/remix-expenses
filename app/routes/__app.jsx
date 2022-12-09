import { Outlet } from "@remix-run/react";
import NavBar from "~/components/navigation/Navbar";
import { getUserFromSession } from "../data/auth.server";

export default function HomeLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export function loader({ request }) {
  return getUserFromSession(request);
}

export function meta() {
  return {
    title: "RemixExpenses",
    description: "Manage your expenses with ease",
  };
}
export function headers() {
  return {
    "Cache-Control": "max-age=3600",
  };
}
