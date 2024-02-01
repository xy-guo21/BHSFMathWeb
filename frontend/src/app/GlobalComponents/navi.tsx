import { useRouter } from "next/navigation";
import { Button } from "antd";

const HomeButton = ({text="home"}) => {
    const router = useRouter();
    const handleClick = ()=>{
        router.push("home");
    }
    return <Button onClick={handleClick}>
        {text}
    </Button>
}

export {HomeButton};