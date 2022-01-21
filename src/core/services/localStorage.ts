function convertToLocalStorageData(data: any){
  return JSON.stringify(data)
}

export function setLocalStorage(data: any) {
  localStorage.setItem('data', convertToLocalStorageData(data))
}

export function isEqualData(data: any) {
  return convertToLocalStorageData(data) === localStorage.getItem('data')
}

export function getLocalStorage() {
  const daTax = localStorage.getItem('data')
   const data: any =  daTax ? daTax : '[]'
   return JSON.parse(data)
}

