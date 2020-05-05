export default function getUniqMapControls(data: LooseObject) {
  let uniqCities = [];
  let uniqCountries = [];
  let uniqServices = [];
  let uniqAddFilters = [];

  const propsToArray = () => {
    for (let i = 0; i < data.length; i++) {
      uniqCountries.push(data[i].country);
      // tslint:disable-next-line: no-unused-expression
      data[i].otherCountries && JSON.parse(data[i].otherCountries).length > 0 &&
        JSON.parse(data[i].otherCountries).forEach(item => uniqCountries.push(item));
      uniqCities.push(data[i].city);
      uniqServices.push(data[i].service);
      if (data && data[i] && data[i].addFilter) {
        data[i].addFilter.split(',').map(item => uniqAddFilters.push(item.trim()));
      }
    }
  };

  const uniqueArray = arr => Array.from(new Set(arr));

  propsToArray();
  uniqCities = uniqueArray(uniqCities);
  uniqCountries = uniqueArray(uniqCountries);
  uniqServices = uniqueArray(uniqServices);
  uniqAddFilters = uniqueArray(uniqAddFilters);

  return {
    cities: uniqCities.sort(),
    countries: uniqCountries.sort(),
    services: uniqServices.sort(),
    addFilters: uniqAddFilters.sort()
  };
}
