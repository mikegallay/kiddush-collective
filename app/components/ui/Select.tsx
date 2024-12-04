import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customInputClasses } from '@/app/utils/customClasses';
import { Label } from "@/components/ui/label";
import { FormDefaultProps, DropdownIds } from '@/app/data/globalProps'
import { forwardRef } from 'react';
import { useScopedI18n } from '@/locales/client';
interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    defaultOption?: string;
    description? : string
    options: { value: string, label: string }[];
    translations: FormDefaultProps;
    formProps?: any;
}

// type DropdownId = 'race_options' | 'level_of_observance' | 'kiddush_frequency' | 'jewish_heritage' | 'gender' |'influence_level' | 'shabbat_is_favorite';

const MySelect = forwardRef<HTMLInputElement, SelectProps>(
  
  ({ label, id, description, defaultOption, onChange, options, translations, formProps, ...props }: SelectProps, ref) => {
    
    const localDropdown = `uploadForm.${id}` as `uploadForm.${DropdownIds}`;
    const t  = useScopedI18n(localDropdown);

    const trans = (str : keyof typeof t) => t(str) || 'error'

    // const isDesktop = useMediaQuery("(min-width: 768px)")
    const requiredDefault = (props.required) ? translations.inputDefaultError : false;
    const defaultSelectOption = (defaultOption) ? defaultOption : translations.selectDefault;

    return (
      <div className={`flex flex-col w-auto gap-3 ${props.className || ''}`}>
        <Label htmlFor={id}>
          {label}{props.required && <span className="text-rose-700 font-bold">*</span>}
        </Label>
        <Select onValueChange={(value: string) => formProps.setValue(id, value)}>
          <SelectTrigger 
            className={`${customInputClasses} ${formProps.errors[id]?.message && 'border-rose-700'}`} 
            {...formProps.register(id, { required: requiredDefault })}
            id={id} dir={props.dir ? props.dir : 'ltr'}>
            <SelectValue placeholder={defaultSelectOption} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {/* {option.label} */}
                  {trans(option.value as keyof typeof t)}
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
