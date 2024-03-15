import { TSMSPMessage } from "@/app/Global/message";

export class QueryPaperDetailMessage extends TSMSPMessage {
    paperID : string
    constructor(paperID : string) {
        super();
        this.paperID = paperID
    }
}
