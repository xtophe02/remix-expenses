export default function ExpenseInput({
  label,
  type = "text",
  name,
  max,
  defaultValue,
}) {
  return (
    <div className="flex flex-1 flex-col p-2">
      <label htmlFor={label} className="text-purple-700 font-semibold">
        {label}
      </label>
      <input
        type={type}
        className="rounded-md p-2 text-purple-900"
        required
        name={name}
        step={type === "number" && 0.01}
        min={type === "number" && 0}
        max={max && max}
        defaultValue={defaultValue}
      />
    </div>
  );
}
