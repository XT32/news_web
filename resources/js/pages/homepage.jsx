import '../../css/homepage.css'
import Header from '../components/layout/header.jsx'
import Footer from '../components/layout/footer.jsx'
import PopulerNewsCard from '../components/card/populerNewsCard.jsx'
import NewsCardHome from '../components/card/newsCardHome.jsx'
import Image from '../../asset/fomo3.jpg'
import ButtonViewMore from '../components/button/buttonViewMore.jsx'
import RunningText from '../components/layout/runningText.jsx'


export default function Homepage(){
  const beritaPopuler = {
    title: "LOrem Ipsum Dolor Sit Amet",
    image: Image,
    author: "Miqdad Fauzan",
    date: "2 Juni 2025",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nunc sem, laoreet vitae euismod sit amet, vehicula vel dolor. Maecenas egestas est in bibendum placerat."
  };

  const breaking ={
    text: "ali goblok asu ajig"
  };

    return(
        <div className="homepage">
            <Header />
            <PopulerNewsCard
            title={beritaPopuler.title}
            image={beritaPopuler.image}
            author={beritaPopuler.author}
            date={beritaPopuler.date}
            caption={beritaPopuler.caption}
             />
             <RunningText
             text={breaking.text}
             />
            <div className="newsCardHomeContainer">
              <NewsCardHome
              title={beritaPopuler.title}
              image={beritaPopuler.image}
              author={beritaPopuler.author}
              date={beritaPopuler.date}
              />
            </div>
            <div className="view"><ButtonViewMore /></div>
            <Footer/>
        </div>
    )
}
