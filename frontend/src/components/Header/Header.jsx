import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import './Header.css';

const Header = () => {
    const { user } = useAuthContext();
    const notificationPath = `/notifications/${user.user._id}`
    return (        
        <nav className="headerNav">
            <div>
                <h4 className="gradientText logoText">Postr</h4>
            </div>
            <div>
                <Link to={notificationPath}><i className="fa-solid fa-bell"></i></Link>
                <Link to="/chat"><i className="fa-solid fa-paper-plane"></i></Link>
            </div>
        </nav>
    )
}
 
export default Header;