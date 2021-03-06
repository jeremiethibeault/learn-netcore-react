import { RootStore } from "./rootStore";
import { observable, action, reaction } from "mobx";

export default class CommonStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem("jwt", token);
                } else {
                    window.localStorage.removeItem("jwt");
                }
            }
        )

        reaction(
            () => this.refreshToken,
            token => {
                if (token) {
                    window.localStorage.setItem("refreshToken", token);
                } else {
                    window.localStorage.removeItem("refreshToken");
                }
            }
        )
    }

    @observable token: string | null = window.localStorage.getItem("jwt");
    @observable refreshToken: string | null = window.localStorage.getItem("refreshToken");
    @observable appLoaded = false;

    @action setToken = (token: string | null) => {
        window.localStorage.setItem("jwt", token!);
        this.token = token;
    }

    @action setRefreshToken = (token: string | null) => {
        window.localStorage.setItem("refreshToken", token!);
        this.refreshToken = token;
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}