'use client';

import dynamic from 'next/dynamic';
import DOMPurify from 'dompurify';
import { customInputClasses } from '@/app/utils/customClasses';
import MyInput from '@/app/components/ui/Input';
import MySelect from '@/app/components/ui/Select';
import MyCheckbox from '@/app/components/ui/Checkbox';
import MyTextarea from '@/app/components/ui/Textarea';
import { MyHoverCard } from '@/app/components/ui/HoverCard';
import MyLocationSelector from '@/app/components/ui/LocationSelector';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription,DrawerClose
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import {UploadFormProps, FormDefaultProps} from '@/app/data/globalProps'
import { genderOptions, raceOptions, jewishOptions, observanceLevel, kiddushFrequency, influenceLevels, getYearOptions } from '@/app/data/uploadFormData';
import { useForm } from 'react-hook-form';
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { MouseEventHandler, useState } from 'react';
import { useCurrentLocale } from '@/locales/client'

const DynamicMap = dynamic(() => import('@/app/components/Map'), { ssr: false });

function mapDrawer(register: any, setValue: any, localeData:UploadFormProps) {

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
        <Button variant="outline" className={`justify-start w-auto ${customInputClasses}`}>{location ? <>{'lat: ' + location[0] + ', lng: ' + location[1]} </> : <>{localeData.mapButton}</>}</Button>
      </DrawerTrigger>
      <DrawerContent data-vaul-no-drag>
        <DrawerHeader>
          <DrawerTitle>{localeData.mapDrawerTitle}</DrawerTitle>
          <DrawerDescription>{localeData.mapDrawerDescription}</DrawerDescription>
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
              >{localeData.cancelButton}</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                size="lg"
                className="w-1/2"
                onClick={() => onClick()}
              >{localeData.makeSelectionButton}</Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default function UploadForm({ localeData }:{ localeData: UploadFormProps; }) {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const dir = useCurrentLocale() === 'il' ? 'rtl' : 'ltr';

  const formDefaults = {
    inputDefaultError: localeData.inputDefaultError,
    requiredError: localeData.requiredError,
    selectDefault: localeData.selectOptionButton,
    emailError: localeData.emailError,
    charError: localeData.charError,
    filterList: localeData.filterList
  }
  
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
            <MyInput label={localeData.fname} id="first_name" formProps={{register, errors}} className="w-auto lg:w-1/2 lg:max-w-[calc(50%_-_12px)]" translations={formDefaults} required/>
            <MyInput label={localeData.linitial} id="last_initial" translations={formDefaults} formProps={{register, errors}} />
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
            <MyInput label={localeData.email} id="email" type="email" formProps={{register, errors}} translations={formDefaults} className="w-auto lg:w-1/2 lg:max-w-[calc(50%_-_12px)]" required/>
            <MySelect dir={dir} label={localeData.dob} id="birth_year" options={getYearOptions()} translations={formDefaults} formProps={{register, errors, setValue}} required className=""/>
            <MySelect dir={dir} label={localeData.gender} id="gender" options={genderOptions} translations={formDefaults} formProps={{register, errors, setValue}} required className=""/>
        </div>

        

        <div className="flex gap-6 flex-col lg:flex-row">
          <MyLocationSelector label={localeData.youlive} id="you_from" formProps={{register, errors, setValue}} className="w-auto lg:w-1/2" translations={formDefaults} description={localeData.fromInfo} />

          <div className="w-auto lg:w-1/2 flex flex-col gap-2 flex-1">
            <p className="text-sm"><span>{localeData.youliveExact} <MyHoverCard trigger={<InfoCircledIcon/>} content={localeData.youliveMoreInfo}/></span></p>
            {mapDrawer(register,setValue,localeData)}
            <p className='text-gray-500 font-medium text-xs -mt-2 italic pt-1'>{localeData.youliveInfo}</p>
          </div>
        </div>

        <MyInput label={localeData.uploadFile} id="file" type="file" description={localeData.uploadFileInfo} translations={formDefaults} formProps={{register, errors}}/>

        <MyTextarea label={localeData.shabbatMemory} id="shabbat_memory" description={localeData.shabbatMemoryInfo} formProps={{register, errors}}/>

        <h2 className="font-bold border-b-2 border-solid border-gray-700 dark:border-gray-400">{localeData.moreInfoTitle}</h2>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MySelect dir={dir} label={localeData.observance} id="level_of_observance" options={observanceLevel} formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2 flex-1"/>
          
          <MySelect dir={dir} label={localeData.kiddushFreq} id="kiddush_frequency" options={kiddushFrequency} formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2  flex-1" />
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MySelect dir={dir} label={localeData.influence} id="influence_level" options={influenceLevels} formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2 flex-1"/>

          <MySelect dir={dir} label={localeData.favoriteDay} id="shabbat_is_favorite" options={[{value: "true", label: "True" },{ value: "false", label: "False" }]} formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2 flex-1"/>
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MySelect dir={dir} label={localeData.race} id="race_options" options={raceOptions} formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2 flex-1"/>

          <MySelect dir={dir} label={localeData.heritage} id="jewish_heritage" options={jewishOptions} formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2 flex-1"/>
        </div>

        <h2 className="font-bold border-b-2 border-solid border-gray-700 dark:border-gray-400">{localeData.familyTitle}</h2>
   
        <div className="flex gap-6 flex-col lg:flex-row">
          <MyLocationSelector label={localeData.motherFrom} id="mother_from" formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2" description={localeData.fromInfo} />

          <MyLocationSelector label={localeData.fatherFrom} id="father_from" formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2" description={localeData.fromInfo} />
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MyLocationSelector label={localeData.matGrandmotherFrom} id="maternal_gmother_from" formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2" description={localeData.fromInfo} />

          <MyLocationSelector label={localeData.matGrandfatherFrom} id="maternal_gfather_from" formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2" description={localeData.fromInfo} />
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MyLocationSelector label={localeData.patGrandmotherFrom} id="paternal_gmother_from" formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2" description={localeData.fromInfo} />

          <MyLocationSelector label={localeData.patGrandmfatherFrom} id="paternal_gfather_from" formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2" description={localeData.fromInfo} />
        </div>

        <MyCheckbox label={localeData.optin} id="ok_with_audio" formProps={{register, errors, setValue}} defaultChecked={true}/>

        <Button className="w-auto lg:w-1/2 m-auto" type="submit">{localeData.submitButton}</Button>
      </div>
    </form>
  );
}
