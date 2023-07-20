
import Pixel from './Pixel';

function Row({ width, selectedColor }) {
  let pixels = [];

  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel key={i} selectedColor={selectedColor} />);
  }

  return (
    <div className="d-flex">{pixels}</div>
  )
}

function DrawingPanel({ width, height, selectedColor, setRef, showBorder = true }) {
  let rows = [];

  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width} selectedColor={selectedColor} />)
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <div id="pixels" className={`${!showBorder && 'border-0'}`} ref={setRef}>
        {rows}
      </div>
    </div>
  )
}

export default DrawingPanel;