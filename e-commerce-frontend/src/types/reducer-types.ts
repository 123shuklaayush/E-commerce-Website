import { User } from "./types";


export interface UserReducerInitialState {
    user : User | null;
    loading: boolean;
}