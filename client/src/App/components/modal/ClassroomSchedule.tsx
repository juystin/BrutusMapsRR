import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from "swiper/modules";
import 'swiper/css';
import { ModalType } from '../../types/ModalType';
import ActiveClassType from '../../types/ActiveClassType';
import ClassroomScheduleType from "../../../../../types/getClassroomScheduleType"

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

function loadTimeBoxes(startTime: string, endTime: string, timeMarkings: number, interval: number, size: number) {
    let timeBoxes: any = []
    for (let i = getGridBoxFromTime(startTime, startTime, interval); i < getGridBoxFromTime(endTime, startTime, interval); i += (timeMarkings / interval)) {
        timeBoxes.push(
            <div style={{
                gridRow: (i + 1).toString() + " / " + (i + 1 + size).toString(),
                gridColumn: "1 / 2",
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <h1 style={{
                    color: "#13070C",
                    fontSize: "125%"
                }}>
                    {getTimeFromGridBox(i + (getMinutes(startTime) / interval), interval)}
                </h1>    
            </div>
        )
    }
    return timeBoxes
}

function loadTimeBreaks(startTime: string, endTime: string, timeMarkings: number, interval: number, offset: number) {
    let timeBreaks: any = []
    for (let i = getGridBoxFromTime(startTime, startTime, interval); i < getGridBoxFromTime(endTime, startTime, interval); i += (timeMarkings / interval)) {
        timeBreaks.push(
            <div style={{
                gridRow: (i + 1 + offset).toString() + " / " + (i + 2 + offset).toString(),
                gridColumn: "2 / 3",
                height: "1px",
                background: "#13070C"
            }} />
        )
    }
    return timeBreaks
}

function loadClasses(startTime: string, interval: number, offset: number, individualDayInfo: any, setModalType: React.Dispatch<React.SetStateAction<ModalType>>, setActiveClass: React.Dispatch<React.SetStateAction<any>>) {
    return individualDayInfo.schedule.map((classInfo: any) => {
        return (
            <div style={{
                    gridRow: (getGridBoxFromTime(classInfo.start, startTime, interval) + 1 + offset).toString() + " / " + (getGridBoxFromTime(classInfo.end, startTime, interval) + 1 + offset).toString(),
                    gridColumn: "2 / 3",
                    background: "#BA0C2F",
                    height: "100%",
                    position: "relative",
                    zIndex: 2,
                    borderRadius: "12px",
                    margin: "0px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    cursor: "pointer"
                }}
                onClick={() => {
                    setModalType(ModalType.CLASS)
                    setActiveClass({
                        classNo: classInfo.classNo,
                        sectionNo: classInfo.sectionNo
                    })
                }}>
                <h1 style={{cursor: "pointer"}}>{classInfo.subject + " " + classInfo.code}</h1>
                <h2 style={{cursor: "pointer"}}>{classInfo.start + " - " + classInfo.end}</h2>
            </div>
        )
    })
}

export interface ClassroomScheduleProps {
    classroomData: ClassroomScheduleType[],
    setModalType: React.Dispatch<React.SetStateAction<ModalType>>,
    setActiveClass: React.Dispatch<React.SetStateAction<ActiveClassType | null>>
}

const ClassroomSchedule = ({ classroomData, setModalType, setActiveClass }: ClassroomScheduleProps) => {
    
    return ( 
            <Swiper
                modules={[Mousewheel]}
                spaceBetween={50}
                onSlideChange={() => console.log('slide change')}
                style={{
                    width: "100%",
                    height: "100%"
                }}
                initialSlide={new Date().getDay()}
                mousewheel={{
                    forceToAxis: true
                }}
                direction="horizontal"
                loop={true}
            >
                {/* <SwiperSlide>
                    <div style={{display: "flex", width: "100%", height: "100%", alignItems: "center", flexDirection: "column", paddingTop: "20px"}}>
                        <h1 style={{color: "#13070C", textTransform: "capitalize", fontSize: "18px"}}>{"sunday"}</h1>
                        <p style={{color: "#13070C", textTransform: "uppercase", fontSize: "100px", margin: "35% 0 0 0"}}>{"hooray!"}</p>
                        <p style={{color: "#13070C", fontSize: "40px", margin: "0 0"}}>{"(no classes today.)"}</p>
                    </div>
                </SwiperSlide> */}
                { classroomData.map((individualDayInfo: ClassroomScheduleType) => {
                    return (
                        <SwiperSlide>
                            <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center", paddingTop: "20px"}}>
                                <h1 style={{color: "#13070C", textTransform: "capitalize", fontSize: "18px"}}>{individualDayInfo.day}</h1>
                            </div>
                            <div style={{
                                display: "grid",
                                gridTemplateRows: "repeat(" + (TOTAL_GRID_BOXES - END_REMOVAL) + ", " + TIME_BOX_SIZE * 6 + "px)",
                                gridTemplateColumns: "1fr 4fr",
                                paddingRight: "20px",
                                paddingTop: "10px"
                            }}>
                                { loadTimeBoxes(START_TIME, END_TIME, TIME_MARKINGS, BOX_INTERVAL, TIME_BOX_SIZE) }
                                { loadClasses(START_TIME, BOX_INTERVAL, SCHEDULE_OFFSET, individualDayInfo, setModalType, setActiveClass) }
                                { loadTimeBreaks(START_TIME, END_TIME, TIME_MARKINGS, BOX_INTERVAL, SCHEDULE_OFFSET) }
                            </div>
                        </SwiperSlide>
                    )
                }) }
                {/* <SwiperSlide>
                    <div style={{display: "flex", width: "100%", height: "100%", alignItems: "center", flexDirection: "column", paddingTop: "20px"}}>
                        <h1 style={{color: "#13070C", textTransform: "capitalize", fontSize: "18px"}}>{"saturday"}</h1>
                        <p style={{color: "#13070C", textTransform: "uppercase", fontSize: "100px", margin: "35% 0 0 0"}}>{"hooray!"}</p>
                        <p style={{color: "#13070C", fontSize: "40px", margin: "0 0"}}>{"(no classes today.)"}</p>
                    </div>
                </SwiperSlide> */}
            </Swiper>
     );
}
 
export default ClassroomSchedule;