import "./../styles/card.css";

export function Card(props) {
  let i = 1, j = 1;
  return (
    <div className="card">
      <div className="name">{props.user.name}</div>

      <div className="description">
        {props.user.description}
      </div>

      <div className="interests">
        <ul>
          {props.user.interests.map((interest) => {
            return <li key={i++}>{interest}</li>;
          })}
        </ul>
      </div>

      <div className="socials">
        <ul>
          {props.user.socialHandles.map((socialHandle) => {
            return (
              <li key={j++}> 
                <a href={socialHandle.url}>
                    <i className={`bi bi-${socialHandle.name}`}></i>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
