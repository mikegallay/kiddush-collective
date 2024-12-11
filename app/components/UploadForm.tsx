'use client';

import dynamic from 'next/dynamic';
import DOMPurify from 'dompurify';
import { fonts } from '@/app/fonts';
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
import { genderOptions, raceOptions, jewishOptions, observanceLevel, kiddushFrequency, influenceLevels, getYearOptions, shabbatFavorite } from '@/app/data/uploadFormData';
import { useForm } from 'react-hook-form';
import { InfoCircledIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { useCurrentLocale } from '@/locales/client'
import AudioInput from '@/app/components/AudioInput';

const DynamicMap = dynamic(() => import('@/app/components/Map'), { ssr: false });

function mapDrawer(register: any, setValue: any, localeData:UploadFormProps) {

  const [location, setLocation] = useState<number[] | null>(null);
  register("specific_location", { required: false })
  function onClick() {
    setValue("specific_location", location)
  }

  const handleSetLocation = (latLng: [number, number] | null) => {
    setLocation(latLng);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className={`justify-start w-full ${customInputClasses}`}>{location ? <>{'lat: ' + location[0] + ', lng: ' + location[1]} </> : <>{localeData.mapButton}</>}</Button>
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
  
  const router = useRouter();
 
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isSumbitting, setIsSubmitting] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  const loc = useCurrentLocale();
  const dir = loc === 'il' ? 'rtl' : 'ltr';

  const formDefaults = {
    inputDefaultError: localeData.inputDefaultError,
    requiredError: localeData.requiredError,
    selectDefault: localeData.selectOptionButton,
    emailError: localeData.emailError,
    charError: localeData.charError,
    filterList: localeData.filterList
  }

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const res = await fetch('/api/csrf-token');
      const data = await res.json();
      setCsrfToken(data.csrfToken);
    };

    fetchCsrfToken();
  }, []);
  
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
  
    const formData = new FormData();
  
    // Sanitize and prepare form data
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === 'blob') {
        // if (data[key] instanceof FileList || typeof data[key] === 'boolean') {
          console.log(key,data[key])
          // formData.append(key, data[key]);
          console.log('blob type',data[key].type)
          formData.append('blob', data[key], 'audio.webm');
        } else {
          formData.append(key, DOMPurify.sanitize(data[key]));
        }
      }
    }

    const form = document.getElementById('uploadForm') as HTMLFormElement | null;
    const fileInput = form && form.querySelector('input[type="file"]') as HTMLInputElement | null;
    const file = fileInput?.files?.[0]; // Get the first file from the FileList
    // const blob = 
  
    // Add additional fields
    formData.append('approved', 'true');
    formData.append('topUser', 'false');
    formData.append('csrfToken', csrfToken);
    formData.append(
      'slug',
      `${data.first_name}_${data.last_initial}_${Math.floor(10000 + Math.random() * 90000)}`
    );

    if (file) formData.set('file', file);
    // if (formData.has('blob')) {
    //   const blob = new Blob([audioData], { type: 'audio/webm' });
    //   formData.append('file', formData.get('blob') as Blob, 'recording.webm');
    //   formData.delete('blob');
    // }
    
    
    // console.log('File to upload:', formData.get('file')); 

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }

    try {
            // Submit the form data
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      // Handle response
      if (response.ok) {
        console.log(`Submission successful! ID: ${result.id}`);
        router.push(`/${loc}/upload/thank-you`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting form', error);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="uploadForm" onSubmit={handleSubmit(onSubmit)} noValidate encType="multipart/form-data" method="POST">
      <div className="flex gap-6 flex-col">
        <div className="flex gap-6 flex-col lg:flex-row">
            <MyInput label={localeData.fname} id="first_name" formProps={{register, errors}} className="w-auto lg:w-1/2 lg:max-w-[calc(50%_-_12px)]" translations={formDefaults} required/>
            <MyInput label={localeData.linitial} id="last_initial" translations={formDefaults} formProps={{register, errors}} />
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
            <MyInput label={localeData.email} id="email" type="email" formProps={{register, errors}} translations={formDefaults} className="w-auto lg:w-1/2 lg:max-w-[calc(50%_-_12px)]" required/>
            <MySelect dir={dir} label={localeData.dob} id="birth_year" options={getYearOptions()} translations={formDefaults} formProps={{register, errors, setValue}} className=""/>
            <MySelect dir={dir} label={localeData.gender} id="gender" options={genderOptions} translations={formDefaults} formProps={{register, errors, setValue}} className=""/>
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <div className='w-auto lg:w-1/2 flex-1 lg:max-w-[589px]'>
            <MyLocationSelector label={localeData.youlive} id="you_from" formProps={{register, errors, setValue}} className="" translations={formDefaults} description={localeData.fromInfo} />
          </div>

          <div className="w-auto lg:w-1/2 flex flex-col gap-2 flex-1 lg:max-w-[589px]">
            <p className="text-sm -mb-[5px] inline">{localeData.youliveExact} <MyHoverCard trigger={<InfoCircledIcon/>} content={localeData.youliveMoreInfo}/></p>
            {mapDrawer(register,setValue,localeData)}
            <span className='text-gray-500 font-medium text-xs -mt-1 italic'>{localeData.youliveInfo}</span>
          </div>
        </div>

        <AudioInput id="file" localeData={localeData} translations={formDefaults} formProps={{register, setValue, errors}} />

        {/* <MyInput label={localeData.uploadFile} id="file" type="file" name="file" accept="audio/*" description={localeData.uploadFileInfo} translations={formDefaults} formProps={{register, errors}}/> */}

        <MyTextarea maxLength={300} label={localeData.shabbatMemory} id="shabbat_memory" description={localeData.shabbatMemoryInfo} chars={localeData.characters} formProps={{register, errors}}/>

        <h2 className="font-bold border-b-2 border-solid border-gray-700 dark:border-gray-400">{localeData.moreInfoTitle}</h2>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MySelect dir={dir} label={localeData.observance} id="level_of_observance" options={observanceLevel} formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2 flex-1"/>
          
          <MySelect dir={dir} label={localeData.kiddushFreq} id="kiddush_frequency" options={kiddushFrequency} formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2  flex-1" />
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <MySelect dir={dir} label={localeData.influence} id="influence_level" options={influenceLevels} formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2 flex-1"/>

          <MySelect dir={dir} label={localeData.favoriteDay} id="shabbat_is_favorite" options={shabbatFavorite} formProps={{register, errors, setValue}} translations={formDefaults} className="w-auto lg:w-1/2 flex-1"/>
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

        <Button disabled={isSumbitting} className={`w-auto lg:w-1/2 m-auto text-lg ${fonts.roboto}`} type="submit">{isSumbitting ? <span className='flex flex-row justify-center items-center gap-1'><UpdateIcon className="inline spin"/> {localeData.processingButton}</span> : localeData.submitButton}</Button>
      </div>
    </form>
  );
}
