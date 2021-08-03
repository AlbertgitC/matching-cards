import { useState, useEffect, useRef } from "react";
require("./card.css");

function Card(props) {
    const defaultState = {
        flip: "",
        cardImg: ""
    };
    const [state, setState] = useState(defaultState);
    const [cardHeight, setHeight] = useState("150px");
    const cardEle = useRef(null);

    useEffect(() => {
        if (props.value) {
            import(`./cardImages/${props.value}.png`)
                .then(res => {
                    setState({ ...state, cardImg: res.default });
                });
        } else {
            import("./cardImages/jokerB.png")
                .then(res => {
                    setState({ ...state, cardImg: res.default });
                });
        };
    }, []);

    useEffect(() => {
        function resizeCard() {
            if (cardEle.current.clientWidth) {
                let newHeight = cardEle.current.clientWidth * 1.42;
                setHeight(`${newHeight}px`);
                console.log(newHeight);
            };
        };

        window.addEventListener("resize", resizeCard);

        resizeCard();

        return () => window.removeEventListener("resize", resizeCard);
    }, []);

    function handleClick() {
        if (state.flip === "") {
            setState({ ...state, flip: "card__inner--flip" });
        } else {
            setState({ ...state, flip: "" });
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