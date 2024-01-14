import axios from "axios";
import { useEffect, useState } from "react";
import SectionInfoType, { InstructorType, DaysAndLocationType } from "../../../../../types/getSectionInfoType"
import ActiveClassType from "../../types/ActiveClassType";
import LoadingIcon from "../loading/LoadingIcon";

export interface ClassModalProps {
    activeClass: ActiveClassType
}

const ClassModal = ({ activeClass }: any) => {
    
    const [classData, setClassData] = useState<SectionInfoType | null>(null)
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (activeClass) {
            setLoading(true)
            setClassData(null);
            axios.get('http://localhost:8000/api/getSectionInfo?class_num=' + activeClass.classNo + '&section_num=' + activeClass.sectionNo)
			.then(function (response) {
                console.log(response.data)
				setClassData(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
        }
    }, [activeClass])
    
    return ( classData && !loading ?
        <div style={{height: "100%", width: "100%"}} >
            <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center", height: "80px", background: "#BA0C2F", marginBottom: "20px", borderBottomLeftRadius: "12px 12px", borderBottomRightRadius: "12px 12px"}}>
                 <h1>{classData.subject + " " + classData.code}</h1>
             </div>
             <div style={{maxWidth: "100%", height: "auto", padding: "0px 20px"}}>
                <h1 style={{color: "#13070C"}}>{classData.title}</h1>
                <p style={{color: "#13070C"}}>{classData.description}</p>
                <div style={{display: "grid", gridTemplateRows: "min-content min-content", gap: "20px", margin: "0px 10px"}}>
                    <div style={{width: "100%", display: "grid", gridTemplateRows: "40px min-content", margin: "0px 0px"}}>
                        <div style={{gridRow: "1 / 2", width: "100%", height: "100%", borderTopLeftRadius: "12px", borderTopRightRadius: "12px", background: "#BA0C2F", display: "flex", alignItems: "flex-end"}}>
                            <h2 style={{marginLeft: "12px", marginBottom: "6px"}}>Schedule</h2>
                        </div>
                        <div style={{gridRow: "2 / 3", width: "100%", height: "100%", border: "2px solid #BA0C2F", boxSizing: "border-box", padding: "2px 8px 6px 8px"}}>
                            {
                                classData.daysAndLocations.map((daysAndLocation: DaysAndLocationType, i: number) => {
                                    return (
                                        daysAndLocation.days.map((day: string, j: number) => {

                                            let k = j + i

                                            return (
                                                <div style={{display: "grid", gridTemplateColumns: "30% 40% 15% 15%", width: "100%", height: "min-content"}}>
                                                    <div style={{gridColumn: "1 / 2", display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "4px 16px", height: "fit-content", background: k % 2 === 0 ? undefined : "gray"}}>
                                                        <h3 style={{textTransform: "capitalize"}}>{day}</h3>
                                                    </div>
                                                    <div style={{gridColumn: "2 / 3", display: "flex", alignItems: "center", justifyContent: "center", padding: "4px 16px", height: "fit-content", background: k % 2 === 0 ? undefined : "gray"}}>
                                                        <h3>{daysAndLocation.location}</h3>
                                                    </div>
                                                    <div style={{gridColumn: "3 / 4", display: "flex", alignItems: "center", justifyContent: "center", padding: "4px 16px", height: "fit-content", background: k % 2 === 0 ? undefined : "gray"}}>
                                                        <h3>{classData.start}</h3>
                                                    </div>
                                                    <div style={{gridColumn: "4 / 5", display: "flex", alignItems: "center", justifyContent: "center", padding: "4px 16px", height: "fit-content", background: k % 2 === 0 ? undefined : "gray"}}>
                                                        <h3>{classData.end}</h3>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div style={{width: "100%", display: "grid", gridTemplateRows: "40px min-content"}}>
                        <div style={{gridRow: "1 / 2", width: "100%", height: "100%", borderTopLeftRadius: "12px", borderTopRightRadius: "12px", background: "#BA0C2F", display: "flex", alignItems: "flex-end"}}>
                            <h2 style={{marginLeft: "12px", marginBottom: "6px"}}>Instructors</h2>
                        </div>
                        <div style={{gridRow: "2 / 3", width: "100%", height: "100%", border: "2px solid #BA0C2F", boxSizing: "border-box", padding: "2px 8px 6px 8px"}}>
                            {
                                classData.instructors.map((instructor: InstructorType, i: number) => {
                                    return (
                                        <div style={{display: "grid", gridTemplateColumns: "2fr 2fr", width: "100%", height: "min-content"}}>
                                            <div style={{gridColumn: "1 / 2", display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "4px 16px", background: i % 2 === 0 ? undefined : "gray"}}>
                                                <h3>{instructor.name}</h3>
                                            </div>
                                            <div style={{gridColumn: "2 / 3", display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "4px 16px", background: i % 2 === 0 ? undefined : "gray"}}>
                                                <h3>{instructor.email}</h3>
                                            </div>
                                        </div>
                                    )
                                })
                                    
                            }
                        </div>
                    </div>
                </div>
             </div>
        </div>
        :
        <div style={{width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <LoadingIcon data={classData} setLoading={setLoading} /> 
        </div>
    )
}
 
export default ClassModal;