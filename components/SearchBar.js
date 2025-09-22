import YTMusic from "ytmusic-api";
import blessed from "blessed";
import SearchResults from "./SearchResults.js";

const ytmusic = new YTMusic();
await ytmusic.initialize();

export default function SearchBar(layout, screen) {
  const searchBar = blessed.textbox({
    parent: screen,
    top: 4,
    left: "center",
    width: "25%",
    height: 3,
    inputOnFocus: true,
    hidden: true,
    fg: "white",
    border: "line",
    label: "  Search ",
  });

  layout.append(searchBar);

  screen.key("/", () => {
    searchBar.show();
    searchBar.focus();
    screen.render();
  });

  searchBar.key(["enter"], async () => {
    searchBar.hide();
    const searchFor = searchBar.getValue();
    searchBar.setValue("");

    await ytmusic.searchSongs(searchFor).then((results) => {
      SearchResults(layout, screen, results);
    });

    ytmusic.filter;
    screen.render();
  });

  searchBar.key(["escape"], () => {
    searchBar.hide();
    searchBar.setValue("");
    screen.render();
  });

  return { searchBar };
}
