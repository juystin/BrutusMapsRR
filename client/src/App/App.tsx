import { useEffect, useState } from 'react';
import './App.css'
import Map from 'react-map-gl/maplibre';
import AnimatedMarker from './components/AnimatedMarker';
import axios from 'axios';

function App() {

	const [mapLoaded, setMapLoaded] = useState<boolean>(false);
	const [buildingData, setBuildingData] = useState<any>(null);
	const [availabilityData, setAvailabilityData] = useState<any>(null);

	// Tracks click counts for Marker z-indexes. Allows for most recently clicked marker to be on top.
	const [markerClickCounter, setMarkerClickCounter] = useState<number>(0);

	// Tracks currently clicked marker, by building number.
	const [activeMarker, setActiveMarker] = useState<number>(0);

	useEffect(() => {
		// Default marker order is by first-in placement. Knowing this, place markers bottom to top to prevent weird overlaps (i.e., place by latitude)
		axios.get('http://localhost:8000/api/getBuildings?order=lat')
			.then(function (response) {
				console.log(response)
				setBuildingData(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
		axios.get('http://localhost:8000/api/getAvailability')
			.then(function (response) {
				console.log(response)
				setAvailabilityData(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
	}, [])

	return ( buildingData && availabilityData ?
		<>
			<Map
				initialViewState={{
					longitude: -83.01599036,
					latitude: 40.00222129,
					zoom: 14
				}}
				style={{width: "100%", height: "100%"}}
				mapStyle={`http://` + import.meta.env.VITE_WEBSERVER_IP + `/styles/brutustiles_style/style.json`}
				onLoad={() => setMapLoaded(true)}
				doubleClickZoom={false}
			>
				{ mapLoaded ?
					buildingData.map((buildingData: any) => {
						return (
							<AnimatedMarker buildingData={buildingData} available={availabilityData.find((building: any) => building.buildingNum === buildingData.buildingNum).available} markerClickCounter={markerClickCounter} setMarkerClickCounter={setMarkerClickCounter} activeMarker={activeMarker} setActiveMarker={setActiveMarker}/>
						)
					})
					: <></>
				}
			</Map>
		</>
	: <></>)
}

export default App
