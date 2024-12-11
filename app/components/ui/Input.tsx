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

function configureRegisterOptions(required: boolean | undefined, label: string, type: string, translations: FormDefaultProps): object{

    const requiredDefault = (required) ? `${label} ${translations.requiredError}.` : false;
    let registerOptions: RegisterOptions = {
        required: requiredDefault,
        validate: (value: string) => !/[<>'"&“”‘’]/gi.test(value) || translations.charError
    }   

    if (type === 'email') {
        registerOptions = {
            ...registerOptions,
            validate: (value: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) || translations.emailError
        }
    }
    
    return registerOptions;
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
    ({ label, id, type = 'text', description, formProps, translations,  ...props }: MyInputProps, ref) => {
    
    const registerOptions = configureRegisterOptions(props.required, label, type, translations)
    
    return (
      <div className={`flex flex-col gap-2 ${props.className || ''}`}>
        <Label htmlFor={id}>
          {label}{props.required && <span className="text-rose-700 font-bold">*</span>}
        </Label>
        <Input
            id={id}
            {...props}
            type={type}
            maxLength={(id === 'last_initial') ? 1 : 100}
            className={`${customInputClasses} ${(id === 'last_initial') ? 'lg:w-12' : ''} ${formProps.errors[id]?.message && 'border-rose-700'}`}
            {...formProps.register(id, registerOptions)}
            onChange={props.onChange}
            ref={ref}
            // placeholder={`Enter your ${label}`}
        />
      {formProps.errors[id]?.message ? 
        <span className='text-rose-700 text-sm italic -mb-1'>{String(formProps.errors[id]?.message)}</span> :
        description && <span className='text-gray-500 font-medium text-xs italic -mb-1'>{String(description)}</span>
      }
      </div>
    );
  }
);

Input.displayName = 'MyInput';

export default MyInput;
