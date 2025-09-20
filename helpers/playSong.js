import { exec } from "child_process";

export default function playSong(id) {
  exec(`mpv --no-video 'https://www.youtube.com/watch?v=${id}'`);
}
