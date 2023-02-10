import About from "../About/About";
import AboutMe from "../AboutMe/AboutMe";
import LandingHeader from "../LandingHeader/LandingHeader";
import Tech from "../Tech/Tech";
import Portfolio from "../Portfolio/Portfolio";

function Main(){
  return(
    <main>
      <LandingHeader />
      <About />
      <Tech />
      <AboutMe />
      <Portfolio />
    </main>
  )
};

export default Main;
