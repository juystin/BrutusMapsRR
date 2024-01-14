import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";

const AnimatedDot = () => {

    const [animation, api] = useSpring(() => ({
        from: {
            opacity: 0.2
        },
        config: {
            tension: 100,
            friction: 20,
            mass: 1
        },
    }))

    useEffect(() => {
        
    })

    return ( 
        <animated.div>
            
        </animated.div>
     );
}
 
export default AnimatedDot;