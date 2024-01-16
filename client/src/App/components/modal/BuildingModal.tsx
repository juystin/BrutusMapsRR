import { ModalType } from "../../types/ModalType";
import BuildingType from "../../../../../types/getBuildingsType"
import AvailabilityType, { ClassroomType } from "../../../../../types/getAvailabilityType"
import styled from "styled-components"
import { device } from "../../css/devices";

export interface BuildingModalProps {
    buildingData: BuildingType[],
    availabilityData: AvailabilityType[],
    activeMarker: string | null,
    setModalType: React.Dispatch<React.SetStateAction<ModalType>>,
    setActiveClassroom: React.Dispatch<React.SetStateAction<string | null>>
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
    font-size: 24px;

    text-align: center;
`

const ContentContainer = styled.div`
    width: 100%;

    box-sizing: border-box;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 80px;

    gap: 8px;

    overflow: scroll;
    
    padding: 8px 8px;

    @media ${device.landscapeTablet} { 
        display: flex;
        flex-direction: column;
        padding: 15px 15px;
    }
`

const ButtonContainer = styled.div<{ available: boolean }>`
    height: 80px;
    min-height: 80px;
    width: auto;

    
    background: ${props => props.available ? props.theme.colors.scarlet : props.theme.colors.gray};

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;

    cursor: pointer;

    @media ${device.landscapeTablet} { 
        margin: 10px 20px;
    }
`

const ButtonText = styled.h2`
    font-size: 12px;
    
    cursor: pointer;
    text-align: center;
    
    padding: 0px 6px;

    @media ${device.landscapeTablet} { 
        font-size: 24px;
    }
`

const BuildingModal = ({ buildingData, availabilityData, activeMarker, setModalType, setActiveClassroom }: BuildingModalProps) => {
    return ( 
        <ModalContainer>
            <HeaderContainer>
                <HeaderText>{ buildingData.find((building: any) => building.buildingNum === activeMarker)!.buildingName }</HeaderText>
            </HeaderContainer>
            <ContentContainer>
                {
                    availabilityData.find((data: AvailabilityType) => data.buildingNum === activeMarker)!.classrooms.map((classroom: ClassroomType) => {
                        return (
                            <ButtonContainer available={classroom.available}
                                onClick={() => {
                                    setModalType(ModalType.CLASSROOM)
                                    setActiveClassroom(classroom.facilityId)
                                }}
                            >
                                <ButtonText>{classroom.facilityId}</ButtonText>
                            </ButtonContainer>
                        )
                    })
                }
            </ContentContainer>
        </ModalContainer>
     );
}
 
export default BuildingModal;