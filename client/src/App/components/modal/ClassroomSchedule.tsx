import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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

function loadTimeBreaks(startTime: string, endTime: string, timeMarkings: number, interval: number, size: number, offset: number) {
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

function loadClasses(startTime: string, endTime: string, interval: number, offset: number, individualDayInfo: any) {
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
            }}>
                <h1 style={{cursor: "pointer"}}>{classInfo.subject + " " + classInfo.code}</h1>
                <h2 style={{cursor: "pointer"}}>{classInfo.start + " - " + classInfo.end}</h2>
            </div>
        )
    })
}

export interface ClassroomScheduleProps {
    classroomData: any
}

const ClassroomSchedule = ({ classroomData }: ClassroomScheduleProps) => {
    
    return ( 
        <Swiper
            spaceBetween={50}
            onSlideChange={() => console.log('slide change')}
            style={{
                width: "100%"
            }}
            loop={true}
        >
            { classroomData.map((individualDayInfo: any) => {
                return (
                    <SwiperSlide>
                        <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center"}}>
                            <h1 style={{color: "#13070C", textTransform: "capitalize", fontSize: "18px"}}>{individualDayInfo.day}</h1>
                        </div>
                        <div style={{
                            display: "grid",
                            gridTemplateRows: "repeat(" + (TOTAL_GRID_BOXES - END_REMOVAL) + ", " + TIME_BOX_SIZE * 6 + "px)",
                            gridTemplateColumns: "1fr 4fr",
                            paddingRight: "20px"
                        }}>
                            { loadTimeBoxes(START_TIME, END_TIME, TIME_MARKINGS, BOX_INTERVAL, TIME_BOX_SIZE) }
                            { loadClasses(START_TIME, END_TIME, BOX_INTERVAL, SCHEDULE_OFFSET, individualDayInfo) }
                            { loadTimeBreaks(START_TIME, END_TIME, TIME_MARKINGS, BOX_INTERVAL, TIME_BOX_SIZE, SCHEDULE_OFFSET) }
                        </div>
                    </SwiperSlide>
                )
            }) }
        </Swiper>
     );
}
 
export default ClassroomSchedule;