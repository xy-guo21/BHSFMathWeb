import {create} from "zustand";

export const UserTokenStore = create(() => ({
    userToken : ""
}))

export const setUserToken = (userToken :string) => {
    console.log("userToken =" +userToken)
    if (userToken){
        UserTokenStore.setState({ userToken })
    } else {
        throw new Error("Invalid user token.");
    }
}