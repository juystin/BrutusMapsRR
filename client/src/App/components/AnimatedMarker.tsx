/// <reference types="vite-plugin-svgr/client" />
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import { Marker } from "react-map-gl";
import Icon from "./map_marker.svg?react";
import { count } from "console";
import MarkerLogo from "./MarkerLogo";

export interface AnimatedMarkerProps {
    data: any
    markerClickCounter: number,
    setMarkerClickCounter: React.Dispatch<React.SetStateAction<number>>,
    activeMarker: number,
    setActiveMarker: React.Dispatch<React.SetStateAction<number>>
}

const AnimatedMarker = ({data, markerClickCounter, setMarkerClickCounter, activeMarker, setActiveMarker}: AnimatedMarkerProps) => {

    const [clicked, setClicked] = useState<boolean>(false);
    const [yIndex, setYIndex] = useState<number>(0);
    
    const [initiallyRendered, setInitiallyRendered] = useState<boolean>(false);

    const baseStyle = {
        pointerEvents: ("none" as React.CSSProperties["pointerEvents"]),
        aspectRatio: "2 / 3"
    }

    const [animation, api] = useSpring(() => ({
        from: {
            height: "min(1vh, 1px)"
        },
        config: {
            tension: 100,
            friction: 20,
            mass: 1
        },
    }))

    useEffect(() => {
        if (activeMarker !== data.buildingNum) {
            // Another marker is active, reset this one
            setClicked(false)
        } else {
            // Marker is active
            setMarkerClickCounter((count) => count + 1)
        }
        api.start({
            to: {
                height: clicked && (activeMarker === data.buildingNum) ? "min(15vh, 100px)" : "min(8vh, 45px)",
            },
            delay: initiallyRendered ? 0 : Math.floor(Math.random() * 300),
            onRest: () => {
                if (!initiallyRendered) {
                    console.log("done")
                    setInitiallyRendered(true)
                }
            }
        })
    }, [clicked, api, activeMarker])

    useEffect(() => {
        if (activeMarker === data.buildingNum) {
            setYIndex(markerClickCounter)
        }
    }, [markerClickCounter])
    
    // Reset if click counter above max int
    useEffect(() => {
        if (markerClickCounter === Number.MAX_SAFE_INTEGER) {
            setYIndex(0);
        }
    }, [markerClickCounter])

    return (
        <Marker longitude={data.lng} latitude={data.lat} anchor={'bottom'} style={{position: "absolute", zIndex: yIndex, pointerEvents: ("none" as React.CSSProperties["pointerEvents"])}}>
            <animated.div style={{...baseStyle, ...animation}}>
                <MarkerLogo setClicked={setClicked} setActiveMarker={setActiveMarker} buildingNum={data.buildingNum}/>
            </animated.div>
        </Marker>
     );
}
 
export default AnimatedMarker;