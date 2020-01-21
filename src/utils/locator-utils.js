export const getCoordsFromZipAndCountry = async (LocatorConstructor, ZIP, countryCode) => {
  const locator = new LocatorConstructor({
    url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates"
  })
  const response = await locator.addressToLocations({
    countryCode: countryCode,
    address: {
      postal: ZIP
    }
  })
  return response[0].location;
}