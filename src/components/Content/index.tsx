import { FC, useEffect, useState, ChangeEvent } from "react";
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
import {
  FETCH_CHARGING_STATIONS_QUERY,
  SEARCH_CHARGING_STATIONS_QUERY,
} from "../../gql";
import { useTheme } from "@mui/material/styles";

enum SOCKET_TYPE {
  NORMAL = "Normal",
  RAPIDO = "Rápido",
}

const API_URL = "https://frontend.challenges.tblx.io/graphql";

const StyledSection = styled(Box)({
  background: "#E8ECEE",
});

const StyledSearchField = styled(TextField)({
  "& .MuiInputBase-root": {
    borderRadius: "8rem",
    background: "white",
  },
});

const Content: FC = () => {
  const [filterBy, setFilterBy] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [chargingStations, setChargingStations] = useState<any>([]);
  const [filteredChargingStations, setFilteredChargingStations] = useState<any>(
    []
  );
  const [searchStations, setSearchStations] = useState<any>([]);
  const [searchByFields, setSearchByFields] = useState<any>({
    municipality: false,
    location: false,
    address: false,
    postalCode: false,
  });

  const debouncedValue = useDebounce<string>(searchText, 500);
  const theme = useTheme();

  const { municipality, location, address, postalCode } = searchByFields;

  const searchChargingStations = async (
    municipality = "",
    location = "",
    address = "",
    postalCode = ""
  ) => {
    try {
      const json = await fetch(API_URL, {
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
      setSearchStations(getChargingStations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchChargingStations = async () => {
      try {
        const json = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: FETCH_CHARGING_STATIONS_QUERY,
          }),
        });

        const {
          data: { getChargingStations },
        } = await json.json();
        setChargingStations(getChargingStations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChargingStations();
  }, []);

  useEffect(() => {
    if (municipality && !location && !address && !postalCode)
      searchChargingStations(debouncedValue);
    else if (location && !municipality && !address && !postalCode)
      searchChargingStations("", debouncedValue);
    else if (address && !municipality && !location && !postalCode)
      searchChargingStations("", "", debouncedValue);
    else if (postalCode && !address && !municipality && !location)
      searchChargingStations("", "", "", debouncedValue);
  }, [debouncedValue]);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchByFields((oldState: any) => ({
      ...oldState,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleFilterBy = (filterText: string) => {
    let filteredContent: any = [];
    filteredContent = chargingStations.filter((el: any) => {
      if (el.socketType === filterText) return true;
      return false;
    });
    setFilteredChargingStations(filteredContent);

    setFilterBy(filterText);
  };

  const handleResetFilter = () => {
    setFilterBy("");
  };

  return (
    <StyledSection component="section">
      <Container maxWidth="lg">
        <Box pt={5}>
          <Typography variant="h6">Charging Stations</Typography>
          <Typography variant="body1" color="GrayText">
            {searchText
              ? searchStations.length
              : filterBy
              ? filteredChargingStations.length
              : chargingStations.length} {" "}
            charging stations
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
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleFilterBy(SOCKET_TYPE.NORMAL)}
                  onDoubleClick={handleResetFilter}
                  sx={{
                    border:
                      filterBy === SOCKET_TYPE.NORMAL
                        ? `3px solid ${theme.palette.common.black}`
                        : "",
                  }}
                >
                  Normal
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleFilterBy(SOCKET_TYPE.RAPIDO)}
                  onDoubleClick={handleResetFilter}
                  sx={{
                    border:
                      filterBy === SOCKET_TYPE.RAPIDO
                        ? `3px solid ${theme.palette.common.black}`
                        : "",
                  }}
                >
                  Rapido
                </Button>
              </Stack>
            </Box>


            <Box mt={4}>
              <StyledSearchField
                fullWidth
                size="small"
                placeholder="Search Stations"
                InputProps={{
                  startAdornment: <SearchIcon color="disabled" />,
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
          {!searchText &&
            (!filterBy ? (
              <Tables chargingStations={chargingStations} />
            ) : (
              <Tables chargingStations={filteredChargingStations} />
            ))}
          {searchText && <Tables chargingStations={searchStations} />}
        </Box>
      </Container>
    </StyledSection>
  );
};

export default Content;
