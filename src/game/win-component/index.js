import React, { useContext } from "react";
import { GameContext } from "../index";
import { WinSvg } from "./winSvg";
import "./index.css"


export const WinComponent = React.memo(() => {
    const { setBoard } = useContext(GameContext);

    const onResetGame = () => {
        setBoard((state) => ({ ...state, start: false, winner: false }))
    }

    return <div className="win-block">
        <WinSvg />
        <button onClick={onResetGame}>თავიდან დაწყება</button>
    </div>
})