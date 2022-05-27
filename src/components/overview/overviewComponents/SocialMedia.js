import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const SocialMediaSpan = styled.span`
  margin-left: .5rem;
`;

export default function SocialMedia({ url, slogan }) {
  return (
    <div>
      <SocialMediaSpan>
        <FacebookShareButton url={url} quote={slogan}>
          <FacebookIcon size={24} round />
        </FacebookShareButton>
      </SocialMediaSpan>
      <SocialMediaSpan>
        <PinterestShareButton media={url} url={url} description={slogan}>
          <PinterestIcon size={24} round />
        </PinterestShareButton>
      </SocialMediaSpan>
      <SocialMediaSpan>
        <TwitterShareButton url={url} title={slogan}>
          <TwitterIcon size={24} round />
        </TwitterShareButton>
      </SocialMediaSpan>
    </div>
  );
}

SocialMedia.propTypes = {

};
