import {Link} from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
    return ( 
    <nav className="nav">
        <Link to="membersList" className="link">  חברי הקופה </Link>
        <Link to="register" className="link"> הוספת חבר </Link>
        <Link to="coronaDiagram" className="link"> דיאגרמת חולים </Link>
    </nav>
    )
}
export default NavBar;