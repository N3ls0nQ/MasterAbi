export const dateFormatter = (inputDate) => {
    var date = inputDate.getDate();
    var month = inputDate.getMonth() + 1;
    var year = inputDate.getFullYear();

    date = date.toString().padStart(2, "0");
    month = month.toString().padStart(2, "0");

    return `${date}.${month}.${year}`
}
