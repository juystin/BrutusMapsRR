export interface DefaultModalProps {
    buildingData: any,
    availabilityData: any
}

const DefaultModal = ({buildingData, availabilityData}: DefaultModalProps) => {
    return ( 
        <>
            <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "80px", background: "#BA0C2F", marginBottom: "20px", borderBottomLeftRadius: "12px 12px", borderBottomRightRadius: "12px 12px"}}>
                <h1>BrutusMaps</h1>
            </div>
                {
                    buildingData.map((building: any) => {
                        return (
                            <div style={{height: "80px", margin: "20px 50px", background: availabilityData.find((availBuilding: any) => availBuilding.buildingNum === building.buildingNum).available ? "#BA0C2F" : "#A7B1B7", borderRadius: "3px", cursor: "pointer"}}
                                onClick={() => {
                                    // sumn
                                }}
                            >
                                <h1 style={{color: "black", cursor: "pointer"}}>{building.buildingName}</h1>
                            </div>
                        )
                    })
                }
            
        </>
     );
}
 
export default DefaultModal;