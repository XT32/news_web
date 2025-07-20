import React, { useState } from 'react'
import NavbarAdmin from '../../Components/Layout/NavbarAdmin.jsx'
import CardDashboard from '../../Components/Card/CardDashboard.jsx'
import { FaUser, FaEye, FaTrash } from 'react-icons/fa'
import PaginationTable from '../../Components/Button/PaginationTable.jsx'
import Search from '../../Components/Input/Search.jsx'
import '../../../css/dashboard.css'

const UsersAdmin = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Author", email: "Author@gmail.com", news: "30" },
    { id: 2, name: "", email: "@gmail.com", news: "30" },
    { id: 3, name: "ahmad", email: "ahmad@gmail.com", news: "30" },
    { id: 4, name: "nurul", email: "nurul@gmail.com", news: "30" },
    { id: 5, name: "dina", email: "dina@gmail.com", news: "30" },
    { id: 6, name: "reza", email: "reza@gmail.com", news: "30" },
    { id: 7, name: "salsa", email: "salsa@gmail.com", news: "30" },
    { id: 8, name: "zaki", email: "zaki@gmail.com", news: "30" },
    { id: 9, name: "ilham", email: "ilham@gmail.com", news: "30" },
    { id: 10, name: "lisa", email: "lisa@gmail.com", news: "30" }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = users.slice(startIndex, endIndex);

  return (
    <div className='dashboardAdmin'>
      <aside>
        <NavbarAdmin />
      </aside>
      <main>
        <section className='cardContainer'>
          <CardDashboard label='Total User' icon={<FaUser />} count={100} />
          <CardDashboard label='Total Journalist' icon={<FaUser />} count={100} />
          <CardDashboard label='Total Reader' icon={<FaUser />} count={100} />
        </section>
        <div className="searchDashboard">
          <Search/>
        </div>
        <section className='adminTableContainer'>
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>News</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.news}</td>
                  <td>
                    <button className='buttonTable'><FaEye /></button>
                    <button className='buttonTable'><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>
                  <PaginationTable
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    totalItems={users.length}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </section>
      </main>
    </div>
  );
}

export default UsersAdmin;
