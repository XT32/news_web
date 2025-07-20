import '../../../css/card.css';

export default function PopulerNewsCard({ title, image, author, date, caption }) {
  return (
    <div className="PopulerNewsCard">
      <div className="imageWrapper">
        {image && <img src={image} alt={title} />}
      </div>
      <aside>
        <div className="label">
          <b>Trending</b>
          <h1 className="newsTitle">{title}</h1>
        </div>
        <p className="newsCaption">{caption}</p>
        <div className="meta">
          <span>{date}</span>
          <span> | </span>
          <span>{author}</span>
        </div>
      </aside>
    </div>
  );
}