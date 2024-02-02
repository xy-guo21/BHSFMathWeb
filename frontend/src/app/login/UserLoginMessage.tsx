import { TSMSPMessage } from "@/app/Global/message";
export class UserLoginMessage extends TSMSPMessage {
    userName : string
    password : string
    constructor(userName : string, password : string) {
        super();
        this.userName = userName
        this.password = password
    }
}