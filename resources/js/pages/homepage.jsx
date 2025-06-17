
import '../../css/homepage.css';
import Header from '../components/layout/header.jsx';
import Footer from '../components/layout/footer.jsx';
import PopulerNewsCard from '../components/card/PopulerNewsCard.jsx';
import NewsCardHome from '../components/card/newsCardHome.jsx';
import ButtonViewMore from '../components/button/buttonViewMore.jsx';
import RunningText from '../components/layout/runningText.jsx';


export default function Homepage() {

    const beritaPopuler = {
        id: 1,
        title: "Revolusi AI Mengubah Wajah Industri Teknologi",
        image: "https://picsum.photos/seed/populer/800/400", 
        author: "Author",
        date: "17 Juni 2025",
        caption: "Kecerdasan buatan tidak lagi menjadi fiksi ilmiah. Kini, AI telah merasuk ke dalam setiap aspek pengembangan perangkat lunak, menuntut para developer untuk beradaptasi atau tertinggal."
    };

    const daftarBerita = [
        { id: 101, title: "Laravel 12 Dirilis dengan Fitur Keamanan Baru", image: "https://picsum.photos/seed/laravel12/400/300", author: "Author", date: "16 Juni 2025" },
        { id: 102, title: "React 19 Memperkenalkan Compiler yang Mengubah Segalanya", image: "https://picsum.photos/seed/react19/400/300", author: "Author", date: "15 Juni 2025" },
        { id: 103, title: "Tips & Trik Debugging CORS yang Bikin Pusing", image: "https://picsum.photos/seed/cors/400/300", author: "Author", date: "14 Juni 2025" },
        { id: 104, title: "Masa Depan Web Development: Apakah Masih Relevan di 2025?", image: "https://picsum.photos/seed/webdev/400/300", author: "Author", date: "13 Juni 2025" }
    ];
    const breaking = {
        text: "Breaking News: Developer Berhasil Menyelesaikan Laporan Magang Tepat Waktu!"
    };

    return (
        <div className="homepage">
            <Header />
            <PopulerNewsCard
                title={beritaPopuler.title}
                image={beritaPopuler.image}
                author={beritaPopuler.author}
                date={beritaPopuler.date}
                caption={beritaPopuler.caption}
            />

            <RunningText text={breaking.text} />
            
            <div className="newsCardHomeContainer">
                {daftarBerita.map(berita => (
                    <NewsCardHome
                        key={berita.id}
                        title={berita.title}
                        image={berita.image}
                        author={berita.author}
                        date={berita.date}
                    />
                ))}
            </div>

            <div className="view"><ButtonViewMore /></div>
            
            <Footer />
        </div>
    );
}