import '../../../css/dashboard.css';
import NavbarUser from '../../components/layout/navbarUser.jsx';
import NotificationCard from '../../components/card/notificationCard.jsx';


export default function Notification() {
  return (
    <div className='dashboardAdmin'>
      <aside>
        <NavbarUser />
      </aside>
      <main className="admin">
        <div className="notificationContainer">
          <NotificationCard
            type="info"
            title="Berita Terbaru"
            message="Ada artikel baru yang mungkin menarik untuk Anda."
            time="5 menit lalu"
          />
        </div>
      </main>
    </div>
  );
}
