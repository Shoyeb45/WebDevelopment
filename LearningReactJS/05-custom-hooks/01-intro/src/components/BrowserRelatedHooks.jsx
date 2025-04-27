import { useEffect, useState } from "react";

function useIsOnline() {
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);

    useEffect(() => {
        window.addEventListener('online', () => {
            setIsOnline(true);
        })

        window.addEventListener('offline', () => {
            setIsOnline(false);
        })
    }, [])

    return isOnline;
}

export function BrowserRelatedHooks() {
    const isOnline = useIsOnline();
    console.log(isOnline);
    
    if (isOnline) {
        return (
            <div>
                You are online
            </div>
        )
    }
    return (
        <div>
            You are offline
        </div>
    )
}