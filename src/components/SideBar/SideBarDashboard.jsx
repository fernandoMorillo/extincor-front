import { Link } from "wouter";

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
                    <li> <Link to="/home/clientes">Clientes</Link> </li>
                    <li> <Link to="/home/orden-pedido">Ordenes</Link> </li>
                    <li> <Link to="/home/productos">Productos</Link> </li>
                    <li> <Link to="#">Compras</Link> </li>
                </ul>
            </div>
            <div className="side-bar--logout">
                <a href="/logut">Cerrar sesión</a>
            </div>
        </section>
    )
}

export default SideBarDashboard;