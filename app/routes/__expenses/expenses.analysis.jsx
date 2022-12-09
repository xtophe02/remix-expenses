import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useMatches } from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import Summary from "~/components/expenses/Summary";
import { getExpenses } from "~/data/expenses.server";
import { FaExclamationCircle } from "react-icons/fa";
import { requireUserSession } from "~/data/auth.server";

export default function ExpensesAnalysisPage() {
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
    <section className="mt-24">
      <Chart expenses={expenses} />
      <Summary expenses={expenses} />
    </section>
  );
}

//cannot use matches because hasn't have expenses as parent
export async function loader({ request }) {
  console.log("ALL EXPENSES LOADER");
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);
  if (!expenses || expenses.length === 0) {
    throw json(
      { message: "Could not find any expenses for requested analysis" },
      {
        status: 404,
        statusText: "No expenses found",
      }
    );
  }
  return expenses;
}

export function CatchBoundary() {
  const response = useCatch();

  return (
    <main className="flex flex-col justify-center items-center pt-20 space-y-4">
      <FaExclamationCircle size={48} />
      <h1 className="text-3xl">
        {response.status} - {response.statusText}
      </h1>
      <p>
        {response.data?.message ||
          "Something went wrong. Please try again later..."}
      </p>
    </main>
  );
}
