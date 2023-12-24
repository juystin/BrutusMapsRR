import axios from "axios";
import { useEffect, useState } from "react";

const ClassModal = ({ activeClass }: any) => {
    
    const [classData, setClassData] = useState<any>(null)

    useEffect(() => {
        if (activeClass) {
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
    
    return ( classData ?
        <div style={{height: "100%", width: "100%"}} >
            <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center", height: "80px", background: "#BA0C2F", marginBottom: "20px", borderBottomLeftRadius: "12px 12px", borderBottomRightRadius: "12px 12px"}}>
                 <h1>{classData.subject + " " + classData.code}</h1>
             </div>
             <div style={{maxWidth: "100%", height: "auto", padding: "0px 20px"}}>
                <h1 style={{color: "#13070C"}}>{classData.title}</h1>
                <p style={{color: "#13070C"}}>{classData.description}</p>
             </div>
        </div>
     : <h1>Loading...</h1>);
}
 
export default ClassModal;