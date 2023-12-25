import axios from "axios"
import { useEffect, useState } from "react"
import ClassroomSchedule from "./ClassroomSchedule";
import { ModalType } from "../../types/ModalType";
import ActiveClassType from "../../types/ActiveClassType";
import ClassroomScheduleType from "../../../../../types/getClassroomScheduleType"

export interface ClassroomModalProps {
    activeClassroom: string | null,
    setModalType: React.Dispatch<React.SetStateAction<ModalType>>,
    setActiveClass: React.Dispatch<React.SetStateAction<ActiveClassType | null>>
}

const ClassroomModal = ({ activeClassroom, setModalType, setActiveClass }: ClassroomModalProps) => {

    const [classroomData, setClassroomData] = useState<ClassroomScheduleType[] | null>(null)

    useEffect(() => {
        if (activeClassroom) {
            setClassroomData(null);
            axios.get('http://localhost:8000/api/getClassroomSchedule?facility=' + activeClassroom)
			.then(function (response) {
				setClassroomData(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
        }
    }, [activeClassroom])

    return (
        <div style={{height: "100%", width: "100%"}} >
            <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center", height: "80px", background: "#BA0C2F", marginBottom: "20px", borderBottomLeftRadius: "12px 12px", borderBottomRightRadius: "12px 12px"}}>
                 <h1>{activeClassroom}</h1>
             </div>
             <div style={{width: "100%", height: "auto"}}>
                { classroomData ? <ClassroomSchedule classroomData={classroomData} setModalType={setModalType} setActiveClass={setActiveClass}/> : <></> }
             </div>
        </div>
    );
}
 
export default ClassroomModal;