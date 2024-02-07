import { TSMSPMessage } from "@/app/Global/message";

// 可以为空
export class ProblemQueryFilterMessage extends TSMSPMessage{
    topic: string
    difficulty: number
    source : string
    constructor(topic: string, difficulty: number, source: string){
        super()
        this.topic = topic
        this.difficulty = difficulty
        this.source = source
    }

}

export class ProblemQueryIDMessage extends TSMSPMessage {
    problemID : string
    constructor(problemID : string) {
        super();
        this.problemID = problemID
    }
}
