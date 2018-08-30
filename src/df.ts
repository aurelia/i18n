import * as LogManager from "aurelia-logging";
import { I18N } from "./i18n";
import { SignalBindingBehavior } from "aurelia-templating-resources";
import { ValueConverter } from "aurelia-binding";
import { isInteger } from "./utils";

export class DfValueConverter {
  public static inject() { return [I18N]; }

  constructor(private service: I18N) {}

  public toView(
    value: any,
    dfOrOptions?: Intl.DateTimeFormat | Intl.DateTimeFormatOptions,
    locale?: string,
    df?: Intl.DateTimeFormat
  ) {
    if (value === null
      || typeof value === "undefined"
      || (typeof value === "string" && value.trim() === "")
      ) {
      return value;
    }

    if (dfOrOptions && (dfOrOptions instanceof Intl.DateTimeFormat && typeof dfOrOptions.format === "function")) {
      return dfOrOptions.format(value);
    } else if (df) {
      const i18nLogger = LogManager.getLogger("i18n");
      // tslint:disable-next-line:max-line-length
      i18nLogger.warn("This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [dfOrOptions, locale]");
    } else {
      df = this.service.df(dfOrOptions as Intl.DateTimeFormatOptions, locale || this.service.getLocale());
    }

    if (typeof value === "string" && isNaN(value as any) && !isInteger(value as any)) {
      value = new Date(value);
    }

    return df!.format(value);
  }
}

// tslint:disable-next-line:max-classes-per-file
export class DfBindingBehavior {
  public static inject() {return [SignalBindingBehavior]; }

  constructor(private signalBindingBehavior: SignalBindingBehavior) {}

  public bind(binding: any, source: any) {
    // bind the signal behavior
    (this.signalBindingBehavior.bind as any)(binding, source, "aurelia-translation-signal");

    // rewrite the expression to use the DfValueConverter.
    // pass through any args to the binding behavior to the DfValueConverter
    const sourceExpression = binding.sourceExpression;

    // do create the sourceExpression only once
    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    const expression = sourceExpression.expression;
    sourceExpression.expression = new ValueConverter(
      expression,
      "df",
      sourceExpression.args,
      [expression, ...sourceExpression.args]);
  }

  public unbind(binding: any, source: any) {
    // unbind the signal behavior
    this.signalBindingBehavior.unbind(binding, source);
  }
}
