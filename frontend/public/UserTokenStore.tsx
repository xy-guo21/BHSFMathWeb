import {create} from "zustand";

export const UserTokenStore = create(() => ({
    userToken : ""
}))

export const setUserToken = (userToken :string) => UserTokenStore.setState({ userToken })