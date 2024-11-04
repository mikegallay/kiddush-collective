'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const myIcon = L.icon({
    iconUrl: '/images/marker-icon-2x.png',
    iconSize: [26, 41],
    iconAnchor: [13, 41],
    popupAnchor: [0, -50],
    shadowUrl: '/images/marker-shadow.png',
    shadowSize: [40, 41],
    shadowAnchor: [13, 41]
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
    const [latLng, setLatLng] = useState<L.LatLng | null>(null);
    
    const handlePositionChange = (position: L.LatLng) => {
        setLatLng(position); // Store lat/lng of the clicked location
        setLocation([position.lat, position.lng]);
        console.log('Clicked location:', position.lat, position.lng); // You can do whatever you want with the coordinates
    };

    useEffect(() => {
        // Retrieve position from local storage if it exists
        const savedPosition = localStorage.getItem('mapPosition');
        if (savedPosition) {
            const { lat, lng } = JSON.parse(savedPosition);
            const latLng = L.latLng(lat, lng);
            setLatLng(latLng); // Set state with the saved position
        }
    }, []);

    const initialPosition = latLng ? [latLng.lat, latLng.lng] : [51.505, -0.09];

    return (
        <>
        {/* Show the clicked location coordinates (optional) */}
        {latLng && (
        <div className="text-red-500 z-20 relative">
            <p>Latitude: {latLng.lat}</p>
            <p>Longitude: {latLng.lng}</p>
        </div>
        )}
        <MapContainer
        id="map"
        center={[initialPosition[0],initialPosition[1]]} 
        zoom={latLng ? 9 : 5}
        style={{ height: '400px', width: '100%' }}
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

        
        {/* <Marker position={[51.505, -0.09]} icon={myIcon}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker> */}
        </MapContainer>
        </>
    );
};

export default Map;
