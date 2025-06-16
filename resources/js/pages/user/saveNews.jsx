import '../../../css/dashboard.css';
import NavbarUser from '../../components/layout/navbarUser.jsx';
import NewsCardHome from '../../components/card/newsCardHome.jsx';

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
