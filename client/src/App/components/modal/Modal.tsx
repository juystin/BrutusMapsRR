import { useState } from "react";
import { ModalTypes } from "../../types/ModalTypes";
import ClassroomModal from "./ClassroomModal";
import DefaultModal from "./DefaultModal";
import BuildingModal from "./BuildingModal";

export interface ModalProps {
    type: ModalTypes,
    activeMarker: number,
    buildingData: any,
    availabilityData: any,
    setModalType: React.Dispatch<React.SetStateAction<ModalTypes>>
}

const Modal = ({ type, activeMarker, buildingData, availabilityData, setModalType }: ModalProps) => {

    const [activeClassroom, setActiveClassroom] = useState<string | null>(null)

    return (
        <div style={{position: "absolute", zIndex: "2", right: 0, width: "40%", height: "100%", background: "#EEE5E9", overflow: "scroll"}}>
            {
                type === ModalTypes.ALL 
                ?
                <DefaultModal buildingData={buildingData} availabilityData={availabilityData} />
                :
                type === ModalTypes.BUILDING
                ?
                <BuildingModal buildingData={buildingData} availabilityData={availabilityData} activeMarker={activeMarker} setModalType={setModalType} setActiveClassroom={setActiveClassroom} />
                :
                type === ModalTypes.CLASSROOM
                ?
                <ClassroomModal activeClassroom={activeClassroom} />
                :
                <h1 style={{color: "black"}}>ALL</h1>
            }
        </div>
    )
}
 
export default Modal;