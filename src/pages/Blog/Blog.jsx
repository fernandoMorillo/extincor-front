import NavBarBlog from "../../components/BlogComponents/NavBarBlog/NavBarBlog";
import HeroSection from "../../components/BlogComponents/HeroBlog/HeroBlog";
import AboutSection from "../../components/BlogComponents/About/Abaout";
import ServicesSection from "../../components/BlogComponents/ServicesBlog/Services";
import Footer from "../../components/BlogComponents/Footer/Footer";
const Blog = () => {
  return (
    <div>
      <NavBarBlog />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Blog;
