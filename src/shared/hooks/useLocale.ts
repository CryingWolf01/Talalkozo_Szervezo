import { useTranslation } from "react-i18next";
import { 
  LocaleOptions,
  SupportedLanguanges,
  locales, 
} from "../../config/supportedLocales";

export default function useLocale(): LocaleOptions {
  const { i18n } = useTranslation();
  const language = i18n.language as SupportedLanguanges;

  return locales[language];
}