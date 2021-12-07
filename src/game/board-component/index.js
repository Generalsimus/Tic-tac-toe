import React, { useContext } from "react";
import { GameContext } from "../index";
import { SvgBoard } from "./svg-board";
import "./index.css";



export const BoardComponent = React.memo(() => {
    const { setBoard } = useContext(GameContext)
    const onResetGame = () => {
        setBoard((a) => ({ ...a, start: false }))
    }
    return <div className="Board_box">
        <div className="Board_top">
            <button className="Board_button" onClick={onResetGame}>თავიდან დაწყება</button>
        </div>
        <SvgBoard />
    </div>
})