import { animated, useSpring } from "@react-spring/web"
import { useEffect } from "react"

export interface MarkerLogoProps {
    available: boolean,
    clicked: boolean,
    setClicked: React.Dispatch<React.SetStateAction<boolean>>,
    activeMarker: number,
    setActiveMarker: React.Dispatch<React.SetStateAction<number>>,
    buildingNum: number,
    setHoveringOverMarker: React.Dispatch<React.SetStateAction<boolean>>
}

const MarkerLogo = ({ available, clicked, setClicked, activeMarker, setActiveMarker, buildingNum, setHoveringOverMarker }: MarkerLogoProps) => {

    const [animation, api] = useSpring(() => ({
        from: {
            strokeDasharray: "10 50",
            strokeDashoffset: "75",
            opacity: 0
        }
    }))

    const handleClick = () => {
        setClicked((state) => !state)
        setActiveMarker(buildingNum)
    }

    useEffect(() => {
        if (available) {
            api.start({
                to: {
                    strokeDashoffset: clicked && activeMarker === buildingNum ? "101" : "75",
                    opacity: clicked && activeMarker === buildingNum ? 1 : 0
                },
                config: {
                    tension: 100,
                    friction: 30,
                    mass: 1
                },
                delay: 192
            })
        }
    }, [clicked, activeMarker])

    return ( 
        <svg
            width="100%"
            viewBox="0 0 135.46666 203.2"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            pointerEvents={"none"}>
            <g transform="matrix(1.1588572,0,0,1.1588572,-9.0525663,-17.144586) ">
                <path
                    display="inline"
                    fill={available ? "#BA0C2F" : "#A7B1B7"}
                    stroke={available ? "#BA0C2F" : "#A7B1B7"}
                    strokeWidth="0.330729"
                    d="M 64.652259,181.46587 C 62.696472,177.3655 41.199546,132.00857 19.859121,74.898126 11.554877,52.674616 20.723041,11.721423 64.652259,10.008733 108.58148,11.721423 117.74964,52.674616 109.4454,74.898126 88.104972,132.00857 66.608046,177.3655 64.652259,181.46587 Z"
                    id="path1"
                    inkscape:original-d="m 64.796689,181.76798 c 0,0 -22.554865,-46.9701 -44.937568,-106.869854 -8.406785,-22.497925 1.093,-64.190936 46.43638,-64.9347792"
                    inkscape:path-effect="#path-effect1"
                    transform="translate(1.5930187,8.3095321)"
                    pointerEvents={"all"}
                    cursor={"pointer"}
                    onClick={() => handleClick()}
                    onMouseEnter={() => setHoveringOverMarker(true)}
                    onMouseLeave={() => setHoveringOverMarker(false)}
                    />
                <circle
                    display="inline"
                    fill="#FFFFFF"
                    stroke="none"
                    strokeWidth="0.330729"
                    id="path2"
                    cx="66.108734"
                    cy="65.32711"
                    r="29.848427"
                    pointerEvents={"all"}
                    cursor={"pointer"}
                    onClick={() => handleClick()}
                    onMouseEnter={() => setHoveringOverMarker(true)}
                    onMouseLeave={() => setHoveringOverMarker(false)}
                    />
                <animated.path
                    fill="none"
                    stroke={available ? "#B63651" : "#A7B1B7"}
                    strokeWidth="1.4"
                    d="m 65.526827,62.664006 c 0.09184,-5.510555 4.44153,-9.911638 9.709125,-9.823845 5.267595,0.08779 9.468206,4.63138 9.376363,10.141935 -0.09184,5.510555 -4.44153,9.911638 -9.709125,9.823845 -5.267594,-0.08779 -9.468205,-4.63138 -9.376363,-10.141935 z"
                    style={animation}
                    id="path4"
                    inkscape:path-effect="#path-effect4"
                    inkscape:original-d="m 65.526827,62.664006 19.085483,0.31809"
                    transform="matrix(2.3603739,0,0,2.3185732,-110.93224,-80.150266)"
                    pointerEvents={"all"}
                    cursor={"pointer"}
                    onClick={() => handleClick()}
                    onMouseEnter={() => setHoveringOverMarker(true)}
                    onMouseLeave={() => setHoveringOverMarker(false)}
                    />
            </g>
            </svg>

     );
}
 
export default MarkerLogo;