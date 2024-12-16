import { ObjectId } from 'mongodb';

export type UserProps = {
    _id?:ObjectId;
    slug:string;
    birth_year:string;
    email: string;
    father_from: string;
    first_name: string;
    influence_level: string;
    jewish_heritage: string;
    kiddush_frequency: string;
    last_initial: string;
    level_of_observance: string;
    maternal_gfather_from: string;
    maternal_gmother_from: string;
    mother_from: string;
    ok_with_audio: string;
    paternal_gmother_from: string;
    paternal_gfather_from: string;
    race_options: string;
    shabbat_is_favorite: string;
    shabbat_memory: string;
    you_from: string;
    specific_location: string;
    mp3_location: string;
    file_upload: string;
  }

  export type UploadFormProps = {
    fname: string;
    linitial: string;
    email: string;
    dob: string;
    gender: string;
    youlive: string;
    youliveExact: string;
    youliveInfo: string;
    youliveMoreInfo: string;
    mapDrawerTitle: string;
    mapDrawerDescription: string;
    recordAudio: string;
    recordAudioButton: string;
    recordRemove: string;
    recordAudioCancel: string;
    recordAudioDeleteCancel: string;
    recordAudioAccept: string;
    recordAudioStart: string;
    recordAudioStop: string;
    recordAudioRerecord: string;
    recordAudioInfo: string;
    recordDrawerTitle: string;
    recordDrawerDescription: string;
    uploadFile: string;
    uploadFileInfo: string;
    uploadRemove: string;
    shabbatMemory: string;
    shabbatMemoryInfo: string;
    characters:string;
    moreInfoTitle: string;
    observance: string;
    kiddushFreq: string;
    influence: string;
    favoriteDay:string;
    race: string;
    heritage: string;
    familyTitle: string;
    motherFrom: string;
    fatherFrom: string;
    matGrandmotherFrom: string;
    matGrandfatherFrom: string;
    patGrandmotherFrom: string;
    patGrandmfatherFrom: string;
    fromInfo:string;
    optin: string;
    submitButton: string;
    processingButton:string;
    cancelButton: string;
    makeSelectionButton: string;
    selectOptionButton: string;
    locationButton: string;
    mapButton: string;
    inputDefaultError: string;
    requiredError: string;
    emailError: string;
    invalidEmailError: string;
    charError: string;
    filterList: string;
  }

  export type FilterProps = {
    race_options:string;
    level_of_observance:string;
    kiddush_frequency:string;
    jewish_heritage:string;
    gender:string;
    influence_level:string;
    shabbat_is_favorite:string;
  }

  export type FormDefaultProps = {
    inputDefaultError: string;
    requiredError: string;
    selectDefault: string;
    emailError: string;
    charError: string;
    filterList: string;
  }

  export type DropdownIds = 'race_options' | 'level_of_observance' | 'kiddush_frequency' | 'jewish_heritage' | 'gender' | 'influence_level' | 'shabbat_is_favorite' | 'filters';