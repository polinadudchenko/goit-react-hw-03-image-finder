import styled from 'styled-components'

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const StyledModal = styled.div`
  max-width: calc(100vw - 192px);
  max-height: calc(100vh - 96px);
`;

export {StyledOverlay, StyledModal}