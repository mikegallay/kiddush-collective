'use client';

import {  useEffect, useState } from 'react';
import { fonts } from '@/app/fonts';
import { UserProps } from '@/app/data/globalProps';
import Link from 'next/link';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, FeatureGroup, useMap } from 'react-leaflet';
// import { locationList } from '@/app/data/locationData';
import { filterOptions } from '@/app/data/uploadFormData';
import { getCountryLatLng } from '@/app/utils/utilityFunctions';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression, LatLngBounds, LeafletMouseEventHandlerFn, DivOverlay } from 'leaflet';
import AudioPlayer from '@/app/components/AudioPlayer';
// import { GeoJSON as LeafletGeoJSON } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
// import { Polyline } from 'react-leaflet/Polyline'
// import { bezierSpline } from "@turf/bezier-spline";

import FilterManager from '@/app/components/FilterManager';

import { SymbolIcon, TriangleRightIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

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
      
      map.fitBounds(bounds, { maxZoom: 6, padding: [50,50] });
    }
  }, [users, map]);

  return null;
}

const MapHome = ({loc, tooltip}:{loc:string; tooltip:string;})  => {

    const [users, setUsers] = useState<UserProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filterVisible, setFilterVisible] = useState(false)

    async function fetchUsers({ filters }: { filters?: { property: string; value: string }[] } = {}) {
      // console.log('fetct',filters);
      
      try {
        // Build the query string
        const query = filters && filters.length > 0 
          ? `?filters=${encodeURIComponent(JSON.stringify(filters))}` 
          : '';
    
        // Call the API endpoint
        const response = await fetch(`/api/users${query}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch markers: ${response.statusText}`);
        }
        const data = await response.json();
        setFilterVisible(false);
        setUsers(data.data); // Assuming the API returns `{ success: true, data: [...] }`
        // console.log('data',data);
        
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      fetchUsers();
    }, []);

    if (loading) return <div className='spin'><SymbolIcon/></div>;
    if (error) return <div className="text-red-700">Error: {error}</div>;

    const ZoomOnMarkerClick = ({ user }: { user: UserProps }) => {
      const map = useMap();
      const position = initialPosition(user);
    
      const handleClick = () => {
        map.setView(position, 7, { animate: true });
      };
    
      return (
        <Marker position={position} icon={mapMarker || undefined} eventHandlers={{ click: handleClick }}>
          <Popup>
            <div className={`flex gap-2 items-center justify-left ${loc==='il' ? 'flex-row-reverse' : 'flex-row'}`}>
                { user.file_upload && user.file_upload !== "" &&
                  <AudioPlayer src={user.file_upload} mode="micro" />
                }
                <Link className="font-semibold !text-amber-600" href={`/users/${user.slug}`}>
                <span className="italic">{tooltip}</span>
                <span className={`flex flex-row items-center text-lg/5 ${loc==='il' ? 'flex-row-reverse' : 'flex-row'} ${fonts.roboto}`}>{`${user.first_name} ${user.last_initial}`}<TriangleRightIcon className="scale-150"/></span></Link>
            </div>
          </Popup>
        </Marker>
      );
    };

    return (
      <>
        <div className={`h-full relative transition-all ${filterVisible ? 'w-0' : 'w-full' } lg:w-full `}>
          <MapContainer
            id="map"
            center={[0,0]}
            zoom={5}
            className='relative top-0 left-0 z-10'
            style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

              <FeatureGroup>
                {users.length > 0 
                  ? users.map((user) => (
                    <ZoomOnMarkerClick key={user.slug} user={user} />
                    ))
                  : <div className={`bg-slate-50 border-black rounded-lg border-2 p-2 relative z-[500] text-center mx-auto w-32 text-base top-1/2 translate-y-[-50%] shadow-lg ${fonts.roboto}`}>No Users Found</div> 
                }
              </FeatureGroup>
              
              <FitBoundsOnUsers users={users} />

          </MapContainer>
          <button 
              className="bg-white border-stone-300 border-2 py-2 px-3 mb-2 top-3 right-3 z-20 rounded-sm shadow-sm absolute"
              aria-label="Toggle Filter"
              aria-expanded={filterVisible}
              aria-controls="filter"
              onClick={() => setFilterVisible(prev => !prev)}
          >
              FILTER
          </button>
        </div>
        <div id="filter" className={`flex flex-col py-4 justify-start h-full bg-neutral-300 transition-all overflow-hidden ${filterVisible ? 'w-[500px] px-4 opacity-100' : 'w-0 px-0 opacity-0' }`}>
          <FilterManager options={filterOptions} applyFilter={fetchUsers} closeFilter={()=>setFilterVisible(false)} />
        </div>
      </>
    );
};

export default MapHome;
