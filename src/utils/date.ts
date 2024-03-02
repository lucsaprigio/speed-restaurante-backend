export function getCurrentDate(): string {
    const date = new Date();

    const day = date.getDate();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ("0" + (date.getHours())).slice(-2);
    const minutes = ("0" + (date.getMinutes())).slice(-2);
    const seconds = ("0" + (date.getSeconds())).slice(-2);

    return `${day}.${month}.${year}:${hours}:${minutes}:${seconds}`;
}

export function getCurrentDateISO(): string {
    const date = new Date();

    const day = ("0" + (date.getDate())).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ("0" + (date.getHours())).slice(-2);
    const minutes = ("0" + (date.getMinutes())).slice(-2);
    const seconds = ("0" + (date.getSeconds())).slice(-2);

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}