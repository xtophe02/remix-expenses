import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/Modal";
import { deleteExpenseId, updateExpenseId } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
// import { getExpenseId } from "~/data/expenses.server";

export default function ExpensesDetailPage() {
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate("..")}>
      <ExpenseForm />
    </Modal>
  );
}

// export function loader({ params }) {
//   console.log("ID EXPENSES LOADER");
//   return getExpenseId(params.id);
// }

export async function action({ params, request }) {
  if (request.method === "PATCH") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);
    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpenseId(params.id, expenseData);
    return redirect("/expenses");
  }
  if (request.method === "DELETE") {
    const data = await deleteExpenseId(params.id);
    // return redirect("/expenses");
    // console.log(data);
    return data;
  }
}

export function meta({ params, location, data, parentsData }) {
  const expense = parentsData["routes/__expenses/expenses"].find(
    (expense) => expense.id === params.id
  );
  return {
    title: expense.title,
    description: "Update Expense",
  };
}
