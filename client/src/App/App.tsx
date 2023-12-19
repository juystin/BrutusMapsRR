import { useRef } from 'react';
import './App.css'
import Map from './components/Map/Map'
import Marker from './components/Map/components/Marker/Marker';

function App() {

	const mapRef: any = useRef(null);

	return (
		<>
			<Map mapRef={mapRef}>
				<Marker />
			</Map>
		</>
	)
}

export default App
