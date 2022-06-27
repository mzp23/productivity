type Colors =
  | "red"
  | "cyan"
  | "fuchsia"
  | "rose"
  | "pink"
  | "sky"
  | "lime"
  | "violet"
  | "purple";

export type ButtonType = {
  text: string;
  color: Colors;
  onClick: () => void;
};
