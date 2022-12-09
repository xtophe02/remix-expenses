export default function Modal({ children, onClose }) {
  return (
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 w-full overflow-x-hidden overflow-y-auto h-screen bg-gradient-to-b from-slate-700"
      onClick={onClose}
    >
      <div
        className="flex justify-center pt-60"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-purple-300 p-8 rounded w-1/2">{children}</div>
      </div>
    </div>
  );
}
