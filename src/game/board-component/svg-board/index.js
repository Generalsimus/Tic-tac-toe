import React from "react";
import { useSvgData } from "./hooks";
import "./index.css";

export const SvgBoard = React.memo(() => {
    const { svgXOBoxes, svgNodeLines } = useSvgData()


    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 572 572">
        <g transform="translate(-680 -206)">
            <g transform="translate(1458 -474) rotate(90)">
                {svgNodeLines}
            </g>
            {svgNodeLines}
            {svgXOBoxes}
        </g>
    </svg>
})