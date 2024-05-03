import { TSMSPMessage } from "@/app/Global/message";

export class QueryWithUserToken extends TSMSPMessage {
    userToken: string
    constructor(userToken: string){
        super();
        this.userToken = userToken
    }
}