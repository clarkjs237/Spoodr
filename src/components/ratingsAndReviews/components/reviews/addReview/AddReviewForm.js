import React, { useState, useEffect } from "react";
import { PRODUCT_ID, URL } from "../../../../App";
import ReviewFormCharacteristics from "./ReviewFormCharacteristics";
import styled from 'styled-components';
import { TextInput } from '../../styled-components/TextInput';

const StyledForm = styled.form`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 25px;
  min-width: 300px;
  max-height: 500px;
  overflow-y: scroll;
  padding: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
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

const StyledTextarea = styled.textarea`
  resize: none;
  border-radius: 0px;
  width: 50%;
  // height: 100px;
  // &::-webkit-input-placeholder {
  //   padding: 10px;
  // }
`;

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledLabel = styled.label`
  padding-bottom: 5px;
`;

const StyledSectionHeader = styled.div`
  padding-bottom: 5px;
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
    fetch(`/reviews`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
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
    <div>
      <button type="button" onClick={props.handleToggleModalChange}>
        close
      </button>
      <StyledForm onSubmit={handleSubmit} id="add-review-form">
        <StyledSection>
          Rate this product
          <br />
          <StyledLabel>
            <input
              type="radio"
              name="rating"
              value="5"
              onChange={handleInputChange}
              required
            />
            5 stars
          </StyledLabel>
          <StyledLabel htmlFor="rating">
            <input
              type="radio"
              name="rating"
              value="4"
              onChange={handleInputChange}
            />
            4 stars
          </StyledLabel>
          <StyledLabel htmlFor="rating">
            <input
              type="radio"
              name="rating"
              value="3"
              onChange={handleInputChange}
            />
            3 stars
          </StyledLabel>
          <StyledLabel htmlFor="rating">
            <input
              type="radio"
              name="rating"
              value="2"
              onChange={handleInputChange}
            />
            2 stars
          </StyledLabel>
          <StyledLabel htmlFor="rating">
            <input
              type="radio"
              name="rating"
              value="1"
              onChange={handleInputChange}
            />
            1 stars
          </StyledLabel>
        </StyledSection>
        <StyledSection>
          <StyledSectionHeader>Would you recommend this product?</StyledSectionHeader>
          <StyledLabel>
            <input
              type="radio"
              name="recommend"
              value="true"
              onChange={handleInputChange}
              required
            />
            Yes
          </StyledLabel>
          <StyledLabel>
            <input
              type="radio"
              name="recommend"
              value="false"
              onChange={handleInputChange}
            />
            No
          </StyledLabel>
        </StyledSection>
        <StyledSection>
          <StyledSectionHeader>
            Did this product meet expectations?
          </StyledSectionHeader>
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
        </StyledSection>
        <StyledSection>
          <StyledSectionHeader>
            Summarize your review of this product.
          </StyledSectionHeader>
          <TextInput
            type="text"
            className="review-form-summary"
            name="summary"
            placeholder="Example: Best purchase ever!"
            maxLength="60"
            onChange={handleInputChange}
          />
        </StyledSection>
        <StyledSection>
          <StyledSectionHeader>
            Tell us about this product.
          </StyledSectionHeader>
          <textarea
            type="text"
            name="body"
            placeholder="Why did you like the product or not?"
            minLength="50"
            maxLength="1000"
            onChange={handleInputChange}
            style={{width: "50%"}}
            required
          />
          {data.body.length < 50 ? (
            <div style={{fontSize: "small"}}>
              Character count:&nbsp;
              {data.body.length}
            </div>
          ) : (
            <div style={{fontSize: "small"}}>Minimum reached</div>
          )}
        </StyledSection>
        <StyledSection>
          <StyledSectionHeader>
            Add photos
          </StyledSectionHeader>
          <input
            type="file"
            name="photos"
            accept="image/jpeg, image/png"
            onChange={handleInputChange}
            multiple
          />
        </StyledSection>
        <StyledSection>
          <StyledSectionHeader>
            Enter your nickname.
          </StyledSectionHeader>
          <TextInput
            type="text"
            name="name"
            placeholder="Example: jackson11!"
            maxLength="60"
            onChange={handleInputChange}
            required
          />
          <div style={{fontSize: "small"}}>
            For privacy reasons, do not use your full name or email address
          </div>
        </StyledSection>
        <StyledSection>
          <StyledSectionHeader>
            Enter your email.
          </StyledSectionHeader>
          <TextInput
            type="text"
            name="email"
            placeholder="Example: jackson11@email.com"
            maxLength="60"
            onChange={handleInputChange}
            required
          />
          <div style={{fontSize: "small"}}>
            For authentication reasons, you will not be emailed
          </div>
        </StyledSection>
      </StyledForm>
      <button form="add-review-form" type="submit" value="Submit">submit</button>
    </div>
  );
}

export default AddReviewForm;
