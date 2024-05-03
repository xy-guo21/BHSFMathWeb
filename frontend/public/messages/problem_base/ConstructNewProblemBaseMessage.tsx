import { TSMSPMessage } from "@/app/Global/message";

export class ConstructNewProblemBaseMessage extends TSMSPMessage {
    userToken: string
    problemBaseName: string
    constructor(userToken: string, problemBaseName: string){
        super();
        this.userToken = userToken
        this.problemBaseName = problemBaseName
    }
}