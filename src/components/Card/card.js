export default function Card(props) {
  return (
    <div className="card" style={{ maxWidth: "32rem" }}>
      {props.header && <div className="card-header">{props.header}</div>}
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
      </div>
    </div>
  );
}
