import axios from "axios"
import { useEffect, useState } from "react"
import ClassroomSchedule from "./ClassroomSchedule";
import { ModalType } from "../../types/ModalType";
import ActiveClassType from "../../types/ActiveClassType";
import ClassroomScheduleType from "../../../../../types/getClassroomScheduleType"
import LoadingIcon from "../loading/LoadingIcon";
import styled from "styled-components"
import { device } from "../../css/devices";

export interface ClassroomModalProps {
    activeClassroom: string | null,
    setModalType: React.Dispatch<React.SetStateAction<ModalType>>,
    setActiveClass: React.Dispatch<React.SetStateAction<ActiveClassType | null>>,
    isDesktop: boolean
}

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
`

const HeaderContainer = styled.div`
    width: 100%; 
    height: 80px; 
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    background: #BA0C2F;

    @media ${device.landscapeTablet} { 
        border-radius: 0px 0px 12px 12px;
    }
`

const HeaderText = styled.h1`
    font-size: 28px;
    text-align: center;
`

const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
`

const ClassroomModal = ({ activeClassroom, setModalType, setActiveClass, isDesktop }: ClassroomModalProps) => {

    const [classroomData, setClassroomData] = useState<ClassroomScheduleType[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (activeClassroom) {
            setLoading(true)
            setClassroomData(null);
            axios.get(import.meta.env.VITE_BACKEND_IP + '/api/getClassroomSchedule?facility=' + activeClassroom)
			.then(function (response) {
				setClassroomData(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
        }
    }, [activeClassroom])

    return ( classroomData && !loading ?
        <ModalContainer>
            <HeaderContainer>
                 <HeaderText>{activeClassroom}</HeaderText>
             </HeaderContainer>
             <ContentContainer>
                <ClassroomSchedule classroomData={classroomData} setModalType={setModalType} setActiveClass={setActiveClass} isDesktop={isDesktop}/> 
             </ContentContainer>
        </ModalContainer>
        :
        <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <LoadingIcon dataLoaded={classroomData !== null} setLoading={setLoading} /> 
        </div>
    );
}
 
export default ClassroomModal;
