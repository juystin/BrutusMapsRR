import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import { Marker } from "react-map-gl";

export interface AnimatedMarkerProps {
    longitude: number,
    latitude: number,
}

const AnimatedMarker = ({longitude, latitude}: AnimatedMarkerProps) => {

    const [clicked, setClicked] = useState<boolean>(false);

    const [animation, api] = useSpring(() => ({
        from: {
            backgroundColor: "white",
            height: "5vh",
            width: "3vw"
        },
        config: {
            tension: 100,
            friction: 20,
            mass: 1
        }
    }))

    useEffect(() => {
        api.start({
            to: {
                backgroundColor: clicked ? "green" : "white",
                height: clicked ? "7vh" : "5vh",
                width: clicked ? "4vw" : "3vw"
            }
        })
    }, [clicked, api])

    return (
        <Marker longitude={longitude} latitude={latitude} anchor={'bottom'} style={{position: "absolute", zIndex: clicked ? "9999" : "0"}}>
            <animated.div style={{...animation}} onClick={() => setClicked(!clicked)}>
            </animated.div>
        </Marker>
     );
}
 
export default AnimatedMarker;