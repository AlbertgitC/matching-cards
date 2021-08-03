function Table(props) {
    return (
        <div>
            {props.children}
            <div>block holder</div>
        </div>
    );
};

export default Table;