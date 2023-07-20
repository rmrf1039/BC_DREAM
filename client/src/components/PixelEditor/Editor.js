import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import DrawingPanel from './DrawingPanel';

import '../../assets/scss/pixelArtEditor/editor.scss';

function Editor({ setRef, showBorder }) {
  const [selectedColor, setSelectedColor] = useState('#f44336');

  const changeColorHandler = (color) => {
    setSelectedColor(color.hex);
  };

  return (
    <div id="pixel-editor" className="d-flex flex-column align-items-center">
      <CirclePicker
        className="justify-content-evenly"
        color={selectedColor}
        onChangeComplete={changeColorHandler}
      />
      <DrawingPanel
        width={12}
        height={12}
        selectedColor={selectedColor}
        setRef={setRef}
        showBorder={showBorder}
      />
    </div>
  )
}

export default Editor;