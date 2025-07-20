import '../../../css/dashboard.css';
import NavbarUser from '../../Components/Layout/NavbarUser.jsx';
import NotificationCard from '../../Components/Card/NotificationCard.jsx';


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
