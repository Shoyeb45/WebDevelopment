import { useEffect, useState } from "react";

function useDimesions() {
    const [dimesion, setDimension] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    useEffect(() => {
        window.addEventListener("resize", () => {
            setDimension({
                height: window.innerHeight,
                width: window.innerWidth
            });
        })
    }, [])

    return dimesion;
}

export function WidthAndHeight() {
    const { height, width } = useDimesions();

    return (
        <div>
            The height is : {height}, width is : {width}
        </div>
    )
}