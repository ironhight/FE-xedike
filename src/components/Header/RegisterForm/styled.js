import styled from 'styled-components';
import theme from '../../../theme';

export const UserType = styled.label`
  input {
    display: none;
  }

  .label-wrapper {
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s;
    padding: 20px 40px 15px 40px;
    border-radius: 5px;
    margin-bottom: 0;

    &:hover {
      border-color: ${theme.primary};
    }
  }

  input:checked + .label-wrapper {
    border-color: ${theme.primary};
  }
`;
