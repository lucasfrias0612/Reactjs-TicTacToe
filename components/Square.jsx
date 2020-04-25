function Square(props) {
  return (
    <button className="btn btn-primary btn-lg btn-block mb-2" onClick={props.onClick}>
      &nbsp;{props.value}&nbsp;
    </button>
  );
}
