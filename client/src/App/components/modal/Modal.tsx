import { useEffect, useRef, useState } from "react";
import { ModalType } from "../../types/ModalType";
import ClassroomModal from "./ClassroomModal";
import DefaultModal from "./DefaultModal";
import BuildingModal from "./BuildingModal";
import ArrowIcon from "./ArrowIcon";
import ClassModal from "./ClassModal";
import BuildingsType from "../../../../../types/getBuildingsType"
import AvailabilityType from "../../../../../types/getAvailabilityType"
import ActiveClassType from "../../types/ActiveClassType";
import { animated, useSpring } from "@react-spring/web";
import styled from "styled-components"
import { device } from "../../css/devices";

export interface ModalProps {
    type: ModalType,
    activeMarker: string | null,
    setActiveMarker: React.Dispatch<React.SetStateAction<string | null>>,
    buildingData: BuildingsType[],
    availabilityData: AvailabilityType[],
    setModalType: React.Dispatch<React.SetStateAction<ModalType>>,
    isDesktop: boolean
}

const ModalContainer = styled(animated.div)`
    position: absolute;
    z-index: 2; 

    width: 100%;

    filter: drop-shadow(3px 30px 40px #13070C);
    
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    bottom: 0;

    pointer-events: "none";

    @media ${device.landscapeTablet} { 
        width: 40vw;
        height: 100dvh;

        flex-direction: row;
        align-items: center;

        right: 0;

        filter: drop-shadow(15px 0px 30px #13070C);
    }
`

const ButtonContainer = styled.div`
    width: 10vw;
    height: 3.4dvh;

    margin-right: 30px;

    @media ${device.landscapeTablet} { 
        margin-right: 0px;
        
        width: 2vw;
        min-width: 2vw;
        height: 200px;
    }
`

const IconContainer = styled.div`
    height: 100%;
    width: 100%;

    background: ${props => props.theme.colors.black};
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    
    cursor: pointer;
    pointer-events: auto;

    @media ${device.landscapeTablet} { 
        background: ${props => props.theme.colors.scarlet};

        margin-left: 0px;

        border-top-right-radius: 0px;
        border-bottom-left-radius: 8px;
    }
`

const ContentsContainer = styled.div<{ isOpen: boolean }>`
    width: 100%;
    height: 100%;
    
    overflow: hidden;
    
    background: ${props => props.theme.colors.white};
    
    pointer-events: auto;

    border-radius: 32px 32px 0px 0px;

    @media ${device.landscapeTablet} {
        border-radius: 0px 0px 0px 0px;

        min-width: ${props => props.isOpen ? "38vw" : "0%"};;
        max-width: ${props => props.isOpen ? "38vw" : "0%"};; 
    }
`

const Modal = ({ type, activeMarker, setActiveMarker, buildingData, availabilityData, setModalType, isDesktop }: ModalProps) => {

    const [activeClassroom, setActiveClassroom] = useState<string | null>(null)
    const [activeClass, setActiveClass] = useState<ActiveClassType | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const containerRef = useRef<HTMLDivElement>(null)

    const [firstLoad, setFirstLoad] = useState<boolean>(false)

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scroll({
                top: 0
            })
        }
    }, [type])

    const [horizontalAnimation, horizontalApi] = useSpring(() => ({
        from: {
            width: firstLoad ? "2vw" : "0vw"
        }
    }))

    const [verticalAnimation, verticalApi] = useSpring(() => ({
        from: {
            height: firstLoad ? "5dvh" : "0dvh"
        }
    }))

    useEffect(() => {
        if (isOpen && isDesktop) {
            if (!firstLoad) {
                setFirstLoad(true)
            }
            setTimeout(() => {
                horizontalApi.start({
                    to: {
                        width: "40vw"
                    },
                    config: {
                        tension: 100,
                        friction: 30,
                        mass: 1
                    }
                })
            }, firstLoad ? 0 : 500)
        } else if (!isOpen && isDesktop) {
            horizontalApi.start({
                to: {
                    width: "2vw"
                },
                immediate: true
            })
        } else if (isOpen && !isDesktop) {
            if (!firstLoad) {
                setFirstLoad(true)
            }
            setTimeout(() => {
                verticalApi.start({
                    to: {
                        height: "52dvh"
                    },
                    config: {
                        tension: 100,
                        friction: 30,
                        mass: 1
                    }
                })
            }, firstLoad ? 0 : 500)
        } else if (!isOpen && !isDesktop) {
            verticalApi.start({
                to: {
                    height: "5dvh"
                },
                immediate: true
            })
        }
    }, [isOpen])

    useEffect(() => {
        if (firstLoad) {
            if (isDesktop && isOpen) {
                horizontalApi.start({
                    to: {
                        width: "40vw"
                    },
                    immediate: true
                })
            } else if (!isDesktop && isOpen) {
                verticalApi.start({
                    to: {
                        height: "52dvh"
                    },
                    immediate: true
                })
            } else if (isDesktop && !isOpen) {
                horizontalApi.start({
                    to: {
                        width: "2vw"
                    },
                    immediate: true
                })
            } else if (!isDesktop && !isOpen) {
                verticalApi.start({
                    to: {
                        height: "5dvh"
                    },
                    immediate: true
                })
            }
        }
    }, [isDesktop])

    useEffect(() => {
        if (activeMarker !== null) {
            setIsOpen(true)
        }
    }, [activeMarker])

    return (
        <ModalContainer style={isDesktop ? horizontalAnimation : verticalAnimation}>
            <ButtonContainer>
                <IconContainer
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <ArrowIcon isOpen={isOpen} isDesktop={isDesktop}/>
                </IconContainer>
            </ButtonContainer>
            <ContentsContainer ref={containerRef} isOpen={isOpen}>
            {
                type === ModalType.ALL 
                ?
                <DefaultModal buildingData={buildingData} availabilityData={availabilityData} setActiveMarker={setActiveMarker} setModalType={setModalType}/>
                :
                type === ModalType.BUILDING
                ?
                <BuildingModal buildingData={buildingData} availabilityData={availabilityData} activeMarker={activeMarker} setModalType={setModalType} setActiveClassroom={setActiveClassroom} />
                :
                type === ModalType.CLASSROOM
                ?
                <ClassroomModal activeClassroom={activeClassroom} setModalType={setModalType} setActiveClass={setActiveClass} isDesktop={isDesktop}/>
                :
                type === ModalType.CLASS
                ?
                <ClassModal activeClass={activeClass} isDesktop={isDesktop}/>
                :
                <></>
            }
            </ContentsContainer>
        </ModalContainer>
    )
}
 
export default Modal;