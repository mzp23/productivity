export default function Button({ text, color }) {
    const btnStyleMap = {
        red: "hover:text-red-200 hover:border-red-600",
        cyan: "hover:text-cyan-200 hover:border-cyan-600",
        fuchsia: "hover:text-fuchsia-200 hover:border-fuchsia-600",
        rose: "hover:text-rose-200 hover:border-rose-600",
        pink: "hover:text-pink-200 hover:border-pink-600",
        purple: "hover:text-purple-200 hover:border-purple-600",
        violet: "hover:text-violet-200 hover:text-violet-200 hover:border-violet-600",
        lime: "hover:text-lime-200 hover:text-lime-200 hover:border-lime-600",
        sky: "hover:text-sky-200 hover:text-sky-200 hover:border-sky-600",
    }

    return (
    <button
      type="button"
      className={`${btnStyleMap[color]} text-white md:px-8 px-4 md:py-3 py-2 font-semibold border rounded`}
    >
      {text}
    </button>
  );
}
