import { RelativeTime } from "../relativeTime";
import { valueConverter } from "aurelia-binding";

@valueConverter("rt")
export class RtValueConverter {
  public static inject() { return [RelativeTime]; }

  constructor(private service: RelativeTime) {}

  public toView(value: any) {
    if (value === null
      || typeof value === "undefined"
      || (typeof value === "string" && value.trim() === "")
      ) {
      return value;
    }

    if (typeof value === "string" && isNaN(value as any) && !Number.isInteger(value as any)) {
      value = new Date(value);
    }

    return this.service.getRelativeTime(value);
  }
}
