import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forwardRef } from 'react';
import { RegisterOptions } from 'react-hook-form';
import { customInputClasses } from '@/app/utils/customClasses';

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    type?: string;
    description?: string;
    formProps: any;
    // register: UseFormRegister<any>;
    // errors: FieldErrors<any>;
}

function configureRegisterOptions(required: boolean | undefined, label: string, type: string): object{

    const requiredDefault = (required) ? `${label} is required.` : false;
    let registerOptions: RegisterOptions = {
        required: requiredDefault,
        validate: (value: string) => !/[<>'"&“”‘’]/gi.test(value) || "Some special characters are not allowed"
    }   

    if (type === 'email') {
        registerOptions = {
            ...registerOptions,
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
            }
        }
    }
    
    return registerOptions;
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
    ({ label, id, type = 'text', description, formProps, ...props }: MyInputProps, ref) => {
    
    // const id = label.trim().toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    const registerOptions = configureRegisterOptions(props.required, label, type)
    
    return (
      <div className={`flex flex-col gap-3 ${props.className}`}>
        <Label htmlFor={id}>
          {label}{props.required && <span className="text-rose-700 font-bold">*</span>}
        </Label>
        <Input
            id={id}
            {...props}
            type={type}
            maxLength={(label === 'Last Initial') ? 1 : 100}
            className={`${customInputClasses} ${(label === 'Last Initial') ? 'lg:w-12' : ''}`}
            {...formProps.register(id, registerOptions)}
            // placeholder={`Enter your ${label}`}
        />
      {formProps.errors[id]?.message ? 
        <span className='text-rose-700 text-sm italic -mt-2'>{String(formProps.errors[id]?.message)}</span> :
        description && <span className='text-gray-500 font-medium text-xs -mt-2 italic'>{String(description)}</span>
      }
      </div>
    );
  }
);

Input.displayName = 'MyInput';

export default MyInput;
