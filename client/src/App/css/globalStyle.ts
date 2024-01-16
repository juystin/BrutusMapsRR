import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        font-family: system-ui;

        color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: #13070C;

        width: 100%;
        height: 100%;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #root {
        width: 100%;
        height: 100%;
        background: #13070C;
    }

    body { 
        margin: 0 0 !important;
        padding: 0 0 !important;
        height: 100%;
        width: 100%;
    }

    h1 {
        margin: 0 0;
        cursor: default;
        color: #EEE5E9;
    }

    h2 {
        margin: 0 0;
        cursor: default;
        color: #EEE5E9;
    }

    h3 {
        margin: 0 0;
        cursor: default;
        color: #13070C;
    }

    p {
        font-weight: normal;
        color: #13070C;
    }

    div {
        margin: 0 0;
    }

    ::-webkit-scrollbar {
        height: 0;
        width: 0;
    }
`;

export default GlobalStyles;