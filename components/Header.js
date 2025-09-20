import blessed from "blessed";

export default function Header(layout) {
  const header = blessed.box({
    top: 0,
    left: 0,
    align: "center",
    width: "100%-8",
    height: 3,
    content: "{bold}YTerminal 󰝚{/bold}",
    tags: true,
    style: {
      fg: "white",
    },
    border: "line",
  });

  layout.append(header);
}
