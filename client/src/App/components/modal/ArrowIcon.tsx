export interface ArrowIconProps {
    isOpen: boolean
}

const ArrowIcon = ({ isOpen }: ArrowIconProps) => {
    return ( 
        <svg
        width="80%"
        height="auto"
        viewBox="0 0 135.46666 135.46667"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
            <path
                d="M 110.68399,9.2696082 25.088271,67.609689 113.57342,126.11679"
                fill="none"
                stroke="#EEE5E9"
                strokeWidth="18"
                strokeDasharray="none"
                transform={isOpen ? "scale(-1, 1) translate(-135.46666, 0)" : undefined}
            />
        </svg>
     );
}
 
export default ArrowIcon;