import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import { Marker, useMap } from "react-map-gl";
import MarkerIcon from "./MarkerIcon";
import { ModalType } from "../../types/ModalType";
import BuildingType from "../../../../../types/getBuildingsType"
import useWindowDimensions from "../../hooks/useWindowDimensions";

export interface AnimatedMarkerProps {
    buildingData: BuildingType
    available: boolean,
    markerClickCounter: number,
    setMarkerClickCounter: React.Dispatch<React.SetStateAction<number>>,
    activeMarker: string | null,
    setActiveMarker: React.Dispatch<React.SetStateAction<string | null>>,
    setHoveringOverMarker: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<ModalType>>
}

// Linear regression magic
const zoomToOffset: { [key: string]: (width: number) => number } = {
    //"13": 0.03,
    //"14": 0.01,
    "15": (width: number) => -0.0014 + 0.000004822 * width
    //"16": 0.0025
}

function getNearestNumber(number: number) {
    return Object.keys(zoomToOffset).sort((a, b) => Math.abs(number - Number(a)) - Math.abs(number - Number(b)))[0];
}

function getOffsetFromZoom(zoom: number, width: number) {
    console.log(zoomToOffset[getNearestNumber(zoom)](width))
    return zoomToOffset[getNearestNumber(zoom)](width)
}

const AnimatedMarker = ({buildingData, available, markerClickCounter, setMarkerClickCounter, activeMarker, setActiveMarker, setHoveringOverMarker, setModalType}: AnimatedMarkerProps) => {

    const [yIndex, setYIndex] = useState<number>(0);
    
    const [initiallyRendered, setInitiallyRendered] = useState<boolean>(false);

    const map = useMap().current

    const { height, width } = useWindowDimensions()

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
        console.log(height, width)
    }, [height, width])

    useEffect(() => {
        if (activeMarker === buildingData.buildingNum) {
            // Marker is active
            setMarkerClickCounter((count) => count + 1)
            map!.jumpTo({center: [Number(buildingData.lng) + getOffsetFromZoom(Number(getNearestNumber(map!.getZoom())), width!), Number(buildingData.lat)]})
            map!.setZoom(Number(getNearestNumber(map!.getZoom())))
        }
        api.start({
            to: {
                height: (activeMarker === buildingData.buildingNum) ? "min(15vh, 100px)" : "min(8vh, 45px)",
            },
            delay: initiallyRendered ? 0 : Math.floor(Math.random() * 300),
            onRest: () => {
                if (!initiallyRendered) {
                    setInitiallyRendered(true)
                }
            }
        })
    }, [activeMarker])

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
        <Marker longitude={Number(buildingData.lng)} latitude={Number(buildingData.lat)} anchor={'bottom'} style={{position: "absolute", zIndex: yIndex, pointerEvents: ("none" as React.CSSProperties["pointerEvents"])}}>
            <animated.div style={{...baseStyle, ...animation}}>
                <MarkerIcon available={available} activeMarker={activeMarker} setActiveMarker={setActiveMarker} buildingNum={buildingData.buildingNum} setHoveringOverMarker={setHoveringOverMarker} setModalType={setModalType}/>
            </animated.div>
        </Marker>
     );
}
 
export default AnimatedMarker;