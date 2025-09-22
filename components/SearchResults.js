import blessed from "blessed";
import playSong from "../helpers/playSong.js";
import { updateSongLabel } from "../index.js";

export default function SearchResults(layout, screen, results) {
  const resultItems = results.map((r) => {
    return ` 󰎇  ${r.name}  |    ${r.artist.name}  |  󰥔  ${(Number(r.duration) / 60).toFixed(1)} `;
  });

  const searchResults = blessed.list({
    parent: screen,
    top: "center",
    left: 0,
    width: "100%-8",
    height: "75%",
    scrollable: true,
    keys: true,
    items: resultItems,
    padding: {
      top: 1,
      bottom: 1,
    },
    style: {
      selected: {
        bg: "blue",
        fg: "black",
      },
    },
    border: {
      type: "line",
    },
    label: " Search Results | [esc] Close | [󰌑] Play | [+] Add to queue ",
  });

  layout.append(searchResults);
  searchResults.focus();
  screen.render();

  searchResults.key(["enter"], () => {
    const selected = searchResults.selected;
    const selectedResult = results[selected];

    playSong(selectedResult.videoId, screen);

    updateSongLabel(
      `󰎇 ${selectedResult.name}, by ${selectedResult.artist.name}`,
    );
    searchResults.destroy();
    screen.render();
  });

  searchResults.key(["escape", "/"], () => {
    searchResults.destroy();
    screen.render();
  });

  return { searchResults };
}
