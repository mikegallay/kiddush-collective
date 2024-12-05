// 'use client';
import dynamic from 'next/dynamic';
// import {data} from '@/app/data/dummydata';
import { fonts } from '@/app/fonts';
import {DropdownIds, UserProps} from '@/app/data/globalProps';
import MapUserLegend from '@/app/components/MapUserLegend';
import AudioPlayer from '@/app/components/AudioPlayer';
import { raceOptions, jewishOptions, observanceLevel, kiddushFrequency, influenceLevels, shabbatFavorite, genderOptions } from '@/app/data/uploadFormData';
import { locationList } from '@/app/data/locationData';
import { getSelectLabel, getCountryName, getCountryLatLng } from '@/app/utils/utilityFunctions';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { HeartFilledIcon, SymbolIcon } from '@radix-ui/react-icons';
import { getScopedI18n } from '@/locales/server';

const candles = 
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="148.5 33.5 137 147" enableBackground="new 148.5 33.5 137 147" xmlSpace="preserve">
    <path d="M246.802,76.164c10.827-0.562,13.934-15.251,7.131-21.866C249,49.5,248.5,47.5,248.319,38.988 c-0.109-5.158-10.11,5.935-11.254,8.166C231.502,58.012 230.352,77.018,246.802,76.164 C254.642,75.757,238.963,76.571,246.802,76.164z"/>
    <path d="M181.771,73.385c10.881,2.709,16.32-7.525,14.568-17.855c-1.321-7.785-7.802-9.41-3.096-17.586 c3.038-4.784-8.77,1.156-9.547,1.708c-7,4.967-9.479,8.35-11.566,16.731C170.54,63.817,174.153,71.489,181.771,73.385 C189.388,75.282,174.153,71.489,181.771,73.385z"/>
    <path d="M167.749,168.557h34.691c6.583-4.305,11.648-10.889,13.673-18.738c2.026,7.85,7.09,14.434,13.674,18.738h34.69 c8.862-5.571,14.687-16.7,14.687-27.841l-19.725,2c0.253-4.305,0.506-9.862,0.506-14.167V85.375c0-2.026-1.772-5.04-3.798-5.04 l-18.283,3.792c-2.025,0-3.798,1.772-3.798,3.798v39.863c0,4.811-0.747,11.369-0.241,16.18l-16.446,1h-2.025h-17.193 c0.253-4.305,0.506-11.863,0.506-16.167V82.146c0-2.026-1.772-4.626-3.798-4.626l-19.283,5.379c-2.025,0-3.798,1.772-3.798,3.798 v41.346c0,4.811-0.747,11.369-0.24,16.18l-17.979-2C153.062,152.857,158.886,162.985,167.749,168.557z"/>
</svg>

async function getUserFromDatabase(slug: string): Promise<UserProps | null> {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('submissions');

    const user = await usersCollection.findOne({slug}) as UserProps;
    
    if (!user) return null;

    delete user._id;
    return user
  }

function calculateAge(yearString: string): number | null {
    const year = parseInt(yearString, 10);
    if (isNaN(year) || year < 0) return null;
    const currentYear = new Date().getFullYear();
    return currentYear - year;
}

export default async function Users({ params }: { params: { slug: string } }) {

    const v  = await getScopedI18n('uploadForm.filters');

    async function getTranslatedResponse(id:DropdownIds, options: {value:string;label:string;}[]) {
        const val = getSelectLabel(options, user[id as keyof UserProps] as string)
        console.log(id, val);
        
        const localValue = `uploadForm.${id}` as `uploadForm.${DropdownIds}`;
        const t  = await getScopedI18n(localValue);
        
        return t(val?.split('.').at(-1) as keyof typeof t);
    }

    if (!params.slug) {
        return <div className="mt-8 w-full flex items-center"><SymbolIcon className="spin"/></div>;
    }
    const user = await getUserFromDatabase(params.slug) as UserProps;//(data as UserProps[]).find((user: UserProps) => user.id === params.slug);
    const headerClasses="text-xs font-bold pt-4 italic text-gray-500";

    if (!user) {
        return <div className="container mx-auto p-4 lg:p-8 max-w-[1280px]">
        <h1 className="text-xl font-bold mb-6">{v('user_not_found')}</h1>
        {/* <p className="mb-6">{t('description')}</p> */}
      </div>
    }

    const DynamicMap = dynamic(() => import('@/app/components/MapUser'), { 
        ssr: false,
        loading: () => (
            <div className="mt-8 w-full flex items-center justify-center">
              <SymbolIcon className="spin" />
            </div>
          ),
    });

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-[1280px] mx-auto">
            <div className="flex flex-col justify-center lg:flex-row lg:justify-between lg:items-end relative mb-3">
                <h1 className={`text-[var(--accent)] text-3xl lg:text-4xl font-semibold mb-2 lg:mb-0 flex flex-row items-center ${fonts.roboto}`}><span>{user.first_name} {user.last_initial}.</span>{user.shabbat_is_favorite === 'true' && <><span><HeartFilledIcon className='scale-[1.75] text-red-600 mx-2 origin-[50%_60%]'/></span><span className='w-[30px] h-[30px] fill-[var(--accent)]'>{candles}</span></>}</h1>
                { user.file_upload && user.file_upload !== "" &&
                    <AudioPlayer src={user.file_upload} mode="full" />
                }
            </div>
            <div className="flex flex-col-reverse lg:flex-row gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-2 w-auto lg:w-1/3">
                    <h2 className="hidden">{v('personal_info')}</h2>
                    <h3 className={`${headerClasses} !pt-0`}>{v('age')}</h3>
                    <p>{calculateAge(user.birth_year)}/{getTranslatedResponse('gender',genderOptions)}</p>
                    <h3 className={headerClasses}>{v('from')}</h3>
                    <p>{getCountryName(locationList,user.you_from)}</p>
                    <h3 className={headerClasses}>{v('race_options')}</h3>
                    <p>{getTranslatedResponse('race_options',raceOptions)}</p>
                    <h3 className={headerClasses}>{v('influence_level')}</h3>
                    <p>{getTranslatedResponse('influence_level',influenceLevels)}</p>
                    <h3 className={headerClasses}>{v('level_of_observance')}</h3>
                    <p>{getTranslatedResponse('level_of_observance',observanceLevel)}</p>
                    <h3 className={headerClasses}>{v('kiddush_frequency')}</h3>
                    <p>{getTranslatedResponse('kiddush_frequency',kiddushFrequency)}</p>
                    <h3 className={headerClasses}>{v('jewish_heritage')}</h3>
                    <p>{getTranslatedResponse('jewish_heritage',jewishOptions)}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-2 flex-1 relative">
                    <div className="w-full h-96 lg:h-full overflow-hidden bg-gray-200 flex items-center justify-center z-10 relative">
                        <DynamicMap {...user} />
                        {/* <span className="text-gray-500">Map will be displayed here</span>  */}
                    </div>
                    <MapUserLegend/>
                </div>
            </div>
            
            {user.shabbat_memory && 
            <div className="bg-slate-200 dark:bg-gray-800 p-4 rounded-lg mb-6 flex justify-center align-middle ">
                <div className="relative p-2 lg:p-4 my-6 italic text-gray-600 w-auto max-w-[90%] lg:max-w-[75%]">
                    <span className="absolute text-8xl -top-4 -left-6 text-[var(--accent)] opacity-40">&ldquo;</span>
                    <span className="absolute text-8xl -bottom-16 -right-2 text-[var(--accent)] opacity-40">&rdquo;</span>
                    <p className={`relative z-10 italic text-[var(--accent)] font-semibold text-center w-full text-4xl ${fonts.roboto}`}>
                        {user.shabbat_memory}
                    </p>
                </div>
            </div>
            }
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-2">
                <h2>{v('family_information')}</h2>
                <div className="flex lg:gap-4 flex-col lg:flex-row">
                    <div className="flex gap-1 flex-col w-auto lg:w-1/2 flex-1">
                        <h3 className={headerClasses}>{v('mother_from')}</h3>
                        <p>{getCountryName(locationList,user.mother_from)}</p>
                    </div>
                    <div className="flex gap-1 flex-col w-auto lg:w-1/2 flex-1">
                        <h3 className={headerClasses}>{v('father_from')}</h3>
                        <p>{getCountryName(locationList,user.father_from)}</p>
                    </div>
                </div>

                <div className="flex lg:gap-4 flex-col lg:flex-row">
                    <div className="flex gap-1 flex-col w-auto lg:w-1/2 flex-1">
                        <h3 className={headerClasses}>{v('maternal_gmother_from')}</h3>
                        <p>{getCountryName(locationList,user.maternal_gmother_from)}</p>
                    </div>
                    <div className="flex gap-1 flex-col w-auto lg:w-1/2 flex-1">
                        <h3 className={headerClasses}>{v('maternal_gfather_from')}</h3>
                        <p>{getCountryName(locationList,user.maternal_gfather_from)}</p>
                    </div>
                </div>

                <div className="flex lg:gap-4 flex-col lg:flex-row">
                    <div className="flex gap-1 flex-col w-auto lg:w-1/2 flex-1">
                        <h3 className={headerClasses}>{v('paternal_gmother_from')}</h3>
                        <p>{getCountryName(locationList,user.paternal_gmother_from)}</p>
                    </div>
                    <div className="flex gap-1 flex-col w-auto lg:w-1/2 flex-1">
                        <h3 className={headerClasses}>{v('paternal_gfather_from')}</h3>
                        <p>{getCountryName(locationList,user.paternal_gfather_from)}</p>
                    </div>
                </div>
            </div>
            
            
            <p>--- --- ---</p>
            
            
            
            
            <p>--- --- ---</p>
            <p>ME-{String(getCountryLatLng(user.you_from))}</p>
            <p>M-{String(getCountryLatLng(user.mother_from))}</p>
            <p>F-{String(getCountryLatLng(user.father_from))}</p>
            <p>MGM-{String(getCountryLatLng(user.maternal_gmother_from))}</p>
            <p>MGF-{String(getCountryLatLng(user.maternal_gfather_from))}</p>
            <p>PGM-{String(getCountryLatLng(user.paternal_gmother_from))}</p>
            <p>PGF-{String(getCountryLatLng(user.paternal_gfather_from))}</p>
        </div>     
    )
}