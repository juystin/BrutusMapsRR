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

    useEffect(() => {
        if (activeMarker !== null) {
            setIsOpen(true)
        }
    }, [activeMarker])

    return ( isOpen ?
        <div style={{position: "absolute", zIndex: "2", right: 0, width: "40%", height: "100%", display: "flex", alignItems: "center", filter: "drop-shadow(15px 0px 30px #13070C)", pointerEvents: "none"}}>
            <div style={{width: "5%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{height: "80px", width: "100%", background: "#BA0C2F", display: "flex", alignItems: "center", justifyContent: "center", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px", cursor: "pointer", position: "relative", zIndex: 2, pointerEvents: "auto"}}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <ArrowIcon isOpen={isOpen}/>
                </div>
            </div>
            <div style={{width: "95%", height: "100%", overflow: "scroll", background: "#EEE5E9", pointerEvents: "auto"}}>
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
        </div>
        :
        <div style={{position: "absolute", zIndex: "2", right: 0, width: "40%", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end", filter: "drop-shadow(0px 0px 30px #13070C)", pointerEvents: "none"}}>
            <div style={{width: "5%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{height: "80px", width: "100%", background: "#BA0C2F", display: "flex", alignItems: "center", justifyContent: "center", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px", cursor: "pointer", pointerEvents: "auto"}}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <ArrowIcon isOpen={isOpen}/>
                </div>
            </div>
        </div>
    )
}
 
export default Modal;