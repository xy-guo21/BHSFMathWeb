import {create} from "zustand";

export const TokenStore = create(() => ({
    token : ""
}))

export const setUserToken= (token:string) => TokenStore.setState({ token })