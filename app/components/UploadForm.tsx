'use client';

import DOMPurify from 'dompurify';
import MyInput from '@/app/components/ui/Input';
import MySelect from '@/app/components/ui/Select';
import { Button } from "@/components/ui/button";
import { raceOptions, observanceLevel, kiddushFrequency, influenceLevels, countryList } from '@/app/data/uploadFormData';

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
        <div className="flex gap-4 flex-col lg:flex-row">
            {/* First Name */}
            <MyInput label="First Name" register={register} errors={errors} className="w-auto lg:w-1/2" required/>

            {/* Last Initial */}
            <MyInput label="Last Initial" register={register} errors={errors} required/>
        </div>

        {/* Email */}
        <MyInput label="Email" type="email" register={register} errors={errors} required/>

        <div className="flex gap-4 flex-col lg:flex-row">
          <MySelect label="Level of Observance" options={observanceLevel} register={register} errors={errors} className="w-auto lg:w-1/2"/>
          
          <MySelect label="How Often Do You Say Kiddush?" options={kiddushFrequency} register={register} errors={errors} className="w-auto lg:w-1/2" required/>
        </div>
        <MySelect label="How Much Does Judaism Influence Your Life?" options={influenceLevels} register={register} errors={errors} className="w-auto lg:w-1/2"/>

        <MySelect label="Race Options" options={raceOptions} register={register} errors={errors} className="w-auto lg:w-1/2"/>

        <div className="flex gap-4 flex-col lg:flex-row">
          <MySelect label="Where Are Your Parent's From?" options={countryList} register={register} errors={errors} className="w-auto lg:w-1/2" required/>

          <MySelect label="Where Are Your Grandparent's From?" options={countryList} register={register} errors={errors} className="w-auto lg:w-1/2"/>
        </div>
        <Button className="w-auto lg:w-1/2 m-auto" type="submit">Submit</Button>
      </div>
    </form>
  );
}
