import { useRecoilValue } from 'recoil';
import { notificationAtom, networkAtom, jobsAtom, messageAtom, allNotificationAtom } from '../stores/header.store';
import { useMemo } from 'react';
export function Header() {

    const notificationCount = useRecoilValue(notificationAtom);
    const networkCount = useRecoilValue(networkAtom);
    const jobsCount = useRecoilValue(jobsAtom);
    const messageCount = useRecoilValue(messageAtom);


    // total count of all the notifications should show on me,

    // ugly way
    // const totalNotification = notificationCount + networkCount + jobsCount + messageCount;
    
    // better way 
    // const totalNotification = useMemo(() => notificationCount + networkCount + jobsCount + messageCount, [notificationCount, networkCount, jobsCount, messageCount]);

    // best way : use recoil selector
    const totalNotificationCount = useRecoilValue(allNotificationAtom);

    return (
        <header>
            <button>Home</button>

            <button>My Network ({networkCount >= 100? "99+": networkCount})</button>
            <button>Jobs ({jobsCount })</button>
            <button>Messaging ({messageCount})</button>
            <button>Notifications ({notificationCount})</button>

            <button>Me ({totalNotificationCount})</button>
        </header>
    )
}