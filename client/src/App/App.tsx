import { useEffect, useState } from 'react';
import Map from 'react-map-gl/maplibre';
import AnimatedMarker from './components/marker/AnimatedMarker';
import axios from 'axios';
import Modal from './components/modal/Modal';
import { ModalType } from './types/ModalType';
import getBuildingsType from "../../../types/getBuildingsType"
import getAvailabilityType from "../../../types/getAvailabilityType"
import Theme from './css/Theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { device } from './css/devices';

const CURRENT_TIME = new Date()

function getCurrentDay() {
	return ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][CURRENT_TIME.getDay()]
}

function getCurrentTime(): string {
	return (CURRENT_TIME.getHours() < 10 ? "0" + CURRENT_TIME.getHours.toString() : CURRENT_TIME.getHours().toString()) + (CURRENT_TIME.getMinutes() < 10 ? "0" + CURRENT_TIME.getMinutes().toString() : CURRENT_TIME.getMinutes().toString())
}

function App() {

	const isDesktop: boolean = useMediaQuery(device.landscapeTablet);

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
		axios.get(import.meta.env.VITE_BACKEND_IP + '/getBuildings')
			.then(function (response) {
				setBuildingData(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
		axios.get(import.meta.env.VITE_BACKEND_IP + '/getBuildings?order=lat')
			.then(function (response) {
				setBuildingDataByLat(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
		axios.get(import.meta.env.VITE_BACKEND_IP + '/getAvailability?day=' + getCurrentDay() + '&time=' + getCurrentTime() + '&order=available')
			.then(function (response) {
				setAvailabilityData(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
	}, [])

	return ( buildingData && availabilityData ?
		<Theme>
			{ mapLoaded ? <Modal type={modalType} activeMarker={activeMarker} setActiveMarker={setActiveMarker} buildingData={buildingData} availabilityData={availabilityData} setModalType={setModalType} isDesktop={isDesktop}/> : <></> }
			<Map
				initialViewState={{
					longitude: Number(buildingData.find((building: any) => building.buildingNum === "339")!.lng),
					latitude: Number(buildingData.find((building: any) => building.buildingNum === "339")!.lat),
					zoom: 14
				}}
				style={{width: "100%", height: "100%", position: "relative", zIndex: "1"}}
				mapStyle={import.meta.env.VITE_TILESERVER_IP}
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
							<AnimatedMarker buildingData={buildingData} available={availabilityData.find((building: any) => building.buildingNum === buildingData.buildingNum)!.available} markerClickCounter={markerClickCounter} setMarkerClickCounter={setMarkerClickCounter} activeMarker={activeMarker} setActiveMarker={setActiveMarker} setHoveringOverMarker={setHoveringOverMarker} setModalType={setModalType} isDesktop={isDesktop}/>
						)
					})
					: <></>
				}
			</Map>
		</Theme>
	: <></>)
}

export default App
