import { FC, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Tables from "../Tables";
import useDebounce from "../../hooks/useDebounce";

const StyledSection = styled(Box)({
  background: "#E8ECEE",
});

const textFieldHeight = "44px";

const StyledSearchField = styled(TextField)({
  // minWidth: 280,
  "& .MuiInputBase-root": {
    borderRadius: "8rem",
    background: "white",
  },
});

const FETCH_CHARGING_STATIONS_QUERY = `
{
  getChargingStations{
     id
    address
    socketNumber
    socketType
  }
}
`;

const SEARCH_CHARGING_STATIONS_QUERY = `
  query FetchData($municipality: String!, $address: String!, $location: String!, $postalCode: String! ){
    getChargingStations(municipality : $municipality, address: $address, location: $location, postalCode: $postalCode){
      id
      address
      socketNumber
      socketType
      municipality
      postal
    }
}
  `;



const Content: FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [chargingStations, setChargingStations] = useState<any>([]);
  const [filteredChargingStations, setFilteredChargingStations] = useState<any>(
    []
  );
  const [searchByFields, setSearchByFields] = useState<any>({
    municipality: false,
    location: false,
    address: false,
    postalCode: false,
  });

  const debouncedValue = useDebounce<string>(searchText, 500);

  const { municipality, location, address, postalCode } = searchByFields;

   const searchChargingStations = async (
     municipality = "",
     location = "",
     address = "",
     postalCode = ""
   ) => {
     console.log("CSSSS");

     try {
       const json = await fetch("https://frontend.challenges.tblx.io/graphql", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           query: SEARCH_CHARGING_STATIONS_QUERY,
           variables: {
             municipality,
             address,
             location,
             postalCode,
           },
         }),
       });

       const {
         data: { getChargingStations },
       } = await json.json();
       setFilteredChargingStations(getChargingStations);
      //  console.log("Search", getChargingStations);
       // console.log(getChargingStations);
     } catch (error) {
       console.log(error);
     }
   };

  useEffect(() => {
    const fetchChargingStations = async () => {
      try {
        const json = await fetch(
          "https://frontend.challenges.tblx.io/graphql",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: FETCH_CHARGING_STATIONS_QUERY,
            }),
          }
        );

        const {
          data: { getChargingStations },
        } = await json.json();
        console.log(getChargingStations);
        setChargingStations(getChargingStations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChargingStations();
  }, []);

  useEffect(() => {
    // Do fetch here...
    // Triggers when "debouncedValue" changes
    if (municipality && !location && !address && !postalCode)
      searchChargingStations(debouncedValue);
    else if (location && !municipality && !address && !postalCode)
      searchChargingStations("", debouncedValue);
    else if (address && !municipality && !location && !postalCode)
      searchChargingStations("", "", debouncedValue);
    else if (postalCode && !address && !municipality && !location)
      searchChargingStations("", "", "", debouncedValue);
  }, [debouncedValue]);

  const handleCheck = (e: any) => {
    setSearchByFields((oldState: any) => ({
      ...oldState,
      [e.target.name]: e.target.checked,
    }));
    // searchChargingStations("");
  };

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

 

  return (
    <StyledSection component="section">
      <Container maxWidth="lg">
        <Box pt={5}>
          <Typography variant="h6">Charging Stations</Typography>
          <Typography variant="body1" color="GrayText">
            1546 charging stations
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
          >
            <Box mt={4}>
              <Typography variant="body1" color="grey">
                Socket type
              </Typography>
              <Stack direction="row" columnGap={2}>
                <Button variant="outlined" color="secondary">
                  Normal
                </Button>
                <Button variant="outlined" color="secondary">
                  Rapido
                </Button>
              </Stack>
            </Box>

            {/* {JSON.stringify(searchByFields)} */}

            <Box mt={4} >
              <StyledSearchField
                fullWidth
                size="small"
                placeholder="Search Stations"
                InputProps={{
                  startAdornment: <SearchIcon color="disabled" />,
                  // style: { height: textFieldHeight },
                }}
                onChange={handleSearch}
              />

              <Stack direction={{ xs: "column", lg: "row" }} mt={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="municipality"
                      checked={municipality}
                      onChange={handleCheck}
                    />
                  }
                  label="Municipality"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="location"
                      checked={location}
                      onChange={handleCheck}
                    />
                  }
                  label="Location"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="address"
                      checked={address}
                      onChange={handleCheck}
                    />
                  }
                  label="Address"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="postalCode"
                      checked={postalCode}
                      onChange={handleCheck}
                    />
                  }
                  label="Postal-code"
                  labelPlacement="start"
                />
              </Stack>
            </Box>
          </Stack>
          {!searchText && <Tables chargingStations={chargingStations} />}
          {searchText && <Tables chargingStations={filteredChargingStations} />}
        </Box>
      </Container>
    </StyledSection>
  );
};

export default Content;
