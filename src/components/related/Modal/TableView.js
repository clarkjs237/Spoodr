import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { TextH3, defFont } from '../Related';
import ProductPrice from '../../overview/overviewComponents/ProductInfoComponents/ProductPrice';
import StarRating from '../../overview/overviewComponents/ProductInfoComponents/StarRating';

const TableContainer = styled.div`
  height: 28rem;
  width: 28rem;
  position: absolute;
  background-color: #EAC9C1;
  background-image: linear-gradient(to bottom,white,transparent);
  border: 1.5px #32292F solid;
  transition: transform 0.5s ease-out;
  top: -73rem;
  // left: ${(props) => (props.index * 8.5) + 8.5}rem;
  left: 24rem;
`;

const CloseModalButton = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 1.8rem;
  &:before {
    content: "\\2716";
  }
  cursor: pointer;
  &:hover {
    color: #90D7FF;
  }
`;

const Table = styled.table`
  position: absolute;
  font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";

  left: 2.9rem;
  // border: 2px red solid;
`;

const TableBody = styled.tbody`
`;

const TableRow = styled.tr`
  border: 1px solid red;
`;

const TableHeader = styled.th`
  width: 7rem;
`;

const TableData = styled.td`
  ${(props) => {
    if (props.cat) {
      return css`
        font-weight: bold;
      `;
    }
  }}
`;

export default function TableView({
  modalCardIndex, // might use this to determine where to place the related window
  overviewProduct,
  overviewStyle,
  overviewRating,
  relatedProduct,
  relatedStyle,
  relatedRating,
  closeModal,
}) {
  // I want to look through overviewProduct and relatedProduct for:
  // name, category, features.
  // Here I am going to create the list
  // For features, I want to see if there are any features that match
  // If none of the features match, it shouldn't match
  const [featuresList, setFeaturesList] = useState({});
  const [sizes, setSizes] = useState({}); // this will be an object with
  // overview and related properties, then the sizes in a comma separated list of each

  function generateSizeList() {
    let overviewArr = [];
    for (let i = 0; i < Object.values(overviewStyle.skus).length; i++) {
      // We want to look at the size here.
      let temp = Object.values(overviewStyle.skus)[i];
      if (temp.quantity) {
        overviewArr.push(temp.size);
      }
    }

    let relatedArr = [];
    for (let i = 0; i < Object.values(relatedStyle.skus).length; i++) {
      // Look for the sizes in the related object
      let temp = Object.values(relatedStyle.skus)[i];
      if (temp.quantity) {
        relatedArr.push(temp.size);
      }
    }

    const res = {
      overview: overviewArr.join(',  '),
      related: relatedArr.join(',  '),
    };

    setSizes(res);
  }

  function generateOverviewList() {
    const featuresObj = {}; // this is the object we will be creating and setting the state equal to
    for (let i = 0; i < overviewProduct.features.length; i++) {
      const tempFeature = overviewProduct.features[i];
      featuresObj[tempFeature.feature] = {
        overview: tempFeature.value,
        related: null,
      };
    }
    // This successfully is created an object for the overview product

    // Now we want to loop through the related product features and find add to this list
    for (let i = 0; i < relatedProduct.features.length; i++) {
      const tempFeature = relatedProduct.features[i];
      // If this feature isn't in the list
      if (!featuresObj[tempFeature.feature]) {
        featuresObj[tempFeature.feature] = {
          overview: null,
          related: tempFeature.value,
        };
      } else {
        // This is an existing feature so we just want to add to the related portion
        featuresObj[tempFeature.feature].related = tempFeature.value;
      }
    }
    // Set the featuresList state object to equal the actual list now
    setFeaturesList(featuresObj);
  }

  // Change the state everytime a new related product is selected
  useEffect(() => {
    generateOverviewList();
    generateSizeList();
  }, [relatedProduct]);

  return (
    <TableContainer>
      <TextH3
        style={{
        "fontSize": "0.85rem",
        "fontWeight": "3",
        "paddingLeft": "1rem",
        "transform": "translateY(-0.15rem)"
        }}
      >COMPARING</TextH3>
      <Table>
        <TableBody>
          {/* Overview Product and Related Product Header */}
          <TableRow>
            <TableHeader>{overviewProduct.name}</TableHeader>
            <TableHeader />
            <TableHeader>{relatedProduct.name}</TableHeader>
          </TableRow>
          {/* Product Categories */}
          <TableRow>
            <TableData>{overviewProduct.category}</TableData>
            <TableData cat={true}><i>Category</i></TableData>
            <TableData>{relatedProduct.category}</TableData>
          </TableRow>
          {/* Product Prices */}
          <TableRow>
            <TableData>
              <ProductPrice
                productOrginalPrice={overviewStyle.original_price}
                productSalePrice={overviewStyle.sale_price}
              />
            </TableData>
            <TableData cat={true}><i>Price</i></TableData>
            <TableData>
              <ProductPrice
                productOrginalPrice={relatedStyle.original_price}
                productSalePrice={relatedStyle.sale_price}
              />
            </TableData>
          </TableRow>
          {/* Average Rating */}
          <TableRow>
            <TableData>
              <StarRating averageStarRating={overviewRating} />
            </TableData>
            <TableData cat={true}><i>Average Rating</i></TableData>
            <TableData>
              <StarRating averageStarRating={relatedRating} />
            </TableData>
          </TableRow>
          {/* Map over the features */}
          {Object.keys(featuresList).map((feature, index) => (
            <TableRow>
              <TableData>{Object.values(featuresList)[index].overview}</TableData>
              <TableData cat={true}><i>{feature}</i></TableData>
              <TableData>{Object.values(featuresList)[index].related}</TableData>
            </TableRow>
          ))}
          {/* Now I want to get the quantity of these products available */}
          <TableRow>
            <TableData>{sizes.overview}</TableData>
            <TableData cat={true}><i>Available Sizes</i></TableData>
            <TableData>{sizes.related}</TableData>
          </TableRow>
        </TableBody>

      </Table>
      <CloseModalButton
        onClick={closeModal}
      />
    </TableContainer>

  );
}
