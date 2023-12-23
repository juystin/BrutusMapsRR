import { useEffect, useState } from 'react';
import './App.css'
import Map from 'react-map-gl/maplibre';
import AnimatedMarker from './components/marker/AnimatedMarker';
import axios from 'axios';
import Modal from './components/modal/Modal';
import { ModalTypes } from './types/ModalTypes';

function App() {

	const [mapLoaded, setMapLoaded] = useState<boolean>(false);
	const [buildingData, setBuildingData] = useState<any>(null);
	const [availabilityData, setAvailabilityData] = useState<any>(null);

	// Tracks click counts for Marker z-indexes. Allows for most recently clicked marker to be on top.
	const [markerClickCounter, setMarkerClickCounter] = useState<number>(0);

	// Tracks currently clicked marker, by building number.
	const [activeMarker, setActiveMarker] = useState<number>(0);

	const [hoveringOverMarker, setHoveringOverMarker] = useState<boolean>(false);

	const [modalType, setModalType] = useState<ModalTypes>(ModalTypes.ALL)

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
		axios.get('http://localhost:8000/api/getAvailability?day=wednesday&time=1200&order=available')
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
			<Modal type={modalType} activeMarker={activeMarker} setActiveMarker={setActiveMarker} buildingData={buildingData} availabilityData={availabilityData} setModalType={setModalType}/>
			<Map
				initialViewState={{
					longitude: buildingData.find((building: any) => building.buildingNum === "279").lng,
					latitude: buildingData.find((building: any) => building.buildingNum === "279").lat,
					zoom: 14
				}}
				style={{width: "100%", height: "100%", position: "relative", zIndex: "1"}}
				mapStyle={`http://` + import.meta.env.VITE_WEBSERVER_IP + `/styles/brutustiles_style/style.json`}
				onLoad={() => setMapLoaded(true)}
				doubleClickZoom={false}
				cursor='default'
				onClick={() => {
					if (!hoveringOverMarker) {
						setActiveMarker(0)
						setModalType(ModalTypes.ALL)
					}
				}}
			>
				{ //mapLoaded ?
					true ?
					buildingData.map((buildingData: any) => {
						return (
							<AnimatedMarker buildingData={buildingData} available={availabilityData.find((building: any) => building.buildingNum === buildingData.buildingNum).available} markerClickCounter={markerClickCounter} setMarkerClickCounter={setMarkerClickCounter} activeMarker={activeMarker} setActiveMarker={setActiveMarker} setHoveringOverMarker={setHoveringOverMarker} setModalType={setModalType}/>
						)
					})
					: <></>
				}
			</Map>
		</>
	: <></>)
}

export default App
