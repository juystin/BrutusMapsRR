import { ModalTypes } from "../types/ModalTypes";

export interface ModalProps {
    type: ModalTypes,
    activeMarker: number,
    buildingData: any,
    availabilityData: any,
    setModalType: React.Dispatch<React.SetStateAction<ModalTypes>>
}

const Modal = ({ type, activeMarker, buildingData, availabilityData, setModalType }: ModalProps) => {

    if (type === ModalTypes.ALL) {
        return ( 
            <div style={{position: "absolute", zIndex: "2", right: 0, width: "30%", height: "100%", background: "white"}}>
                <h1 style={{color: "black"}}>ALL</h1>
            </div>
        );
    } else if (type === ModalTypes.BUILDING) {
        return (
            <div style={{position: "absolute", zIndex: "2", right: 0, width: "30%", height: "100%", background: "white", overflow: "scroll"}}>
                <h1 style={{color: "black"}}>BUILDINGS</h1>
                {
                    availabilityData.find((data: any) => data.buildingNum === activeMarker).classrooms.map((classroom: any) => {
                        return (
                            <div style={{height: "80px", margin: "20px 50px", background: classroom.available ? "red" : "gray", borderRadius: "3px"}}
                                onClick={() => setModalType(ModalTypes.CLASSROOM)}
                            >
                                <h1 style={{color: "black"}}>{classroom.facilityId}</h1>
                            </div>
                        )
                    })
                }
            </div>
        )
    } else if (type === ModalTypes.CLASSROOM) {
        return ( 
            <div style={{position: "absolute", zIndex: "2", right: 0, width: "30%", height: "100%", background: "white"}}>
                <h1 style={{color: "black"}}>CLASSROOM</h1>
            </div>
        );
    }
}
 
export default Modal;