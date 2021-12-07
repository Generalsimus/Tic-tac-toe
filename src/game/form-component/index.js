import React, { useContext } from "react";
import { GameContext } from "../index";
import "./index.css"

export const FormComponent = React.memo(() => {
    const { board: { difficulty, boardLength }, setBoard } = useContext(GameContext)

    const onStartGame = () => setBoard((a) => ({ ...a, start: true }))

    const onChangeBoardLength = (event) => setBoard((a) => ({ ...a, boardLength: Math.max(Math.min(25, parseInt(event.target.value)), 3) }))

    const onChangeDifficulty = (event) => {
        const min = Math.min(difficulty, boardLength)
        setBoard((a) => ({ ...a, difficulty: Math.max(Math.min(boardLength, parseInt(event.target.value)), min) }))
    }
    return <div className="start-form">
        <form onSubmit={onStartGame}>
            <input
                type="number"
                autoComplete="off"
                value={boardLength}
                placeholder="მაგიდის სიგრძე"
                onInput={onChangeBoardLength} />
            <input
                type="number"
                autoComplete="off"
                value={difficulty}
                placeholder="სირთულე"
                onInput={onChangeDifficulty}
            />
            <input onClick={onStartGame} type="button" value="დაწყება"></input>
        </form>
    </div>
})