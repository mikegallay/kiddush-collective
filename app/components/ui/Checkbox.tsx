import { Input } from "@/components/ui/input"
import { Checkbox} from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { forwardRef } from 'react';


interface MyCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    formProps: any;
}

const MyCheckbox = forwardRef<HTMLInputElement, MyCheckboxProps>(
    ({ label, id, formProps, ...props }: MyCheckboxProps, ref) => {
    
    const requiredDefault = (props.required) ? 'This field is required.' : false;
    
    return (
      <div className={`flex flex-row-reverse justify-end gap-4 ${props.className}`}>
        <Label className="leading-normal" htmlFor={id}>
            {label}{props.required && <span className="text-rose-700 font-bold">*</span>}
        </Label>
        <Checkbox 
            id={id}
            {...props}
            {...formProps.register(id, { required: requiredDefault })}
            onCheckedChange={(value: string) => formProps.setValue(id, value)}
        />
      {formProps.errors[id]?.message && <span className='text-rose-700 text-sm italic -mt-2'>{String(formProps.errors[id]?.message)}</span>}
      </div>
    );
  }
);

MyCheckbox.displayName = 'MyCheckbox';

export default MyCheckbox;
