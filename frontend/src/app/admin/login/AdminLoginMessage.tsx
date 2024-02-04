import { TSMSPMessage } from "@/app/Global/message";
export class AdminLoginMessage extends TSMSPMessage {
    adminID : string
    password : string
    constructor(adminID : string, password : string) {
        super();
        this.adminID = adminID
        this.password = password
    }
}