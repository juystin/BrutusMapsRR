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
    setModalType: React.Dispatch<React.SetStateAction<ModalType>>,
    isDesktop: boolean
}

// Linear regression magic
const zoomToHorizontalOffset: { [key: string]: (width: number) => number } = {
    "13": (width: number) => -0.002533 + 0.00001814 * width,
    "14": (width: number) => -0.0002481 + 0.000008879 * width,
    "15": (width: number) => -0.0014 + 0.000004822 * width,
    "16": (width: number) => -0.0007177 + 0.000002436 * width,
}

const zoomToVerticalOffset: { [key: string]: (height: number) => number } = {
    "13": (height: number) => 0.0006667 - 0.00001333 * height,
    "14": (height: number) => 0.00116 - 0.000008101 * height,
    "15": (height: number) => 0.004535 - 0.00001061 * height,
    "16": (height: number) => 0.0001667 - 0.000002 * height
}

function getNearestNumber(number: number) {
    return [13, 14, 15, 16].sort((a, b) => Math.abs(number - a) - Math.abs(number - b))[0];
}

function getHorizontalOffsetFromZoom(zoom: number, width: number) {
    return zoomToHorizontalOffset[getNearestNumber(zoom)](width)
}

function getVerticalOffsetFromZoom(zoom: number, height: number) {
    return zoomToVerticalOffset[getNearestNumber(zoom)](height)
}

const AnimatedMarker = ({buildingData, available, markerClickCounter, setMarkerClickCounter, activeMarker, setActiveMarker, setHoveringOverMarker, setModalType, isDesktop}: AnimatedMarkerProps) => {

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
        if (activeMarker === buildingData.buildingNum) {
            // Marker is active
            setMarkerClickCounter((count) => count + 1)
            if (isDesktop) {
                map!.jumpTo({center: [Number(buildingData.lng) + getHorizontalOffsetFromZoom(Number(getNearestNumber(map!.getZoom())), width!), Number(buildingData.lat)]})
            } else {
                map!.jumpTo({center: [Number(buildingData.lng), Number(buildingData.lat) + getVerticalOffsetFromZoom(Number(getNearestNumber(map!.getZoom())), height!)]})
            }
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