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
  margin-left: .5em;
`;

export default function SocialMedia({ url, slogan }) {
  return (
    <>
      <SocialMediaSpan>
        <FacebookShareButton url={url} quote={slogan}>
          <FacebookIcon size={20} round />
        </FacebookShareButton>
      </SocialMediaSpan>
      <SocialMediaSpan>
        <PinterestShareButton media={url} url={url} description={slogan}>
          <PinterestIcon size={20} round />
        </PinterestShareButton>
      </SocialMediaSpan>
      <SocialMediaSpan>
        <TwitterShareButton url={url} title={slogan}>
          <TwitterIcon size={20} round />
        </TwitterShareButton>
      </SocialMediaSpan>
    </>
  );
}

SocialMedia.propTypes = {

};
