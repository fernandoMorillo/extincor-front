import LoginExtincor from "../../assets/img/extincor-logo.png";
import "../SideBar/SideBarDashboard.css";
const SideBarDashboard = () => {
    return (
        <section id="side-bar">
            <div>
                <img src={LoginExtincor} alt="logo extincor" />
            </div>
            <div className="side-bar--options">
                <ul>
                    <li>Options 1</li>
                    <li>Options 2</li>
                    <li>Options 3</li>
                    <li>Options 4</li>
                </ul>
            </div>
            <div className="side-bar--logout">
                <a href="/logut">Cerrar sesión</a>
            </div>
        </section>
    )
}

export default SideBarDashboard;