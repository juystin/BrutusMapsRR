import AnimatedDot from "./AnimatedDot";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface LoadingIconProps {
    dataLoaded: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

const LoadingIconContainer = styled.div`
    height: 125px;
    width: 125px;

    display: grid;
    gap: 2px;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr; 
`

const LoadingIcon = ({ dataLoaded, setLoading }: LoadingIconProps) => {
    const [loadAnimationPlaying, setLoadAnimationPlaying] = useState<boolean>(true);

    useEffect(() => {
        if (dataLoaded) {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
    }, [dataLoaded, loadAnimationPlaying])

    
    return ( 
        <LoadingIconContainer>
            { [0, 1, 2, 3, 4, 5, 6, 7, 8].map((index: number) => {
                return (<AnimatedDot index={index} dataLoaded={dataLoaded} loadAnimationPlaying={loadAnimationPlaying} setLoadAnimationPlaying={setLoadAnimationPlaying} />)
            })
            }
        </LoadingIconContainer>
     );
}
 
export default LoadingIcon;