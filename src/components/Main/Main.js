import About from '../About/About';
import AboutMe from '../AboutMe/AboutMe';
import LandingHeader from '../LandingHeader/LandingHeader';
import Tech from '../Tech/Tech';
import Portfolio from '../Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Main(props) {
  return (
    <>
      <Header openPopup={props.openNavPopup} page={'landing'}/>
      <main className='main'>
        <LandingHeader />
        <About />
        <Tech />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;
