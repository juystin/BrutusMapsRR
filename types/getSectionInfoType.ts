export default interface getSectionInfoType {
    buildingNum: string,
    facility: string,
    subject: string,
    code: string,
    title: string,
    description: string,
    type: string,
    units: string,
    classNo: string,
    sectionNo: string,
    start: string,
    end: string,
    duration: string,
    instructors: InstructorType[],
    daysAndLocations: DaysAndLocationType[]
}

export interface InstructorType {
    id: string,
    email: string,
    name: string
}

export interface DaysAndLocationType {
    location: string,
    days: string[]
}