import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/Modal";
import { requireUserSession } from "~/data/auth.server";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function ExpensesAddPage() {
  const navigate = useNavigate();
  return (
    <Modal onClose={() => navigate("..")}>
      <ExpenseForm />
    </Modal>
  );
}

export async function action(data) {
  const userId = await requireUserSession(data.request);
  const formData = await data.request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData, userId);
  return redirect("/expenses");
}
