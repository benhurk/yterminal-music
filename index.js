import blessed from "blessed";
import SearchBar from "./components/SearchBar.js";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";

const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true,
});

const layout = blessed.box({
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  padding: {
    top: 2,
    bottom: 2,
    left: 4,
    right: 4,
  },
});

screen.title = "main";

screen.append(layout);
const { songLabel, songTimer } = Header(layout, screen);
Footer(layout);
SearchBar(layout, screen);

screen.render();

screen.key(["q", "C-c"], () => {
  return process.exit(0);
});

export function updateSongLabel(str) {
  songLabel.setContent(`${str}`);
}

export function updateSongTimer(str) {
  songTimer.setContent(` 󱑆 ${str} `);
}
