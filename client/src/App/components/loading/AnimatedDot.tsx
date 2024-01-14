import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

interface AnimatedDotProps {
    dataLoaded: boolean,
    index: number,
    loadAnimationPlaying: boolean,
    setLoadAnimationPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

function calculateDelay(index: number): number {
    let delay: number;

    if (index === 0) {
        delay = 100
    } else if (index === 1) {
        delay = 200
    } else if (index === 2) {
        delay = 300
    } else if (index === 5) {
        delay = 400
    } else if (index === 8) {
        delay = 500
    } else if (index === 7) { 
        delay = 600
    } else if (index === 6) {
        delay = 700
    } else if (index === 3) {
        delay = 800
    } else {
        delay = 400
    }

    return delay
}

const AnimatedDot = ({ dataLoaded, index, loadAnimationPlaying, setLoadAnimationPlaying }: AnimatedDotProps) => {

    const [bounce, setBounce] = useState(true);

    const containerStyle = {
        height: "75%",
        width: "75%",
        backgroundColor: "#13070C",
        borderRadius: "50%"
    }

    const [animation, api] = useSpring(() => ({
        from: {
            opacity: 0.1
        },
        config: {
            duration: 800
        }
    }))

    useEffect(() => {
        if (!loadAnimationPlaying) {
            setBounce(true)
            setLoadAnimationPlaying(true)
        }
    })

    useEffect(() => {
        if (loadAnimationPlaying) {
            api.start({
                to: {
                    opacity: bounce ? 1 : 0.1
                },
                onRest: () => {
                    if (bounce) {
                        setBounce(!bounce)
                    }
                    if (!bounce && index === 3) {
                        setTimeout(() => {
                            setLoadAnimationPlaying(false)
                        }, dataLoaded ? 250 : 0)
                    }
                },
                delay: calculateDelay(index)
            })
        }
    }, [dataLoaded, loadAnimationPlaying, bounce])

    return ( 
        <animated.div style={{
            ...containerStyle,
            ...animation
        }}>
            
        </animated.div>
     );
}
 
export default AnimatedDot;