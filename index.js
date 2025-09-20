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
  padding: 4,
});

screen.title = "YTerminal ";

screen.append(layout);
Header(layout);
Footer(layout);
SearchBar(layout, screen);

screen.render();

screen.key(["q", "C-c"], () => {
  return process.exit(0);
});
