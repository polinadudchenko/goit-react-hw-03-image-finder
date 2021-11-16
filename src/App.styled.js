import styled from 'styled-components'

const StyledApp = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
    padding-bottom: 24px;
`;

const StyledModalImg = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%
    height: 100%
`;

export {StyledApp, StyledModalImg}