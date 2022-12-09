import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useMatches,
  useParams,
  useSubmit,
  useTransition as useNavigation,
} from "@remix-run/react";
import ExpenseInput from "./ExpenseInput";

export default function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10);
  const validationErrors = useActionData();
  const navigation = useNavigation();
  const params = useParams();

  // const expenseData = useLoaderData();
  const matches = useMatches();
  // console.log(matches);
  const expenses = matches.find(
    (match) => match.id === "routes/__expenses/expenses"
  ).data;
  const expenseData = expenses.find((expense) => expense.id == params.id);
  if (params.id && !expenseData) {
    return <p>Invalid expense id.</p>;
  }
  const initialValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  const isSubmitting = navigation.state !== "idle";
  // const submit = useSubmit();
  // function submitHandler(e) {
  //   e.preventDefault();
  //   //...validation
  //   submit(e.target, { action: "/expenses/add", method: "post" });
  // }
  return (
    <Form
      method={expenseData ? "patch" : "post"}
      className="flex flex-col" //onSubmit={submitHandler}
    >
      <ExpenseInput
        label="Expense Title"
        name="title"
        defaultValue={initialValues.title}
      />
      <div className="flex justify-between space-x-1">
        <ExpenseInput
          label="Amount"
          type="number"
          name="amount"
          defaultValue={initialValues.amount}
        />

        <ExpenseInput
          label="Date"
          type="date"
          name="date"
          max={today}
          defaultValue={
            initialValues.date ? initialValues.date.slice(0, 10) : ""
          }
        />
      </div>
      {validationErrors && (
        <ul className="p-2 text-red-500">
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="flex justify-end space-x-1 pt-4">
        <Link
          to=".."
          className="hover:text-purple-200 rounded-md py-2 px-4 mx-2 text-sm text-purple-700"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="bg-purple-700 rounded-md py-2 px-4 hover:bg-purple-900 flex items-center disabled:bg-slate-600 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <svg
              aria-hidden="true"
              class="mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-purple-200 fill-purple-600"
              viewBox="0 0 100 101"
              fill="none"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
          <span>{isSubmitting ? "Processing..." : "Save Expense"}</span>
        </button>
      </div>
    </Form>
  );
}
