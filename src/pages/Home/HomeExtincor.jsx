import NavbarDashboard from "../../components/Navbar/NavbarDashboard.jsx";
import SideBarDashboard from "../../components/SideBar/SideBarDashboard.jsx";
import "../Home/HomeExtincor.css";

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

        </section>
    </div>
  );
};

export default HomeExtincor;
