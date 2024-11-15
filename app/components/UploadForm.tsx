'use client';

import dynamic from 'next/dynamic';
import DOMPurify from 'dompurify';
import { customInputClasses } from '@/app/utils/customClasses';
import MyInput from '@/app/components/ui/Input';
import MySelect from '@/app/components/ui/Select';
import MyCheckbox from '@/app/components/ui/Checkbox';
import MyTextarea from '@/app/components/ui/Textarea';
import MyLocationSelector from '@/app/components/ui/LocationSelector';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription,DrawerClose
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import {UploadFormProps} from '@/app/data/globalProps'
import { genderOptions, raceOptions, jewishOptions, observanceLevel, kiddushFrequency, influenceLevels, getYearOptions } from '@/app/data/uploadFormData';
import { useForm } from 'react-hook-form';
import { MouseEventHandler, useState } from 'react';

const DynamicMap = dynamic(() => import('@/app/components/Map'), { ssr: false });

function mapDrawer(register: any, setValue: any) {

  const [location, setLocation] = useState<number[] | null>(null);
  register("specific_location", { required: false })
  function onClick() {
    console.log('make selection', location);
    // const arr = [Math.random()*120 - 60, Math.random()*120 - 60]
    // setLocation(arr)
    setValue("specific_location", location)
  }

  const handleSetLocation = (latLng: [number, number] | null) => {
    setLocation(latLng);
    console.log('Location set:', latLng);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className={`justify-start w-auto ${customInputClasses}`}>{location ? <>{'lat: ' + location[0] + ', lng: ' + location[1]} </> : <>Open Map Selector</>}</Button>
      </DrawerTrigger>
      <DrawerContent data-vaul-no-drag>
        <DrawerHeader>
          <DrawerTitle>Can you be more specific?</DrawerTitle>
          <DrawerDescription>Please be as specific as possible to better represent your location. You don't have to share your exact location. An approximation is fine. Drop a pin and click "Make Selection".</DrawerDescription>
        </DrawerHeader>
        <div className="w-full h-96 overflow-hidden bg-gray-200 flex items-center justify-center">
          <DynamicMap 
            setLocation={handleSetLocation} 
          />
          {/* <span className="text-gray-500">Map will be displayed here</span> */}
        </div>
        <div className="p-3">
          <div className="flex justify-center gap-3">
           <DrawerClose asChild>
              <Button
                size="lg"
                className="w-1/2"
                variant="outline"
              >Cancel</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                size="lg"
                className="w-1/2"
                onClick={() => onClick()}
              >Make Selection</Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default function UploadForm({ localeData }:{ localeData: UploadFormProps; }) {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  const onSubmit = (data: any) => {
    console.log('data',data)
    const sanitizedObject: { [key: string]: any } = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] !== 'boolean') {
          sanitizedObject[key] = DOMPurify.sanitize(data[key]);
        } else {
          sanitizedObject[key] = data[key];
        }
      }
    }
    console.log('clean',sanitizedObject);
    // return sanitizedObject;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex gap-6 flex-col">
        <div className="flex gap-6 flex-col lg:flex-row">
            <MyInput label={localeData.fname} id="first_name" formProps={{register, errors}} className="w-auto lg:w-1/2 lg:max-w-[calc(50%_-_12px)]" required/>

            <MyInput label={localeData.linitial} id="last_initial" formProps={{register, errors}} />

        
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
            <MyInput label="Email" id="email" type="email" formProps={{register, errors}} className="w-auto lg:w-1/2 lg:max-w-[calc(50%_-_12px)]"/>
            <MySelect label="Birth Year" id="birth_year" options={getYearOptions()} formProps={{register, errors, setValue}} required className=""/>
            <MySelect label="Gender" id="gender" options={genderOptions} formProps={{register, errors, setValue}} required className=""/>
        </div>

        

        <div className="flex gap-6 flex-col lg:flex-row">
          <MyLocationSelector label="Where do you live?" id="you_from" formProps={{register, errors, setValue}} className="w-auto lg:w-1/2" description="This location will not be exact." />

          <div className="w-auto lg:w-1/2 flex flex-col gap-2 flex-1">
            <p className="text-sm">
              Provide a more specific location (Optional)
            </p>
            {mapDrawer(register,setValue)}
            <p className='text-gray-500 font-medium text-xs -mt-2 italic pt-1'>To better represent your location on the map.</p>
          </div>
        </div>

        <MyInput label="Upload Your Kiddush Audio (optional)" id="file" type="file" description="No file to share? That's ok! We'd still love to learn more about you and where you are from." formProps={{register, errors}}/>

        <MyTextarea label="Favorite Shabbat Memory. (optional)" id="shabbat_memory" description="Tell us about any memory related to this Kiddush or Shabbat." formProps={{register, errors}}/>

        <h2 className="font-bold border-b-2 border-solid border-gray-700 dark:border-gray-400">Tell Us About Yourself</h2>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MySelect label="Level of Observance" id="level_of_observance" options={observanceLevel} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2 flex-1"/>
          
          <MySelect label="How Often Do You Say Kiddush?" id="kiddush_frequency" options={kiddushFrequency} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2  flex-1" />
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MySelect label="How Much Does Judaism Influence Your Life?" id="influence_level" options={influenceLevels} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2 flex-1"/>

          <MySelect label="Shabbat is my favorite day of the week." id="shabbat_is_favorite" options={[{value: "true", label: "True" },{ value: "false", label: "False" }]} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2 flex-1"/>
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MySelect label="Race Options" id="race_options" options={raceOptions} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2 flex-1"/>

          <MySelect label="Which Jewish heritage best describes your background?" id="jewish_heritage" options={jewishOptions} formProps={{register, errors, setValue}} className="w-auto lg:w-1/2 flex-1"/>
        </div>

        <h2 className="font-bold border-b-2 border-solid border-gray-700 dark:border-gray-400">Tell Us About Your Family</h2>
   
        <div className="flex gap-6 flex-col lg:flex-row">
          <MyLocationSelector label="Where is Your Mother From?" id="mother_from" formProps={{register, errors, setValue}} className="w-auto lg:w-1/2" description="This location will not be exact." />

          <MyLocationSelector label="Where is Your Father From?" id="father_from" formProps={{register, errors, setValue}} className="w-auto lg:w-1/2" description="This location will not be exact." />
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MyLocationSelector label="Where is Your Maternal Grandmother From?" id="maternal_gmother_from" formProps={{register, errors, setValue}} className="w-auto lg:w-1/2" description="This location will not be exact." />

          <MyLocationSelector label="Where is Your Maternal Grandfather From?" id="maternal_gfather_from" formProps={{register, errors, setValue}} className="w-auto lg:w-1/2" description="This location will not be exact." />
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MyLocationSelector label="Where is Your Paternal Grandmother From?" id="paternal_gmother_from" formProps={{register, errors, setValue}} className="w-auto lg:w-1/2" description="This location will not be exact." />

          <MyLocationSelector label="Where is Your Paternal Grandmother From?" id="paternal_gfather_from" formProps={{register, errors, setValue}} className="w-auto lg:w-1/2" description="This location will not be exact." />
        </div>

        <MyCheckbox label="I'm ok with my audio being used in social media, with the understanding that my identity and other personal information will not be shared." id="ok_with_audio" formProps={{register, errors, setValue}} defaultChecked={true}/>

        <Button className="w-auto lg:w-1/2 m-auto" type="submit">Submit</Button>
      </div>
    </form>
  );
}
