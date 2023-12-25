export default interface getAvailabilityType {
    buildingNum: string,
    available: boolean,
    classrooms: ClassroomType[]
}

export interface ClassroomType {
    facilityId: string,
    available: boolean,
    nextClassAt: null | string,
    classEndsAt: null | string
}