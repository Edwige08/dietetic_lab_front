export const monthInLetters = (month: number) => {
    if (month == 0) return "janvier";
    if (month == 1) return "février";
    if (month == 2) return "mars";
    if (month == 3) return "avril";
    if (month == 4) return "mai";
    if (month == 5) return "juin";
    if (month == 6) return "juillet";
    if (month == 7) return "août";
    if (month == 8) return "septembre";
    if (month == 9) return "octobre";
    if (month == 10) return "novembre";
    if (month == 11) return "décembre";
};

export const getDate = (date: string) => {
    const pubDate = new Date(date);
    const publicationDate = `${pubDate.getDate()}${pubDate.getDate() == 1 ? "er" : ""
        } ${monthInLetters(pubDate.getMonth())} ${pubDate.getFullYear()}`;
    return publicationDate
}

export const getHour = (date: string) => {
    const pubDate = new Date(date);
    const publicationDate = `${pubDate.getHours()}h${pubDate.getMinutes().toString().padStart(2, '0')}`;
    return publicationDate
}