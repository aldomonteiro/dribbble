import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
    width: 400px;
    height: 300px;
    border: 10px solid white;
    margin: 10px 10px;
    position: relative;
`;

/**
 * Styles to show the data about the card only when hover on the card.
 */
const FloatingData = styled.div`
  position: absolute;
  background-color: white;
  bottom: 0;
  width: 100%;
  height: 0px;
  transition: height 0.2s ease-out; /* hover on */
  overflow: hidden;
  /* when hover over StyledCard triggers here: */
  ${StyledCard}:hover & {
    height: 50px;
    transition: height 0.2s ease-out; /* hover off */
}
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const P = styled.p`
  line-height: 0.4rem;
  color: ${props => props.secondary ? "grey" : "black"};
  font-size: ${props => props.secondary ? "14px" : "16px"};
`;

export const Card = ({ title, images, date }) =>
  <StyledCard>
    <picture>
      <source media="-webkit-min-device-pixel-ratio-1.5" srcSet={images.two_x} />
      <source srcSet={images.one_x} />
      <img src={images.one_x} alt={title} />
    </picture>
    {/* <Image src={images} alt={title} /> */}
    <FloatingData>
      <P>{title}</P>
      <P secondary>{date}</P>
    </FloatingData>
  </StyledCard>
