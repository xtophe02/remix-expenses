import BarChar from "./BarChart";

export default function Chart({ expenses }) {
  const chartDataPoints = Array.from({ length: 12 }, (e, i) => {
    return {
      label: new Date(null, i + 1, null).toLocaleDateString("en", {
        month: "short",
      }),
      value: 0,
    };
  });
  for (const expense of expenses) {
    const expenseMonth = new Date(expense.date).getMonth(); // starting at 0 => January => 0
    chartDataPoints[expenseMonth].value += expense.amount;
  }

  const dataPointValues = chartDataPoints.map((dataPoint) => dataPoint.value);
  const totalMaximum = Math.max(...dataPointValues);
  // console.log("chart", chartDataPoints);
  // console.log("data", dataPointValues);
  // console.log("max", totalMaximum);
  return (
    <>
      <h1 className="text-2xl font-bold pb-4">Monthy Expenses</h1>
      <article className="flex justify-around rounded-md border-2 p-4">
        {chartDataPoints.map((dataPoint) => (
          <BarChar
            key={dataPoint.label}
            value={dataPoint.value}
            maxValue={totalMaximum}
            label={dataPoint.label}
          />
        ))}
      </article>
    </>
  );
}
