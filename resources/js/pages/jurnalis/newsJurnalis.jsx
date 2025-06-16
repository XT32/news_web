import React, { useState } from 'react';
import NavbarJurnalis from '../../components/layout/navbarJurnalis.jsx';
import Search from '../../components/input/search.jsx'
import CardDashboard from '../../components/card/cardDashboard.jsx';
import { FaUser, FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import PaginationTable from '../../components/button/paginationTable.jsx';
import {Link} from 'react-router-dom';
import '../../../css/dashboard.css';

const NewsAdmin = () => {
  const [newsList, setNewsList] = useState([
    {
      id: 1,
      title: 'Berita Tentang Lingkungan',
      comment: 12,
      like: 50,
      read: 230,
      date: '2024-05-01',
      status: 'Published'
    },
    {
      id: 2,
      title: 'Teknologi Terbaru 2025',
      comment: 5,
      like: 20,
      read: 100,
      date: '2024-05-02',
      status: 'Draft'
    },
    {
      id: 3,
      title: 'Pendidikan di Era Digital',
      comment: 8,
      like: 30,
      read: 120,
      date: '2024-05-03',
      status: 'Published'
    },
    {
      id: 4,
      title: 'Pemilu 2024',
      comment: 40,
      like: 100,
      read: 500,
      date: '2024-05-04',
      status: 'Archived'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(newsList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = newsList.slice(startIndex, endIndex);

  return (
    <div className='dashboardAdmin'>
      <aside>
        <NavbarJurnalis />
      </aside>
      <main>
        <section className='cardContainer'>
          <CardDashboard label='Total News' icon={<FaUser />} count={newsList.length} />
          <CardDashboard label='Total Published' icon={<FaUser />} count={newsList.filter(n => n.status === 'Published').length} />
          <CardDashboard label='Total Draft' icon={<FaUser />} count={newsList.filter(n => n.status === 'Draft').length} />
        </section>
        <div className="searchDashboard">
          <Search/>
        </div>
        <section className='adminTableContainer'>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Comment</th>
                <th>Like</th>
                <th>Read</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.comment}</td>
                  <td>{item.like}</td>
                  <td>{item.read}</td>
                  <td>{item.date}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className='buttonTable'><FaEye /></button>
                    <button className='buttonTable'><FaTrash /></button>
                    <Link className='buttonTable'><FaEdit/></Link>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>
                  <PaginationTable
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    totalItems={newsList.length}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </section>
      </main>
    </div>
  );
};

export default NewsAdmin;
