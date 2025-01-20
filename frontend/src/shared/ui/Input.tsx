import { InputHTMLAttributes, ChangeEvent, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isFocus?: boolean;
}

export const Component = ({
  handleOnChange,
  isFocus,
  ...props
}: InputProps) => {
  const input = useRef(null);

  useEffect(() => {
    if (isFocus && input?.current) {
      (input.current as HTMLElement).focus();
    }
  }, [isFocus]);

  return <input ref={input} {...props} onChange={handleOnChange} />;
};

export const Input = styled(Component)`
  padding: 5px 10px;
  border: 2px solid black;
  border-radius: 10px;
  max-width: 100%;
`;
