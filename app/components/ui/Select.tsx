import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import {
//   Drawer,
//   DrawerContent,
//   DrawerTrigger,
// } from "@/components/ui/drawer"
// import { useMediaQuery } from "@/hooks/use-media-query"
import { customInputClasses } from '@/app/utils/customClasses';
import { Label } from "@/components/ui/label";
import { forwardRef } from 'react';
// import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    defaultOption?: string;
    description? : string
    options: { value: string, label: string }[];
    formProps?: any;
}


const MySelect = forwardRef<HTMLInputElement, SelectProps>(
    ({ label, id, description, defaultOption, onChange, options, formProps, ...props }: SelectProps, ref) => {
    
    // const isDesktop = useMediaQuery("(min-width: 768px)")
    const requiredDefault = (props.required) ? 'This field is required.' : false;
    const defaultSelectOption = (defaultOption) ? defaultOption : 'Select an Option';

    return (
      <div className={`flex flex-col w-auto gap-3 ${props.className || ''}`}>
        <Label htmlFor={id}>
          {label}{props.required && <span className="text-rose-700 font-bold">*</span>}
        </Label>
        <Select onValueChange={(value: string) => formProps.setValue(id, value)}>
          <SelectTrigger 
            className={`${customInputClasses} ${formProps.errors[id]?.message && 'border-rose-700'}`} 
            {...formProps.register(id, { required: requiredDefault })}
            id={id}>
            <SelectValue placeholder={defaultSelectOption} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
          </SelectContent>
          {formProps.errors[id]?.message ? 
            <span className='text-rose-700 text-sm italic -mt-2'>{String(formProps.errors[id]?.message)}</span> :
            description && <span className='text-gray-500 font-medium text-xs -mt-2 italic'>{String(description)}</span>
          }
        </Select>
      </div>
    );
  }
);

MySelect.displayName = 'MySelect';

export default MySelect;
