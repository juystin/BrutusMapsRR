import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from "swiper/modules";
import 'swiper/css';
import { ModalType } from '../../types/ModalType';
import ActiveClassType from '../../types/ActiveClassType';
import ClassroomScheduleType from "../../../../../types/getClassroomScheduleType"
import { useEffect, useState } from 'react';
import styled from "styled-components";
import { device } from '../../css/devices';


function getMinutes(time: string) {
    return (Number(time.substring(0, 2)) * 60) + Number(time.substring(3, 5))
}

function getGridBoxFromTime(time: string, startTime: string, interval: number): number {
    return (getMinutes(time) - getMinutes(startTime)) / interval
}

function getTimeFromGridBox(gridBox: number, interval: number) {
    let totalMinutes = gridBox * interval
    let hours = Math.floor(totalMinutes / 60)
    let minutes = totalMinutes % 60

    return (hours < 10 ? "0" + hours.toString() : hours.toString()) + ":" + (minutes < 10 ? "0" + minutes.toString() : minutes.toString())
}

// Start and end time for schedule, will end before the END_TIME (23:00 means 22:30 will be the last marking, if TIME_MARKINGS = 30)
const START_TIME = "08:00"
const END_TIME = "23:00"

// Time markings on map (e.g. 30 is 08:00, 08:30, 9:00...)
const TIME_MARKINGS = 30

// How much time each gridbox counts towards (e.g. 5 means one grid box represents 5 minutes)
const BOX_INTERVAL = 5

// Should be an even number <= 4
const TIME_BOX_SIZE = 2

// Required to put time box in the middle of time marker
const SCHEDULE_OFFSET = TIME_BOX_SIZE / 2

// Total number of rows in the grid
const TOTAL_GRID_BOXES = getGridBoxFromTime(END_TIME, START_TIME, BOX_INTERVAL) + TIME_BOX_SIZE

// Clips boxes some off the end
const END_REMOVAL = Math.floor(BOX_INTERVAL / 2)

export interface ClassroomScheduleProps {
    classroomData: ClassroomScheduleType[],
    setModalType: React.Dispatch<React.SetStateAction<ModalType>>,
    setActiveClass: React.Dispatch<React.SetStateAction<ActiveClassType | null>>,
    isDesktop: boolean
}

const EmptyClassContentContainer = styled.div`
    height: 100%;
    width: 100%;
`

const EmptyHeaderContainer = styled.div`
    width: 100%;    

    display: flex; 
    align-items: center;
    flex-direction: column; 
    
    padding-top: 20px;
`

const HeaderContainer = styled.div`
    width: 100%;    

    display: flex; 
    align-items: center;
    flex-direction: column; 
    
    padding-top: 20px;
`

const HeaderText = styled.h1`
    color: #13070C;
    
    font-size: 18px;

    text-transform: capitalize;
`

const EmptyDayContainer = styled.div`
    position: absolute;
    z-index: 2;

    width: 100%;
    height: 100%;

    display: flex; 
    align-items: center;
    justify-content: center;
    flex-direction: column;

    margin-top: -20px;
`

const EmptyDayText = styled.p`
    color: ${props => props.theme.colors.black};
    
    font-size: 70px;

    text-transform: uppercase;
    
    margin: 0 auto;
`

const EmptyDaySubtext = styled.p`
    color: ${props => props.theme.colors.black};
    
    font-size: 40px;
    
    margin: 0 auto;
`

const ContentContainer = styled.div`
    width: 100%;
    height: 100%;

    box-sizing: border-box;

    display: grid;
    grid-template-rows: 1fr 5fr;

    overflow: scroll;

    padding: 0px 6px;

    @media ${device.landscapeTablet} { 
        padding: 0px 0px;
        grid-template-rows: 1fr 8fr;
    }
`

const ScheduleContainer = styled.div<{ totalgridboxes: number, endremoval: number, timeboxsize: number, isdesktop: boolean }>`
    display: grid;
    grid-template-rows: repeat( ${props => (props.totalgridboxes - props.endremoval)}, ${props => (props.timeboxsize * (props.isdesktop ? 6 : 3.5))}px);
    grid-template-columns: minmax(100px, 1fr) 4fr;

    box-sizing: border-box;

    padding: 10px 20px 0px 0px;
`

const TimeBox = styled.div<{ index: number, size: number }>`
    grid-row: ${props => props.index + 1} / ${props => props.index + 1 + props.size};
    grid-column: 1 / 2;
    
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`

const Time = styled.h1`
    color: #13070C;
    font-size: 16px;

    @media ${device.landscapeTablet} {
        font-size: 24px;
    }
`

const TimeBreak = styled.div<{ index: number, offset: number }>`
    height: 1px;

    grid-row: ${props => props.index + 1 + props.offset} / ${props => props.index + 1 + props.offset};
    grid-column: 2 / 3;
    
    background: #13070C;
`

const ClassBlockContainer = styled.div<{ startbox: number, endbox: number, offset: number }>`
    grid-row: ${props => props.startbox + 1 + props.offset} / ${props => props.endbox + 1 + props.offset};
    grid-column: 2 / 3;

    height: 100%;

    box-sizing: border-box;

    padding: 0px 8px;

    background: #BA0C2F;
    
    border-radius: 12px;

    margin: 0px 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    cursor: pointer;

    position: relative;
    z-index: 2;
`

const ClassIdentifier = styled.h1`
    cursor: pointer;
    font-size: 22px;
    
    text-align: center;

    @media ${device.landscapeTablet} {
        font-size: 36px;
    }
`

const ClassTime = styled.h2`
    cursor: pointer;
    font-size: 13px;

    @media ${device.landscapeTablet} {
        font-size: 20px;
    }
`

function loadTimeBoxes(startTime: string, endTime: string, timeMarkings: number, interval: number, size: number) {
    let timeBoxes: any = []
    for (let i = getGridBoxFromTime(startTime, startTime, interval); i < getGridBoxFromTime(endTime, startTime, interval); i += (timeMarkings / interval)) {
        timeBoxes.push(
            <TimeBox index={i} size={size}>
                <Time>
                    {getTimeFromGridBox(i + (getMinutes(startTime) / interval), interval)}
                </Time>    
            </TimeBox>
        )
    }
    return timeBoxes
}

function loadTimeBreaks(startTime: string, endTime: string, timeMarkings: number, interval: number, offset: number) {
    let timeBreaks: any = []
    for (let i = getGridBoxFromTime(startTime, startTime, interval); i < getGridBoxFromTime(endTime, startTime, interval); i += (timeMarkings / interval)) {
        timeBreaks.push(
            <TimeBreak index={i} offset={offset} />
        )
    }
    return timeBreaks
}

function loadClasses(startTime: string, interval: number, offset: number, individualDayInfo: any, setModalType: React.Dispatch<React.SetStateAction<ModalType>>, setActiveClass: React.Dispatch<React.SetStateAction<any>>) {
    return individualDayInfo.schedule.map((classInfo: any) => {
        return (
            <ClassBlockContainer startbox={getGridBoxFromTime(classInfo.start, startTime, interval)} endbox={getGridBoxFromTime(classInfo.end, startTime, interval)} offset={offset}
                onClick={() => {
                    setModalType(ModalType.CLASS)
                    setActiveClass({
                        classNo: classInfo.classNo,
                        sectionNo: classInfo.sectionNo
                    })
                }}>
                <ClassIdentifier>{classInfo.subject + " " + classInfo.code}</ClassIdentifier>
                <ClassTime>{classInfo.start + " - " + classInfo.end}</ClassTime>
            </ClassBlockContainer>
        )
    })
}

const ClassroomSchedule = ({ classroomData, setModalType, setActiveClass, isDesktop }: ClassroomScheduleProps) => {

    return (
            <Swiper
                modules={[Mousewheel]}
                spaceBetween={50}
                style={{
                    width: "100%",
                    height: isDesktop ? "calc(100vh - 4vh - 80px)" : "calc(52vh - 5vh - 3.4vh - 80px)",
                }}
                initialSlide={new Date().getDay()}
                mousewheel={{
                    forceToAxis: true
                }}
                direction="horizontal"
                loop={true}
            >
                <SwiperSlide>
                    <EmptyClassContentContainer>
                        <EmptyHeaderContainer>
                            <HeaderText>{"sunday"}</HeaderText>
                        </EmptyHeaderContainer>
                        <EmptyDayContainer>
                            <EmptyDayText>{"hooray!"}</EmptyDayText>
                            <EmptyDaySubtext>{"(no classes today.)"}</EmptyDaySubtext>
                        </EmptyDayContainer>
                    </EmptyClassContentContainer>
                </SwiperSlide>
                { classroomData.map((individualDayInfo: ClassroomScheduleType) => {
                    return ( individualDayInfo.schedule.length !== 0 ?
                        <SwiperSlide>
                            <ContentContainer>
                                <HeaderContainer>
                                    <HeaderText>{individualDayInfo.day}</HeaderText>
                                </HeaderContainer>
                                <ScheduleContainer totalgridboxes={TOTAL_GRID_BOXES} endremoval={END_REMOVAL} timeboxsize={TIME_BOX_SIZE} isdesktop={isDesktop}>
                                    { loadTimeBoxes(START_TIME, END_TIME, TIME_MARKINGS, BOX_INTERVAL, TIME_BOX_SIZE) }
                                    { loadClasses(START_TIME, BOX_INTERVAL, SCHEDULE_OFFSET, individualDayInfo, setModalType, setActiveClass) }
                                    { loadTimeBreaks(START_TIME, END_TIME, TIME_MARKINGS, BOX_INTERVAL, SCHEDULE_OFFSET) }
                                </ScheduleContainer>
                            </ContentContainer>
                        </SwiperSlide>
                    :
                        <SwiperSlide>
                            <EmptyClassContentContainer>
                                <EmptyHeaderContainer>
                                    <HeaderText>{individualDayInfo.day}</HeaderText>
                                </EmptyHeaderContainer>
                                <EmptyDayContainer>
                                    <EmptyDayText>{"hooray!"}</EmptyDayText>
                                    <EmptyDaySubtext>{"(no classes today.)"}</EmptyDaySubtext>
                                </EmptyDayContainer>
                            </EmptyClassContentContainer>
                        </SwiperSlide>
                    )
                }) }
                <SwiperSlide>
                    <EmptyClassContentContainer>
                        <EmptyHeaderContainer>
                            <HeaderText>{"saturday"}</HeaderText>
                        </EmptyHeaderContainer>
                        <EmptyDayContainer>
                            <EmptyDayText>{"hooray!"}</EmptyDayText>
                            <EmptyDaySubtext>{"(no classes today.)"}</EmptyDaySubtext>
                        </EmptyDayContainer>
                    </EmptyClassContentContainer>
                </SwiperSlide>
            </Swiper>
     );
}
 
export default ClassroomSchedule;