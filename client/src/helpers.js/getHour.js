export const getHour = date => {
    let reportDate =  new Date(date);
    let hours = reportDate.getHours() < 10 ? `0${reportDate.getHours()}` : reportDate.getHours()
    let minutes = reportDate.getMinutes() < 10 ? `0${reportDate.getMinutes()}` : reportDate.getMinutes();

    return `${hours}:${minutes}`
}