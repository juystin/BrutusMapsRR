/// <reference types="vite-plugin-svgr/client" />
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import { Marker, useMap } from "react-map-gl";
import MarkerLogo from "./MarkerLogo";

export interface AnimatedMarkerProps {
    buildingData: any
    available: boolean,
    markerClickCounter: number,
    setMarkerClickCounter: React.Dispatch<React.SetStateAction<number>>,
    activeMarker: number,
    setActiveMarker: React.Dispatch<React.SetStateAction<number>>
}

const AnimatedMarker = ({buildingData, available, markerClickCounter, setMarkerClickCounter, activeMarker, setActiveMarker}: AnimatedMarkerProps) => {

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
        if (activeMarker !== buildingData.buildingNum) {
            // Another marker is active, reset this one
            setClicked(false)
        } else {
            // Marker is active
            setMarkerClickCounter((count) => count + 1)
        }
        api.start({
            to: {
                height: clicked && (activeMarker === buildingData.buildingNum) ? "min(15vh, 100px)" : "min(8vh, 45px)",
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
        if (activeMarker === buildingData.buildingNum) {
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
        <Marker longitude={buildingData.lng} latitude={buildingData.lat} anchor={'bottom'} style={{position: "absolute", zIndex: yIndex, pointerEvents: ("none" as React.CSSProperties["pointerEvents"])}}>
            <animated.div style={{...baseStyle, ...animation}}>
                <MarkerLogo available={available} clicked={clicked} setClicked={setClicked} activeMarker={activeMarker} setActiveMarker={setActiveMarker} buildingNum={buildingData.buildingNum}/>
            </animated.div>
        </Marker>
     );
}
 
export default AnimatedMarker;