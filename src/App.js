import logo from './logo.svg';
import './App.css';
import Card from './components/Card/card';
import Table from './components/Table/table';

function App() {
    const sets = [ "heartA", "clubJ", "diamondQ", "spadeK" ];
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
        <Table>
            {
                deck.map((card, i) => <Card value={card} key={i} />)
            }
        </Table>
        </div>
    );
}

export default App;
