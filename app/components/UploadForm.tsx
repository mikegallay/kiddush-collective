'use client';

import { Input } from "@/components/ui/input"
import MyInput from '@/app/components/ui/Input'
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';

export default function UploadForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex gap-4 flex-col">
        <div className="flex gap-4 flex-col lg:flex-row">
            {/* First Name */}
            <MyInput className="w-auto lg:w-124" label="First Name" register={register} errors={errors} required/>

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
