export const SEARCH_CHARGING_STATIONS_QUERY = `
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

export const FETCH_CHARGING_STATIONS_QUERY = `
{
  getChargingStations{
     id
    address
    socketNumber
    socketType
  }
}
`;