import { useFetcher, useSubmit, Form, Link } from "@remix-run/react";

export default function ExpenseListItem({ title, amount, id }) {
  const submit = useSubmit();
  //FETCHER to not navigate away
  const fetcher = useFetcher();
  function deleteHandler() {
    const proceed = confirm("Are you sure? Do you want to delete this item?");
    // submit(null, {
    //   method: "delete",
    //   action: `/expenses/${expense.id}`,
    // });
    if (!proceed) {
      return;
    }
    fetcher.submit(null, {
      method: "delete",
      action: `/expenses/${id}`,
    });
  }
  if (fetcher.state !== "idle") {
    return (
      <div className="rounded p-8 m-4 bg-purple-500 justify-center items-center h-full w-full">
        deleting...
      </div>
    );
  }
  return (
    <div className="rounded p-4 m-4 bg-purple-500 hover:shadow hover:shadow-purple-200">
      <div className="flex justify-between space-y-8">
        <h3 className="text-2xl">{title}</h3>
        <div className="flex">
          {/* <Form method="delete" action={`/expenses/${id}`}> */}
          <button
            className="mx-1 hover:text-red-700 cursor-pointer text-red-300"
            onClick={deleteHandler}
            // type="submit"
          >
            Delete
          </button>
          {/* </Form> */}
          <Link to={id} className="mx-1 hover:text-purple-900 cursor-pointer">
            Edit
          </Link>
        </div>
      </div>
      <p className="font-bold">{amount}&euro;</p>
    </div>
  );
}
