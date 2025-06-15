import '../../css/newsMorePage.css'
import Header from '../components/layout/header.jsx'
import Footer from '../components/layout/footer.jsx'
import ButtonFilter from '../components/button/buttonFilter.jsx'
import NewsMoreCard from '../components/card/newsMoreCard.jsx'
import Image from '../../asset/fomo3.jpg'



const newsMorePage = () => {
  const newsCard = {
    category: "Politic",
    title: "Berita Terkini",
    image: Image,
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    date: "2 Juni 2025",
    author: "Miqdad Fauzan"
  };

  return (
    <div className="newsMorePage">
        <Header />
        <div className="newsMorePageContent">
          <div className="filter">
            <ButtonFilter />
          </div>
          <div className="newsMoreCardContainer">
            <NewsMoreCard
              category={newsCard.category}
              title={newsCard.title}
              image={newsCard.image}
              caption={newsCard.caption}
              date={newsCard.date}
              author={newsCard.author}
            />
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default newsMorePage