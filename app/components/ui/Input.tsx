import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forwardRef } from 'react';


interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    type?: string;
    formProps: any;
    // register: UseFormRegister<any>;
    // errors: FieldErrors<any>;
}

function configureRegisterOptions(required: boolean | undefined, label: string, type: string): object{

    const requiredDefault = (required) ? `${label} is required.` : false;
    let registerOptions: RegisterOptions = {
        required: requiredDefault,
        validate: value => !/[<>'"&]/gi.test(value) || "Some special characters are not allowed"
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
    ({ label, id, type = 'text', formProps, ...props }: MyInputProps, ref) => {
    
    // const id = label.trim().toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    const registerOptions = configureRegisterOptions(props.required, label, type)
    
    return (
      <div className={`flex flex-col gap-3 ${props.className}`}>
        <Label htmlFor={id}>
          {label + (props.required ? '*' : '')}
        </Label>
        <Input
            id={id}
            {...props}
            type={type}
            maxLength={(label === 'Last Initial') ? 1 : 100}
            className={(label === 'Last Initial') ? 'lg:w-12' : ''}
            {...formProps.register(id, registerOptions)}
            // placeholder={`Enter your ${label}`}
        />
      {formProps.errors[id]?.message && <span className='text-rose-700 text-sm italic pt-1'>{String(formProps.errors[id]?.message)}</span>}
      </div>
    );
  }
);

Input.displayName = 'MyInput';

export default MyInput;
