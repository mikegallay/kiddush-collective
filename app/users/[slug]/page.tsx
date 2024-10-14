// 'use client';
import {data} from '@/app/data/dummydata';
import {UserProps} from '@/app/data/globalProps';
import { raceOptions, jewishOptions, observanceLevel, kiddushFrequency, influenceLevels, countryList } from '@/app/data/uploadFormData';
import { getSelectLabel, getCountryName, getCountryLatLng } from '@/app/utils/utilityFunctions';

export default function Page({ params }: { params: { slug: string } }) {
    const user = (data as UserProps[]).find((user: UserProps) => user.id === params.slug);
    const headerClasses="text-xs font-bold pt-4 italic text-gray-500";


    if (!params.slug) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <div>User not found</div>;
    }
    return (
        <div>
            <h1>{user.first_name} {user.last_initial}</h1>
            <h2 className={headerClasses}>Influence Level</h2>
            <p>{getSelectLabel(influenceLevels,user.influence_level)}</p>
            <h2 className={headerClasses}>Mother from</h2>
            <p>{getCountryName(countryList,user.mother_from)}</p>
            <h2 className={headerClasses}>Father from</h2>
            <p>{getCountryName(countryList,user.father_from)}</p>
            <h2 className={headerClasses}>Maternal Grandmother from</h2>
            <p>{getCountryName(countryList,user.maternal_gmother_from)}</p>
            <h2 className={headerClasses}>Maternal Grandfather from</h2>
            <p>{getCountryName(countryList,user.maternal_gfather_from)}</p>
            <h2 className={headerClasses}>Paternal Grandmother from</h2>
            <p>{getCountryName(countryList,user.paternal_gmother_from)}</p>
            <h2 className={headerClasses}>Paternal Grandfather from</h2>
            <p>{getCountryName(countryList,user.paternal_gfather_from)}</p>
            <audio controls>
                <source src="/uploads/kiddush.mp3" type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
            <p className="italic text-amber-600">{user.shabbat_memory}</p>
            <p>--- --- ---</p>
            <h2 className={headerClasses}>Level of Jewish Influence</h2>
            <p>{getSelectLabel(influenceLevels,user.influence_level)}</p>
            <h2 className={headerClasses}>Level of Jewish Observance</h2>
            <p>{getSelectLabel(observanceLevel,user.level_of_observance)}</p>
            <h2 className={headerClasses}>Race</h2>
            <p>{getSelectLabel(raceOptions,user.race_options)}</p>
            <h2 className={headerClasses}>Kiddush Frequency</h2>
            <p>{getSelectLabel(kiddushFrequency,user.kiddush_frequency)}</p>
            <h2 className={headerClasses}>Jewish Heritage</h2>
            <p>{getSelectLabel(jewishOptions,user.jewish_heritage)}</p>
            <p>--- --- ---</p>
            <p>M-{getCountryLatLng(countryList,user.mother_from)}</p>
            <p>F-{getCountryLatLng(countryList,user.father_from)}</p>
            <p>MGM-{getCountryLatLng(countryList,user.maternal_gmother_from)}</p>
            <p>MGF-{getCountryLatLng(countryList,user.maternal_gfather_from)}</p>
            <p>PGM-{getCountryLatLng(countryList,user.paternal_gmother_from)}</p>
            <p>PGF-{getCountryLatLng(countryList,user.paternal_gfather_from)}</p>
        </div>     
    )
}