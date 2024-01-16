import { ModalType } from "../../types/ModalType";
import BuildingType from "../../../../../types/getBuildingsType"
import AvailabilityType from "../../../../../types/getAvailabilityType"
import styled from "styled-components"
import { device } from "../../css/devices";

export interface DefaultModalProps {
    buildingData: BuildingType[],
    availabilityData: AvailabilityType[],
    setActiveMarker: React.Dispatch<React.SetStateAction<string | null>>
    setModalType: React.Dispatch<React.SetStateAction<ModalType>>
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
        font-size: 18px;
    }
`

const DefaultModal = ({buildingData, availabilityData, setActiveMarker, setModalType}: DefaultModalProps) => {
    return ( 
        <ModalContainer>
            <HeaderContainer>
                <HeaderText>BrutusMaps</HeaderText>
            </HeaderContainer>
            <ContentContainer>
                {
                    buildingData.map((building: BuildingType) => {
                        return (
                            <ButtonContainer available={availabilityData.find((availBuilding: any) => availBuilding.buildingNum === building.buildingNum)!.available}
                                onClick={() => {
                                    setActiveMarker(building.buildingNum)
                                    setModalType(ModalType.BUILDING)
                                }}
                            >
                                <ButtonText>{building.buildingName}</ButtonText>
                            </ButtonContainer>
                        )
                    })
                }
            </ContentContainer>  
        </ModalContainer>
     );
}
 
export default DefaultModal;