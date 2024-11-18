'use client'

import { customInputClasses } from '@/app/utils/customClasses';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import { forwardRef } from 'react';
import { useState } from 'react';
interface MyTextareaProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    description?: string;
    maxLength: number;
    formProps: any;
    // register: UseFormRegister<any>;
    // errors: FieldErrors<any>;
}

const MyTextarea = forwardRef<HTMLInputElement, MyTextareaProps>(
    ({ label, id, description, maxLength=100, formProps, ...props }: MyTextareaProps, ref) => {
    
    const [charCount, setCharCount] = useState(0);
    const requiredDefault = (props.required) ? 'This field is required.' : false;

    const updateTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      console.log('update text');
      setCharCount(e.target.value.length);
    };

    return (
      <div className={`flex flex-col gap-3 flex-1 ${props.className || ''}`}>
        <div className="flex flex-row justify-between">
          <Label htmlFor={id}>
            {label}{props.required && <span className="text-rose-700 font-bold">*</span>}
          </Label>
          <div className="text-xs text-gray-500">
            {charCount}/{maxLength} characters
          </div>
        </div>
        <Textarea
            id={id}
            maxLength={maxLength}
            onInput={updateTextArea}
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
