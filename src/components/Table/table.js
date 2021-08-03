require("./table.css");

function Table(props) {
    return (
        <div className="table">
            {props.children}
            <div>block holder</div>
        </div>
    );
};

export default Table;