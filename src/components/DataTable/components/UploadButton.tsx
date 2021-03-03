import React, { ChangeEvent, FC } from "react";

import styled from "styled-components";

type UploadButtonPropsT = {
  onChange: (e: ChangeEvent) => void;
};

export const UploadButton: FC<UploadButtonPropsT> = ({ onChange }) => (
  <Root>
    <HiddenInput type={"file"} {...{ onChange }} />
    Upload .csv
  </Root>
);

const Root = styled.label`
  background-color: black;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: #222222;
  }
`;
const HiddenInput = styled.input`
  display: none;
`;
