'use client';

import DOMPurify from 'dompurify';
import MyInput from '@/app/components/ui/Input'
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';


export default function UploadForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data: any) => {
    console.log(data);
    const clean = DOMPurify.sanitize(data);
    console.log(2,clean);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex gap-4 flex-col">
        <div className="flex gap-4 flex-col lg:flex-row align-start w-full">
            {/* First Name */}
            <MyInput label="First Name" register={register} errors={errors} className="w-auto lg:w-1/2" required/>

            {/* Last Initial */}
            <MyInput label="Last Initial" register={register} errors={errors} required/>
        </div>

        {/* Email */}
        <MyInput label="Email" type="email" register={register} errors={errors} required/>
        
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
