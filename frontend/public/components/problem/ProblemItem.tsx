import React, { useEffect, useState } from "react"
import { List, Space, Button, UploadFile } from "antd"

const problemIDs_debug = ['0', '1']
class ProblemItem {
    problemID: string
    content: string
    has_image: boolean
    images?: JSX.Element[]
    images_front?: UploadFile[]
    like: number
    dislike: number
    star: number
    difficulty: string
    source: string
    problemBase: string
    constructor(problemID: string, content: string, 
        difficulty: string, problemBase: string, source: string, 
        like: number, dislike: number, star: number, 
        imagePaths: string[]){
        this.problemID = problemID 
        this.content = content
        this.difficulty = difficulty
        this.problemBase = problemBase
        this.source = source
        if (imagePaths.length !== 0){
            this.has_image = true
            this.images = imagePaths.map(imagePath => <img width={200} src={imagePath}/>)
            this.images_front = imagePaths.map((imagePath, id) => {
                return {
                    uid: `${id}`, 
                    name: `图${id+1}`, 
                    status: 'done', 
                    url: imagePath
                }
            })
        } else {
            this.has_image = false
        }
        this.like = like
        this.dislike = dislike
        this.star = star
    }
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );



export {ProblemItem, problemIDs_debug, IconText}