import { useEffect, useState } from "react";
import { ModalType } from "../../types/ModalType";
import ClassroomModal from "./ClassroomModal";
import DefaultModal from "./DefaultModal";
import BuildingModal from "./BuildingModal";
import ArrowIcon from "./ArrowIcon";
import ClassModal from "./ClassModal";
import BuildingsType from "../../../../../types/getBuildingsType"
import AvailabilityType from "../../../../../types/getAvailabilityType"
import ActiveClassType from "../../types/ActiveClassType";
import { animated, useSpring } from "@react-spring/web";

export interface ModalProps {
    type: ModalType,
    activeMarker: string | null,
    setActiveMarker: React.Dispatch<React.SetStateAction<string | null>>,
    buildingData: BuildingsType[],
    availabilityData: AvailabilityType[],
    setModalType: React.Dispatch<React.SetStateAction<ModalType>>
}

const Modal = ({ type, activeMarker, setActiveMarker, buildingData, availabilityData, setModalType }: ModalProps) => {

    const [activeClassroom, setActiveClassroom] = useState<string | null>(null)
    const [activeClass, setActiveClass] = useState<ActiveClassType | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [initialRenderOccurred, setInitialRenderOccurred] = useState<boolean>(false)

    const containerStyle = {
        position: "absolute", 
        zIndex: "2", 
        right: 0,
        height: "100%", 
        display: "flex", 
        alignItems: "center", 
        filter: "drop-shadow(15px 0px 30px #13070C)", 
        pointerEvents: "none",
    } as const

    const [animation, api] = useSpring(() => ({
        from: {
            width: "0vw"
        }
    }))

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                api.start({
                    from: {
                        width: "0vw"
                    },
                    to: {
                        width: "40vw"
                    },
                    config: {
                        tension: 100,
                        friction: 30,
                        mass: 1
                    },
                })
            }, initialRenderOccurred ? 0 : 500)
            setInitialRenderOccurred(true)
        } else {
            api.start({
                to: {
                    width: "2vw"
                },
                immediate: true
            })
        }
    }, [isOpen])

    useEffect(() => {
        if (activeMarker !== null) {
            setIsOpen(true)
        }
    }, [activeMarker])

    return (
        <animated.div style={{
            ...containerStyle,
            ...animation
        }}>
            <div style={{minWidth: "2vw", maxWidth: "2vw", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{height: "80px", width: "100%", background: "#BA0C2F", display: "flex", alignItems: "center", justifyContent: "center", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px", cursor: "pointer", position: "relative", zIndex: 2, pointerEvents: "auto"}}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <ArrowIcon isOpen={isOpen}/>
                </div>
            </div>
            <div style={{minWidth: "38vw", maxWidth: "38vw", height: "100%", overflow: "scroll", background: "#EEE5E9", pointerEvents: "auto"}}>
            {
                type === ModalType.ALL 
                ?
                <DefaultModal buildingData={buildingData} availabilityData={availabilityData} setActiveMarker={setActiveMarker} setModalType={setModalType}/>
                :
                type === ModalType.BUILDING
                ?
                <BuildingModal buildingData={buildingData} availabilityData={availabilityData} activeMarker={activeMarker} setModalType={setModalType} setActiveClassroom={setActiveClassroom} />
                :
                type === ModalType.CLASSROOM
                ?
                <ClassroomModal activeClassroom={activeClassroom} setModalType={setModalType} setActiveClass={setActiveClass}/>
                :
                type === ModalType.CLASS
                ?
                <ClassModal activeClass={activeClass}/>
                :
                <h1 style={{color: "black"}}>ALL</h1>
            }
            </div>
        </animated.div>
    )
}
 
export default Modal;