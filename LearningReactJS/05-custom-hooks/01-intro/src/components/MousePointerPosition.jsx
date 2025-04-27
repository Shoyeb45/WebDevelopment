import { useEffect, useState } from "react"

function useMousePointer() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setPosition({
            x: e.clientX,
            y: e.clientY,
        })

        
    }

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return function() {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }, [])
    
    return position;
}

export function MousePointer() {
    const mousePosition = useMousePointer();

    return (
        <div>
            The mouse pointer position is : {`(${mousePosition.x}, ${mousePosition.y})`}
        </div>
    )
}