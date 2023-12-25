import { ModalType } from "../../types/ModalType";
import BuildingType from "../../../../../types/getBuildingsType"
import AvailabilityType, { ClassroomType } from "../../../../../types/getAvailabilityType"

export interface BuildingModalProps {
    buildingData: BuildingType[],
    availabilityData: AvailabilityType[],
    activeMarker: string | null,
    setModalType: React.Dispatch<React.SetStateAction<ModalType>>,
    setActiveClassroom: React.Dispatch<React.SetStateAction<string | null>>
}

const BuildingModal = ({ buildingData, availabilityData, activeMarker, setModalType, setActiveClassroom }: BuildingModalProps) => {
    return ( 
        <>
            <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "80px", background: "#BA0C2F", borderBottomLeftRadius: "12px 12px", borderBottomRightRadius: "12px 12px"}}>
                <h1 style={{textAlign: "center"}}>{ buildingData.find((building: any) => building.buildingNum === activeMarker)!.buildingName }</h1>
            </div>
            {
                availabilityData.find((data: AvailabilityType) => data.buildingNum === activeMarker)!.classrooms.map((classroom: ClassroomType) => {
                    return (
                        <div style={{height: "80px", margin: "20px 50px", background: classroom.available ? "#BA0C2F" : "#A7B1B7", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"}}
                            onClick={() => {
                                setModalType(ModalType.CLASSROOM)
                                setActiveClassroom(classroom.facilityId)
                            }}
                        >
                            <h2 style={{cursor: "pointer"}}>{classroom.facilityId}</h2>
                        </div>
                    )
                })
            }
        </>
     );
}
 
export default BuildingModal;