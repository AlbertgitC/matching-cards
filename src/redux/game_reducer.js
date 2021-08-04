const defaultState = {
    blocking: true,
    currentCard: null,
    matched: [],
    totalPairs: null,
    reset: true,
    started: false,
    recordTime: 0
};

const gameReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "UNBLOCK":
            return { ...state, blocking: false };
        case "BLOCK":
            return { ...state, blocking: true };
        case "PICK_CARD":
            return { ...state, currentCard: action.payload };
        case "MATCHED":
            const pairs = state.matched.slice(0);
            pairs.push(action.payload);
            return { ...state, matched: pairs, currentCard: null };
        case "CLEAR_MATCHED":
            return { ...state, matched: [] };
        case "TOTAL_PAIRS":
            return { ...state, totalPairs: action.payload };
        case "RESET":
            return { ...state, reset: action.payload };
        case "START_GAME":
            return { ...state, started: action.payload };
        case "SET_TIME":
            return { ...state, recordTime: action.payload };
        default:
            return state;
    };
};

export default gameReducer;