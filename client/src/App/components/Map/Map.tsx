import { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import './Map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lat] = useState(39.99567514);
  const [lng] = useState(-83.01924594);
  const [zoom] = useState(14);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: `http://` + import.meta.env.VITE_WEBSERVER_IP + `/styles/osm_liberty/style.json`,
      center: [lng, lat],
      zoom: zoom
    });
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
  }, [lng, lat, zoom]);

  return (
    <div className="map-container">
      <div ref={mapContainer} className="map" />
    </div>
  );
}