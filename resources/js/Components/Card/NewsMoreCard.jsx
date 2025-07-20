import '../../../css/card.css'

export default function NewsCardSearch({ category, title, image, author, date, caption }) {
    return (
        <div className="newsCardSearch">
            <div className="newsSearchImage"style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}/>
            <div className="heading">
                <div className="topHeading">
                    <label>{category}</label>
                    <h2>{title}</h2>
                    <p>{caption}</p>
                </div>
                <div className="author">
                    <span className="name">{author}</span>{date}
                </div>
            </div>
        </div>
    );
}