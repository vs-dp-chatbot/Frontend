import React from "react";
import styled from "@emotion/styled";
import styledcom from 'styled-components';
import { Box, Typography } from "@mui/material";
import CategoryTitle from "./CategoryTitle";
import { CategoryServiceTypes, CategoryServiceSubTypes } from "./TabTypes";


const CategoryContentsBox = styled(Box)`
  width: 216px;
  height: 160px;
  padding: 18px;
  border-radius: 16px;
  background-image: url('../assets/icon/file.png');
  background-size: cover;
  cursor: pointer;
  background-color: #fff;
`;

const CategorySubTabText = styled(Typography)`
  padding: 10px 8px;
  border-radius: 8px;
  margin-top: 2px;
  text-align: left;
  color: #7e7e7e;
  cursor: pointer;

  &:hover {
    background-color: #FFFFFF;
    color: #4EC0E0;
  }
`;

const CategoryBox = ({ title, onClick }) => {
  let subTabs = [];

  if (title === CategoryServiceTypes.Contents) {
    subTabs = [CategoryServiceSubTypes.TabTab, CategoryServiceSubTypes.Vivasam];
  }
  else if(title === CategoryServiceTypes.Learning) {
    subTabs = [
      CategoryServiceSubTypes.OnlyOneElement,
      CategoryServiceSubTypes.OnlyOneKids,
    ];
  }
  else {
    subTabs = [
      CategoryServiceSubTypes.FcCore,
      CategoryServiceSubTypes.SamQuiz,
    ];
  }

  return (
    <CategoryContentsBox className="shadow" onClick={onClick} >
      <CategoryTitle title={title} />
      {subTabs.map((subTab, index) => (
        <CategorySubTabText key={index}>{subTab}</CategorySubTabText>
      ))}
    </CategoryContentsBox>
  );
};
export default CategoryBox;
