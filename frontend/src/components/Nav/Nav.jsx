import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import './Nav.css';

const Nav = () => {
    const { logout } = useLogout();
    const handleLogout = () => {
        logout();
    }

    return (        
        <nav className="mainNav">
            <Link onClick={handleLogout} to="/login"><i className="fa-solid fa-door-open"></i></Link>
            <Link to="/search"><i className="fa-solid fa-magnifying-glass"></i></Link>
            <Link to="/createPost"><i className="fa-solid fa-plus"></i></Link>
            <Link to="/"><i className="fa-solid fa-house-chimney"></i></Link>
            <Link to="/userPage"><i className="fa-solid fa-user"></i></Link>
        </nav>
    )
}
 
export default Nav;