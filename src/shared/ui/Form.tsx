import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 20px;
  background: rgba(254, 254, 254, 0.9);
  border-radius: 10px;
  max-width: 100%;

  div{
    max-width: 100%;
  }

  input{
   margin-top: 3px;
  }
`;
