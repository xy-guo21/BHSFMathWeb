import { TSMSPMessage } from "@/app/Global/message";

export class AddProblemToProblemBaseMessage extends TSMSPMessage {
    userToken: string
    problemBaseName: string
    problemID: string
    constructor(userToken: string, problemBaseName: string, problemID: string){
        super();
        this.userToken = userToken
        this.problemBaseName = problemBaseName
        this.problemID = problemID
    }
}