export const unblock = () => ({
    type: "UNBLOCK"
});

export const block = () => ({
    type: "BLOCK"
});

export const pickCard = res => ({
    type: "PICK_CARD",
    payload: res
});

export const matched = res => ({
    type: "MATCHED",
    payload: res
});

export const totalPairs = res => ({
    type: "TOTAL_PAIRS",
    payload: res
});

export const reset = res => ({
    type: "RESET",
    payload: res
});

export const clearMatched = () => ({
    type: "CLEAR_MATCHED"
});

export const startGame = res => ({
    type: "START_GAME",
    payload: res
});

export const setTimeRecord = res => ({
    type: "SET_TIME",
    payload: res
});