import i18next from 'i18next';
import { Container } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { FrameworkConfiguration } from 'aurelia-framework';
import { Loader } from 'aurelia-loader';
import { BindingSignaler, SignalBindingBehavior } from 'aurelia-templating-resources';
import { i18next } from 'i18next';

export interface AureliaEnhancedOptions extends i18next.InitOptions {
	attributes?: string[];
	skipTranslationOnMissingKey?: boolean;
}
export interface AureliaEnhancedI18Next extends i18next.i18n {
	options: AureliaEnhancedOptions;
}
export interface I18NEventPayload {
	oldValue: string;
	newValue: string;
}
export declare const I18N_EA_SIGNAL = "i18n:locale:changed";
export declare class I18N {
	private ea;
	private signaler;
	static inject(): (typeof EventAggregator | typeof BindingSignaler)[];
	i18nextDeferred: Promise<AureliaEnhancedI18Next>;
	i18next: AureliaEnhancedI18Next;
	Intl: typeof Intl;
	private globalVars;
	constructor(ea: EventAggregator, signaler: BindingSignaler);
	setup(options?: AureliaEnhancedOptions & i18next.InitOptions): Promise<AureliaEnhancedI18Next>;
	i18nextReady(): Promise<AureliaEnhancedI18Next>;
	setLocale(locale: string): Promise<i18next.TFunction>;
	getLocale(): string;
	nf(options?: Intl.NumberFormatOptions, locales?: string | string[]): Intl.NumberFormat;
	uf(numberLike: string, locale?: string): number;
	df(options?: Intl.DateTimeFormatOptions, locales?: string | string[]): Intl.DateTimeFormat;
	tr(key: string | string[], options?: i18next.TOptions<object>): string;
	registerGlobalVariable(key: string, value: any): void;
	unregisterGlobalVariable(key: string): void;
	/**
	 * Scans an element for children that have a translation attribute and
	 * updates their innerHTML with the current translation values.
	 *
	 * If an image is encountered the translated value will be applied to the src attribute.
	 *
	 * @param el    HTMLElement to search within
	 */
	updateTranslations(el: HTMLElement): void;
	updateValue(node: Element & {
		au: any;
	}, value: string, params: any): void;
}
export declare class RelativeTime {
	private service;
	private ea;
	static inject(): (typeof EventAggregator | typeof I18N)[];
	constructor(service: I18N, ea: EventAggregator);
	setup(locales?: {
		oldValue: string;
		newValue: string;
	}): void;
	addTranslationResource(key: string, translation: any): void;
	getRelativeTime(time: Date): any;
	getTimeDiffDescription(diff: number, unit: "year" | "month" | "day" | "hour" | "minute" | "second", timeDivisor: number): any;
}
export declare type LoadPathOption = string | ((lngs: string[], namespaces: string[]) => string);
export declare type LoadCallback = (error: any, result: string | false | undefined) => void;
export interface AureliaBackendOptions {
	loadPath?: LoadPathOption;
	parse?(data: string, url: string): string;
}
export declare class Backend {
	services: any;
	options: AureliaBackendOptions;
	static type: string;
	static loader: Loader;
	static with(loader: Loader): typeof Backend;
	type: string;
	constructor(services: any, options?: AureliaBackendOptions);
	init(services: any, options?: AureliaBackendOptions): void;
	readMulti(languages: string[], namespaces: string[], callback: LoadCallback): void;
	read(language: string, namespace: string, callback: LoadCallback): void;
	loadUrl(url: string, callback: LoadCallback): Promise<void>;
	create(_languages: string | string[], _namespace: string, _key: string, _fallbackValue: string): void;
}
export declare class DfBindingBehavior {
	private signalBindingBehavior;
	static inject(): (typeof SignalBindingBehavior)[];
	constructor(signalBindingBehavior: SignalBindingBehavior);
	bind(binding: any, source: any): void;
	unbind(binding: any, source: any): void;
}
export declare class DfValueConverter {
	private service;
	static inject(): (typeof I18N)[];
	constructor(service: I18N);
	toView(value: any, dfOrOptions?: Intl.DateTimeFormat | Intl.DateTimeFormatOptions, locale?: string): any;
}
export declare class NfBindingBehavior {
	private signalBindingBehavior;
	static inject(): (typeof SignalBindingBehavior)[];
	constructor(signalBindingBehavior: SignalBindingBehavior);
	bind(binding: any, source: any): void;
	unbind(binding: any, source: any): void;
}
export declare class NfValueConverter {
	private service;
	static inject(): (typeof I18N)[];
	constructor(service: I18N);
	toView(value: any, nfOrOptions?: Intl.NumberFormat | Intl.NumberFormatOptions, locale?: string): any;
}
export declare class RtBindingBehavior {
	private signalBindingBehavior;
	static inject(): (typeof SignalBindingBehavior)[];
	constructor(signalBindingBehavior: SignalBindingBehavior);
	bind(binding: any, source: any): void;
	unbind(binding: any, source: any): void;
}
export declare class RtValueConverter {
	private service;
	static inject(): (typeof RelativeTime)[];
	constructor(service: RelativeTime);
	toView(value: any): any;
}
export declare class TBindingBehavior {
	private signalBindingBehavior;
	static inject(): (typeof SignalBindingBehavior)[];
	constructor(signalBindingBehavior: SignalBindingBehavior);
	bind(binding: any, source: any): void;
	unbind(binding: any, source: any): void;
}
declare class LazyOptional {
	private key;
	static of(key: any): LazyOptional;
	constructor(key: string);
	get(container: Container): () => any;
}
export declare class TCustomAttribute {
	private element;
	private service;
	private ea;
	static inject(): ({
		new (): Element;
		prototype: Element;
	} | typeof EventAggregator | typeof I18N | LazyOptional)[];
	static configureAliases(aliases: string[]): void;
	private params;
	private lazyParams;
	private subscription;
	private value;
	constructor(element: Element & {
		au: any;
	}, service: I18N, ea: EventAggregator, p: any);
	bind(): void;
	paramsChanged(newValue: any, newParams: any): void;
	valueChanged(newValue: any): void;
	unbind(): void;
}
export declare class TParamsCustomAttribute {
	element: Element;
	static inject(): {
		new (): Element;
		prototype: Element;
	}[];
	static configureAliases(aliases: string[]): void;
	service: any;
	constructor(element: Element);
	valueChanged(): void;
}
export declare class TValueConverter {
	private service;
	static inject(): (typeof I18N)[];
	constructor(service: I18N);
	toView(value: any, options?: i18next.TOptions<object>): string;
}
export declare function configure(frameworkConfig: FrameworkConfiguration, cb: (instance: I18N) => AureliaEnhancedI18Next): AureliaEnhancedI18Next;
