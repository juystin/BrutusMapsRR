import AnimatedDot from "./AnimatedDot";
import SectionInfoType from "../../../../../types/getSectionInfoType"
import ClassroomScheduleType from "../../../../../types/getClassroomScheduleType"
import BuildingsType from "../../../../../types/getBuildingsType";
import AvailabilityType from "../../../../../types/getAvailabilityType";
import { useEffect } from "react";

interface LoadingIconProps {
    data: AvailabilityType | BuildingsType | ClassroomScheduleType[] | SectionInfoType | null,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

const LoadingIcon = ({ data, setLoading }: LoadingIconProps) => {

    useEffect(() => {
        if (data) {
            setLoading(false)
        }
    }, [data])

    return ( 
        <div style={{
            height: "200px",
            width: "200px",
            display: "grid",
            backgroundColor: "purple",
            gridTemplateRows: "1fr 1fr 1fr",
            gridTemplateColumns: "1fr 1fr 1fr"
        }}>
            <AnimatedDot />
        </div>
     );
}
 
export default LoadingIcon;