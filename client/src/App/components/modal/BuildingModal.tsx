import { ModalTypes } from "../../types/ModalTypes";

export interface BuildingModalProps {
    availabilityData: any,
    activeMarker: any,
    setModalType: React.Dispatch<React.SetStateAction<ModalTypes>>,
    setActiveClassroom: React.Dispatch<React.SetStateAction<string | null>>
}

const BuildingModal = ({ availabilityData, activeMarker, setModalType, setActiveClassroom }: BuildingModalProps) => {
    return ( 
        <>
            <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "80px", background: "#BA0C2F", marginBottom: "20px", borderBottomLeftRadius: "12px 12px", borderBottomRightRadius: "12px 12px"}}>
                <h1>{ activeMarker }</h1>
            </div>
            {
                availabilityData.find((data: any) => data.buildingNum === activeMarker).classrooms.map((classroom: any) => {
                    return (
                        <div style={{height: "80px", margin: "20px 50px", background: classroom.available ? "#BA0C2F" : "#A7B1B7", borderRadius: "3px", cursor: "pointer"}}
                            onClick={() => {
                                setModalType(ModalTypes.CLASSROOM)
                                setActiveClassroom(classroom.facilityId)
                            }}
                        >
                            <h1 style={{color: "black", cursor: "pointer"}}>{classroom.facilityId}</h1>
                        </div>
                    )
                })
            }
        </>
     );
}
 
export default BuildingModal;