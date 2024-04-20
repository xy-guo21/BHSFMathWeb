import { TSMSPMessage } from "@/app/Global/message";

export class QueryUserProblemMessage extends TSMSPMessage {
    userToken: string
    constructor(userToken: string){
        super();
        this.userToken = userToken
    }
}