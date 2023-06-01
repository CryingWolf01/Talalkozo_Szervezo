import { QueryString } from "../common";

const DIVIDER_CHAR = ";";

export default function makeQueryString(
  params?: { [key in string | number]: string | number | undefined | null },
): string | null {
  if (!params) {
    return null;
  }

  return Object.keys(params)
    .map(k => {
      const item = params[k];
      if (item || item === 0) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(item);
      }
      return null;
    })
    .filter(param => param)
    .join("&");
}

export function makeSearchString(data: QueryString[]): string | null {
  if (!data) {
    return null;
  }

  return data
    .map(item => {
      if (item.sort) {
        return encodeURIComponent(item.name) + item.value;
      }

      return (
        encodeURIComponent(item.name) +
        item.operation +
        encodeURIComponent(item.value)
      );
    })
    .join(DIVIDER_CHAR);
}