'use client'
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const Home: React.FC = () => {
  const router = useRouter();
  const handleClick = (href: string) =>{
    router.push(href);
  }
  return <>
    <h1>Hello, World!</h1>
    <Button onClick={()=>{handleClick('/user')}}>User Home Page</Button>
    <Button onClick={()=>{handleClick('/problem')}}>Problem Set</Button>
    <Button onClick={()=>{handleClick('/discussion')}}>Discussion</Button>
  </>
}
export default Home;