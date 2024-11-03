// 'use client';
import dynamic from 'next/dynamic';
import {data} from '@/app/data/dummydata';
import { fonts } from '@/app/fonts';
import {UserProps} from '@/app/data/globalProps';
import { raceOptions, jewishOptions, observanceLevel, kiddushFrequency, influenceLevels } from '@/app/data/uploadFormData';
import { locationList } from '@/app/data/locationData';
import { getSelectLabel, getCountryName, getCountryLatLng } from '@/app/utils/utilityFunctions';

function calculateAge(yearString: string): number | null {
    const year = parseInt(yearString, 10);
    if (isNaN(year) || year < 0) return null;
    const currentYear = new Date().getFullYear();
    return currentYear - year;
}

export default function Page({ params }: { params: { slug: string } }) {
    const user = (data as UserProps[]).find((user: UserProps) => user.id === params.slug);
    const headerClasses="text-xs font-bold pt-4 italic text-gray-500";

    const DynamicMap = dynamic(() => import('@/app/components/MapUser'), { ssr: false });

    if (!params.slug) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <div>User not found</div>;
    }
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-[1024px] mx-auto">
            <h1 className={`text-amber-600 text-3xl italic font-black mb-2 ${fonts.oswald}`}>{user.first_name} {user.last_initial}.</h1>
            <div className="flex flex-col-reverse lg:flex-row gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-2 w-auto lg:w-1/3">
                    <h2>Personal Information</h2>
                    <h3 className={headerClasses}>Approximate Age</h3>
                    <p>{calculateAge(user.birth_year)}</p>
                    <h3 className={headerClasses}>From</h3>
                    <p>{getCountryName(locationList,user.you_from)}</p>
                    <h3 className={headerClasses}>Race</h3>
                    <p>{getSelectLabel(raceOptions,user.race_options)}</p>
                    <h3 className={headerClasses}>Level of Jewish Influence</h3>
                    <p>{getSelectLabel(influenceLevels,user.influence_level)}</p>
                    <h3 className={headerClasses}>Level of Jewish Observance</h3>
                    <p>{getSelectLabel(observanceLevel,user.level_of_observance)}</p>
                    <h3 className={headerClasses}>Kiddush Frequency</h3>
                    <p>{getSelectLabel(kiddushFrequency,user.kiddush_frequency)}</p>
                    <h3 className={headerClasses}>Jewish Heritage</h3>
                    <p>{getSelectLabel(jewishOptions,user.jewish_heritage)}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-2 flex-1">
                    <div className="w-full h-96 overflow-hidden bg-gray-200 flex items-center justify-center">
                        <DynamicMap {...user} />
                        {/* <span className="text-gray-500">Map will be displayed here</span>  */}
                    </div>
                    <div className="flex justify-center -mt-4 mb-2">
                        <audio controls>
                            <source src="/uploads/kiddush.mp3" type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            </div>

            <div className="bg-slate-200 dark:bg-gray-800 p-4 rounded-lg mb-6 flex justify-center align-middle ">
                <div className="relative p-2 lg:p-4 my-6 italic text-gray-600 w-auto max-w-[90%] lg:max-w-[75%]">
                    <span className="absolute text-8xl -top-4 -left-6 text-amber-600 opacity-40">&ldquo;</span>
                    <span className="absolute text-8xl -bottom-16 -right-2 text-amber-600 opacity-40">&rdquo;</span>
                    <p className={`relative z-10 italic text-amber-600 text-center w-full text-3xl ${fonts.oswald}`}>
                        {user.shabbat_memory}
                    </p>
                </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-2">
                <h2>Family Information</h2>
                <div className="flex lg:gap-4 flex-col lg:flex-row">
                    <div className="flex gap-1 flex-col w-auto lg:w-1/2 flex-1">
                        <h3 className={headerClasses}>My Mother is from</h3>
                        <p>{getCountryName(locationList,user.mother_from)}</p>
                    </div>
                    <div className="flex gap-1 flex-col w-auto lg:w-1/2 flex-1">
                        <h3 className={headerClasses}>My Father is from</h3>
                        <p>{getCountryName(locationList,user.father_from)}</p>
                    </div>
                </div>

                <div className="flex lg:gap-4 flex-col lg:flex-row">
                    <div className="flex gap-1 flex-col w-auto lg:w-1/2 flex-1">
                        <h3 className={headerClasses}>My Maternal Grandmother is from</h3>
                        <p>{getCountryName(locationList,user.maternal_gmother_from)}</p>
                    </div>
                    <div className="flex gap-1 flex-col w-auto lg:w-1/2 flex-1">
                        <h3 className={headerClasses}>My Maternal Grandfather is from</h3>
                        <p>{getCountryName(locationList,user.maternal_gfather_from)}</p>
                    </div>
                </div>

                <div className="flex lg:gap-4 flex-col lg:flex-row">
                    <div className="flex gap-1 flex-col w-auto lg:w-1/2 flex-1">
                        <h3 className={headerClasses}>My Paternal Grandmother is from</h3>
                        <p>{getCountryName(locationList,user.paternal_gmother_from)}</p>
                    </div>
                    <div className="flex gap-1 flex-col w-auto lg:w-1/2 flex-1">
                        <h3 className={headerClasses}>My Paternal Grandfather is from</h3>
                        <p>{getCountryName(locationList,user.paternal_gfather_from)}</p>
                    </div>
                </div>
            </div>
            
            
            <p>--- --- ---</p>
            
            
            
            
            <p>--- --- ---</p>
            <p>ME-{getCountryLatLng(locationList,user.you_from)}</p>
            <p>M-{getCountryLatLng(locationList,user.mother_from)}</p>
            <p>F-{getCountryLatLng(locationList,user.father_from)}</p>
            <p>MGM-{getCountryLatLng(locationList,user.maternal_gmother_from)}</p>
            <p>MGF-{getCountryLatLng(locationList,user.maternal_gfather_from)}</p>
            <p>PGM-{getCountryLatLng(locationList,user.paternal_gmother_from)}</p>
            <p>PGF-{getCountryLatLng(locationList,user.paternal_gfather_from)}</p>
        </div>     
    )
}