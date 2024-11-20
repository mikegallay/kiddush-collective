'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const myIcon = L.icon({
    iconUrl: '/images/marker-main.png',
    iconSize: [25, 29],
    iconAnchor: [13, 29],
    popupAnchor: [0, -25],
    shadowUrl: '/images/marker-shadow.png',
    shadowSize: [25, 29],
    shadowAnchor: [13, 29]
});

const LocationMarker = ({ setPosition, pinPosition }: { setPosition: (latlng: L.LatLng) => void, pinPosition: L.LatLng | null }) => {
    // const [position, setMarkerPosition] = useState<L.LatLng | null>(null);
  
    // Listen for map click events
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        // setMarkerPosition(e.latlng); // Update position on click
        setPosition(e.latlng); // Send position back to the parent component
        localStorage.setItem('mapPosition', JSON.stringify({ lat, lng }));
      },
    });
  
    return pinPosition === null ? null : (
      <Marker position={pinPosition} icon={myIcon || undefined} />
    );
  };

  

  const Map = ({ setLocation }: { setLocation: (latLng: [number, number] | null) => void }) => {
    const [latLng, setLatLng] = useState<L.LatLng | null>(() => {
        const savedPosition = localStorage.getItem('mapPosition');
        return savedPosition ? JSON.parse(savedPosition) : null;
      });;
    
    const handlePositionChange = (position: L.LatLng) => {
        setLatLng(position); // Store lat/lng of the clicked location
        setLocation([position.lat, position.lng]);
    };

    return (

        <MapContainer
        id="map"
        center={latLng ? [latLng.lat,latLng.lng] : [25.482, -31.64]} 
        zoom={latLng ? 9 : 2}
        style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & <a href="https://carto.com/">CartoDB</a>'
                />
                {/* <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            /> */}

            <LocationMarker pinPosition={latLng} setPosition={handlePositionChange} />

        </MapContainer>
    );
};

export default Map;
