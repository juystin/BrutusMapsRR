import { ModalTypes } from "../../types/ModalTypes";

export interface DefaultModalProps {
    buildingData: any,
    availabilityData: any,
    setActiveMarker: React.Dispatch<React.SetStateAction<number>>
    setModalType: React.Dispatch<React.SetStateAction<ModalTypes>>
}

const DefaultModal = ({buildingData, availabilityData, setActiveMarker, setModalType}: DefaultModalProps) => {
    return ( 
        <>
            <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "80px", background: "#BA0C2F", marginBottom: "20px", borderBottomLeftRadius: "12px 12px", borderBottomRightRadius: "12px 12px"}}>
                <h1>BrutusMaps</h1>
            </div>
                {
                    buildingData.map((building: any) => {
                        return (
                            <div style={{minHeight: "80px", margin: "20px 50px", padding: "10px 10px", background: availabilityData.find((availBuilding: any) => availBuilding.buildingNum === building.buildingNum).available ? "#BA0C2F" : "#A7B1B7", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"}}
                                onClick={() => {
                                    setActiveMarker(building.buildingNum)
                                    setModalType(ModalTypes.BUILDING)
                                }}
                            >
                                <h2 style={{cursor: "pointer", textAlign: "center"}}>{building.buildingName}</h2>
                            </div>
                        )
                    })
                }
            
        </>
     );
}
 
export default DefaultModal;