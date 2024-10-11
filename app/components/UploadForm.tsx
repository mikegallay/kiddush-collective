'use client';

import DOMPurify from 'dompurify';
import MyInput from '@/app/components/ui/Input';
import MySelect from '@/app/components/ui/Select';
import MyCheckbox from '@/app/components/ui/Checkbox';
import MyTextarea from '@/app/components/ui/Textarea';
import { Button } from "@/components/ui/button";
import { raceOptions, jewishOptions, observanceLevel, kiddushFrequency, influenceLevels, countryList } from '@/app/data/uploadFormData';

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
      <div className="flex gap-6 flex-col">
        <div className="flex gap-6 flex-col lg:flex-row">
            <MyInput label="First Name" id="first_name" formProps={{register, errors}} className="w-auto lg:w-1/2" required/>

            <MyInput label="Last Initial" id="last_initial" formProps={{register, errors}} required/>
        </div>

        <MyInput label="Email" id="email" type="email" formProps={{register, errors}} required/>

        <h2 className="font-bold border-b-2 border-solid border-gray-700">Tell us a little more about yourself</h2>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MySelect label="Level of Observance" id="level_of_observance" options={observanceLevel} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2"/>
          
          <MySelect label="How Often Do You Say Kiddush?" id="kiddush_frequency" options={kiddushFrequency} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2" />
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MySelect label="How Much Does Judaism Influence Your Life?" id="influence_level" options={influenceLevels} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2"/>

          <MySelect label="Shabbat is my favorite day of the week." id="shabbat_is_favorite" options={[{value: "true", label: "True" },{ value: "false", label: "False" }]} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2"/>
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MySelect label="Race Options" id="race_options" options={raceOptions} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2"/>

          <MySelect label="Which Jewish heritage best describes your background?" id="jewish_heritage" options={jewishOptions} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2"/>
        </div>
   
        <div className="flex gap-6 flex-col lg:flex-row">
          <MySelect label="Where Are Your Parent's From?"id="parents_from" options={countryList} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2" />

          <MySelect label="Where Are Your Grandparent's From?" id="grandparents_from" options={countryList} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2" required/>
        </div>

        <MyCheckbox label="I'm ok with my audio being used in social media, with the understanding that my identity and other personal information will not be shared." id="ok_with_audio" formProps={{register, errors, setValue}} defaultChecked={true}/>

        <MyTextarea label="Share your favorite memory of Shabbat? (optional)" id="shabbat_memory" formProps={{register, errors}}/>

        <Button className="w-auto lg:w-1/2 m-auto" type="submit">Submit</Button>
      </div>
    </form>
  );
}
