import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import {CategoryServiceSubTypes, CategoryServiceTypes} from "./TabTypes";
import CategoryBox from "./CategoryBox";

const Container = styled(Box)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const VisangService = ({ onCategorySelect }) => {
  const [CategoryType, setCategoryType] = useState(
    CategoryServiceSubTypes.OnlyOneElement
  );

  const handleChangeCategoryType = (category) => {
    setCategoryType(category);
    onCategorySelect(category);
  };

  return (
    <Container  padding={"40px 80px"} sx={{ background: "bg-background-color"}}>
      <Box display={"flex"} justifyContent={"flex-start"} gap={10} mb={"24px"}>
        <Typography fontWeight={600} color={"#7E7E7E"}>비상 서비스</Typography>
        <Typography color={"#7E7E7E"}>탐색하고 싶은 서비스를 선택해주세요.</Typography>
      </Box>

      <Stack display={"flex"} flexDirection={"row"} gap={3}>
        {Object.entries(CategoryServiceTypes).map(([key, value]) => (
          <CategoryBox
            key={key}
            title={value}
            onClick={() => handleChangeCategoryType(value)}
          />
        ))}
      </Stack>
        
    </Container>
  );
};
export default VisangService;
