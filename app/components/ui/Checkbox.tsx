import { Input } from "@/components/ui/input"
import { Checkbox} from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { forwardRef } from 'react';


interface MyCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    description?: string;
    formProps: any;
}

const MyCheckbox = forwardRef<HTMLInputElement, MyCheckboxProps>(
    ({ label, id, description, formProps, ...props }: MyCheckboxProps, ref) => {
    
    const requiredDefault = (props.required) ? 'This field is required.' : false;
    
    return (
      <div className={`flex flex-col gap-2 ${props.className || ''}`}>
        <div className="flex flex-row-reverse justify-end gap-4">
          <Label className="leading-normal" htmlFor={id}>
              {label}{props.required && <span className="text-rose-700 font-bold">*</span>}
          </Label>
          <Checkbox 
              id={id}
              {...props}
              {...formProps.register(id, { required: requiredDefault })}
              className={formProps.errors[id]?.message && 'border-rose-700'}
              onCheckedChange={(value: string) => formProps.setValue(id, value)}
          />
        </div>
        {formProps.errors[id]?.message ? 
          <div className='text-rose-700 text-sm italic -mt-2'>{String(formProps.errors[id]?.message)}</div> :
          description && <div className='text-gray-500 font-medium text-xs -mt-2 italic'>{String(description)}</div>
        }
      </div>
    );
  }
);

MyCheckbox.displayName = 'MyCheckbox';

export default MyCheckbox;
