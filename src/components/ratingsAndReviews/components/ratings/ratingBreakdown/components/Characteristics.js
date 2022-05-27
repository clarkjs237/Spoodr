import React, { useState, useEffect } from 'react';
import CharacteristicsItem from './characteristics/CharacteristicsItem'

function Characteristics(props) {
  // const [size, setSize] = useState(0);
  // const [width, setWidth] = useState(0);
  // const [comfort, setComfort] = useState(0);
  // const [quality, setQuality] = useState(0);
  // const [length, setLength] = useState(0);
  // const [fit, setFit] = useState(0);
  const [characteristics, setCharacteristics] = useState({});

  // console.log(props.reviewsMeta)

  function getCharacteristics() {
    // setSize(props.reviewsMeta?.characteristics.Size?.value);
    // setWidth(props.reviewsMeta?.characteristics.Width?.value);
    // setComfort(props.reviewsMeta?.characteristics.Comfort?.value);
    // setQuality(props.reviewsMeta?.characteristics.Quality?.value);
    // setLength(props.reviewsMeta?.characteristics.Length?.value);
    // setFit(props.reviewsMeta?.characteristics.Fit?.value);
    setCharacteristics(props.reviewsMeta?.characteristics);
  }

  useEffect(() => {
    getCharacteristics();
  }, [props.reviewsMeta.characteristics]);

  if (props.reviewsMeta.characteristics) {
    return (
      <div>

        {Object.keys(characteristics).map((key, index) => (
          <CharacteristicsItem
            characteristic={key}
            value={Number(characteristics[key].value)}
            key={index}
          />
        ))}
      </div>
    );
  }
}

export default Characteristics;
