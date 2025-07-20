import '../../../css/card.css'

const NewsCardHome = ({ title, image, author, date, caption, source }) => (
  <div className="newsCardHome">
    <img src={image} alt={title} />
    <div className='heading'>
      <div className="label">
        <h3>{title}</h3>
        <p>{caption}</p>
      </div>
      <div className="author">
        <span>{author}</span> | <span>{date}</span>
      </div>
    </div>
  </div>
);

export default NewsCardHome;
