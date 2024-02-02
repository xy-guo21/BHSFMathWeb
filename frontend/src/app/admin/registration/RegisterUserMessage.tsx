import { TSMSPMessage } from "@/app/Global/message";
export class ResgisterUserMessage extends TSMSPMessage {
    userName : string
    password : string
    schoolID: number
    enrollmentYear: number
    studyPeriod: string
    constructor(userName : string, password : string, schoolID: number, enrollmentYear:number, studyPeriod: string){
        super();
        this.userName = userName
        this.password = password
        this.schoolID = schoolID
        this.enrollmentYear = enrollmentYear
        this.studyPeriod = studyPeriod
    }
}