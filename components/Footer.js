import blessed from "blessed";

export default function Footer(layout) {
  const footer = blessed.box({
    width: "100%-8",
    height: 3,
    left: 0,
    align: "center",
    top: "100%-7",
    content: "[q] Quit | [/] Search",
    border: "line",
  });

  layout.append(footer);

  return { footer };
}
