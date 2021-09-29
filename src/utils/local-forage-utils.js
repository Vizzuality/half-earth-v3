import localforage from 'localforage';

export function fetchDataAndUpdateForageAoi(itemKey, fetchGpDataFunction, geometry) {

  return new Promise((resolve, reject) => {
    fetchGpDataFunction(geometry).then((data) => {
      writeToItem(itemKey, data);
      resolve(data);
    }).catch((error) => reject(error))
  })
}

export function writeToItem(itemKey, newValues) {
    localforage.getItem(itemKey).then((storedValues) => {
      console.log('STORED VALUES', storedValues);
      console.log('NEW VALUES', newValues);
      if (!storedValues) {
        localforage.setItem(itemKey, {...newValues})
      } else {
        localforage.setItem(itemKey, {
          ...storedValues,
          ...newValues
        })
      }
    })
}
