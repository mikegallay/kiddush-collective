import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forwardRef } from 'react';
import { RegisterOptions } from 'react-hook-form';
import { customInputClasses } from '@/app/utils/customClasses';
import { FormDefaultProps } from '@/app/data/globalProps'

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    type?: string;
    description?: string;
    formProps: any;
    translations: FormDefaultProps;
    // register: UseFormRegister<any>;
    // errors: FieldErrors<any>;
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
    ({ label, id, type = 'text', description, formProps, translations,...props }: MyInputProps, ref) => {
    
    const requiredDefault = (props.required) ? label + ' ' + translations.requiredError : false;

    const validate = (value: string) => {
      
      // Skip validation if the field is not required and is empty
      if (!value && !props.required) return true;

      // Character validation for text
      if (/[<>'"&“”‘’]/gi.test(value)) {
        return translations.charError;
      }

      // Email validation
      if (type === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        return translations.emailError;
      }

      // If everything is valid
      return true;
    };
    
    return (
      <div className={`flex flex-col gap-2 ${props.className || ''}`}>
        <Label htmlFor={id}>
          {label}{props.required && <span className="text-rose-700 font-bold">*</span>}
        </Label>
        <Input
            {...props}
            id={id}
            type={type}
            ref={ref}
            maxLength={(id === 'last_initial') ? 1 : 100}
            className={`${customInputClasses} ${(id === 'last_initial') ? 'lg:w-12' : ''} ${formProps.errors[id]?.message && 'border-rose-700'}`}
            {...formProps.register(id, { required: requiredDefault, validate: (value: string) => validate(value)})}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {formProps.setValue(id, e.target.value); formProps.trigger(id)}}
            // placeholder={`Enter your ${label}`}
        />
      {formProps.errors[id]?.message ? 
        <span className='text-rose-700 text-sm italic -mt-1'>{String(formProps.errors[id]?.message)}</span> :
        description && <span className='text-gray-500 font-medium text-xs italic -mt-1'>{String(description)}</span>
      }
      </div>
    );
  }
);

Input.displayName = 'MyInput';

export default MyInput;
