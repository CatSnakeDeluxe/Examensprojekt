import { Link } from "react-router-dom";
import './Nav.css';

const Nav = () => {
    return (        
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>  
    )
}
 
export default Nav;