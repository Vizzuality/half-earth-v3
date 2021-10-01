import localforage from 'localforage';

export function fetchDataAndUpdateForageItem(itemKey, fetchGpDataFunction, geometry) {
  return new Promise((resolve, reject) => {
    fetchGpDataFunction(geometry).then((data) => {
      writeToForageItem(itemKey, data);
      resolve(data);
    }).catch((error) => reject(error))
  })
}

export function writeToForageItem(itemKey, newValues) {
    localforage.getItem(itemKey).then((storedValues) => {
      console.log('values about to be spread on FORAGE', newValues)
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
