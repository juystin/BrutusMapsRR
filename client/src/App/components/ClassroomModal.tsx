import axios from "axios"
import { useEffect, useState } from "react"
import ClassroomSchedule from "./ClassroomSchedule";

export interface ClassroomModalProps {
    activeClassroom: string | null
}

const days: string[] = ["monday", "tuesday", "wednesday", "thursday", "friday"]

const ClassroomModal = ({ activeClassroom }: ClassroomModalProps) => {

    const [classroomData, setClassroomData] = useState<any>(null)

    useEffect(() => {
        if (activeClassroom) {
            setClassroomData(null);
            axios.get('http://localhost:8000/api/getClassroomSchedule?facility=' + activeClassroom)
			.then(function (response) {
                console.log(response.data)
				setClassroomData(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
        }
    }, [activeClassroom])

    return (
        <div style={{position: "absolute", zIndex: "2", right: 0, width: "30%", height: "100%", background: "white", overflow: "scroll"}}>
            <h1 style={{color: "black", cursor: "pointer"}}>{activeClassroom}</h1>
            { classroomData ? <ClassroomSchedule classroomData={classroomData} /> : <></> }
        </div>
    );
}
 
export default ClassroomModal;