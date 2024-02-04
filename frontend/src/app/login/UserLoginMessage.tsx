import { TSMSPMessage } from "@/app/Global/message";
export class UserLoginMessage extends TSMSPMessage {
    studentID : string
    password : string
    constructor(studentID : string, password : string) {
        super();
        this.studentID = studentID
        this.password = password
    }
}