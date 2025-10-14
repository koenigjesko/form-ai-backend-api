import { checkFileExtension } from "../src/types.ts";

const filenames = ["photo.jpg", "photo.jpeg", "photo.png", "photo", ""];

for (const filename of filenames) {
  console.log(`"${filename}":`, checkFileExtension(filename));
}
