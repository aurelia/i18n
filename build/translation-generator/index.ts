import * as fs from "fs";
import * as path from "path";
import * as process from "process";
import { generateTranslations } from "./generate-translations";

/**
 * Generates translations file by using Intl.RelativeTimeFormat with node full-icu
 * Can generate the full translation for any language, except the "now" variable
 * command line args: outputPath for file to generate
 */

const outFile = process.argv[2];
if (!outFile || !fs.existsSync(path.dirname(outFile))) {
  throw new Error("Invalid or missing output file argument");
}

const translations = generateTranslations(require("./supported-locales"));
const transJs = JSON.stringify(translations, null, 2)
  .replace(/"([^"-]+)":/g, (_, g) => `${g}:`)
  .replace(/"/g, "'");

fs.writeFileSync(
  outFile,
  `// tslint:disable
export type DefaultTranslations = {
  [key: string]: string | DefaultTranslations
}

export const translations: DefaultTranslations = ${transJs};
// tslint:enable
`);
