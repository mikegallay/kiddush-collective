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
    console.log('name',value);
    
    const foundItem = array.find(item => item.value === value);
    return foundItem ? foundItem.label : undefined;
  };

  export const getCountryLatLng = (array: CountryProps[], value: string): [number, number] | undefined => {
    console.log('lat',value);
    const foundItem = array.find(item => item.value === value);
    return foundItem ? [foundItem.lat, foundItem.lng] : undefined;
  };