import '../../../css/layout.css'
import { FaUser } from 'react-icons/fa';
import ButtonProfile from '../../components/button/buttonprofile.jsx'
import Search from '../input/search.jsx'



export default function Header({category}){
    return (
        <div className="header">
            <nav>
                <ul>
                    <li>{category}</li>
                </ul>
            </nav>
            <aside>
                <Search/>
                <ButtonProfile/>
            </aside>
        </div>
    );
}