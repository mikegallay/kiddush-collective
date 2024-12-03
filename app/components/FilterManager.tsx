'use client';

import { MouseEventHandler, useState } from 'react';
import FilterDropdown from './FilterDropdown';
import { Button } from '@/components/ui/button'
import { useEffect } from 'react';
import { Cross2Icon, CrossCircledIcon, MixerHorizontalIcon, PlusIcon } from '@radix-ui/react-icons';

const FilterManager = (
  { options, applyFilter, closeFilter }: 
  { options: { value: string; label: string }[]; applyFilter:Function, closeFilter:MouseEventHandler<HTMLButtonElement> }) => {
  const [filters, setFilters] = useState<{ property: string; value: string }[]>([]);

  const updateFilter = (index: number, updatedFilter: { property: string; value: string }) => {
    const newFilters = [...filters];
    newFilters[index] = updatedFilter;
    setFilters(newFilters);
    console.log('new Filters',newFilters);
    
  };

  useEffect(() => {
    if (filters.length === 0) {
      const timer = setTimeout(() => {
        addFilter();
      }, 1000);
  
      return () => clearTimeout(timer); 
    }
  }, [filters]);

  const addFilter = () => {
    setFilters([...filters, { property: '', value: '' }]);
  };

  const handleApplyFilters = () => {
    console.log('Filters being applied:', filters); // Debug log
    applyFilter({filters}); // Pass filters to applyFilter function
  };

  const handleClearFilters = () => {
    setFilters([]);
    applyFilter(filters); // Pass filters to applyFilter function
  };

  return (
    <div className='relative h-full'>
      <div className="flex flex-row justify-between mb-4 min-w-[300px]">
        <h4 className="text-base font-semibold"> Select Filters</h4>
        <button role="button" aria-label="Close filter" onClick={closeFilter}><CrossCircledIcon className="scale-125"/></button>
      </div>
      <div className="overflow-y-auto overflow-x-hidden max-h-[260px]">
        {filters.map((filter, index) => (
          <FilterDropdown
            key={index}
            filter={filter}
            options={options}
            onUpdate={(updatedFilter) => updateFilter(index, updatedFilter)}
          />
        ))}
      </div>
      <div className="flex flex-row gap-2 mt-4 justify-between absolute bottom-0 w-full">
        <div>
          <Button role="button" aria-label="Clear all filters" onClick={handleClearFilters} variant='link'>Clear <Cross2Icon className="scale-105"/></Button>
        </div>
        <div className="flex flex-row gap-2">
          <Button role="button" aria-label="Add new filter" onClick={addFilter} variant='secondary'>Add <PlusIcon className="scale-105"/></Button>
          <Button role="button" aria-label="Apply filters to map" onClick={handleApplyFilters}>Apply <MixerHorizontalIcon className="scale-105"/></Button>
        </div>
      </div>
    </div>
  );
};

export default FilterManager;
