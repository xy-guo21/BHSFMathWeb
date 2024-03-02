import { TSMSPMessage } from "@/app/Global/message";

export class RemoveFromProblemBoxMessage extends TSMSPMessage {
    problemID: string
    constructor(problemID: string){
        super();
        this.problemID = problemID
    }
}