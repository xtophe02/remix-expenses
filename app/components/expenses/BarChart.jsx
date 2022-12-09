export default function BarChar({ value, label, maxValue }) {
  let barFillHeight = "0%";
  if (maxValue > 0) {
    barFillHeight = `${Math.round((value / maxValue) * 100)}%`;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="h-56 flex flex-col justify-end">
        <p
          className="w-8  bg-purple-300 rounded-md"
          style={{ height: barFillHeight }}
        ></p>
        <p className="text-xs text-center">{barFillHeight}</p>
      </div>
      <p className="pt-2">{label}</p>
    </div>
  );
}
