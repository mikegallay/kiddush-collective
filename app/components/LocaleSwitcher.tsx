'use client';

import { useChangeLocale, useCurrentLocale } from '../../locales/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";


export function LocaleSwitcher() {
  // Uncomment to preserve the search params. Don't forget to also uncomment the Suspense in the layout
  const changeLocale = useChangeLocale(/* { preserveSearchParams: true } */);

  const localeOptions: { value: string, label: string }[] = [
    { value: "en", label: "EN" },
    { value: "es", label: "ES" }
  ] as const;

  // type LanguageCode = typeof localeOptions[number]['value'];
  type LanguageCode = "en" | "es"

  return (
    // <MySelect label="Birth Year" id="birth_year" options={localeOptions} onChange={(e) => changeLocale('es')} className=""/>
    <div className="flex flex-col w-auto gap-3">
        <Label className="hidden" htmlFor='locale-switcher'>Local Switcher</Label>
        <Select onValueChange={(value: LanguageCode) => changeLocale(value)}>
          <SelectTrigger id='locale-switcher'>
            <SelectValue placeholder={useCurrentLocale().toUpperCase()} />
          </SelectTrigger>
          <SelectContent>
            {localeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    // <>
    //   <button type="button" onClick={() => changeLocale('en')}>
    //     EN
    //   </button>
    //   <button type="button" onClick={() => changeLocale('es')}>
    //     ES
    //   </button>
    // </>
  );
}