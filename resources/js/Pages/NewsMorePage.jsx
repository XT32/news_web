import '../../css/newsMorePage.css'
import Header from '@/Components/Layout/Header.jsx';
import Footer from '@/Components/Layout/Footer.jsx';
import ButtonFilter from '@/Components/Button/ButtonFilter.jsx';
import NewsMoreCard from '@/Components/Card/NewsMoreCard.jsx';
import Image from '/images/og-image.png';



const newsMorePage = () => {
  const newsCard = {
    category: "Politic",
    title: "Berita Terkini",
    image: Image,
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    date: "2 Juni 2025",
    author: "Author "
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