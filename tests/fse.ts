import { checkFileExtension } from "../src/types.ts";
import { trace } from "./testhub.ts";

const filenames = ["photo.jpg", "photo.jpeg", "photo.png", "photo", ""];

export function runTest(): void {
  for (const filename of filenames) {
    trace('fse', 8, `"${filename}":`, checkFileExtension(filename));
  }
}
