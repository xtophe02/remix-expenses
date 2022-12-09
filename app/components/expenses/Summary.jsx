export default function Summary({ expenses }) {
  const total = expenses.reduce((acc, cur) => acc + cur.amount, 0);

  return (
    <section className="my-8">
      <h1 className="text-2xl font-bold pb-4">Summary Statistics</h1>
      <div className="flex flex-wrap">
        <div className="w-1/2 flex flex-col p-4">
          <h3 className="text-lg text-purple-300">Total</h3>
          <p className="text-3xl">{total.toFixed(2)}&euro;</p>
        </div>
        <div className="w-1/2 flex flex-col p-4">
          <h3 className="text-lg text-purple-300">Average</h3>
          <p className="text-3xl">
            {(total / expenses.length).toFixed(2)}&euro;
          </p>
        </div>
        <div className="w-1/2 flex flex-col p-4">
          <h3 className="text-lg text-purple-300">Min. Amount</h3>
          <p className="text-3xl">
            {Math.min(...expenses.map((el) => el.amount))}&euro;
          </p>
        </div>
        <div className="w-1/2 flex flex-col p-4">
          <h3 className="text-lg text-purple-300">Max. Amount</h3>
          <p className="text-3xl">
            {Math.max(...expenses.map((el) => el.amount))}&euro;
          </p>
        </div>
      </div>
    </section>
  );
}
