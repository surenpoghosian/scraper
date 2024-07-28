/**
 * get date and time in one string
 * @returns The dateTime string.
 */
const getDateTime = () => {
  const currentTime = Date.now();
  const new_date = new Date(currentTime)
  const year = new_date.getFullYear()
  const month = new_date.getMonth()+1
  const day = new_date.getDate()
  const hour = new_date.getHours() 
  const minute = new_date.getMinutes()
  const second = new_date.getSeconds()
  
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
};

export default getDateTime;
