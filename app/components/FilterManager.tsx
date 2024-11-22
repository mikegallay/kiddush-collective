'use client';

import { useState } from 'react';
import FilterDropdown from './FilterDropdown';
import  { Button } from '@/components/ui/button'

const FilterManager = ({ options, applyFilter }: { options: { value: string; label: string }[]; applyFilter:Function }) => {
  const [filters, setFilters] = useState<{ property: string; value: string }[]>([]);

  const updateFilter = (index: number, updatedFilter: { property: string; value: string }) => {
    const newFilters = [...filters];
    newFilters[index] = updatedFilter;
    setFilters(newFilters);
    console.log('new Filters',newFilters);
    
  };

  const addFilter = () => {
    setFilters([...filters, { property: '', value: '' }]);
  };

  const handleApplyFilters = () => {
    console.log('Filters being applied:', filters); // Debug log
    applyFilter({filters}); // Pass filters to applyFilter function
  };

  const handleClearFilters = () => {
    setFilters([]);
    applyFilter({filters}); // Pass filters to applyFilter function
  };

  return (
    <div>
      {filters.map((filter, index) => (
        <FilterDropdown
          key={index}
          filter={filter}
          options={options}
          onUpdate={(updatedFilter) => updateFilter(index, updatedFilter)}
        />
      ))}
      <Button onClick={addFilter}>Add Filter</Button>
      <Button onClick={handleApplyFilters}>Apply Filters</Button>
      <Button onClick={handleClearFilters}>Clear Filters</Button>
    </div>
  );
};

export default FilterManager;
