import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductInfo from './overviewComponents/ProductInfo';
//import SocialMedia from './overviewComponents/SocialMedia';
import StyleSelector from './overviewComponents/StyleSelector';
import ImageGalleryDefault from './overviewComponents/ImageGalleryDefault';
import ImageGalleryExpanded from './overviewComponents/ImageGalleryExpanded';
import AddToCart from './overviewComponents/AddToCart';

const ProductOverview = styled.div`
  white-space: nowrap;
`;

const InfoSelectorCartDiv = styled.div`
  display: inline-block;
  position: top;
  vertical-align: top;
  margin-left: 1rem;
`;

const ProductSlogan = styled.div`
  font-weight: bold;
  margin-top: 1rem;

`;

const ProductDescription = styled.div`
  display: inline-block;
  white-space: normal;
  overflow-x: wrap;
  width: 52rem;
  margin-top: 1rem;
`;

export default function Overview({
  product,
  productStyle,
  totalReviews,
  averageRating,
  averageStarRating,
  curStyleId,
  setCurStyleId,
}) {

  const [expandedView, setExpandedView] = useState(false);
  const [curDisplayIndex, setCurDisplayIndex] = useState(0);
  let curDisplayPhotos;
  let productOrginalPrice;
  let productSalePrice;
  let curStyleName;
  let styleThumbnails;
  let curStyleQuantAndSizes;
  let socialUrl;

  if (product.category && productStyle.product_id) {

    if (productStyle.results.length) {
      productOrginalPrice = productStyle.results[curStyleId].original_price;
      productSalePrice = productStyle.results[curStyleId].sale_price;
      curStyleName = productStyle.results[curStyleId].name;
      const curSkus = productStyle.results[curStyleId].skus;
      curStyleQuantAndSizes = Object.keys(curSkus)
        .map((key) => {
          if (curSkus[key].quantity > 15) {
            curSkus[key].quantity = 15;
          }
          curSkus[key].sku = key;
          return curSkus[key];
        })
        .filter(({ quantity }) => quantity > 0);
      if (!curStyleQuantAndSizes.length) {
        curStyleQuantAndSizes = [{ size: 'Sold Out', quantity: 0 }];
      }
    } else {
      productOrginalPrice = product.default_price;
      productSalePrice = null;
      curStyleName = '';
      curStyleQuantAndSizes = [{ size: 'Sold Out', quantity: 0 }];
    }

    if (productStyle.results[curStyleId]) {
      socialUrl = productStyle.results[curStyleId].photos[curDisplayIndex].url;
      styleThumbnails = productStyle.results.map((style, i) => ({ id: i, thumbnail: style.photos[0].thumbnail_url }));
      curDisplayPhotos = productStyle.results[curStyleId].photos.map((photo, i) => {
        photo.id = i;
        return photo;
      });
    } else {
      const missingImg = 'https://ma-hub.imgix.net/wp-images/2019/11/17203220/final-cut-pro-missing-file.jpg?w=1600&h=850&auto=format';
      socialUrl = missingImg;
      styleThumbnails = [{ id: 0, url: missingImg, thumbnail_url: missingImg }];
      curDisplayPhotos = [{ id: 0, url: missingImg, thumbnail_url: missingImg }];
    }

    if (expandedView) {
      return (
          <ImageGalleryExpanded
            curDisplayPhotos={curDisplayPhotos}
            curDisplayIndex={curDisplayIndex}
            setCurDisplayIndex={setCurDisplayIndex}
            setExpandedView={setExpandedView}
          />
      );
    }

    return (
      <ProductOverview>
        <ImageGalleryDefault
          curDisplayPhotos={curDisplayPhotos}
          curDisplayIndex={curDisplayIndex}
          setCurDisplayIndex={setCurDisplayIndex}
          setExpandedView={setExpandedView}
          url={socialUrl}
          slogan={product.slogan}
        />
        <InfoSelectorCartDiv>
          <ProductInfo
            totalReviews={totalReviews}
            averageRating={averageRating}
            averageStarRating={averageStarRating}
            productCategory={product.category.toUpperCase()}
            productTitle={product.name}
            productOrginalPrice={productOrginalPrice}
            productSalePrice={productSalePrice}
          />
          <StyleSelector
            curStyleId={curStyleId}
            setCurStyleId={setCurStyleId}
            curStyleName={curStyleName}
            styleThumbnails={styleThumbnails}
          />
          <AddToCart
            curStyleQuantAndSizes={curStyleQuantAndSizes}
          />
        </InfoSelectorCartDiv>
        <ProductSlogan>{product.slogan}</ProductSlogan>
        <ProductDescription>{product.description}</ProductDescription>
      </ProductOverview>
    );
  }
}
