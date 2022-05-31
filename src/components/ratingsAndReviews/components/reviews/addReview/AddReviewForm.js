import React, { useState, useEffect } from 'react';
import { PRODUCT_ID, URL } from '../../../../App';

function AddReviewForm(props) {
  const [data, setData] = useState({
    body: '',
    characteristics: {
      Size: 3,
      Width: 3,
      Comfort: 3,
      Quality: 3,
    },
  });

  function postReview(data) {
    fetch(`${URL}/reviews`, {
      method: 'POST',
      headers: {
        Authorization: process.env.GITTOKEN,
      },
      data: {
        product_id: PRODUCT_ID,
        rating: Number(data.rating),
        summary: data.summary,
        body: data.body,
        recommend: JSON.parse(data.recommend),
        name: data.name,
        email: data.email,
        // photos: data.photos,
        // characteristics: data.characteristics,
      },
    })
      .then((response) => response.json())
      .then((result) => console.log(`created review:: ${result}`));
  }

  function handleSubmit() {
    postReview(data);
  }

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={props.handleToggleModalChange}>close</button>
      <div>
        Rate this product<br/>
        <label>
          <input type="radio" name="rating" value="5" onChange={handleInputChange} required />
          5 stars
        </label>
        <label>
          <input type="radio" name="rating" value="4" onChange={handleInputChange} />
          4 stars
        </label>
        <label>
          <input type="radio" name="rating" value="3" onChange={handleInputChange} />
          3 stars
        </label>
        <label>
          <input type="radio" name="rating" value="2" onChange={handleInputChange} />
          2 stars
        </label>
        <label>
          <input type="radio" name="rating" value="1" onChange={handleInputChange} />
          1 stars
        </label>
      </div>
      <div>
        Would you recommend this product?<br />
        <label>
          <input
            type="radio"
            name="recommend"
            value="true"
            onChange={handleInputChange}
            required
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="recommend"
            value="false"
            onChange={handleInputChange}
          />
          No
        </label>
      </div>
      <div>
        Summarize your review of this product.<br />
        <input
          type="text"
          className="review-form-summary"
          name="summary"
          placeholder="Example: Best purchase ever!"
          maxLength="60"
          onChange={handleInputChange}
        />
      </div>
      <div>
        Tell us about this product.<br />
        <input
          type="text"
          className="review-form-body"
          name="body"
          placeholder="Why did you like the product or not?"
          minLength="50"
          maxLength="1000"
          onChange={handleInputChange}
          required
        /><br />
        {data.body.length < 50
          ? <div>Character count: {data.body.length}</div>
          : <div>Minimum reached</div>
        }
      </div>
      <div>
        Enter your nickname.<br />
        <input
          type="text"
          name="name"
          placeholder="Example: jackson11!"
          maxLength="60"
          onChange={handleInputChange}
          required
        /> <br />
        For privacy reasons, do not use your full name or email address
      </div>
      <div>
        Enter your email.<br />
        <input
          type="text"
          name="name"
          placeholder="Example: jackson11@email.com"
          maxLength="60"
          onChange={handleInputChange}
          required
        /> <br />
        For authentication reasons, you will not be emailed
      </div>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default AddReviewForm;
