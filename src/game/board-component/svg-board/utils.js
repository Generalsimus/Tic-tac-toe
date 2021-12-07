const left = (index, length, line = Math.floor(index / length)) => {
    return Math.floor((index - 1) / length) === line && index - 1
}

const right = (index, length, line = Math.floor(index / length)) => {
    return Math.floor((index + 1) / length) === line && index + 1
}
const Position_Array = [{
    top: (index, length) => index - length,
    bottom: (index, length) => index + length
}, {
    left: left,
    right: right
}, {
    leftBottom: (index, length) => left(index + length, length),
    rightTop: (index, length) => right(index - length, length)
}, {
    leftTop: (index, length) => left(index - length, length),
    rightBottom: (index, length) => right(index + length, length)
}]




const winCheck = (boardArray, index, value, startIndex, objectPositon, startPosition) => {
    let length = Math.sqrt(boardArray.length)

    if (startPosition) {
        let newIndex = objectPositon[startPosition](index, length);
        if (boardArray[newIndex]?.value === value) {

            winCheck(boardArray, newIndex, value, startIndex, objectPositon, startPosition)
        }

    } else {

        for (var prop in objectPositon) {

            let newIndex = objectPositon[prop](index, length);

            if (boardArray[newIndex]?.value === value) {
                winCheck(boardArray, newIndex, value, startIndex, objectPositon, prop)

            }

        }

    }


    startIndex.push(index)

    return startIndex
}



export const winMap = (boardArray, index, value, setBoardArray, difficulty, setBoard) => {

    Position_Array.forEach((objectPositon) => {
        let res = winCheck(boardArray, index, value, [], objectPositon)

        if (res.length > (difficulty - 1)) {

            let i = 0,
                Interval = setInterval(() => {
                    setBoardArray((old_Array) => {
                        res.forEach((v) => {
                            old_Array[v] = {
                                ...old_Array[v],
                                bgColor: Math.floor(i / 2) === i / 2 ? (value === "X" ? "rgba(171,57,57,0.5)" : "rgba(23,77,226,0.5)") : "rgba(0,0,0,0)"
                            }

                        })
                        return [...old_Array]
                    })
                    if (i === 3) {
                        clearInterval(Interval)
                        setBoard((state) => ({
                            ...state,
                            winner: value
                        }))
                    }
                    i++
                }, 150)


        } else {
            for (var propof of boardArray) {
                if (!propof) {
                    return
                }
            }

            setBoard((state) => ({
                ...state,
                winner: "F"
            }))
        }
    })
}