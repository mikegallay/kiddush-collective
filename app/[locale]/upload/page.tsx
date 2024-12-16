import { getScopedI18n } from '@/locales/server';
import UploadForm from '@/app/components/UploadForm';

export default async function UploadPage() {

  const t = await getScopedI18n('upload');
  const localeData = {
    fname: t('fname'),
    linitial: t('linitial'),
    email: t('email'),
    dob: t('dob'),
    gender: t('gender'),
    youlive: t('youlive'),
    mapDrawerTitle:t('mapDrawerTitle'),
    mapDrawerDescription: t('mapDrawerDescription'),
    youliveExact: t('youliveExact'),
    youliveInfo: t('youliveInfo'),
    youliveMoreInfo: t('youliveMoreInfo'),
    recordAudio: t('recordAudio'),
    recordAudioButton:  t('recordAudioButton'),
    recordRemove:  t('recordRemove'),
    recordAudioCancel:  t('recordAudioCancel'),
    recordAudioDeleteCancel:  t('recordAudioDeleteCancel'),
    recordAudioAccept:  t('recordAudioAccept'),
    recordAudioStart:  t('recordAudioStart'),
    recordAudioStop:  t('recordAudioStop'),
    recordAudioRerecord:  t('recordAudioRerecord'),
    recordAudioInfo:  t('recordAudioInfo'),
    recordDrawerTitle: t('recordDrawerTitle'),
    recordDrawerDescription: t('recordDrawerDescription'),
    uploadFile: t('uploadFile'),
    uploadFileInfo: t('uploadFileInfo'),
    uploadRemove: t('uploadRemove'),
    shabbatMemory: t('shabbatMemory'),
    shabbatMemoryInfo: t('shabbatMemoryInfo'),
    characters: t('characters'),
    moreInfoTitle: t('moreInfoTitle'),
    observance: t('observance'),
    kiddushFreq: t('kiddushFreq'),
    influence: t('influence'),
    favoriteDay: t('favoriteDay'),
    race: t('race'),
    heritage: t('heritage'),
    familyTitle: t('familyTitle'),
    motherFrom: t('motherFrom'),
    fatherFrom: t('fatherFrom'),
    matGrandmotherFrom: t('matGrandmotherFrom'),
    matGrandfatherFrom: t('matGrandfatherFrom'),
    patGrandmotherFrom: t('patGrandmotherFrom'),
    patGrandmfatherFrom: t('patGrandmfatherFrom'),
    fromInfo: t('fromInfo'),
    optin: t('optin'),
    submitButton: t('submitButton'),
    processingButton: t('processingButton'),
    cancelButton: t('cancelButton'),
    makeSelectionButton: t('makeSelectionButton'),
    selectOptionButton: t('selectOptionButton'),
    locationButton: t('locationButton'),
    mapButton: t('mapButton'),
    inputDefaultError: t('inputDefaultError'),
    requiredError: t('requiredError'),
    emailError: t('emailError'),
    invalidEmailError: t('invalidEmailError'),
    charError: t('charError'),
    filterList: t('filterList')
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:p-8 max-w-[1280px]">
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
      
      <p className="mb-6">{t('description')}</p>

      {/* Render the Upload Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <UploadForm localeData={localeData}/>
      </div>
    </div>
  );
}
