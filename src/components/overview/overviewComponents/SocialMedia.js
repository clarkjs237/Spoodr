import React from 'react';
import styled from 'styled-components';
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const SocialMediaWrap = styled.span`
  margin-left: .25rem;
  position: absolute;
  top: 29rem;
  left: 34.7rem;
  width: 10rem;
`;

const StyledPinterestShareButton = styled(PinterestShareButton)`
  margin-left: .25rem;
`;

const StyledTwitterShareButton = styled(TwitterShareButton)`
  margin-left: .25rem;
`;

export default function SocialMedia({ url, slogan }) {
  return (
    <SocialMediaWrap>
      <FacebookShareButton url={url} quote={slogan}>
        <FacebookIcon size="1.75rem" round />
      </FacebookShareButton>
      <StyledPinterestShareButton media={url} url={url} description={slogan}>
        <PinterestIcon size="1.75rem" round />
      </StyledPinterestShareButton>
      <StyledTwitterShareButton url={url} title={slogan}>
        <TwitterIcon size="1.75rem" round />
      </StyledTwitterShareButton>
    </SocialMediaWrap>
  );
}
