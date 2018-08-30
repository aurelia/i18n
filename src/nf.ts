import * as LogManager from "aurelia-logging";
import { I18N } from "./i18n";
import { SignalBindingBehavior } from "aurelia-templating-resources";
import { ValueConverter } from "aurelia-binding";

export class NfValueConverter {
  public static inject() { return [I18N]; }
  constructor(private service: I18N) {}

  public toView(
    value: any,
    nfOrOptions?: Intl.NumberFormat | Intl.NumberFormatOptions,
    locale?: string,
    nf?: Intl.NumberFormat
  ) {
    if (value === null
      || typeof value === "undefined"
      || (typeof value === "string" && value.trim() === "")
      ) {
      return value;
    }

    if (nfOrOptions && (nfOrOptions instanceof Intl.NumberFormat && typeof nfOrOptions.format === "function")) {
      return nfOrOptions.format(value);
    } else if (nf) {
      const i18nLogger = LogManager.getLogger("i18n");
      // tslint:disable-next-line:max-line-length
      i18nLogger.warn("This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [nfOrOptions, locale]");
    } else {
      nf = this.service.nf(nfOrOptions as Intl.NumberFormatOptions, locale || this.service.getLocale());
    }

    return nf!.format(value);
  }
}

// tslint:disable-next-line:max-classes-per-file
export class NfBindingBehavior {
  public static inject() {return [SignalBindingBehavior]; }

  constructor(private signalBindingBehavior: SignalBindingBehavior) {}

  public bind(binding: any, source: any) {
    // bind the signal behavior
    (this.signalBindingBehavior.bind as any)(binding, source, "aurelia-translation-signal");

    // rewrite the expression to use the NfValueConverter.
    // pass through any args to the binding behavior to the NfValueConverter
    const sourceExpression = binding.sourceExpression;

    // do create the sourceExpression only once
    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    const expression = sourceExpression.expression;
    sourceExpression.expression = new ValueConverter(
      expression,
      "nf",
      sourceExpression.args,
      [expression, ...sourceExpression.args]);
  }

  public unbind(binding: any, source: any) {
    // unbind the signal behavior
    this.signalBindingBehavior.unbind(binding, source);
  }
}
