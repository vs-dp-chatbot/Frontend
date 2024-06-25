import { Stack, Typography } from "@mui/material";

const CategoryTitle = ({ title }) => {
  return (
    <Stack>
      <Typography fontSize={"1.1rem"} fontWeight={600} p={"10px"} color={"#7E7E7E"}>
        {title} Company
      </Typography>
    </Stack>
  );
};
export default CategoryTitle;
