import i18n from "i18next";
import numeral from "numeral";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import supportedLocales, {
  locales,
  SupportedLanguanges,
} from "../src/config/supportedLocales";
import { isEmpty } from "lodash";
import { hu } from "date-fns/locale";
import { format as dateFormat } from "date-fns";
import { initReactI18next } from "react-i18next";

numeral.register("locale", "hu", {
  delimiters: {
    thousands: " ",
    decimal: ",",
  },
  currency: {
    symbol: "Ft",
  },
  abbreviations: { thousand: "E", million: "m", billion: "M", trillion: "b" },
  ordinal: function (number) {
    return ".";
  },
});

numeral.register("locale", "en-gb", {
  delimiters: {
    thousands: ",",
    decimal: ".",
  },
  currency: {
    symbol: "Ft",
  },
  abbreviations: { thousand: "k", million: "m", billion: "b", trillion: "t" },
  ordinal: function (number) {
    return ".";
  },
});

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: [
      "common",
      "validation",
      "material-table",
      "permission",
      "notification",
      "property",
      "translation",
    ],
    fallbackLng: "hu",
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (format === "phoneNumber" && value) {
          const pattern = locales[lng as SupportedLanguanges].phonePattern;
          const match = value.replace(/\s/g, "").match(pattern) ?? [];
          if (!isEmpty(match)) {
            return `${match[1]}${match[2]} (${match[3]}) ${match[4]} ${match[5]}`;
          }
          return value;
        }

        if (format === "datetime") {
          return dateFormat(new Date(value), "Pp", {
            locale: lng ? supportedLocales[lng] : hu,
          });
        }
        if (format === "date" && value) {
          return dateFormat(new Date(value), "P", {
            locale: lng ? supportedLocales[lng] : hu,
          });
        }
        if (format === "time" && value) {
          return dateFormat(new Date(value), "p", {
            locale: lng ? supportedLocales[lng] : hu,
          });
        }
        if (format === "number") {
          numeral.locale(lng);
          return numeral(value).format("0,0.[000]");
        }
        if (format === "currency") {
          numeral.locale(lng);
          return numeral(value).format("0,0.[000] $");
        }
        return value;
      },
    },
  });

export default i18n;