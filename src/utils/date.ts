import { getHours, getMinutes } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export function getLocalDate(initialTime: Date, finalTime: Date) {
    const timeZone = 'America/Sao_Paulo';

    const initialHour = new Date(initialTime); // Horário inicial
    const finalHour = new Date(finalTime); // Horário final

    // Hora local do servidor
    const localInitialHour = toZonedTime(initialHour, timeZone);
    const localFinalHour = toZonedTime(finalHour, timeZone);

    // Pegando o horário e minuto 
    const timeInitialHour = getHours(localInitialHour);
    const timeInitialMinutes = getMinutes(localInitialHour);

    const timeFinalHour = getHours(localFinalHour);
    const timeFinalMinutes = getMinutes(localFinalHour);

    const timeInitialNumber = timeInitialHour * 100 + timeInitialMinutes;
    const timeFinalNumber = timeFinalHour * 100 + timeFinalMinutes;

    return { timeInitialNumber, timeFinalNumber }
}

export function getLocalCurrentDate(date: Date) {
    const timeZone = 'America/Sao_Paulo';

    const currentHour = new Date(date);

    const localHour = toZonedTime(currentHour, timeZone);

    const timeInitialHour = getHours(localHour);
    const timeInitialMinutes = getMinutes(localHour);

    const timeCurrentHourNumber = timeInitialHour * 100 + timeInitialMinutes;

    return timeCurrentHourNumber;
}

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