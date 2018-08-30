import { metadata } from "aurelia-metadata";
import { customAttribute, HtmlBehaviorResource } from "aurelia-templating";
import { DOM } from "aurelia-pal";

@customAttribute("t-params")
export class TParamsCustomAttribute {
  static inject() {
    return [DOM.Element];
  }

  static configureAliases(aliases: string[]) {
    let r = metadata.getOrCreateOwn(metadata.resource, HtmlBehaviorResource, TParamsCustomAttribute);
    (r as any).aliases = aliases;
  }

  service: any;

  constructor(public element: Element) { }

  valueChanged() {}
}
