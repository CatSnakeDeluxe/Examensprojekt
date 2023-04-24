import { Link } from "react-router-dom";
import './Nav.css';

const Nav = () => {
    return (        
        <nav className="mainNav">
            <Link to="/logout"><i className="fa-solid fa-door-open"></i></Link>
            <Link to="/search"><i className="fa-solid fa-magnifying-glass"></i></Link>
            <Link to="/createPost"><i className="fa-solid fa-plus"></i></Link>
            <Link to="/"><i className="fa-solid fa-house-chimney"></i></Link>
            <Link to="/userPage"><i className="fa-solid fa-user"></i></Link>
        </nav>
    )
}
 
export default Nav;