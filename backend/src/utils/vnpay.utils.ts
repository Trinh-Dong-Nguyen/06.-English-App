export function formatDateToVnpCreateDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

export function sortObject(obj) {
  const sorted = {};
  const str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}

export function customStringify(
  params: Record<string, string | number>,
  encode: boolean = true,
): string {
  return Object.keys(params)
    .map((key) => {
      const value = params[key];
      const encodedKey = encode ? encodeURIComponent(key) : key;
      const encodedValue = encode
        ? encodeURIComponent(String(value))
        : String(value);
      return `${encodedKey}=${encodedValue}`;
    })
    .join('&');
}
