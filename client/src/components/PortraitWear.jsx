import NakedPortrait from '../assets/img/wear/nake.png';

const PortraitWear = () => {
  return (
    <div>
      <div className="d-flex flex-column align-items-center mt-2">
        <div className="position-relative portrait-container">
          <img src={NakedPortrait} width={250} alt="naked person" />
        </div>
      </div>
    </div>
  )
}

export default PortraitWear;