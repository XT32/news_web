import '../../../css/layout.css';

export default function NewsContent({ category, title, author, date, image, caption, content}) {
    return (
        <div className="newsContent">
        <b>{category}</b>
        <h1 className="newsTitle">{title}</h1>
        <div className="newsMeta">
            <b>{author}</b>
            <p>{date}</p>
        </div>
        <img src={image} alt={title} className="newsImage" />
        <p className="imageCaption">{caption}</p>
        <div className="newsBody">
            {content}
        </div>
        </div>
    );
}