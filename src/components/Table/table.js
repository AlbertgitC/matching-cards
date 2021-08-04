import { useSelector } from 'react-redux';
require("./table.css");

function Table(props) {
    const blockingState = useSelector(state => state.blocking);
    const hidden = blockingState ? "" : "table__blocker--hidden";

    return (
        <div className="table">
            {props.children}
            <div className={`table__blocker ${hidden}`}></div>
        </div>
    );
};

export default Table;