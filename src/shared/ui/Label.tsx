import { LabelHTMLAttributes } from 'react';
import styled from 'styled-components';

const Lab = ({ children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label {...props}>{children}</label>;
};

export const Label = styled(Lab)`
  display: ${(props) => (props.hidden ? 'none' : 'block')};
`;
