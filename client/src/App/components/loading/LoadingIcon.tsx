import AnimatedDot from "./AnimatedDot";
import SectionInfoType from "../../../../../types/getSectionInfoType"
import ClassroomScheduleType from "../../../../../types/getClassroomScheduleType"
import BuildingsType from "../../../../../types/getBuildingsType";
import AvailabilityType from "../../../../../types/getAvailabilityType";
import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

interface LoadingIconProps {
    dataLoaded: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

const LoadingIcon = ({ dataLoaded, setLoading }: LoadingIconProps) => {
    const containerStyle = {
        height: "125px",
        width: "125px",
        display: "grid",
        gap: "2px",
        gridTemplateRows: "1fr 1fr 1fr",
        gridTemplateColumns: "1fr 1fr 1fr"
    }

    const [loadAnimationPlaying, setLoadAnimationPlaying] = useState<boolean>(true);

    const [animation, api] = useSpring(() => ({
        from: {
            opacity: 1
        }
    }))

    useEffect(() => {
        if (dataLoaded) {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
            // api.start({
            //     to: {
            //         opacity: 0
            //     },
            //     onRest: () => {
            //         setLoading(false)
            //     },
            //     config: {
            //         tension: 80,
            //         friction: 20,
            //         mass: 1
            //     },
            //     delay: 2000
            // })
        }
    }, [dataLoaded, loadAnimationPlaying])

    
    return ( 
        <animated.div style={{
            ...containerStyle,
            ...animation
        }}>
            { [0, 1, 2, 3, 4, 5, 6, 7, 8].map((index: number) => {
                return (<AnimatedDot index={index} dataLoaded={dataLoaded} loadAnimationPlaying={loadAnimationPlaying} setLoadAnimationPlaying={setLoadAnimationPlaying} />)
            })
            }
        </animated.div>
     );
}
 
export default LoadingIcon;