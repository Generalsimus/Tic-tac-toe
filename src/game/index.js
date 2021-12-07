import React, { createContext } from "react";
import { BoardComponent } from "./board-component";
import { FormComponent } from "./form-component";
import { useGameContext } from "./hooks";
import { WinComponent } from "./win-component";

export const GameContext = createContext() 

export const Game = React.memo(() => {
    const contextValue = useGameContext()
    const { board: { winner, start } } = contextValue

    return <GameContext.Provider value={contextValue}>
        {winner ? <WinComponent /> : (start ? <BoardComponent /> : <FormComponent />)}
    </GameContext.Provider>
})