import styled from 'styled-components';

export const Tooltip = styled.div`
  position: relative;

  &::before {
    content: '${({ content }) => content}';
    position: absolute;
    text-align: center;
    visibility: hidden;
    opacity: 0;
    min-width: 100%;
    width: max-content;
    height: max-content;
    display: block;
    margin: 0 auto;
    padding: 4px;
    background-color: ${({ theme }) => theme.colors.bgDark};
    color: #fff;
    border-radius: 5px;
    font-size: 0.8rem;
    white-space: nowrap;
    transition: opacity ease-out 0.3s;

    ${({ position }) => {
      if (position === 'top') {
        return `
          bottom: 110%;
          left: 50%;
          transform: translateX(-50%)
        `;
      }

      if (position === 'bottom') {
        return `
          top: 110%;
          left: 50%;
          transform: translateX(-50%)
        `;
      }

      if (position === 'right') {
        return `
          left: 110%;
          top: 0;
          bottom: 0;
          margin: auto 0;
        `;
      }

      if (position === 'left') {
        return `
          right: 110%;
          top: 0;
          bottom: 0;
          margin: auto 0;
        `;
      }
    }};
  }

  &:hover::before {
    visibility: visible;
    opacity: 1;
  }
`;
