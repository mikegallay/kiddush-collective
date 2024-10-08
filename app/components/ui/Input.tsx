import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forwardRef } from 'react';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';


interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type?: string;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
}

function configureRegisterOptions(required: boolean | undefined, label: string, type: string): object{

    const requiredDefault = (required) ? `${label} is required.` : false;
    let registerOptions: RegisterOptions = {required: requiredDefault}   
 
    if (type === 'email') {
        registerOptions = {
            required: requiredDefault,
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
            }
        }
    }
    
    console.log(required,registerOptions);
    return registerOptions;
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
    ({ label, type = 'text', register, errors, ...props }: MyInputProps, ref) => {
    
    const id = label.trim().toLowerCase().replace(/\s+/g, '');
    const registerOptions = configureRegisterOptions(props.required, label, type)
    
    return (
      <div className="flex flex-col">
        <Label htmlFor={id} className="mb-2 text-sm font-medium text-gray-700">
          {label + (props.required ? '*' : '')}
        </Label>
        <Input
            id={id}
            {...props}
            type={type}
            maxLength={(label === 'Last Initial') ? 1 : 100}
            className={(label === 'Last Initial') ? 'lg:w-12' : ''}
            {...register(id, registerOptions)}
            // placeholder={`Enter your ${label}`}
        />
      {errors[id]?.message && <span className='text-rose-700 text-sm italic pt-1'>{String(errors[id]?.message)}</span>}
      </div>
    );
  }
);

MyInput.displayName = 'MyInput';

export default MyInput;
