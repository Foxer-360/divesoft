export default function getUniqMapControls(data: any) {
  let uniqCities = [];
  let uniqCountries = [];
  let uniqAddresses = [];

  const propsToArray = () => {
    for (let i = 0; i < data.length; i++) {
      uniqCountries.push(data[i].country);
    }
    for (let i = 0; i < data.length; i++) {
      uniqCities.push(data[i].city);
    }
    let addresses = [];
    for (let i = 0; i < data.length; i++) {
      data[i].address.split(',').map(item => addresses.push(item.trim()));
    }
    uniqAddresses = Array.from(new Set(addresses));
  };

  const uniqueArray = arr => Array.from(new Set(arr));

  propsToArray();
  uniqCities = uniqueArray(uniqCities);
  uniqCountries = uniqueArray(uniqCountries);
  uniqAddresses = uniqueArray(uniqAddresses);

  return {
    cities: uniqCities.sort(),
    countries: uniqCountries.sort(),
    addresses: uniqAddresses.sort()
  };
}
