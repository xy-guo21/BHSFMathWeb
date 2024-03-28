import {create} from "zustand";

export const SessionIDStore = create(() => ({
    sessionID : ""
}))

export const setUserSession = (sessionID :string) => SessionIDStore.setState({ sessionID })