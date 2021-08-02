import { useState } from "react";
require("./card.css");

function Card() {
    const defaultState = {
        flip: ""
    };
    const [ state, setState ] = useState(defaultState);

    function handleClick() {
        if (state.flip === "") {
            setState({ flip: "card__inner--flip" });
        } else {
            setState({ flip: "" });
        };
    };

    return (
        <div className="card" onClick={handleClick}>
            <div className={`card__inner ${state.flip}`}>
                <div className="card__front">
                    Card Front
                </div>
                <div className="card__back">
                    Ace
                </div>
            </div>
        </div>
    );
};

export default Card;