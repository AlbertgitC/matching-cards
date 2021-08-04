import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { pickCard, block, unblock, matched, startGame } from '../../redux/actions';
require("./card.css");

function Card(props) {
    const defaultState = {
        flip: "",
        cardImg: ""
    };
    const [state, setState] = useState(defaultState);
    const [cardHeight, setHeight] = useState("150px");
    const cardEle = useRef(null);
    const { value } = props;
    const currentCard = useSelector(state => state.currentCard);
    const matchedPairs = useSelector(state => state.matched);
    const gameStarted = useSelector(state => state.started);
    const dispatch = useDispatch();

    useEffect(() => {
        if (value) {
            import(`./cardImages/${value}.png`)
                .then(res => {
                    setState(state => {
                        return { ...state, cardImg: res.default };
                    });
                });
        } else {
            import("./cardImages/jokerB.png")
                .then(res => {
                    setState(state => {
                        return { ...state, cardImg: res.default };
                    });
                });
        };
    }, [value]);

    useEffect(() => {
        function resizeCard() {
            if (cardEle.current.clientWidth) {
                let newHeight = cardEle.current.clientWidth * 1.42;
                setHeight(`${newHeight}px`);
            };
        };

        window.addEventListener("resize", resizeCard);

        resizeCard();

        return () => window.removeEventListener("resize", resizeCard);
    }, []);

    useEffect(() => {
        if (!matchedPairs.includes(value)) {
            if (!currentCard && state.flip !== "") {
                setState({ ...state, flip: "" });
            };
        };
    }, [currentCard, matchedPairs, state, value]);

    function handleClick() {
        if (state.flip === "") {
            setState({ ...state, flip: "card__inner--flip" });
            if (!gameStarted) {
                dispatch(startGame(true));
            };
            if (!currentCard) {
                dispatch(pickCard(value));
            } else if (currentCard && currentCard !== value) {
                dispatch(block());
                setTimeout(() => {
                    dispatch(pickCard(null));
                    dispatch(unblock());
                }, 1500);
            } else if (currentCard === value) {
                dispatch(matched(value));
            };
        };
    };

    return (
        <div className="card" ref={cardEle} style={{ height: `${cardHeight}` }} onClick={handleClick}>
            <div className={`card__inner ${state.flip}`}>
                <div className="card__back" />
                <div 
                    className="card__front"
                    style={{ backgroundImage: `url(${state.cardImg})` }} />
            </div>
        </div>
    );
};

export default Card;