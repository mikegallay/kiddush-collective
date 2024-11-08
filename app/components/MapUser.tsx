'use client';

import {  useEffect } from 'react';
import {UserProps} from '@/app/data/globalProps';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, FeatureGroup, useMap } from 'react-leaflet';
import { locationList } from '@/app/data/locationData';
import { getCountryLatLng } from '@/app/utils/utilityFunctions';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression, LatLngBounds } from 'leaflet';
import { GeoJSON as LeafletGeoJSON } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { Polyline } from 'react-leaflet/Polyline'
import { bezierSpline } from "@turf/bezier-spline";

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
    //     ? getCountryLatLng(data.you_from)
    //     : [51.505, -0.09];

    // const fatherFrom = data ? getCountryLatLng(data.father_from) : [0,0];
    // const fatherFrom: L.LatLngExpression =  data && data.father_from && getCountryLatLng( data.father_from);
    const initialPosition = getCountryLatLng(data?.you_from || '');
    const fatherFrom = getCountryLatLng(data?.father_from || '');
    const motherFrom = getCountryLatLng(data?.mother_from || '');
    const matGrandFather = getCountryLatLng(data?.maternal_gfather_from || '');
    const matGrandMother = getCountryLatLng(data?.maternal_gmother_from || '');
    const patGrandFather = getCountryLatLng(data?.paternal_gfather_from || '');
    const patGrandMother = getCountryLatLng(data?.paternal_gmother_from || '');

    function toLatLngArray(latLng: LatLngExpression): [number, number] {
      if (Array.isArray(latLng)) {
        return [latLng[1], latLng[0]];
      } else if ('lat' in latLng && 'lng' in latLng) {
        return [latLng.lng, latLng.lat];
      } else {
        throw new Error("Unsupported LatLngExpression type");
      }
    }

    const latLngToArray = (latLng: L.LatLngExpression): [number, number] => {
      if (Array.isArray(latLng)) {
        return [latLng[0], latLng[1]];
      } else {
        return [latLng.lat, latLng.lng];
      }
    };
    
    const curved = (coords: [number, number][]): GeoJSON.LineString => {
      const [p1, p2] = coords;
      const midpoint = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
      const offset = Math.random() * 0.15 - 0.075;//b-t -0.075 and 0.075
      const dx = p2[0] - p1[0];
      const dy = p2[1] - p1[1];
      const offsetMidpoint = [midpoint[0] + dy * offset, midpoint[1] - dx * 1];
    
      const points = [[p1[1], p1[0]], [offsetMidpoint[1], offsetMidpoint[0]], [p2[1], p2[0]]];
      const line: GeoJSON.LineString = {
        type: 'LineString',
        coordinates: points,
      };
      const curvedLine = bezierSpline(line);
    
      return {
        type: 'LineString',
        coordinates: curvedLine.geometry.coordinates,
      };
    };


    const polylines = [
        { positions: [initialPosition, fatherFrom], curve: curved([latLngToArray(initialPosition), latLngToArray(fatherFrom)]), color:'#4063FF' },
        { positions: [fatherFrom, patGrandFather], curve: curved([latLngToArray(fatherFrom), latLngToArray(patGrandFather)]), color:'#7491FF' },
        { positions: [fatherFrom, patGrandMother], curve: curved([latLngToArray(fatherFrom), latLngToArray(patGrandMother)]), color:'#7491FF' },
        { positions: [initialPosition, motherFrom], curve: curved([latLngToArray(initialPosition), latLngToArray(motherFrom)]), color:'#FF3D3D' },
        { positions: [motherFrom, matGrandFather], curve: curved([latLngToArray(motherFrom), latLngToArray(matGrandFather)]), color:'#FF7575' },
        { positions: [motherFrom, matGrandMother], curve: curved([latLngToArray(motherFrom), latLngToArray(matGrandMother)]), color:'#FF7575' },
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
                {/* {polylines.map((polyline, idx) => (
                    <Polyline key={idx} positions={polyline.positions} color={polyline.color} />
                ))} */}
                {polylines.map((polyline, idx) => (
                    // <Polyline key={idx} positions={polyline.positions} color={polyline.color} />
                    <LeafletGeoJSON key={idx} data={polyline.curve} style={{
                      color: polyline.color,
                      weight: 2.5,
                      opacity: 0.8
                    }}/>
                ))}
                
            </FeatureGroup>
            
            {/* <FitBoundsOnPolylines polylines={polylines} /> */}
        </MapContainer>
    );
};

export default MapUser;
