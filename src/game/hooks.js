import React, { useState } from "react";





export const useGameContext = () => {
    const [board, setBoard] = useState({
        start: false,
        difficulty: 3,
        boardLength: 3,
        winner: false,
    })
    return {
        board,
        setBoard
    }
}