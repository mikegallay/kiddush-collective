'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { genderOptions, raceOptions, jewishOptions, observanceLevel, kiddushFrequency, influenceLevels, getYearOptions, shabbatFavorite } from '@/app/data/uploadFormData';
import { locationList } from '@/app/data/locationData';
import { Label } from "@/components/ui/label";
import { useScopedI18n } from '@/locales/client';
import { DropdownIds, UploadFormProps } from '@/app/data/globalProps';

const FilterDropdown = ({
  filter,
  options,
  onUpdate,
  ...props
}: {
  filter: { property: string; value: string };
  options: { value: string; label: string }[];
  onUpdate: (filter: { property: string; value: string }) => void;
  dir?: string;
}) => {
  const [property, setProperty] = useState(filter.property);
  const [value, setValue] = useState(filter.value);
  
  const t  = useScopedI18n('uploadForm.filters');
  const trans = (str : keyof typeof t) => t(str) || 'error'
  
  const handlePropertyChange = (newProperty: string) => {
    setProperty(newProperty);
    onUpdate({ property: newProperty, value }); // Update parent on property change
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onUpdate({ property, value: newValue }); // Update parent on value change
  };

  return (
    <div className="flex flex-row gap-3 mb-2">
      {/* Property Dropdown */}
      <div className="filter-dropdown w-1/2">
        <Label className="sr-only" htmlFor="property">{t('select_property')}</Label>
        <Select onValueChange={handlePropertyChange}>
          <SelectTrigger className="bg-slate-100" id="property" dir={props.dir ? props.dir : 'ltr'}>
            <SelectValue placeholder={t('select_property')} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {trans(option.value as keyof typeof t)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Value Dropdown */}
      <ValueDropdown property={property} defaultValue={t('select_value')} dir={props.dir} onChange={handleValueChange} />
      
    </div>
  );
};

export default FilterDropdown;


const ValueDropdown = ({ property, defaultValue, dir,  onChange } : {property : string; defaultValue: string; dir?: string; onChange: (newValue: string) => void}) => {
  const localValue = `uploadForm.${property}` as `uploadForm.${DropdownIds}`;
  const v  = useScopedI18n(localValue);
  const trans = (str : keyof typeof v) => v(str) || 'error'

  const filterOptions = {
    gender: genderOptions,
    race_options: raceOptions,
    jewish_heritage: jewishOptions,
    birth_year: getYearOptions(),
    level_of_observance: observanceLevel,
    kiddush_frequency: kiddushFrequency,
    true_false: shabbatFavorite,
    influence_level: influenceLevels,
    you_from: locationList,
    father_from: locationList,
    mother_from: locationList,
    paternal_gfather_from: locationList,
    paternal_gmother_from: locationList,
    maternal_gfather_from: locationList,
    maternal_gmother_from: locationList,
  };

  return (
    <div className="value-dropdown w-1/2">
        <Label className="sr-only" htmlFor="value">{defaultValue}</Label>
        <Select onValueChange={onChange} disabled={!property}>
          <SelectTrigger className="bg-slate-100" id="value" dir={dir ? dir : 'ltr'}>
            <SelectValue placeholder={defaultValue} />
          </SelectTrigger>
          <SelectContent>
            { property ? (
              (filterOptions as { [key: string]: { value: string; label: string }[] })[property].map((option) => (
                <SelectItem key={option.label} value={option.value}>
                  {trans(option.value as keyof typeof v)}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no value" disabled>No values available</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
  )
}
