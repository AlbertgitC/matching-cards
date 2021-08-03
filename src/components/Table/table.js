require("./table.css");

function Table(props) {
    return (
        <div className="table">
            {props.children}
            <div className="table__blocker">block holder</div>
        </div>
    );
};

export default Table;