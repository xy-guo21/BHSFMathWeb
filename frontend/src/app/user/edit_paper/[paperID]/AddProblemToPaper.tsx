import { TSMSPMessage } from "@/app/Global/message";

export class AddProblemToPaperMessage extends TSMSPMessage {
    paperID: string
    problemID: string
    constructor(paperID: string, problemID: string){
        super();
        this.paperID = paperID
        this.problemID = problemID
    }
}