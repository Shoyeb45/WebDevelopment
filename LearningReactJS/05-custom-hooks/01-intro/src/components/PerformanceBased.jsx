import { useEffect, useState } from "react"

function useInterval(fn, time) {
    useEffect(() => {
        setInterval(() => {
            fn();
        }, time * 1000)
    }, [])
}

export function PerformanceBasedHooksEx() {
    const [count, setCount] = useState(0);

    useInterval(() => {
        setCount(c => c + 1)
    }, 1)

    return (
        <div>
            The count is {count}
        </div>
    )
}