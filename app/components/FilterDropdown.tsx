'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { genderOptions, raceOptions, jewishOptions, observanceLevel, kiddushFrequency, influenceLevels, getYearOptions } from '@/app/data/uploadFormData';
import { locationList } from '@/app/data/locationData';
import { Label } from "@/components/ui/label";

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

  const filterOptions = {
    gender: genderOptions,
    race_options: raceOptions,
    jewish_heritage: jewishOptions,
    birth_year: getYearOptions(),
    level_of_observance: observanceLevel,
    kiddush_frequency: kiddushFrequency,
    influence_level: influenceLevels,
    you_from: locationList,
    father_from: locationList,
    mother_from: locationList,
    paternal_gfather_from: locationList,
    paternal_gmother_from: locationList,
    maternal_gfather_from: locationList,
    maternal_gmother_from: locationList,
  };
  
  const handlePropertyChange = (newProperty: string) => {
    setProperty(newProperty);
    onUpdate({ property: newProperty, value }); // Update parent on property change
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onUpdate({ property, value: newValue }); // Update parent on value change
  };

  return (
    <div className="flex flex-row gap-3">
      {/* Property Dropdown */}
      <div className="filter-dropdown">
        <Label htmlFor="property">Select Property</Label>
        <Select onValueChange={handlePropertyChange}>
          <SelectTrigger id="property" dir={props.dir ? props.dir : 'ltr'}>
            <SelectValue placeholder="Select Property" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Value Dropdown */}
      <div className="value-dropdown">
        <Label htmlFor="value">Select Value</Label>
        <Select onValueChange={handleValueChange} disabled={!property}>
          <SelectTrigger id="value" dir={props.dir ? props.dir : 'ltr'}>
            <SelectValue placeholder="Select Value" />
          </SelectTrigger>
          <SelectContent>
            { property ? (
              (filterOptions as { [key: string]: { value: string; label: string }[] })[property].map((option) => (
                <SelectItem key={option.label} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no value" disabled>No values available</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterDropdown;
