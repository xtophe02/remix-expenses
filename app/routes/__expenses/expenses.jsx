import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ExpenseList from "~/components/expenses/ExpensesList";
import { FaPlus, FaDownload } from "react-icons/fa";
import { getExpenses } from "~/data/expenses.server";
import { action } from "./expenses/$id";
import { json } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";

export default function ExpensesPage() {
  const expenses = useLoaderData();
  // const DUMMY_EXPENSES = [
  //   {
  //     id: "e1",
  //     title: "First Expense",
  //     amount: 5.99,
  //     date: new Date("2022-1-10").toISOString(),
  //   },
  //   {
  //     id: "e2",
  //     title: "Second Expense",
  //     amount: 1.99,
  //     date: new Date("2022-4-10").toISOString(),
  //   },
  //   {
  //     id: "e3",
  //     title: "Third Expense",
  //     amount: 18.99,
  //     date: new Date("2022-10-10").toISOString(),
  //   },
  //   {
  //     id: "e4",
  //     title: "Forth Expense",
  //     amount: 14.99,
  //     date: new Date().toISOString(),
  //   },
  // ];

  return (
    <>
      <Outlet />
      <section className="pt-24">
        <div className="flex justify-center space-x-4">
          <Link
            to="add"
            className="flex justify-center items-center space-x-2 bg-purple-200 text-purple-800 rounded-full px-4 hover:text-purple-200 hover:bg-purple-800 py-2"
          >
            <FaPlus /> <span>Add Expense</span>
          </Link>
          <a
            href="/expenses/raw"
            className="flex justify-center items-center space-x-2 text-purple-200 px-4 hover:text-purple-900  py-2"
          >
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </div>
        {expenses.length === 0 ? (
          <div className="mt-20 flex flex-col justify-center items-center space-y-4">
            <h1 className="text-3xl">No expenses found</h1>
            <p>
              Start{" "}
              <Link to="add" className="text-purple-400 underline">
                adding some
              </Link>{" "}
              today
            </p>
          </div>
        ) : (
          <ExpenseList expenses={expenses} />
        )}
      </section>
    </>
  );
}

export async function loader({ request }) {
  console.log("ALL EXPENSES LOADER");
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);
  // return expenses;
  return json(expenses, {
    headers: {
      "Cache-Control": "max-age=3",
    },
  });
  // if (!expenses || expenses.length === 0) {
  //   throw json(
  //     { message: "Could not find any expenses" },
  //     {
  //       status: 404,
  //       statusText: "No expenses found",
  //     }
  //   );
  // }
}

export function headers({ actionHeaders, loaderHeaders, parentHeaders }) {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control"),
  };
}
