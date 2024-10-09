import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { forwardRef } from 'react';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    defaultOption?: string;
    options: { value: string, label: string }[];
    formProps: any;
    // setValue: (value: string, label: string) => void;
    // register: UseFormRegister<any>;
    // errors: FieldErrors<any>;
}


const MySelect = forwardRef<HTMLInputElement, SelectProps>(
    ({ label, defaultOption, onChange, options, formProps, ...props }: SelectProps, ref) => {
    
    const id = label.trim().toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    const requiredDefault = (props.required) ? 'This field is required.' : false;
    const defaultSelectOption = (defaultOption) ? defaultOption : 'Select an Option';

    return (
      <div className="flex flex-col w-full gap-3">
        <Label htmlFor={id}>{label + (props.required ? '*' : '')}</Label>
        <Select onValueChange={(value: string) => formProps.setValue(id, value)}>
          <SelectTrigger {...formProps.register(id, { required: requiredDefault })}
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
        {formProps.errors[id]?.message && <span className='text-rose-700 text-sm italic -mt-3'>{String(formProps.errors[id]?.message)}</span>}
        </Select>
      </div>
    );
  }
);

MySelect.displayName = 'MySelect';

export default MySelect;
