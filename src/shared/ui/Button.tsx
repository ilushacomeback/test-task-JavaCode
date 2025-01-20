import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleOnClick?: () => void;
}

const Btn = ({ handleOnClick, children, ...props }: ButtonProps) => {
  return (
    <button {...props} onClick={handleOnClick}>
      {children}
    </button>
  );
};

export const Button = styled(Btn)`
  padding: 5px 10px;
  min-width: 120px;
  border: 2px solid rgba(225, 225, 225, 0.8);
  background: rgba(225, 225, 225, 0.5);
  border-radius: 10px;
  transition: 0.5s all ease-in;
  &:hover{
    background: rgba(225, 225, 225, 1);
  }
`;
