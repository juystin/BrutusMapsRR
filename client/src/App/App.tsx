import { useEffect, useState } from 'react';
import './App.css'
import Map from 'react-map-gl/maplibre';
import AnimatedMarker from './components/AnimatedMarker';
import axios from 'axios';

function App() {

	const [mapLoaded, setMapLoaded] = useState<boolean>(false);
	const [buildingData, setBuildingData] = useState<any>(null);

	useEffect(() => {
		axios.get('http://localhost:8000/api/getBuildings')
			.then(function (response) {
				console.log(response)
				setBuildingData(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
	}, [])

	return ( buildingData ?
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
			>
				{ mapLoaded ?
					buildingData.map((buildingData: any) => {
						return (
							<AnimatedMarker longitude={buildingData.lng} latitude={buildingData.lat} />
						)
					})
					: <></>
				}
			</Map>
		</>
	: <></>)
}

export default App
