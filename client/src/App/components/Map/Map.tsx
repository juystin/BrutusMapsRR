import { useRef, useEffect, useState, useContext, createContext } from 'react';
import maplibregl from 'maplibre-gl';
import './Map.css';

const MapContext = createContext({});

export default function Map({ children, mapRef }: any) {
	const mapContainer = useRef(null);
	const [lat] = useState(39.99567514);
	const [lng] = useState(-83.01924594);
	const [zoom] = useState(14);

	const [tilesLoaded, setTilesLoaded] = useState(false);

	useEffect(() => {
		mapRef.current = new maplibregl.Map({
		container: mapContainer.current!,
		style: `http://` + import.meta.env.VITE_WEBSERVER_IP + `/styles/brutustiles_style/style.json`,
		center: [lng, lat],
		zoom: zoom
		});
		mapRef.current.addControl(new maplibregl.NavigationControl(), 'top-left');
		mapRef.current.on('load', () => {
			// Map loaded, wait for style
			if (mapRef.current.loaded()) {
				setTilesLoaded(true);
			}
			});
	}, [lng, lat, zoom]);
	
	return (
		<MapContext.Provider value={mapRef}>
		<div className="map-container">
			<div ref={mapContainer} className="map">
				{tilesLoaded ? children : <></>}
			</div>
		</div>
		</MapContext.Provider>
	);
}

export const useMapContext = () => useContext(MapContext);