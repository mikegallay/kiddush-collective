import L from 'leaflet';
import { locationList } from '@/app/data/locationData';

type SelectProps = {
    value: string;
    label: string;
  };

type CountryProps = {
value: string;
label: string;
lat: number;
lng: number;
};
  
  export const getSelectLabel = (array: SelectProps[], value: string): string | undefined => {
    const foundItem = array.find(item => item.value === value);
    return foundItem ? foundItem.label : undefined;
  };

  export const getCountryName = (array: CountryProps[], value: string): string | undefined => {
    const foundItem = array.find(item => item.value === value);
    return foundItem ? foundItem.label : undefined;
  };

  // export const getCountryLatLng = (array: CountryProps[], value: string): [number, number] | undefined => {
  //   const foundItem = array.find(item => item.value === value);
  //   return foundItem ? [foundItem.lat, foundItem.lng] : undefined;
  // };



  export const getCountryLatLng = (
    value: string
  ): L.LatLngExpression => {
    const foundItem = locationList.find(item => item.value === value);
    const offset = (Math.random() * 0.02) - 0.01;

    if (foundItem) {
      return [foundItem.lat + offset, foundItem.lng + offset]; // Return as a tuple [lat, lng]
    } else {
      // Return a default location, like (0, 0), or throw an error if needed
      return [0, 0];
    }
  };

  export async function pause(ms: number) {
    return new Promise<void>(resolve => {
      const intervalId = globalThis.setInterval(() => {
        resolve();
      }, ms);
      return () => globalThis.clearInterval(intervalId);
    });
  }