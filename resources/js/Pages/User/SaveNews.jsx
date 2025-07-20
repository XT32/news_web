import '../../../css/dashboard.css';
import NavbarUser from '../../Components/Layout/NavbarUser.jsx';
import NewsCardHome from '../../Components/Card/NewsCardHome.jsx';

export default function SaveNews() {
  return (
    <div className='dashboardAdmin'>
      <aside>
        <NavbarUser />
      </aside>
      <main className="admin">
        <NewsCardHome/>
      </main>
    </div>
  );
}
