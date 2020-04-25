class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squaresHistory: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
  render() {
    const squaresHistory = this.state.squaresHistory;
    const squaresCurrent = squaresHistory[this.state.stepNumber];
    const winner = calculateWinner(squaresCurrent.squares);

    const moves = squaresHistory.map((step, move) => {
      const desc = move ? "Ir al movimiento: " + move : "Ir al inicio";
      const itemId = "list-item" + move;
      return (
        <a
          href="#"
          key={move}
          id={itemId}
          className="list-group-item list-group-item-action"
          onClick={() => {
            this.jumpTo(move);
            const allItems = document.getElementsByClassName(
              "list-group-item-action"
            );
            for (let i = 0; i < allItems.length; i++)
              allItems[i].classList.remove("active");
            document.getElementById(itemId).classList.toggle("active");
          }}
        >
          {desc}
        </a>
      );
    });
    let status;
    if (winner) {
      status = "Ganador: " + winner + "!";
    } else {
      status = "Turno de: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="container mt-3">
        <div className="game row">
          <div className="game-board col-sm-12 col-md-8">
            <div className="p-3 mb-2 bg-info text-white text-center">
              {status}
            </div>
            <Board
              squares={squaresCurrent.squares}
              onClick={(i) => {
                this.handleClick(i);
              }}
            />
          </div>
          <div className="game-info col-sm-12 col-md-4 mt-4">
            <div className="list-group">{moves}</div>
          </div>
        </div>
      </div>
    );
  }

  handleClick(i) {
    const squaresHistory = this.state.squaresHistory.slice(
      0,
      this.state.stepNumber + 1
    );
    const squaresCurrent = squaresHistory[squaresHistory.length - 1];
    const tempSquares = squaresCurrent.squares.slice();
    if (calculateWinner(tempSquares) || tempSquares[i]) return;
    tempSquares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squaresHistory: squaresHistory.concat([{ squares: tempSquares }]),
      stepNumber: squaresHistory.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
