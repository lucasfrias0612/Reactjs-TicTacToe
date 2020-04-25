class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i);
        }}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="container bg-light">
          <div className="row row-cols-3">
            {this.props.squares.map((square, index) => {
              return <div className="col" key={'square'+index}>{this.renderSquare(index)}</div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}
