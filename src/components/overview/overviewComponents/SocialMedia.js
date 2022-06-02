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
  top: 35.5rem;
  left: 41.5rem;
`;

const StyledPinterestShareButton = styled(PinterestShareButton)`
  margin-left: 1rem;
`;

const StyledTwitterShareButton = styled(TwitterShareButton)`
  margin-left: 1rem;
`;

export default function SocialMedia({ url, slogan }) {
  return (
    <SocialMediaWrap>
      <FacebookShareButton url={url} quote={slogan}>
        <FacebookIcon size="2.25rem" />
      </FacebookShareButton>
      <StyledPinterestShareButton media={url} url={url} description={slogan}>
        <PinterestIcon size="2.25rem"  />
      </StyledPinterestShareButton>
      <StyledTwitterShareButton url={url} title={slogan}>
        <TwitterIcon size="2.25rem"  />
      </StyledTwitterShareButton>
    </SocialMediaWrap>
  );
}
