import styled from 'styled-components'

export interface ArrowIconProps {
    isOpen: boolean,
    isDesktop: boolean,
}

const SvgContainer = styled.div<{ isDesktop: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;

    transform: ${props => props.isDesktop ? "rotate(0deg)" : "rotate(90deg)"};
`

const Svg = styled.svg`
    path {
        stroke: ${props => props.theme.colors.white}
    }
`

const ArrowIcon = ({ isOpen, isDesktop }: ArrowIconProps) => {
    return ( 
        <SvgContainer isDesktop={isDesktop}>
            <Svg
            width={ isDesktop ? "65%" : "30%" }
            height={ isDesktop ? "auto" : "100%" }
            viewBox="0 0 135.46666 135.46667"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M 110.68399,9.2696082 25.088271,67.609689 113.57342,126.11679"
                    fill="none"
                    strokeWidth="18"
                    strokeDasharray="none"
                    transform={isOpen ? "scale(-1, 1) translate(-135.46666, 0)" : undefined}
                />
            </Svg>
        </SvgContainer>
     );
}
 
export default ArrowIcon;