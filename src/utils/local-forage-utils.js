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
  return new Promise((resolve, reject) => {
    localforage.getItem(itemKey).then((storedValues) => {
      if (!storedValues) {
        localforage.setItem(itemKey, {...newValues})
        resolve()
      } else {
        localforage.setItem(itemKey, {
          ...storedValues,
          ...newValues
        })
        resolve()
      }
    })
  })
}

export function getAoiHistory() {
  return new Promise((resolve, reject) => {
      const _aoiHistory = [];
      localforage.iterate((value, key) => {
        _aoiHistory.push({
          id: key,
          name: value.name,
          timestamp: value.timestamp
        })
      }).then(() => {
        resolve(_aoiHistory)
      }).catch((error) => reject(error))
  })
}

export function sortByDate(a, b) {
  return b.timestamp - a.timestamp;
}