import { Input } from "@/components/ui/input"
import { Checkbox} from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { forwardRef } from 'react';


interface MyCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    // type?: string;
    formProps: any;
}

const MyCheckbox = forwardRef<HTMLInputElement, MyCheckboxProps>(
    ({ label, id, formProps, ...props }: MyCheckboxProps, ref) => {
    
    // const id = label.trim().toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').substring(0, 15);
    const requiredDefault = (props.required) ? 'This field is required.' : false;
    
    return (
      <div className={`flex flex-row-reverse justify-end gap-4 ${props.className}`}>
        <Label htmlFor={id} className="mb-2 text-sm font-medium text-gray-700">
          {label + (props.required ? '*' : '')}
        </Label>
        <Checkbox 
            id={id}
            {...props}
            {...formProps.register(id, { required: requiredDefault })}
            onCheckedChange={(value: string) => formProps.setValue(id, value)}
        />
      {formProps.errors[id]?.message && <span className='text-rose-700 text-sm italic pt-1'>{String(formProps.errors[id]?.message)}</span>}
      </div>
    );
  }
);

MyCheckbox.displayName = 'MyCheckbox';

export default MyCheckbox;
