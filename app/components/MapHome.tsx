'use client';

import {  useEffect, useState } from 'react';
import { fonts } from '@/app/fonts';
import { UserProps } from '@/app/data/globalProps';
import Link from 'next/link';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, FeatureGroup, useMap } from 'react-leaflet';
// import { locationList } from '@/app/data/locationData';
import { getCountryLatLng } from '@/app/utils/utilityFunctions';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression, LatLngBounds } from 'leaflet';
import AudioPlayer from '@/app/components/AudioPlayer';
// import { GeoJSON as LeafletGeoJSON } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
// import { Polyline } from 'react-leaflet/Polyline'
// import { bezierSpline } from "@turf/bezier-spline";
import { TriangleRightIcon } from '@radix-ui/react-icons';

const mapMarker = L.icon({
    iconUrl: `/images/marker-main.png`,
    iconSize: [25, 29],
    iconAnchor: [13, 29],
    popupAnchor: [0, -25],
    shadowUrl: '/images/marker-shadow.png',
    shadowSize: [25, 29],
    shadowAnchor: [13, 29]
})

const initialPosition: (data: UserProps) => L.LatLngExpression = (data: UserProps) => {
  return data?.specific_location === ''
    ? getCountryLatLng(data?.you_from || '')
    : data?.specific_location.split(',').map(Number) as [number, number];
};

const FitBoundsOnUsers: React.FC<{ users: UserProps[] }> = ({ users }) => {
  const map = useMap();

  useEffect(() => {
    if (users.length > 0) {
      const bounds = L.latLngBounds(
        users.map((user) => initialPosition(user))
      );
      
      map.fitBounds(bounds, { padding: [50, 50] }); // Add padding for a better view
    }
  }, [users, map]);

  return null;
}

const MapHome = ()  => {

    const [users, setUsers] = useState<UserProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

   

    useEffect(() => {
      async function fetchUsers() {
        try {
          const response = await fetch('/api/users'); // Adjust the endpoint if necessary
          if (!response.ok) {
            throw new Error(`Failed to fetch markers: ${response.statusText}`);
          }
          const data = await response.json();
          setUsers(data.data); // Assuming the API returns `{ success: true, data: [...] }`
          // console.log('data',data);
          
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
  
      fetchUsers();
    }, []);

    if (loading) return <div>Loading markers...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <MapContainer
        id="map"
        center={[0,0]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

            {/* <LocationMarker pinPosition={[51.505, -0.09]} /> */}
            

            <FeatureGroup>
              {users.map((user) => (
                <Marker position={initialPosition(user)} icon={mapMarker || undefined}>
                  <Popup className="relative">
                    <div className='flex flex-row gap-2 items-center'>
                      <AudioPlayer src={user.file_upload} mode="micro" />
                      <Link className="font-semibold !text-amber-600" href={`/users/${user.slug}`}>
                        <span className="italic">Discover</span>
                        <span className={`flex flex-row items-center text-lg/5 ${fonts.oswald}`}>{`${user.first_name} ${user.last_initial}.`}<TriangleRightIcon className="scale-150"/></span></Link>
                    </div> {
                    }
                  </Popup>
                </Marker>
              ))}
            </FeatureGroup>
            
            <FitBoundsOnUsers users={users} />

        </MapContainer>
    );
};

export default MapHome;
