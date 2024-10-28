import { Route, Switch } from "wouter";
import NavbarDashboard from "../../components/Navbar/NavbarDashboard.jsx";
import SideBarDashboard from "../../components/SideBar/SideBarDashboard.jsx";
import "../Home/HomeExtincor.css";

import Envase from "../EnvasePage/Envase.jsx";
import OrdenPedido from "../OrdenPedidoPAge/OrdenPedido.jsx";
import Clientes from "../Clientes/Clientes.jsx";
import Productos from "../Productos/Productos.jsx";

const HomeExtincor = () => {
  return (
    <div className="main-container">
      <section className="main-container--sidebard">
          <SideBarDashboard />
      </section>
        <section className="main-container--navbar">
            <NavbarDashboard />
        </section>
        <section className="main-container--main">
            <Switch>
                <Route path="/home" component={() => <h1>Dashboard Principal</h1>} />
                <Route path="/home/envase" component={Envase} />
                <Route path="/home/orden-pedido" component={OrdenPedido} />
                <Route path="/home/clientes" component={Clientes} />
                <Route path="/home/productos" component={Productos} />
                <Route> 404 - Página no encontrada</Route>
            </Switch>
        </section>
    </div>
  );
};

export default HomeExtincor;
