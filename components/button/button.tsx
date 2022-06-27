import { ButtonType } from "./ButtonTypes";

export default function Button({ text, color, onClick }: ButtonType) {
    const getButtonColor = (color: string): string => `hover:text-${color}-200 hover:border-${color}-600`

    return (
    <button
      type="button"
      className={`${getButtonColor(color)} text-white md:px-8 px-4 md:py-3 py-2 font-semibold border rounded`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
