//create a random command number following a patern
export function randomCommandNbr() {
    const randomNumber = "58" + Math.floor(Math.random() * 1000000).toString().padStart(7, "0");
    return randomNumber
}

//create a random facture number following a patern
export function randomFactureNbr() {
    const randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    return "WEB-000119-00" + randomDigits;
}

//add one day to input
//@initialDate : string date format "yyyy-mm-dd"
//@return initialDate + 1 day (if initialDate is saturday then return monday)
export function autoDate(initialDate) {
    let dateInitiale = new Date(initialDate);
    dateInitiale.setDate(dateInitiale.getDate() + 1);

    if (dateInitiale.getDay() === 0) {
        dateInitiale.setDate(dateInitiale.getDate() + 1);
    }

    let year = dateInitiale.getFullYear();
    let month = (dateInitiale.getMonth() + 1).toString().padStart(2, '0');
    let day = dateInitiale.getDate().toString().padStart(2, '0');
    return { day, month, year };
}

//change date format
//@inputDate : string date format "yyyy-mm-dd"
//@return : string date format "dd/mm/yyyy"
export function formatDate(inputDate) {
    let parts = inputDate.split('-');
    let year = parseInt(parts[0]);
    let month = parseInt(parts[1]);
    let day = parseInt(parts[2]);

    let dateObject = new Date(year, month - 1, day);
    let formattedDate = ('0' + dateObject.getDate()).slice(-2) + '/' + ('0' + (dateObject.getMonth() + 1)).slice(-2) + '/' + dateObject.getFullYear();

    return formattedDate;
}

//change date format
//@inputDate : string date format "dd/mm/yyyy"
//@return : string date format "yyyy-mm-dd"
export function formatDateRevert(inputDate) {
    let parts = inputDate.split('/');
    let day = parseInt(parts[0]);
    let month = parseInt(parts[1]);
    let year = parseInt(parts[2]);

    let dateObject = new Date(year, month - 1, day);
    let formattedDate = dateObject.getFullYear() + '-' + ('0' + (dateObject.getMonth() + 1)).slice(-2) + '-' + ('0' + dateObject.getDate()).slice(-2);

    return formattedDate;
}