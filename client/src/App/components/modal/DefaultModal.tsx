import { ModalType } from "../../types/ModalType";
import BuildingType from "../../../../../types/getBuildingsType"
import AvailabilityType from "../../../../../types/getAvailabilityType"

export interface DefaultModalProps {
    buildingData: BuildingType[],
    availabilityData: AvailabilityType[],
    setActiveMarker: React.Dispatch<React.SetStateAction<string | null>>
    setModalType: React.Dispatch<React.SetStateAction<ModalType>>
}

const DefaultModal = ({buildingData, availabilityData, setActiveMarker, setModalType}: DefaultModalProps) => {
    return ( 
        <>
            <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "80px", background: "#BA0C2F", marginBottom: "20px", borderBottomLeftRadius: "12px 12px", borderBottomRightRadius: "12px 12px"}}>
                <h1>BrutusMaps</h1>
            </div>
                {
                    buildingData.map((building: BuildingType) => {
                        return (
                            <div style={{minHeight: "80px", margin: "20px 50px", padding: "10px 10px", background: availabilityData.find((availBuilding: any) => availBuilding.buildingNum === building.buildingNum)!.available ? "#BA0C2F" : "#A7B1B7", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"}}
                                onClick={() => {
                                    setActiveMarker(building.buildingNum)
                                    setModalType(ModalType.BUILDING)
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