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
      if (!storedValues) {
        console.log('storing on FORAGE', newValues)
        localforage.setItem(itemKey, {...newValues})
      } else {
        console.log('storing on FORAGE', newValues)
        localforage.setItem(itemKey, {
          ...storedValues,
          ...newValues
        })
      }
    })
}
