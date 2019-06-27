import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

// const Img = styled.img`
//   padding: 1px;
//   max-height: 100vh;
//   ${({ width }) => width && `
//     width: ${width}
//   `}
// `;

const Img = styled.img`
  max-width: 100%;
`;

/**
 * Mostra a maior imagem caso ela exista no Shot (images.two_x). 
 * @param {Object} shot - shot com as imagens e o título. 
 */
const ResponsiveImg = ({ shot }) => {
  if (shot.images.two_x)
    return <Container>
      <Img srcset={
        `${shot.images.one_x} 360w,
        ${shot.images.two_x} 800w`}
        sizes="(max-width: 400px) 360px, 800px"
        src={shot.images.two_x || shot.images.normal} alt={shot.title} />
    </Container>;
  else
    return <Container>
      <Img width={shot.width} src={shot.images.normal} alt={shot.title} />
    </Container>
}

export default ResponsiveImg;