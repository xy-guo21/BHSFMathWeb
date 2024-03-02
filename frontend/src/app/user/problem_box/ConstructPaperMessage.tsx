import { TSMSPMessage } from "@/app/Global/message";

export class ConstructPaperMessage extends TSMSPMessage {
    problemIDs: string[]
    paperName: string
    description: string
    constructor(problemIDs: string[], paperName: string, paperDescription: string){
        super();
        this.problemIDs = problemIDs
        this.paperName = paperName
        this.description = paperDescription
    }
}