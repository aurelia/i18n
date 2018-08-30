import { metadata } from "aurelia-metadata";
import { customAttribute, HtmlBehaviorResource } from "aurelia-templating";
import { DOM } from "aurelia-pal";

@customAttribute("t-params")
export class TParamsCustomAttribute {
  public static inject() {
    return [DOM.Element];
  }

  public static configureAliases(aliases: string[]) {
    const r = metadata.getOrCreateOwn(metadata.resource, HtmlBehaviorResource, TParamsCustomAttribute);
    (r as any).aliases = aliases;
  }

  public service: any;

  constructor(public element: Element) { }

  public valueChanged() { /**/ }
}
