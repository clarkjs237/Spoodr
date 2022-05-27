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

const SocialMediaSpan = styled.span`
  margin-left: .25rem;
`;

export default function SocialMedia({ url, slogan }) {
  return (
    <div>
      <SocialMediaSpan>
        <FacebookShareButton url={url} quote={slogan}>
          <FacebookIcon size="1.75rem" round />
        </FacebookShareButton>
      </SocialMediaSpan>
      <SocialMediaSpan>
        <PinterestShareButton media={url} url={url} description={slogan}>
          <PinterestIcon size="1.75rem" round />
        </PinterestShareButton>
      </SocialMediaSpan>
      <SocialMediaSpan>
        <TwitterShareButton url={url} title={slogan}>
          <TwitterIcon size="1.75rem" round />
        </TwitterShareButton>
      </SocialMediaSpan>
    </div>
  );
}
