import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';  // こちらでIconをインポートします

const MapComponent = ({ location, placeName }) => {
  // カスタムアイコンの設定
  const customIcon = new Icon({
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <MapContainer center={location} zoom={13} style={{ width: '100%', height: '400px', marginTop: '20px', borderRadius: '8px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={location} icon={customIcon}>
        {placeName && <Popup>{placeName}</Popup>}
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
