import { FC } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledAvatar = styled(Box)({
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  backgroundColor: "green",
}); 

const Header: FC = () => {
  return (
    <Box component="header">
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4">eCharger</Typography>
          <Stack direction="row" columnGap="12px" alignItems="center">
            <StyledAvatar />
            <Typography variant="h6">Bart vader</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;
