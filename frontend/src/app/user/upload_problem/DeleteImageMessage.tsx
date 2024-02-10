import { TSMSPMessage } from "@/app/Global/message"

export class DeleteImageMessage extends TSMSPMessage{
    uid: string
    image_name: string
    constructor(uid: string, name: string){
        super()
        this.uid=uid
        this.image_name=name
    }
}