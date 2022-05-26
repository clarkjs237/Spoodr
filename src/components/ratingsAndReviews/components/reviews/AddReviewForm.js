/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { PRODUCT_ID, URL } from "../../../App";
import styled from 'styled-components';

function AddReviewForm(props) {
  const [rating, setRating] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState('');
  const [name, seName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState('');
  const [characteristics, setCharacteristics] = useState('');

  function postReview(data) {
    fetch(`${URL}/reviews`, {
      method: 'POST',
      headers: {
        Authorization: process.env.GITTOKEN,
      },
      data: {
        product_id: data.product_id,
        rating: data.rating,
        summary: data.summary,
        body: data.body,
        recommend: data.recommend,
        name: data.name,
        email: data.email,
        photos: data.photos,
        characteristics: data.characteristics,
      },
    })
      .then((response) => response.json())
      .then((result) => console.log(`created review:: ${result}`));
  }

  function handleSubmit(){

  }

  return (
    <form>
      <label>
        add review form
      </label>
    </form>
  )
}

export default AddReviewForm;
