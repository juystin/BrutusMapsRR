import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
    colors: {
        white: "#EEE5E9",
        black: "#13070C",
        scarlet: "#BA0C2F",
        gray: "#A7B1B7"
    },
    fonts: ["Inter", "system-ui"]
};

export interface ThemeProps {
    children: React.ReactNode
}

const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;