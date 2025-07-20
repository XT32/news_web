import '../../../css/layout.css'
import {Link} from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';


export default function Footer(){
    return(
        <div className="footer">
            <p>&copy; 2025 | News Platform</p>
            <ul>
                <li>
                    <Link className='list'>Privacy Policy</Link>
                </li>
                <li>
                    <Link className='list'>Do not sell my personal info</Link>
                </li>
                <li>
                    <Link className='list'>Term of Service</Link>
                </li>
                <li>
                    <Link className='list'>Link site map</Link>
                </li>
            </ul>
            <nav className='contact'>
                <p>Contact</p>
                <ul>
                    <li><a href=""><FaFacebook/></a></li>
                    <li><a href=""><FaInstagram/></a></li>
                    <li><a href=""><FaTwitter/></a></li>
                    <li><a href=""><FaLinkedin/></a></li>
                    <li><a href=""><FaEnvelope/></a></li>
                </ul>
            </nav>

        </div>
    )
}