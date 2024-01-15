import { useEffect, useState } from 'react';
import './App.css'
import Map from 'react-map-gl/maplibre';
import AnimatedMarker from './components/marker/AnimatedMarker';
import axios from 'axios';
import Modal from './components/modal/Modal';
import { ModalType } from './types/ModalType';
import getBuildingsType from "../../../types/getBuildingsType"
import getAvailabilityType from "../../../types/getAvailabilityType"

function getCurrentDay() {
	return ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][new Date().getDay()]
}

function App() {

	const [mapLoaded, setMapLoaded] = useState<boolean>(false);
	const [buildingData, setBuildingData] = useState<getBuildingsType[] | null>(null);
	const [buildingDataByLat, setBuildingDataByLat] = useState<getBuildingsType[] | null>(null);
	const [availabilityData, setAvailabilityData] = useState<getAvailabilityType[] | null>(null);

	// Tracks click counts for Marker z-indexes. Allows for most recently clicked marker to be on top.
	const [markerClickCounter, setMarkerClickCounter] = useState<number>(0);

	// Tracks currently clicked marker, by building number.
	const [activeMarker, setActiveMarker] = useState<string | null>(null);

	const [hoveringOverMarker, setHoveringOverMarker] = useState<boolean>(false);

	const [modalType, setModalType] = useState<ModalType>(ModalType.ALL)

	useEffect(() => {
		// Default marker order is by first-in placement. Knowing this, place markers bottom to top to prevent weird overlaps (i.e., place by latitude)
		axios.get('http://' + import.meta.env.VITE_BACKEND_IP + '/api/getBuildings')
			.then(function (response) {
				setBuildingData(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
		axios.get('http://' + import.meta.env.VITE_BACKEND_IP + '/api/getBuildings?order=lat')
			.then(function (response) {
				setBuildingDataByLat(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
		axios.get('http://' + import.meta.env.VITE_BACKEND_IP + '/api/getAvailability?day=' + getCurrentDay() + '&time=1200&order=available')
			.then(function (response) {
				setAvailabilityData(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
	}, [])

	return ( buildingData && availabilityData ?
		<>
			{ mapLoaded ? <Modal type={modalType} activeMarker={activeMarker} setActiveMarker={setActiveMarker} buildingData={buildingData} availabilityData={availabilityData} setModalType={setModalType}/> : <></> }
			<Map
				initialViewState={{
					longitude: Number(buildingData.find((building: any) => building.buildingNum === "339")!.lng),
					latitude: Number(buildingData.find((building: any) => building.buildingNum === "339")!.lat),
					zoom: 14
				}}
				style={{width: "100%", height: "100%", position: "relative", zIndex: "1"}}
				mapStyle={`http://` + import.meta.env.VITE_WEBSERVER_IP + `/styles/brutustiles_style/style.json`}
				onLoad={() => setMapLoaded(true)}
				doubleClickZoom={false}
				cursor='default'
				onClick={() => {
					if (!hoveringOverMarker) {
						setActiveMarker(null)
						setModalType(ModalType.ALL)
					}
				}}
			>
				{ mapLoaded ?
					buildingDataByLat!.map((buildingData: any) => {
						return ( 
							<AnimatedMarker buildingData={buildingData} available={availabilityData.find((building: any) => building.buildingNum === buildingData.buildingNum)!.available} markerClickCounter={markerClickCounter} setMarkerClickCounter={setMarkerClickCounter} activeMarker={activeMarker} setActiveMarker={setActiveMarker} setHoveringOverMarker={setHoveringOverMarker} setModalType={setModalType}/>
						)
					})
					: <></>
				}
			</Map>
		</>
	: <></>)
}

export default App
