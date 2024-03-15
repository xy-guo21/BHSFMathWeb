import React, { useEffect, useState } from "react"
import { List, Space, Button } from "antd"

const problemIDs_debug = ['0', '1']
class ProblemItem {
    problemID: string
    content: string
    has_image: boolean
    images?: JSX.Element[]
    like?: number
    dislike: number
    star: number
    constructor(problemID: string, content: string, 
        like: number, dislike: number, star: number, 
        imagePaths: string[]){
        this.problemID = problemID 
        this.content = content
        if (imagePaths.length !== 0){
            this.has_image = true
            this.images = imagePaths.map(imagePath => <img width={200} src={imagePath}/>)
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