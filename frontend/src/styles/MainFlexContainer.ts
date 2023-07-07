import styled from 'styled-components';

const MainFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 1000px) {
    flex-wrap: wrap-reverse;
    flex-direction: row-reverse;
  }
`;

export default MainFlexContainer;
