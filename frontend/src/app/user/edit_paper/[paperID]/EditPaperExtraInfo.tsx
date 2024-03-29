import { TSMSPMessage } from "@/app/Global/message";

export class EditPaperExtraInfoMessage extends TSMSPMessage {
    paperID: string
    paperName: string
    description: string
    problemBase: string
    constructor(paperID: string, paperName: string, description: string, problemBase: string){
        super();
        this.paperID = paperID
        this.paperName = paperName
        this.description = description
        this.problemBase = problemBase
    }
}