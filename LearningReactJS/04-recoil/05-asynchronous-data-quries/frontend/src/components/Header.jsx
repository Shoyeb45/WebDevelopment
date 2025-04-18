import { useRecoilState, useRecoilValue } from 'recoil';
import { notificationAtom, allNotificationAtom } from '../stores/notification.store';
import { useEffect } from 'react';

export function Header() {
    const [notification, setNotification ] = useRecoilState(notificationAtom);
    const totalNotificationCount = useRecoilValue(allNotificationAtom);

    useEffect(() => {
        fetch("http://localhost:3000/notifications")
          .then((data) => data.json())
          .then((data) => {
            console.log(data);
            
            setNotification(data);
          });
    }, []);

    return (
        <header>
            <button>Home</button>

            <button>My Network ({notification.network >= 100? "99+": notification.network})</button>
            <button>Jobs ({notification.jobs })</button>
            <button>Messaging ({notification.messaging})</button>
            <button>Notifications ({notification.notification})</button>

            <button>Me ({totalNotificationCount})</button>
        </header>
    )
}