import { Route, Switch } from "wouter";
import NavbarDashboard from "../../components/Navbar/NavbarDashboard.jsx";
import SideBarDashboard from "../../components/SideBar/SideBarDashboard.jsx";
import OptionsMenu from "../../components/MenuOptions/OptionsMenu.jsx";
import NotFound from "../../components/404/NotFound.jsx";
import OrdenesDetalles from "../../components/DetallesOrdenes/OrdenesDetalles.jsx";

import "../Home/HomeExtincor.css";

import Envase from "../EnvasePage/Envase.jsx";
import OrdenPedido from "../OrdenPedidoPAge/OrdenPedido.jsx";
import Clientes from "../Clientes/Clientes.jsx";
import Productos from "../Productos/Productos.jsx";
import InsumosPage from "../InsumosPage/InsumosPage.jsx";
import CompraInsumos from "../Compras/CompraInsumos.jsx";
import CrearOperarioForm from "../AsignarRoles/CrearOperarioForm.jsx";
import AsignarRoles from "../AsignarRoles/AsignarRoles.jsx";
import Estadisticas from "../Estadisticas/Estadisticas.jsx";

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
        <div className="main-container--main--content">
          <Switch>
            <Route path="/home" component={OptionsMenu} />
            <Route path="/home/insumos" component={InsumosPage} />
            <Route path="/home/envase" component={Envase} />
            <Route path="/home/orden-pedido" component={OrdenPedido} />
            <Route path="/home/clientes" component={Clientes} />
            <Route path="/home/productos" component={Productos} />
            <Route path="/home/compras" component={CompraInsumos} />
            <Route
              path="/home/orden-pedido/:id/detalles"
              component={OrdenesDetalles}
            />
              <Route path="/home/asignar-rol" component={AsignarRoles} />
              <Route path="/home/estadisticas" component={Estadisticas} />
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </section>
    </div>
  );
};

export default HomeExtincor;
