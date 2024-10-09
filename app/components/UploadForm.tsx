'use client';

import DOMPurify from 'dompurify';
import MyInput from '@/app/components/ui/Input';
import MySelect from '@/app/components/ui/Select';
import { Button } from "@/components/ui/button";
import { raceOptions, observanceLevel, kiddushFrequency, influenceLevels, countryList } from '@/app/data/uploadFormData';

import { useForm } from 'react-hook-form';

export default function UploadForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  const onSubmit = (data: any) => {
    const sanitizedObject: { [key: string]: any } = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        sanitizedObject[key] = DOMPurify.sanitize(data[key]);
      }
    }
    console.log('clean',sanitizedObject);
    // return sanitizedObject;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex gap-4 flex-col">
        <div className="flex gap-4 flex-col lg:flex-row">
            <MyInput label="First Name" formProps={{register, errors}} className="w-auto lg:w-1/2" required/>

            <MyInput label="Last Initial" formProps={{register, errors}} required/>
        </div>

        <MyInput label="Email" type="email" formProps={{register, errors}} required/>

        <div className="flex gap-4 flex-col lg:flex-row">
          <MySelect label="Level of Observance" options={observanceLevel} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2"/>
          
          <MySelect label="How Often Do You Say Kiddush?" options={kiddushFrequency} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2" />
        </div>
        <MySelect label="How Much Does Judaism Influence Your Life?" options={influenceLevels} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2"/>

        <MySelect label="Race Options" options={raceOptions} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2"/>
   
        <div className="flex gap-4 flex-col lg:flex-row">
          <MySelect label="Where Are Your Parent's From?" options={countryList} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2" />

          <MySelect label="Where Are Your Grandparent's From?" options={countryList} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2" required/>
        </div>
        <Button className="w-auto lg:w-1/2 m-auto" type="submit">Submit</Button>
      </div>
    </form>
  );
}
