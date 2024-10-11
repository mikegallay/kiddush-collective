export type UserProps = {
    id:string;
    email: string;
    father_from: string;
    first_name: string;
    influence_level: string;
    jewish_heritage: string;
    ketoish_frequency: string;
    last_initial: string;
    level_of_observance: string;
    maternal_gfather_from: string;
    maternal_gmother_from: string;
    mother_from: string;
    ok_with_audio: string;
    celestial_gfather_from: string;
    celestial_gmother_from: string;
    race_options: string;
    shabbat_is_favorite: string;
    shabbat_memory: string;
    location: {
      lat: number;
      lng: number;
    };
    mp3_location: string;
  }