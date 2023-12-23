import { ModalTypes } from "../../types/ModalTypes";

export interface BuildingModalProps {
    buildingData: any,
    availabilityData: any,
    activeMarker: any,
    setModalType: React.Dispatch<React.SetStateAction<ModalTypes>>,
    setActiveClassroom: React.Dispatch<React.SetStateAction<string | null>>
}

const BuildingModal = ({ buildingData, availabilityData, activeMarker, setModalType, setActiveClassroom }: BuildingModalProps) => {
    return ( 
        <>
            <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "80px", background: "#BA0C2F", borderBottomLeftRadius: "12px 12px", borderBottomRightRadius: "12px 12px"}}>
                <h1 style={{textAlign: "center"}}>{ buildingData.find((building: any) => building.buildingNum === activeMarker).buildingName }</h1>
            </div>
            {
                availabilityData.find((data: any) => data.buildingNum === activeMarker).classrooms.map((classroom: any) => {
                    return (
                        <div style={{height: "80px", margin: "20px 50px", background: classroom.available ? "#BA0C2F" : "#A7B1B7", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"}}
                            onClick={() => {
                                setModalType(ModalTypes.CLASSROOM)
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