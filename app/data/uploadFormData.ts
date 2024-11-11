export const genderOptions: { value: string, label: string }[] = [
  { value: "male", label: "XY" },
  { value: "female", label: "XX" }
];

export const raceOptions: { value: string, label: string }[] = [
  { value: "white", label: "White" },
  { value: "black", label: "Black" },
  { value: "asian", label: "Asian" },
  { value: "hispanic", label: "Hispanic" },
  { value: "other", label: "Other" }
];

export const jewishOptions: { value: string, label: string }[] = [
  { value: "ashkenazi_jews", label: "Ashkenazi Jews" },
  { value: "sephardi_jews", label: "Sephardi Jews" },
  { value: "mizrahi_jews", label: "Mizrahi Jews" },
  { value: "ethiopian_jews", label: "Ethiopian Jews (Beta Israel)" },
  { value: "indian_jews", label: "Indian Jews" },
  { value: "yemeni_jews", label: "Yemeni Jews" },
  { value: "chinese_jews", label: "Chinese Jews" }
];

export const observanceLevel: { value: string, label: string }[] = [
  { value: "no_observance", label: "No Observance" },
  { value: "secular", label: "Secular" },
  { value: "traditionalist", label: "Traditionalist" },
  { value: "reform", label: "Reform" },
  { value: "conservative", label: "Conservative" },
  { value: "conservadox", label: "Conservadox" },
  { value: "modern_orthodox", label: "Modern Orthodox" },
  { value: "orthodox", label: "Orthodox" }
];

export const kiddushFrequency: { value: string, label: string }[] = [
  { value: "every_shabbat", label: "Every Shabbat" },
  { value: "once_month", label: "Once a Month" },
  { value: "few_year", label: "A Few Times a Year" }
];

export const influenceLevels: { value: string, label: string }[] = [
  { value: "strict_observance", label: "Strict Observance" },
  { value: "holidays", label: "Just the Holidays" },
  { value: "traditionalist", label: "Traditionalist" }
];

export function getYearOptions() {
  const yearOptions = [];
  for (let year = 1920; year <= 2024; year++) {
    yearOptions.push({ value: year.toString(), label: year.toString() });
  }
  return yearOptions;
}