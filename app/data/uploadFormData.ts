export const genderOptions: { value: string, label: string }[] = [
  { value: "male", label: "uploadForm.gender.male" },
  { value: "female", label: "uploadForm.gender.female" }
];

export const raceOptions: { value: string, label: string }[] = [
  { value: "white", label: "uploadForm.race_options.white" },
  { value: "black", label: "uploadForm.race_options.black" },
  { value: "asian", label: "uploadForm.race_options.asian" },
  { value: "hispanic", label: "uploadForm.race_options.hispanic" },
  { value: "other", label: "uploadForm.race_options.other" }
];

export const jewishOptions: { value: string, label: string }[] = [
  { value: "ashkenazi_jews", label: "uploadForm.jewish_options.ashkenazi_jews" },
  { value: "sephardi_jews", label: "uploadForm.jewish_options.sephardi_jews" },
  { value: "mizrahi_jews", label: "uploadForm.jewish_options.mizrahi_jews" },
  { value: "ethiopian_jews", label: "uploadForm.jewish_options.ethiopian_jews" },
  { value: "indian_jews", label: "uploadForm.jewish_options.indian_jews" },
  { value: "yemeni_jews", label: "uploadForm.jewish_options.yemeni_jews" },
  { value: "chinese_jews", label: "uploadForm.jewish_options.chinese_jews" }
];

export const observanceLevel: { value: string, label: string }[] = [
  { value: "no_observance", label: "uploadForm.level_of_observance." },
  { value: "secular", label: "uploadForm.level_of_observance.secular" },
  { value: "traditionalist", label: "uploadForm.level_of_observance.traditionalist" },
  { value: "reform", label: "uploadForm.level_of_observance.reform" },
  { value: "conservative", label: "uploadForm.level_of_observance.conservative" },
  { value: "conservadox", label: "uploadForm.level_of_observanceconservadox" },
  { value: "modern_orthodox", label: "uploadForm.level_of_observance.modern_orthodox" },
  { value: "orthodox", label: "uploadForm.level_of_observance.orthodox" }
];

export const kiddushFrequency: { value: string, label: string }[] = [
  { value: "every_shabbat", label: "uploadForm.kiddush_frequency.every_shabbat" },
  { value: "once_month", label: "uploadForm.kiddush_frequency.once_month" },
  { value: "few_year", label: "uploadForm.kiddush_frequency.few_year" },
  { value: "never", label: "uploadForm.kiddush_frequency.never" }
];

export const shabbatFavorite: { value: string, label: string }[] = [
  { value: "true", label: "uploadForm.shabbat_is_favorite.true" },
  { value: "false", label: "uploadForm.shabbat_is_favorite.false" }
];

export const influenceLevels: { value: string, label: string }[] = [
  { value: "strict_observance", label: "uploadForm.influence_level.strict_observance" },
  { value: "holidays", label: "uploadForm.influence_level.holidays" },
  { value: "traditionalist", label: "uploadForm.influence_level.traditionalist" },
  { value: "no_influence", label: "uploadForm.influence_level.no_influence" }
];

export const filterOptions: { value: string, label: string }[] = [
  { value: "influence_level", label: "uploadForm.filters.influence_level" },
  { value: "kiddush_frequency", label: "uploadForm.filters.kiddush_frequency" },
  { value: "level_of_observance", label: "uploadForm.filters.level_of_observance" },
  { value: "jewish_heritage", label: "uploadForm.filters.jewish_heritage" },
  { value: "race_options", label: "uploadForm.filters.race_options" },
  { value: "gender", label: "uploadForm.filters.gender" },
  { value: "shabbat_is_favorite", label: "uploadForm.filters.shabbat_is_favorite" },
  { value: "birth_year", label: "uploadForm.filters.birth_year" },
  { value: "you_from", label: "uploadForm.filters.you_from" },
  { value: "father_from", label: "uploadForm.filters.father_from" },
  { value: "mother_from", label: "uploadForm.filters.mother_from" },
  { value: "paternal_gfather_from", label: "uploadForm.filters.paternal_gfather_from" },
  { value: "paternal_gmother_from", label: "uploadForm.filters.paternal_gmother_from" },
  { value: "maternal_gfather_from", label: "uploadForm.filters.maternal_gfather_from" },
  { value: "maternal_gmother_from", label: "uploadForm.filters.maternal_gmother_from" }
];

export function getYearOptions() {
  const yearOptions = [];
  for (let year = 1920; year <= 2024; year++) {
    yearOptions.push({ value: year.toString(), label: year.toString() });
  }
  return yearOptions;
}