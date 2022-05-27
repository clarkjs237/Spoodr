import React, { useState, useEffect } from 'react';

function Factors(props) {
  const [size, setSize] = useState(0);
  const [width, setWidth] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [quality, setQuality] = useState(0);
  const [length, setLength] = useState(0);
  const [fit, setFit] = useState(0);


  // console.log(props.reviewsMeta)

  function setFactors() {
    setSize(props.reviewsMeta?.characteristics.Size?.value);
    setWidth(props.reviewsMeta?.characteristics.Width?.value);
    setComfort(props.reviewsMeta?.characteristics.Comfort?.value);
    setQuality(props.reviewsMeta?.characteristics.Quality?.value);
    setLength(props.reviewsMeta?.characteristics.Length?.value);
    setFit(props.reviewsMeta?.characteristics.Fit?.value);
  }

  useEffect(() => {
    setFactors();
  }, [props.reviewsMeta.characteristics]);

  return (
    <div>
      <div>
        { size &&
          (
          <div>
            <div>
              Size
            </div>
            <meter value={size} min={0} max={5} />
            <div>
              Too Small
            </div>
            <div>
              Too Big
            </div>
          </div>
          )
        }
      </div>
      <div>
        { width &&
          (
          <div>
            <div>
              Width
            </div>
            <meter value={width} min={0} max={5} />
            <div>
              Too Small
            </div>
            <div>
              Too Big
            </div>
          </div>
          )
        }
      </div>
    </div>
  );
}

export default Factors;
