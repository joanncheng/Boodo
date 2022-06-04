import styled from 'styled-components';

export const FeaturesContainer = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bgDark};

  @media screen and (max-width: 768px) {
    height: 1100px;
  }

  @media screen and (max-width: 480px) {
    height: 1300px;
  }
`;

export const FeaturesH1 = styled.h1`
  font-size: 60px;
  color: #fff;
  margin-bottom: 64px;
  font-family: 'Gochi hand';

  @media screen and (max-width: 480px) {
    font-size: 48px;
  }
`;

export const FeaturesWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;
export const FeaturesCard = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  max-height: 340px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;
export const FeaturesIcon = styled.img`
  max-height: 160px;
  width: 160px;
  margin-bottom: 30px;
`;

export const FeaturesH2 = styled.h2`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 10px;
`;

export const FeaturesP = styled.p`
  font-size: 1rem;
  text-align: center;
`;
