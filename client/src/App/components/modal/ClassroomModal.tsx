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
        <>
            <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center", height: "80px", background: "#BA0C2F", marginBottom: "20px", borderBottomLeftRadius: "12px 12px", borderBottomRightRadius: "12px 12px"}}>
                <h1>{activeClassroom}</h1>
            </div>
            { classroomData ? <ClassroomSchedule classroomData={classroomData} /> : <></> }
        </>
    );
}
 
export default ClassroomModal;