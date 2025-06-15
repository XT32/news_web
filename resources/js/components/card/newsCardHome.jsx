import '../../../css/card.css'

const NewsCardHome = ({ title, image, date, author }) => {
  return (
      <div className="card">
        <div
          className="card-image"
          style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="heading">
            <p>{title}</p>
            <div className="author">
                {date} <span>|</span> <span className="name">{author}</span>
            </div>
        </div>
      </div>
  );
};


export default NewsCardHome;
