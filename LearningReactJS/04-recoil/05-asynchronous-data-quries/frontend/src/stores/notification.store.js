import { atom, selector } from "recoil";
import axios from "axios";

export const notificationAtom = atom({
    key: "notificationAtom",
    default: selector({
        key: "notificationSelector",
        get: async () => {
            setTimeout(() => {console.log("hi")}, )
            let res = await axios.get("http://localhost:3000/notifications");
     
            return res.data;
        }
    })
});


export const allNotificationAtom = selector({
    key: "allNotificationAtom",
    get: ({ get }) => {
        const notification = get(notificationAtom);
        
        return notification.network + notification.jobs + notification.messaging + notification.notification;
    }
})