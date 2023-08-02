import NakedPortrait from '../assets/img/gear/naked.png';
import defaultHair from '../assets/img/gear/b2.png';
import defaultCloth from '../assets/img/gear/c5.png';
import defaultPants from '../assets/img/gear/pb3.png';
import defaultShoes from '../assets/img/gear/s1.png';

const PortraitWear = () => {
  const portraitWidth = 250;
  return (
    <div>
      <div className="d-flex flex-column align-items-center mt-2">
        <div className="position-relative portrait-container">
          <img src={NakedPortrait} width={portraitWidth} alt="naked person" style={{
            marginTop: "calc((100% / 18) * 3)",
          }} />

          <img src={defaultHair} width={portraitWidth} alt="hair" className="position-absolute top-0 start-50 translate-middle-x" />

          <img src={defaultCloth} width={portraitWidth} alt="cloth" className="position-absolute start-50 translate-middle-x"
          style={{
            top: "calc(100%/39 * 12)"
          }} />

          <img src={defaultPants} width={portraitWidth} alt="pants" className="position-absolute start-50 translate-middle-x"
          style={{
            top: "calc(100%/39 * 23)"
          }} />

          <img src={defaultShoes} width={portraitWidth} alt="shoes" className="position-absolute start-50 translate-middle-x"
          style={{
            top: "calc(100%/39 * 30)"
          }} />
        </div>
      </div>
    </div>
  )
}

export default PortraitWear;