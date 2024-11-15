'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { customInputClasses } from '@/app/utils/customClasses';
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query"
import { useState } from 'react';
import { locationList } from '@/app/data/locationData';
import { FormDefaultProps } from "@/app/data/globalProps";

interface LocationProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    description? : string
    options?: { value: string, label: string }[];
    translations: FormDefaultProps;
    formProps: any;
}

type locationDataProps = {
  value: string
  label: string
  lat: number
  lng: number
}

const locations: locationDataProps[] = locationList;

const pin = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3.5C6 2.67157 6.67157 2 7.5 2C8.32843 2 9 2.67157 9 3.5C9 4.32843 8.32843 5 7.5 5C6.67157 5 6 4.32843 6 3.5ZM8 5.94999C9.14112 5.71836 10 4.70948 10 3.5C10 2.11929 8.88071 1 7.5 1C6.11929 1 5 2.11929 5 3.5C5 4.70948 5.85888 5.71836 7 5.94999V13.5C7 13.7761 7.22386 14 7.5 14C7.77614 14 8 13.7761 8 13.5V5.94999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>

const MyLocationSelector = (
    ({ label, id, description, onChange, options, translations, formProps, ...props }: LocationProps) => {
    
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [selectedStatus, setSelectedStatus] = useState<locationDataProps | null>(
      null
    )
    
    const requiredDefault = props.required ? translations.inputDefaultError : false;
    formProps.register(id, { required: requiredDefault })


    if (isDesktop) {
      return (
        <div className="flex flex-col w-auto gap-2 flex-1">
          <p className="text-sm">
            {label}{props.required && <span className="text-rose-700 font-bold">*</span>}
          </p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild >
              <Button 
                variant="outline" 
                className={`w-auto justify-start ${customInputClasses}`}>
                {selectedStatus ? <>{selectedStatus.label}</> : <>{pin} {translations.selectDefault}</>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
              <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} id={id} placeholder={translations.filterList} formProps={formProps} />
            </PopoverContent>
          </Popover>
          {formProps.errors[id]?.message ? 
            <span className='text-rose-700 text-sm italic -mt-2'>{String(formProps.errors[id]?.message)}</span> :
            description && <span className='text-gray-500 font-medium text-xs -mt-2 italic pt-1'>{String(description)}</span>
          }
        </div>
      )
    }

    return (
      <div className="flex flex-col w-full gap-2">
          <p className="text-sm">
          {label}{props.required && <span className="text-rose-700 font-bold">*</span>}
          </p>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className={`w-auto justify-start ${customInputClasses}`}>
              {selectedStatus ? <>{selectedStatus.label}</> : <>{pin} {translations.selectDefault}</>}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mt-4 border-t">
              <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} id={id} formProps={formProps} placeholder={translations.filterList} />
            </div>
          </DrawerContent>
        </Drawer>
        {formProps.errors[id]?.message ? 
          <span className='text-rose-700 text-sm italic -mt-2'>{String(formProps.errors[id]?.message)}</span> :
          description && <span className='text-gray-500 font-medium text-xs -mt-2 italic pt-1'>{String(description)}</span>
        }
      </div>
    )
  }
);

function StatusList({
  setOpen,
  setSelectedStatus,
  id,
  placeholder,
  formProps
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (locations: locationDataProps | null) => void;
  id: string;
  placeholder: string;
  formProps: any;
}) {

  return (
    <Command>
      <CommandInput placeholder={placeholder}/>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {locations.map((loc) => (
            <CommandItem
              key={loc.value}
              value={loc.value}
              onSelect={(value) => {
                const selectedValue = locations.find((priority) => priority.value === value) || null
                const selected = (selectedValue) ? selectedValue.value : 'No Selection'
                formProps.setValue(id, selected)
                setSelectedStatus(selectedValue)
                setOpen(false)
              }}
            >
              {loc.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export default MyLocationSelector;
