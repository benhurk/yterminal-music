import { spawn } from "child_process";
import EventEmitter from "events";
import { updateSongLabel, updateSongTimer } from "../index.js";

class Player extends EventEmitter {
  constructor() {
    super();
    this.process = null;
    this.interval = null;
    this.timer = "00:00:00 / 00:00:00";
  }

  play(id) {
    if (this.process) {
      this.process.kill();
      clearInterval(this.interval);
    }

    this.process = spawn(
      "mpv",
      ["--no-video", `https://www.youtube.com/watch?v=${id}`],
      { stdio: ["pipe", "pipe", "pipe"] },
    );

    this.interval = setInterval(() => {
      this.process.stderr.once("data", (data) => {
        const str = data.toString();

        const timer = str.match(/\d+:\d+:\d+\s*\/\s*\d+:\d+:\d+/)
          ? str.match(/\d+:\d+:\d+\s*\/\s*\d+:\d+:\d+/)[0]
          : "00:00:00 / 00:00:00";

        this.timer = timer;
        this.emit("timeupdate");
      });
    }, 1000);

    this.process.on("close", () => {
      clearInterval(this.interval);
      this.emit("ended");
    });
  }

  stop() {
    if (this.process) {
      this.process.kill();
      clearInterval(this.interval);
    }
  }
}

const player = new Player();

export default function playSong(id, screen) {
  player.play(id);

  player.on("ended", () => {
    updateSongLabel("󰎊 No music playing");
    updateSongTimer("00:00:00 / 00:00:00");
    screen.render();
  });
  player.on("timeupdate", () => {
    updateSongTimer(player.timer);
    screen.render();
  });

  return player;
}
