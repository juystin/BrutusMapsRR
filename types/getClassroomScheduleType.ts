export default interface getClassroomScheduleType {
    day: string,
    schedule: classInfo[]
}

interface classInfo {
    subject: string,
    code: string,
    title: string,
    description: string,
    classNo: string,
    sectionNo: string,
    start: string,
    end: string,
    duration: string
}