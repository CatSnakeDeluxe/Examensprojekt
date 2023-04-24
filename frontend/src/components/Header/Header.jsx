import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
    return (        
        <nav className="headerNav">
            <div>
                <h4 className="gradientText logoText">Postr</h4>
            </div>
            <div>
                <Link to="/notification"><i className="fa-solid fa-bell"></i></Link>
                <Link to="/chat"><i className="fa-solid fa-paper-plane"></i></Link>
            </div>
        </nav>
    )
}
 
export default Header;