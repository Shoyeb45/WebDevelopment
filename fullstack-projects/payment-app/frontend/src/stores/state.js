import { atom, selector } from "recoil";
import { domain, isAccessTokenExpired } from "../utils/helperFunctions";

export const isUserLoggedInAtom = atom({
    key: "isUserLoggedInAtom",
    default: false
}); 

export const balanceAtom = atom({
    key: "balanceAtom",
    default: selector({
        key: "balanceSelector",
        get: async () => {
            try {
                let res = await fetch(`${domain}/account/getbalance`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                res = await res.json();
                if (!res.ok) {
                    return 0;
                }
                
                return res.balance;
            } catch (error) {
                console.log(error);
                
                return 0;
            }
        }
    })
});

export const transactionsAtom = atom({
    key: "transactionsAtom",
    default: selector({
        key: "transactionSelector",
        get: async () => {
            try {
                let response = await fetch(`${domain}/account/history`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                response = await response.json();

                if (!response.ok) {
                    return [];
                }

                return response.history;
            } catch (error) {
                console.error(error);
                return [];
            }
        }
    })
});

export const usersAtom = atom({
    key: "usersAtom",
    default: selector({
        key: "userselector",
        get: async () => {
            try {
                let response = await fetch(`${domain}/user/users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                response = await response.json();

                if (!response.ok) {
                    return [];
                }

                return response.users;
            } catch (error) {
                console.error(error);
                return [];
            }
        }
    })
});