import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/card';
import Table from './components/Table/table';
import Timer from './components/Timer/timer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { unblock, totalPairs, reset, block, clearMatched, startGame, setTimeRecord } from './redux/actions';

function App() {
    const defaultState = {
        playModal: "",
        endModal: "modal--hidden"
    };
    const [state, setState] = useState(defaultState);
    const [deckState, setDeck] = useState([]);
    const dispatch = useDispatch();
    const matchedPairs = useSelector(state => state.matched);
    const allPairs = useSelector(state => state.totalPairs);
    const resetState = useSelector(state => state.reset);
    const recordTime = useSelector(state => state.recordTime);

    useEffect(() => {
        if (resetState) {
            const sets = ["heartA", "clubJ", "diamondQ", "spadeK", "club3", "heart2", "diamond7", "spade9"];
            let deck = [];
            for (let card of sets) {
                deck.push(card);
                deck.push(card);
            };

            function shuffleDeck(deck) {
                for (let i = deck.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [deck[i], deck[j]] = [deck[j], deck[i]];
                };
            };

            shuffleDeck(deck);
            setDeck(deck);
            dispatch(totalPairs(sets.length));
            dispatch(reset(false));
        };
    }, [dispatch, resetState]);

    useEffect(() => {
        if (matchedPairs.length === allPairs) {
            setState(s => ({ ...s, endModal: "" }));
            dispatch(startGame(false));
        } else {
            setState(s => ({ ...s, endModal: "modal--hidden" }));
        };
    }, [matchedPairs, allPairs]);

    function handlePlay() {
        setState({ ...state, playModal: "modal--hidden" });
        dispatch(unblock());
    };

    function handlePlayAgain() {
        setState({ ...state, endModal: "modal--hidden" });
        dispatch(block());
        dispatch(clearMatched());
        dispatch(setTimeRecord(0));

        setTimeout(() => {
            dispatch(reset(true));
            dispatch(unblock());
        }, 1000);
    };

    return (
        <div className="App">
            <Timer />
            <Table>
                {
                    deckState.map((card, i) => <Card value={card} key={i} />)
                }
            </Table>
            <div className="links">
                <a 
                    className="link-icon"
                    href="https://www.linkedin.com/in/albert-yue-hsi-cheng-6486b4197/" 
                    target="_blank"
                    rel="noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a 
                    className="link-icon" 
                    href="https://github.com/AlbertgitC/matching-cards" 
                    target="_blank" 
                    rel="noreferrer">
                    <FontAwesomeIcon icon={faGithubSquare} />
                </a>
            </div>
            <div className={`modal ${state.playModal}`}>
                <p>Matching the pairs!</p>
                <button type="button" onClick={handlePlay}>Play</button>
            </div>
            <div className={`modal ${state.endModal}`}>
                <p>Your Time</p>
                <p>{Math.trunc(recordTime / 600)}:{((recordTime % 600) / 10).toFixed(1)}</p>
                <button type="button" onClick={handlePlayAgain}>Play Again</button>
            </div>
        </div>
    );
}

export default App;
