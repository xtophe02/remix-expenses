import ExpenseListItem from "./ExpenseListItem";
export default function ExpenseList({ expenses }) {
  return expenses.map((expense) => <ExpenseListItem {...expense} />);
}
