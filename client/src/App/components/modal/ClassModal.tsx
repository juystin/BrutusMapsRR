import axios from "axios";
import { useEffect, useState } from "react";
import SectionInfoType, { InstructorType, DaysAndLocationType } from "../../../../../types/getSectionInfoType"
import ActiveClassType from "../../types/ActiveClassType";
import LoadingIcon from "../loading/LoadingIcon";
import styled from "styled-components"
import { device } from "../../css/devices";

export interface ClassModalProps {
    activeClass: ActiveClassType
}

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-rows: 80px 1fr;
`

const HeaderContainer = styled.div`
    width: 100%; 
    height: 100%; 
    
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

    box-sizing: border-box;

    padding: 10px 20px 0px 20px;

    overflow: scroll;
`

const Title = styled.h1`
    color: ${props => props.theme.colors.black}
`

const Description = styled.p`
    color: ${props => props.theme.colors.black}
`

const LoadScreen = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`

const InfoPanels = styled.div`
    width: 100%;

    box-sizing: border-box;

    display: grid;
    grid-template-rows: min-content min-content;
    gap: 20px;
    
    padding: 0px 10px;
`

const InfoPanel = styled.div`
    width: 100%; 
    
    display: grid;
    grid-template-rows: 40px auto;
`

const InfoPanelTitleContainer = styled.div`
    grid-row: 1 / 2;
    
    width: 100%;
    height: 100%;

    border-radius: 12px 12px 0px 0px;
    
    background: ${props => props.theme.colors.scarlet};
    
    display: flex;
    align-items: flex-end;
`

const InfoPanelTitle = styled.h2`
    margin-left: 14px;
    margin-bottom: 6px;
`

const InfoPanelContentContainer = styled.div`
    grid-row: 2 / 3; 
    
    width: 100%;
    height: 100%;
    
    border: 2px solid #BA0C2F;
    
    box-sizing: border-box;
`

const ScheduleGridContainer = styled.div<{ alt: boolean }>`
    width: 100%;
    height: min-content;

    display: grid;
    grid-template-columns: 35% 25% 20% 20%;

    background: ${props => props.alt ? "gray" : undefined};
`

const InstructorGridContainer = styled.div<{ alt: boolean }>`
    width: 100%;
    height: min-content;

    display: grid;
    
    grid-template-columns: 2fr 2fr;
`

const RowContentContainer = styled.div`
    height: fit-content;

    display: flex;
    align-items: center;

    margin: 4px 24px;
`

const RowContent = styled.h3`
    
`

export interface ClassModalProps {
    activeClass: ActiveClassType,
    isDesktop: boolean
}

const ClassModal = ({ activeClass, isDesktop }: any) => {
    
    const [classData, setClassData] = useState<SectionInfoType | null>(null)
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (activeClass) {
            setLoading(true)
            setClassData(null);
            axios.get('http://' + import.meta.env.VITE_BACKEND_IP + '/api/getSectionInfo?class_num=' + activeClass.classNo + '&section_num=' + activeClass.sectionNo)
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
        <ModalContainer>
            <HeaderContainer>
                 <HeaderText>{classData.subject + " " + classData.code}</HeaderText>
            </HeaderContainer>
             <ContentContainer>
                <Title>{classData.title}</Title>
                <Description>{classData.description}</Description>
                { isDesktop ?
                    <InfoPanels>
                        <InfoPanel>
                            <InfoPanelTitleContainer>
                                <InfoPanelTitle>Schedule</InfoPanelTitle>
                            </InfoPanelTitleContainer>
                            <InfoPanelContentContainer>
                                {
                                    classData.daysAndLocations.map((daysAndLocation: DaysAndLocationType, i: number) => {
                                        return (
                                            daysAndLocation.days.map((day: string, j: number) => {

                                                let k = j + i

                                                return (
                                                    <ScheduleGridContainer alt={k % 2 !== 0}>
                                                        <RowContentContainer style={{justifyContent: "flex-start"}}>
                                                            <RowContent>{day.charAt(0).toUpperCase() + day.slice(1)}</RowContent>
                                                        </RowContentContainer>
                                                        <RowContentContainer style={{justifyContent: "center"}}>
                                                            <RowContent>{daysAndLocation.location}</RowContent>
                                                        </RowContentContainer>
                                                        <RowContentContainer style={{justifyContent: "flex-end"}}>
                                                            <RowContent>{classData.start}</RowContent>
                                                        </RowContentContainer>
                                                        <RowContentContainer style={{justifyContent: "flex-end"}}>
                                                            <RowContent>{classData.end}</RowContent>
                                                        </RowContentContainer>
                                                    </ScheduleGridContainer>
                                                )
                                            })
                                        )
                                    })
                                }
                            </InfoPanelContentContainer>
                        </InfoPanel>
                        <InfoPanel>
                            <InfoPanelTitleContainer>
                                <InfoPanelTitle>Instructors</InfoPanelTitle>
                            </InfoPanelTitleContainer>
                            <InfoPanelContentContainer>
                                {
                                    classData.instructors.map((instructor: InstructorType, i: number) => {
                                        return (
                                            <InstructorGridContainer alt={i % 2 !== 0}>
                                                <RowContentContainer style={{justifyContent: "flex-start"}}>
                                                    <RowContent>{instructor.name}</RowContent>
                                                </RowContentContainer>
                                                <RowContentContainer style={{justifyContent: "flex-end"}}>
                                                    <RowContent>{instructor.email}</RowContent>
                                                </RowContentContainer>
                                            </InstructorGridContainer>
                                        )
                                    })
                                        
                                }
                            </InfoPanelContentContainer>
                        </InfoPanel>
                    </InfoPanels>
                :
                    <></>
                }
             </ContentContainer>
        </ModalContainer>
        :
        <LoadScreen>
            <LoadingIcon dataLoaded={classData !== null} setLoading={setLoading} /> 
        </LoadScreen>
    )
}
 
export default ClassModal;