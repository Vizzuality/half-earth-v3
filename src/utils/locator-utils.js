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
  if (response.length) {
    return response[0].location
  } else {
    throw new Error('ZIP code does not exist. Locator could not provide any coords')
  }
}