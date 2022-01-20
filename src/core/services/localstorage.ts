function convertToLocastorageData(data: any){
  return JSON.stringify(data)
}

export function setLocalstorage(data: any) {
  localStorage.setItem('data', convertToLocastorageData(data))
}

export function isEqualData(data: any) {
  return convertToLocastorageData(data) === localStorage.getItem('data')
}

export function getLocalstorage() {
  const daTax = localStorage.getItem('data')
   const data: any =  daTax ? daTax : '[]'
   return JSON.parse(data)
}

