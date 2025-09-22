import blessed from "blessed";

export default function Header(layout, screen) {
  const header = blessed.box({
    parent: screen,
    top: 0,
    left: 0,
    width: "100%-8",
    height: 4,
    style: {
      fg: "white",
    },
    border: "line",
  });

  const appTitle = blessed.text({
    parent: header,
    top: 0,
    left: 4,
    height: 1,
    content: " YTerminal 󰝚 ",
    tags: true,
    style: {
      fg: "white",
      bold: true,
    },
  });

  const songLabel = blessed.text({
    parent: header,
    top: 1,
    left: "center",
    height: 1,
    content: "󰎊 No music playing",
    tags: true,
    style: {
      fg: "white",
      bold: true,
    },
  });

  const songTimer = blessed.text({
    parent: header,
    top: 3,
    left: "center",
    height: 1,
    align: "center",
    content: " 󱑆 00:00:00 / 00:00:00 ",
    fg: "white",
  });

  layout.append(header);
  layout.append(appTitle);
  layout.append(songLabel);
  layout.append(songTimer);

  return { header, appTitle, songLabel, songTimer };
}
