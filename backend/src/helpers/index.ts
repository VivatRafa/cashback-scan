export const prepareUrl = (url: string = '') => {
    if (!url) return '';
    // Чтобы было легче парсить new URL спокойно жрет www
    if (url.includes('www')) url = url.replace(/www./g, '');
    // а вот без http(s):// не жрет
    if (!/(http|https):\/\//.test(url)) url = `https://${url}`;
    return url;
}