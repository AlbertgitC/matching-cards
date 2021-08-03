import logo from './logo.svg';
import './App.css';
import Card from './components/Card/card';
import Table from './components/Table/table';
import Timer from './components/Timer/timer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';

function App() {
    const sets = ["heartA", "clubJ", "diamondQ", "spadeK", "club3", "heart2", "diamond7", "spade9"];
    const deck = [];

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

    return (
        <div className="App">
            <Timer />
            <Table>
                {
                    deck.map((card, i) => <Card value={card} key={i} />)
                }
            </Table>
            <div className="links">
                <a className="link-icon" href="https://www.linkedin.com/in/albert-yue-hsi-cheng-6486b4197/" target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a className="link-icon" href="https://github.com/AlbertgitC/matching-cards" target="_blank">
                    <FontAwesomeIcon icon={faGithubSquare} />
                </a>
            </div>
        </div>
    );
}

export default App;
