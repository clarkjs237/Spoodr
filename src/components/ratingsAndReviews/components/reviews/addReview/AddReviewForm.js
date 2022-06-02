import React, { useState, useEffect } from "react";
import { PRODUCT_ID, URL } from "../../../../App";
import ReviewFormCharacteristics from "./ReviewFormCharacteristics";
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 15px;
  min-width: 300px;
  max-height: 500px;
  overflow-y: scroll;
  padding: 15px;
  &::-webkit-scrollbar {
    width: 12px;
  };
  &::-webkit-scrollbar-track {
    background: white;
  };
  &::-webkit-scrollbar-thumb{
    background-color: #90D7FF;
    // border-style: solid;
    // border-width: 1px;
    // border-color: #90D7FF
  }
`;

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

function AddReviewForm(props) {
  const [data, setData] = useState({
    product_id: PRODUCT_ID,
    rating: 0,
    summary: '',
    body: '',
    recommend: undefined,
    name: '',
    email: '',
    photos: [],
    characteristics: {},
  });

  function getCharacteristics() {
    if (props.reviewsMeta.characteristics) {
      const characteristics = {};
      Object.keys(props.reviewsMeta.characteristics).forEach((key) => {
        characteristics[props.reviewsMeta.characteristics[key].id] = 0;
      });
      setData((prevState) => ({
        ...prevState,
        characteristics,
      }));
    }
  }

  function postReview() {
    fetch(`${URL}/reviews`, {
      method: "POST",
      headers: {
        Authorization: process.env.GITTOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.error("Error:", error);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    postReview();
    props.handleToggleModalChange();
  }

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === "rating") {
      setData((prevState) => ({
        ...prevState,
        rating: parseInt(value, 10),
      }));
    } else if (name === "recommend") {
      setData((prevState) => ({
        ...prevState,
        recommend: JSON.parse(value),
      }));
    } else if (
      name === "Size" ||
      name === "Width" ||
      name === "Comfort" ||
      name === "Quality" ||
      name === "Length" ||
      name === "Fit"
    ) {
      setData((prevState) => {
        const characteristics = {
          ...prevState.characteristics,
        };
        characteristics[props.reviewsMeta.characteristics[name].id] = parseInt(value, 10);
        return {
          ...prevState,
          characteristics,
        };
      });
    } else if (name === "photos") {
      if (event.target.files.length > 5) {
        alert("Up to 5 photos only");
        setData((prevState) => ({
          ...prevState,
          photos: [],
        }));
      } else {
        let newPhotos = [];
        for (let i = 0; i < event.target.files.length; i++) {
          newPhotos.push("https://picsum.photos/200/300");
        }
        setData((prevState) => ({
          ...prevState,
          photos: newPhotos,
        }));
      }
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  useEffect(() => {
    getCharacteristics();
  }, []);

  return (
    <StyledModal>
      <button type="button" onClick={props.handleToggleModalChange} style={{width:"100px"}}>
        close
      </button>
      <StyledForm onSubmit={handleSubmit} id="add-review-form">
        <div className="new-review-form-rating">
          Rate this product
          <br />
          <label htmlFor="rating">
            <input
              type="radio"
              name="rating"
              value="5"
              onChange={handleInputChange}
              required
            />
            5 stars
          </label>
          <label htmlFor="rating">
            <input
              type="radio"
              name="rating"
              value="4"
              onChange={handleInputChange}
            />
            4 stars
          </label>
          <label htmlFor="rating">
            <input
              type="radio"
              name="rating"
              value="3"
              onChange={handleInputChange}
            />
            3 stars
          </label>
          <label htmlFor="rating">
            <input
              type="radio"
              name="rating"
              value="2"
              onChange={handleInputChange}
            />
            2 stars
          </label>
          <label htmlFor="rating">
            <input
              type="radio"
              name="rating"
              value="1"
              onChange={handleInputChange}
            />
            1 stars
          </label>
        </div>
        <div className="new-review-form-recommend">
          Would you recommend this product?
          <br />
          <label htmlFor="recommend">
            <input
              type="radio"
              name="recommend"
              value="true"
              onChange={handleInputChange}
              required
            />
            Yes
          </label>
          <label htmlFor="recommend">
            <input
              type="radio"
              name="recommend"
              value="false"
              onChange={handleInputChange}
            />
            No
          </label>
        </div>
        <div className="new-review-form-characteristics">
          Did this product meet expectations?
          {props.reviewsMeta && (
            <div>
              {Object.keys(props.reviewsMeta.characteristics).map((key, index) => (
                <ReviewFormCharacteristics
                  key={index}
                  handleInputChange={handleInputChange}
                  name={key}
                />
              ))}
            </div>
          )}
        </div>
        <div className="new-review-form-summary">
          Summarize your review of this product.
          <br />
          <input
            type="text"
            className="review-form-summary"
            name="summary"
            placeholder="Example: Best purchase ever!"
            maxLength="60"
            onChange={handleInputChange}
          />
        </div>
        <div className="new-review-form-body">
          Tell us about this product.
          <br />
          <input
            type="text"
            className="review-form-body"
            name="body"
            placeholder="Why did you like the product or not?"
            minLength="50"
            maxLength="1000"
            onChange={handleInputChange}
            style={{
              width: "250px",
              height: "150px"
            }}
            required
          />
          <br />
          {data.body.length < 50 ? (
            <div>
              Character count:
              {data.body.length}
            </div>
          ) : (
            <div>Minimum reached</div>
          )}
        </div>
        <div className="new-review-form-photos">
          Add photos
          <br />
          <input
            type="file"
            name="photos"
            accept="image/jpeg, image/png"
            onChange={handleInputChange}
            multiple
          />
        </div>
        <div className="new-review-form-name">
          Enter your nickname.
          <br />
          <input
            type="text"
            name="name"
            placeholder="Example: jackson11!"
            maxLength="60"
            onChange={handleInputChange}
            required
          />
          <br />
          For privacy reasons, do not use your full name or email address
        </div>
        <div className="new-review-form-email">
          Enter your email.
          <br />
          <input
            type="text"
            name="email"
            placeholder="Example: jackson11@email.com"
            maxLength="60"
            onChange={handleInputChange}
            required
          />
          <br />
          For authentication reasons, you will not be emailed
        </div>
      </StyledForm>
      <button form="add-review-form" type="submit" value="Submit" style={{width:"100px"}}>submit</button>
    </StyledModal>
  );
}

export default AddReviewForm;
