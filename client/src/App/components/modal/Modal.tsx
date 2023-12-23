import { useState } from "react";
import { ModalTypes } from "../../types/ModalTypes";
import ClassroomModal from "./ClassroomModal";
import DefaultModal from "./DefaultModal";
import BuildingModal from "./BuildingModal";
import ArrowIcon from "./ArrowIcon";

export interface ModalProps {
    type: ModalTypes,
    activeMarker: number,
    setActiveMarker: React.Dispatch<React.SetStateAction<number>>,
    buildingData: any,
    availabilityData: any,
    setModalType: React.Dispatch<React.SetStateAction<ModalTypes>>
}

const Modal = ({ type, activeMarker, setActiveMarker, buildingData, availabilityData, setModalType }: ModalProps) => {

    const [activeClassroom, setActiveClassroom] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(true)

    return ( isOpen ?
        <div style={{position: "absolute", zIndex: "2", right: 0, width: "40%", height: "100%", display: "flex", alignItems: "center"}}>
            <div style={{width: "5%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{height: "80px", width: "100%", background: "#BA0C2F", display: "flex", alignItems: "center", justifyContent: "center", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px"}}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <ArrowIcon isOpen={isOpen}/>
                </div>
            </div>
            <div style={{width: "95%", height: "100%", overflow: "scroll", background: "#EEE5E9"}}>
            {
                type === ModalTypes.ALL 
                ?
                <DefaultModal buildingData={buildingData} availabilityData={availabilityData} setActiveMarker={setActiveMarker} setModalType={setModalType}/>
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
        </div>
        :
        <div style={{position: "absolute", zIndex: "2", right: 0, width: "40%", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
            <div style={{width: "5%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{height: "80px", width: "100%", background: "#BA0C2F", display: "flex", alignItems: "center", justifyContent: "center", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px"}}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <ArrowIcon isOpen={isOpen}/>
                </div>
            </div>
        </div>
    )
}
 
export default Modal;