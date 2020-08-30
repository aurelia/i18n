declare namespace Intl {

  type RelativeTimeUnit = "year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second" |
    "years" | "quarters" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds";

  interface LocaleMatchable {
    localeMatcher?: "best fit" | "lookup";
  }
  interface FormatPart {
    type: "integer" | "string";
    value: number | string;
  }
  interface IntegerFormatPart extends FormatPart {
    type: "integer";
    value: number;
    unit: string;
  }
  interface LiteralFormatPart {
    type: "literal";
    value: string;
  }
  interface RelativeTimeOptions extends LocaleMatchable {
    numeric?: "auto" | "always",
    style?: "long" | "short" | "narrow";
  }

  interface RelativeTimeFormat {
    format: (value: number, unit: RelativeTimeUnit) => string;
    formatToParts: (value: number, unit: RelativeTimeUnit) => Array<IntegerFormatPart>;
    resolvedOptions(): RelativeTimeOptions;
  }

  var RelativeTimeFormat: {
    new(locales?: string | string[], options?: RelativeTimeOptions): RelativeTimeFormat;
    (locales?: string | string[], options?: RelativeTimeOptions): RelativeTimeFormat;
    supportedLocalesOf(locales: string | string[], options?: LocaleMatchable): string[];
  };
}

export type TranslationData = Record<string, { translation: Translation; }>;

export interface TranslationTemplate<T> extends Record<string, T> {
  second_ago: T;
  second_ago_plural: T;
  second_in: T;
  second_in_plural: T;
  minute_ago: T;
  minute_ago_plural: T;
  minute_in: T;
  minute_in_plural: T;
  hour_ago: T;
  hour_ago_plural: T;
  hour_in: T;
  hour_in_plural: T;
  day_ago: T;
  day_ago_plural: T;
  day_in: T;
  day_in_plural: T;
  month_ago: T;
  month_ago_plural: T;
  month_in: T;
  month_in_plural: T;
  year_ago: T;
  year_ago_plural: T;
  year_in: T;
  year_in_plural: T;
}

export type Translation = TranslationTemplate<string>;

const template: TranslationTemplate<[number, Intl.RelativeTimeUnit]> = {
  second_ago: [-1, "second"],
  second_ago_plural: [-53, "second"],
  second_in: [1, "second"],
  second_in_plural: [53, "second"],
  minute_ago: [-1, "minute"],
  minute_ago_plural: [-53, "minute"],
  minute_in: [1, "minute"],
  minute_in_plural: [53, "minute"],
  hour_ago: [-1, "hour"],
  hour_ago_plural: [-53, "hour"],
  hour_in: [1, "hour"],
  hour_in_plural: [53, "hour"],
  day_ago: [-1, "day"],
  day_ago_plural: [-53, "day"],
  day_in: [1, "day"],
  day_in_plural: [53, "day"],
  month_ago: [-1, "month"],
  month_ago_plural: [-53, "month"],
  month_in: [1, "month"],
  month_in_plural: [53, "month"],
  year_ago: [-1, "year"],
  year_ago_plural: [-53, "year"],
  year_in: [1, "year"],
  year_in_plural: [53, "year"],
};

function getRuntimeSupportedLocales(list: string[]): string[] {
  const result = [];
  let batchIndex = 0;
  const batchSize = 10;
  while (batchIndex + batchSize < list.length) {
    const batch = list.slice(
      batchIndex,
      Math.min(batchIndex + batchSize, list.length)
    );
    const supported = Intl.RelativeTimeFormat.supportedLocalesOf(batch);
    result.push(...supported);
    batchIndex += batchSize;
  }
  return result;
}

function buildCompleteTranslations(locales: string[], interpolationPrefix: string, interpolationSuffix: string): TranslationData {

  const allTranslations: TranslationData = {};

  for (const locale of locales) {
    const translation: Partial<Translation> = {};

    const relTime = new Intl.RelativeTimeFormat(locale, { numeric: "always", style: "long" });

    Object.keys(template).forEach(key => {
      const params = template[key];
      const parts = relTime.formatToParts(...params);

      const val = parts.map(part => {
        if (!["literal", "integer"].includes(part.type)) {
          throw new Error(`Unexpected part! locale ${locale}, key: ${key}, type: ${part.type}`);
        }
        return part.type === "integer" ? `${interpolationPrefix}count${interpolationSuffix}` : part.value;
      }).join("");

      translation[key] = val;
    });

    allTranslations[locale] = { translation: translation as Translation };
  }

  return allTranslations;

}

function areEqual(tr1: Translation, tr2: Translation): boolean {
  const tr1Keys = Object.keys(tr1).sort();
  const tr2Keys = Object.keys(tr2).sort();
  const keysAreEqual = tr1Keys.join("") === tr2Keys.join("");
  if (!keysAreEqual) {
    return false;
  }
  let result = true;
  for (const key of tr1Keys) {
    if (tr1[key] !== tr2[key]) {
      result = false;
      break;
    }
  }
  return result;
}

function removeRedundantSubLocaleTranslations(trData: TranslationData): string[] {
  const subLocales = Object.keys(trData).filter(k => k.includes("-"));
  const redundantSubLocales: string[] = [];
  for (const sl of subLocales) {
    const mainLocale = sl.split("-")[0];
    if (trData[mainLocale] && areEqual(trData[mainLocale].translation, trData[sl].translation)) {
      redundantSubLocales.push(sl);
      delete trData[sl];
    }
  }
  return redundantSubLocales;
}

export function generateTranslations(
  locales: string[],
  interpolationPrefix: string = "__",
  interpolationSuffix: string = "__"
): TranslationData {

  const runtimeSupportedLocales = getRuntimeSupportedLocales(locales);

  // Getting a list of the unsupported locales for debugging
  const runtimeNonSupportedLocales = locales.filter(l => !runtimeSupportedLocales.includes(l));
  console.log("[translationgen] Ignoring following runtime unsupported locales:", runtimeNonSupportedLocales);

  console.log("[translationgen] Generating translations for the following runtime supported locales:", runtimeSupportedLocales);
  const translations = buildCompleteTranslations(runtimeSupportedLocales, interpolationPrefix, interpolationSuffix);

  const redundant = removeRedundantSubLocaleTranslations(translations);
  console.log("[translationgen] Removing the following redundant (identical) sub-locale translations:", redundant);

  return translations;
}
