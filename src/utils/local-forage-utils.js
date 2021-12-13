import localforage from 'localforage';

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
          areaName: value.areaName,
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