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

// Total number of rows in the grid
const TOTAL_GRID_BOXES = getGridBoxFromTime(END_TIME, START_TIME, BOX_INTERVAL)

function loadTimeBoxes(startTime: string, endTime: string, timeMarkings: number, interval: number) {
    let timeBoxes: any = []
    for (let i = getGridBoxFromTime(startTime, startTime, interval); i < getGridBoxFromTime(endTime, startTime, interval); i += (timeMarkings / interval)) {
        timeBoxes.push(
            <div style={{
                gridRow: (i + 1).toString() + " / " + (i + 2).toString(),
                gridColumn: "1 / 2",
                height: "100%",
                width: "100%",
                background: "purple"
            }} >{getTimeFromGridBox(i + (getMinutes(startTime) / interval), interval)}</div>
        )
    }
    return timeBoxes
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
                        <div style={{
                            display: "grid",
                            gridTemplateRows: "repeat(" + TOTAL_GRID_BOXES + ", 20px)",
                            gridTemplateColumns: "1fr 4fr",
                            width: "100%"
                        }}>
                            { loadTimeBoxes(START_TIME, END_TIME, TIME_MARKINGS, BOX_INTERVAL) }
                            { individualDayInfo.schedule.map((classInfo: any) => {
                                return (
                                    <div style={{
                                        gridRow: getGridBoxFromTime(classInfo.start, START_TIME, BOX_INTERVAL).toString() + " / " + (getGridBoxFromTime(classInfo.end, START_TIME, BOX_INTERVAL)).toString(),
                                        gridColumn: "2 / 3",
                                        background: "purple",
                                        height: "100%",
                                        width: "100%"
                                    }}>
                                        {classInfo.subject + " " + classInfo.code + " " + classInfo.start + " " + classInfo.end}
                                    </div>
                                )
                            })}
                        </div>
                    </SwiperSlide>
                )
            }) }
        </Swiper>
     );
}
 
export default ClassroomSchedule;