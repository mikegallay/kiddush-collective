'use client';

import {  useEffect } from 'react';
import {UserProps} from '@/app/data/globalProps';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, FeatureGroup, useMap } from 'react-leaflet';
import { locationList } from '@/app/data/locationData';
import { getCountryLatLng } from '@/app/utils/utilityFunctions';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression, LatLngBounds } from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { Polyline } from 'react-leaflet/Polyline'

const myIcon = L.icon({
    iconUrl: '/images/marker-icon-2x.png',
    iconSize: [26, 41],
    iconAnchor: [13, 41],
    popupAnchor: [0, -50],
    shadowUrl: '/images/marker-shadow.png',
    shadowSize: [40, 41],
    shadowAnchor: [13, 41]
});

interface PolylineProps {
    positions: LatLngExpression[];
    color: string;
  }

const LocationMarker = (pinPosition: L.LatLng | null ) => {
    return pinPosition === null ? null : (
        <Marker position={pinPosition} icon={myIcon || undefined} />
    );
};

const FitBoundsOnPolylines: React.FC<{ polylines: PolylineProps[] }> = ({ polylines }) => {
    const map = useMap();
  
    useEffect(() => {
      if (polylines.length > 0) {
        const bounds = new LatLngBounds([]);
  
        // Add all polyline positions to the bounds
        polylines.forEach((polyline) => {
          polyline.positions.forEach((position) => bounds.extend(position));
        });
  
        map.fitBounds(bounds);
      }
    }, [map, polylines]);
  
    return null;
  };

// const MapUser = ({ setLocation }: { setLocation: (latLng: [number, number] | null) => void }) => {
const MapUser = (data :  UserProps | null)  => {
    // const initialPosition = data 
    //     ? getCountryLatLng(locationList,data.you_from)
    //     : [51.505, -0.09];

    // const fatherFrom = data ? getCountryLatLng(locationList,data.father_from) : [0,0];
    // const fatherFrom: L.LatLngExpression =  data && data.father_from && getCountryLatLng(locationList, data.father_from);
    const initialPosition = getCountryLatLng(locationList, data?.you_from || '');
    const fatherFrom = getCountryLatLng(locationList, data?.father_from || '');
    const motherFrom = getCountryLatLng(locationList, data?.mother_from || '');
    const matGrandFather = getCountryLatLng(locationList, data?.maternal_gfather_from || '');
    const matGrandMother = getCountryLatLng(locationList, data?.maternal_gmother_from || '');
    const patGrandFather = getCountryLatLng(locationList, data?.paternal_gfather_from || '');
    const patGrandMother = getCountryLatLng(locationList, data?.paternal_gmother_from || '');

    const polylines = [
        { positions: [initialPosition, fatherFrom], color:'#4063FF' },
        { positions: [fatherFrom, patGrandFather],color:'#7491FF' },
        { positions: [fatherFrom, patGrandMother],color:'#7491FF' },
        { positions: [initialPosition, motherFrom],color:'#FF3D3D' },
        { positions: [motherFrom, matGrandFather],color:'#FF7575' },
        { positions: [motherFrom, matGrandMother],color:'#FF7575' },
        // Add more polylines as needed
      ];


    return (

        <MapContainer
        id="map"
        center={initialPosition} 
        zoom={5}
        style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

            {/* <LocationMarker pinPosition={[51.505, -0.09]} /> */}
            <Marker position={initialPosition} icon={myIcon || undefined} />

            <FeatureGroup>
                {polylines.map((polyline, idx) => (
                    <Polyline key={idx} positions={polyline.positions} color={polyline.color} />
                ))}
                {/* <Polyline positions={[initialPosition, fatherFrom ?? [0, 0]]} color={'blue'} />
                <Polyline positions={[initialPosition, motherFrom ?? [0, 0]]} color={'red'} /> */}
            </FeatureGroup>
            
            <FitBoundsOnPolylines polylines={polylines} />
        </MapContainer>
    );
};

export default MapUser;
