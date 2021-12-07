import React, { useCallback, useContext, useMemo, useState } from "react";
import { GameContext } from "../../";
import { winMap } from "./utils";




let lastElement;
const useSvgXOBoxes = (boardArray, onWinCheck) => {
    const { board: { boardLength } } = useContext(GameContext)

    return useMemo(() => {
        const length = boardLength + 1,
            scalSize = 1 * (100 / (boardLength / 4 * 100)),
            newWidth = scalSize * 60

        return Array.from(Array(boardLength * boardLength), (_, index) => {
            const start_Y = (572 / length / 2),
                line_X = Math.floor(index / boardLength) + 1,
                line_Y = boardLength - (Math.ceil((index + 1) / boardLength) * boardLength - index) + 1,
                X = 680 + (start_Y * 2) * line_Y - newWidth / 4,
                Y = 206 + (start_Y * 2) * line_X - newWidth / 4,
                rectScale = 37 * scalSize;


            return <g
                key={index}
                onClick={() => {
                    onWinCheck(index, "X", scalSize, X, Y)
                }}
                onDoubleClick={() => {
                    const rectScale = 20 * scalSize;
                    onWinCheck(index, "O", scalSize, X - rectScale, Y - rectScale)
                }}
                className="hover-xo-path"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    transform={`translate(${X - rectScale} ${Y - rectScale}) scale(${scalSize})`}
                    width="105"
                    height="105"
                    fill={(boardArray[index]?.bgColor) || "rgba(42,178,187,0)"}
                />
                {boardArray[index]?.element}
            </g>


        })

    }, [boardLength, boardArray, onWinCheck])
}








const useSvgNodeLines = () => {
    const { board: { boardLength } } = useContext(GameContext)
    return useMemo(() => {
        let length = boardLength + 1,
            height = Math.sqrt(length);

        return Array.from(Array(length), (_, index) => {
            let oneBlock = ((572 / length) * index),
                transformY = (206 + oneBlock + (572 / length / 2 - (height / 2)))

            return <g key={index} >
                <rect id="Rectangle_9-2" data-name="Rectangle 9" width="572" height={height} rx={height / 2} transform={`translate(680 ${transformY})`} fill="#003a3e" />
            </g>
        })
    }, [boardLength])

}







const useSvgXOPaths = () => {
    return useMemo(() => {
        return {
            X: (X, Y, scalSize) => <path transform={`translate(${X} ${Y}) scale(${scalSize})`} d="M-.09-9.927c3.236-1.295,15.955,26.512,28.921,25.9,9.563-.453,23.917-31.3,29.591-25.9C62.845-5.722,41.553,11.667,41.5,19.789,41.407,34.864,60.507,38.055,56.65,45.416S43.016,24.56,28.831,25.514,5.695,51.959-.09,49.233s18.73-26.99,18.73-26.99S-3.326-8.632-.09-9.927Z" fill="#ab3939" />,
            O: (X, Y, scalSize) => <path transform={`translate(${X} ${Y}) scale(${scalSize})`} d="M40,80A40.01,40.01,0,0,1,24.431,3.143a40.01,40.01,0,0,1,31.14,73.713A39.75,39.75,0,0,1,40,80ZM40,5.3c-6.894,0-11.477,2.916-14.011,8.914-2.35,5.564-2.674,13.021-2.674,20.251,0,2.707-.146,5.761-.3,8.994v.014c-.545,11.409-1.162,24.34,4.113,29.873a8.919,8.919,0,0,0,6.736,2.7c7.282,0,17.181-4.308,25.836-11.242A50.479,50.479,0,0,0,70.023,53.878c2.772-4.134,4.177-8.058,4.177-11.661,0-7.112-4.38-16.357-11.431-24.129C55.5,10.078,46.989,5.3,40,5.3Z" fill="#174de2" />
        }
    }, [])
}




const useWinChecker = (boardArray, setBoardArray) => {
    const XOpaths = useSvgXOPaths()
    const { board: { difficulty }, setBoard } = useContext(GameContext)

    return useCallback((index, value, scalSize, X, Y) => {
        if (boardArray[index] && lastElement !== boardArray[index]) {
            alert("არ გაქვთ ცვლილების უფლება")
            return;
        }
        boardArray[index] = {
            value: value,
            element: XOpaths[value](X, Y, scalSize)
        }

        setBoardArray([...boardArray]);
        lastElement = boardArray[index]
        winMap(boardArray, index, value, setBoardArray, difficulty, setBoard)

    }, [XOpaths, boardArray, difficulty, setBoard, setBoardArray])
}







export const useSvgData = () => {
    const { board: { boardLength } } = useContext(GameContext)
    const [boardArray, seBoardArray] = useState(Array(boardLength * boardLength))
    const onWinCheck = useWinChecker(boardArray, seBoardArray)
    const svgXOBoxes = useSvgXOBoxes(boardArray, onWinCheck)
    const svgNodeLines = useSvgNodeLines()
    return {
        svgXOBoxes,
        svgNodeLines,
    }
}