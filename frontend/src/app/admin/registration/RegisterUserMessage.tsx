import { TSMSPMessage } from "@/app/Global/message";
export class ResgisterUserMessage extends TSMSPMessage {
    userName : string
    studentID : string 
    password : string
    schoolName: string
    enrollmentYear: number
    studyPeriod: string
    constructor(userName : string, studentID: string, password : string, enrollmentYear:number,  studyPeriod: string, schoolName: string){
        super();
        this.userName = userName
        this.studentID = studentID
        this.password = password
        this.schoolName = schoolName
        this.enrollmentYear = enrollmentYear
        this.studyPeriod = studyPeriod
    }
}