import { customInputClasses } from '@/app/utils/customClasses';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import { forwardRef } from 'react';

interface MyTextareaProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    description?: string;
    formProps: any;
    // register: UseFormRegister<any>;
    // errors: FieldErrors<any>;
}

const MyTextarea = forwardRef<HTMLInputElement, MyTextareaProps>(
    ({ label, id, description, formProps, ...props }: MyTextareaProps, ref) => {
    
    const requiredDefault = (props.required) ? 'This field is required.' : false;

    return (
      <div className={`flex flex-col gap-3 flex-1 ${props.className || ''}`}>
        <Label htmlFor={id}>
          {label}{props.required && <span className="text-rose-700 font-bold">*</span>}
        </Label>
        <Textarea
            id={id}
            {...props}
            {...formProps.register(id, { required: requiredDefault })}
            className={`${customInputClasses} ${formProps.errors[id]?.message && 'border-rose-700'}`} 
            // placeholder={`Enter your ${label}`}
        />
        {formProps.errors[id]?.message ? 
          <span className='text-rose-700 text-sm italic -mt-2'>{String(formProps.errors[id]?.message)}</span> :
          description && <span className='text-gray-500 font-medium text-xs -mt-2 italic'>{String(description)}</span>
        }
      {/* {formProps.errors[id]?.message && <span className='text-rose-700 text-sm italic -mt-2'>{String(formProps.errors[id]?.message)}</span>} */}
      </div>
    );
  }
);

MyTextarea.displayName = 'MyTextarea';

export default MyTextarea;
