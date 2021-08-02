import { useState, useEffect } from "react";
require("./card.css");

function Card(props) {
    const defaultState = {
        flip: "",
        cardImg: ""
    };
    const [ state, setState ] = useState(defaultState);

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

    function handleClick() {
        if (state.flip === "") {
            setState({ ...state, flip: "card__inner--flip" });
        } else {
            setState({ ...state, flip: "" });
        };
    };

    return (
        <div className="card" onClick={handleClick}>
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