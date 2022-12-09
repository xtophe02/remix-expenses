import { Outlet } from "@remix-run/react";
import NavBarExpenses from "~/components/navigation/NavbarExpenses";
import { getUserFromSession } from "../data/auth.server";

export default function ExpensesLayout() {
  return (
    <>
      <NavBarExpenses />
      <Outlet />
    </>
  );
}
export function loader({ request }) {
  return getUserFromSession(request);
}

export function meta() {
  return {
    title: "Your Expenses",
    description: "Add/Edit your Expenses",
  };
}
