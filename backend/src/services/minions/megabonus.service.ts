import { HttpService, Injectable } from '@nestjs/common';

interface megabounsOffer {
    user_percent;
    offer_name;
    domain;
    offer_percent_currency;
}

@Injectable()
export class MegabonusService {
    headers: object;
    constructor(
        private readonly apiUrl: string,
        private readonly httpService: HttpService,
    ) {
        // this.headers = {
        //     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        //     "Accept-Encoding": "gzip, deflate, br",
        //     "Accept-Language": "ru,es;q=0.9,ru-RU;q=0.8,en-US;q=0.7,en;q=0.6",
        //     "Cache-Control": "no-cache",
        //     "Connection": "keep-alive",
        //     "Cookie": 'rerf=AAAAAF53IbgWNd5fAwgtAg==; clang=ru; mb_utm_term=google+cashback+organic; mb_utm_content=https%3A%2F%2Fmegabonus.com%2Fextension%3Futm_referrer%3Dhttps%253a%252f%252fwww.google.com%252f%26fa821dba_ipp_key%3Dv1584865720238%252Fv3394bd400b5e53a13cfc65163aeca6afa04ab3%252F5Rx9%252f1eqG4nZRogIVU1sxQ%253d%253d%26fa821dba_ipp_uid%3D1584865720238%252fTErcbuiqQdHDXn7T%252f6V0j43Nm1csvaBROviIDIg%253d%253d%26fa821dba_ipp_uid2%3DTErcbuiqQdHDXn7T%252f6V0j43Nm1csvaBROviIDIg%253d%253d%26fa821dba_ipp_uid1%3D1584865720238; ipp_uid2=TErcbuiqQdHDXn7T/6V0j43Nm1csvaBROviIDIg==; ipp_uid1=1584865720238; ipp_uid=1584865720238/TErcbuiqQdHDXn7T/6V0j43Nm1csvaBROviIDIg==; _ga=GA1.2.2125331598.1584865725; _gid=GA1.2.1129781165.1584865725; tmr_lvid=6df6c9df7b9f3c77013e4fb07446584d; tmr_lvidTS=1584865725131; _ym_uid=1584865725133275336; _ym_d=1584865725; _ym_isad=1; g_state={"i_p":1584873562592}; _ym_wasSynced=%7B%22time%22%3A1584866380846%2C%22params%22%3A%7B%22eu%22%3A0%7D%2C%22bkParams%22%3A%7B%7D%7D; au_id=58979938872294635; u_id=2294635; e_id=prkinyaszadi%40gmail.com; alibonus_play=not; lastAuth=%7B%22prkinyaszadi%40gmail.com%22%3A%7B%22date%22%3A%222020-03-22+11%3A41%3A44%22%2C%22email%22%3A%7B%22id%22%3A2294635%2C%22email%22%3A%22prkinyaszadi%40gmail.com%22%2C%22user_name%22%3A%22prkinyaszadi%22%2C%22avatar%22%3A%22https%3A%5C%2F%5C%2Fcdn.megabonus.com%5C%2Fimages%5C%2Fuser%5C%2Fno_photo.svg%22%2C%22provider%22%3A%22email%22%7D%7D%7D; mb_key=eyJpdiI6InBmUUtVdG5oZ241RDlcL1RnMkhWUmtRPT0iLCJ2YWx1ZSI6IldNY0xQQmUwajR0Yzh2TGlWemc2d3V5N3JYRENNbjV5ZDhYaVB2UXdJMk5lWGxxRzJRWkNxWFRzcEVPenBZZTl6eDJhaHIzV0lVVWhxRWh1Vk1vQjNRMXJcL0JMNUJmck1VaGxzRnlDSTZFRT0iLCJtYWMiOiJkNzAyZGEyNDY3NmM5ZDJhZGRjNTI2NzZlYWJhMTY4MDMyN2I2MTYxOTQ0MDYyNDYxMWM3NTViN2MwNzhlZGVkIn0%3D; t_id=2294635%7CeyJpdiI6IkNrdlJDVUo0MlZRdkZ6NE9yMUJVN2c9PSIsInZhbHVlIjoiVk5GcmVUakZwMkg0Y3Z5K2JOcmRDNFdYbEkzcXlCMlhNRzN3aWM0bU1SZnZ4UHJaR1R4MzZiNDY3aUk2ZVZzQWpnYitXczFubDBMOWJIME9iU0FPWUQzRm9jMXZpNzhCTzkzdGxLUGNkc1E9IiwibWFjIjoiN2E2MzY4MmU0ZjYzYzg5NDJjZjM2M2VlMzMxMjBjMzVjNWQ0NjI3Y2IzY2YzMTA5YzJjMjBkMmViYTE4MTg3MyJ9; ipp_key=v1584872319713/v3394724575ded878b223b2d5/5kiMLWZU/6GaLM5hlzdo3A==; tmr_detect=1%7C1584872856360; tmr_reqNum=25; sessions=n5e4f25ir3slth9fq8thp7fiqvsujumo; ipp_static_key=1584889420783/LiA2EWun/JmJ/jEsGgFkig==',
        //     "Host": "megabonus.com",
        //     "Pragma": "no-cache",
        //     "Sec-Fetch-Dest": "document",
        //     "Sec-Fetch-Mode": "navigate",
        //     "Sec-Fetch-Site": "none",
        //     "Sec-Fetch-User": "?1",
        //     "Upgrade-Insecure-Requests": "1",
        //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
        // }
        this.headers = {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "ru,es;q=0.9,ru-RU;q=0.8,en-US;q=0.7,en;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Length": "349",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Cookie": 'rerf=AAAAAF53IbgWNd5fAwgtAg==; clang=ru; mb_utm_term=google+cashback+organic; mb_utm_content=https%3A%2F%2Fmegabonus.com%2Fextension%3Futm_referrer%3Dhttps%253a%252f%252fwww.google.com%252f%26fa821dba_ipp_key%3Dv1584865720238%252Fv3394bd400b5e53a13cfc65163aeca6afa04ab3%252F5Rx9%252f1eqG4nZRogIVU1sxQ%253d%253d%26fa821dba_ipp_uid%3D1584865720238%252fTErcbuiqQdHDXn7T%252f6V0j43Nm1csvaBROviIDIg%253d%253d%26fa821dba_ipp_uid2%3DTErcbuiqQdHDXn7T%252f6V0j43Nm1csvaBROviIDIg%253d%253d%26fa821dba_ipp_uid1%3D1584865720238; ipp_uid2=TErcbuiqQdHDXn7T/6V0j43Nm1csvaBROviIDIg==; ipp_uid1=1584865720238; ipp_uid=1584865720238/TErcbuiqQdHDXn7T/6V0j43Nm1csvaBROviIDIg==; _ga=GA1.2.2125331598.1584865725; _gid=GA1.2.1129781165.1584865725; tmr_lvid=6df6c9df7b9f3c77013e4fb07446584d; tmr_lvidTS=1584865725131; _ym_uid=1584865725133275336; _ym_d=1584865725; _ym_isad=1; g_state={"i_p":1584873562592}; _ym_wasSynced=%7B%22time%22%3A1584866380846%2C%22params%22%3A%7B%22eu%22%3A0%7D%2C%22bkParams%22%3A%7B%7D%7D; au_id=58979938872294635; u_id=2294635; e_id=prkinyaszadi%40gmail.com; alibonus_play=not; lastAuth=%7B%22prkinyaszadi%40gmail.com%22%3A%7B%22date%22%3A%222020-03-22+11%3A41%3A44%22%2C%22email%22%3A%7B%22id%22%3A2294635%2C%22email%22%3A%22prkinyaszadi%40gmail.com%22%2C%22user_name%22%3A%22prkinyaszadi%22%2C%22avatar%22%3A%22https%3A%5C%2F%5C%2Fcdn.megabonus.com%5C%2Fimages%5C%2Fuser%5C%2Fno_photo.svg%22%2C%22provider%22%3A%22email%22%7D%7D%7D; mb_key=eyJpdiI6InBmUUtVdG5oZ241RDlcL1RnMkhWUmtRPT0iLCJ2YWx1ZSI6IldNY0xQQmUwajR0Yzh2TGlWemc2d3V5N3JYRENNbjV5ZDhYaVB2UXdJMk5lWGxxRzJRWkNxWFRzcEVPenBZZTl6eDJhaHIzV0lVVWhxRWh1Vk1vQjNRMXJcL0JMNUJmck1VaGxzRnlDSTZFRT0iLCJtYWMiOiJkNzAyZGEyNDY3NmM5ZDJhZGRjNTI2NzZlYWJhMTY4MDMyN2I2MTYxOTQ0MDYyNDYxMWM3NTViN2MwNzhlZGVkIn0%3D; t_id=2294635%7CeyJpdiI6IkNrdlJDVUo0MlZRdkZ6NE9yMUJVN2c9PSIsInZhbHVlIjoiVk5GcmVUakZwMkg0Y3Z5K2JOcmRDNFdYbEkzcXlCMlhNRzN3aWM0bU1SZnZ4UHJaR1R4MzZiNDY3aUk2ZVZzQWpnYitXczFubDBMOWJIME9iU0FPWUQzRm9jMXZpNzhCTzkzdGxLUGNkc1E9IiwibWFjIjoiN2E2MzY4MmU0ZjYzYzg5NDJjZjM2M2VlMzMxMjBjMzVjNWQ0NjI3Y2IzY2YzMTA5YzJjMjBkMmViYTE4MTg3MyJ9; ipp_key=v1584872319713/v3394724575ded878b223b2d5/5kiMLWZU/6GaLM5hlzdo3A==; tmr_detect=1%7C1584872856360; tmr_reqNum=25; sessions=tm0qv8g1rh8ua8cp0tbm6mms9po2p67b; ipp_static_key=1584887697496/qLwgamvT+wMAwIp2KvbEpw==',
            "Host": "megabonus.com",
            "Origin": "chrome-extension://dbfipcjecamggjfabeaclacjoohfjhhn",
            "Pragma": "no-cache",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "none",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
        }
    }

    async getOffer(): Promise<Boolean> {
        return true;
    }

    async getOffers(): Promise<Object[]> {
        return new Promise((resolve, reject) => {
            this.httpService
                .get(`${this.apiUrl}/get_all_offers`, { headers: this.headers })
                .subscribe(resp => {
                    const { status, data } = resp;
                    if (status === 200) {
                        const { ext_offers_data: extOffers, disabled_offers: nonExtOffers } = data;
                        const offers: Object[] = [...Object.values(extOffers), ...Object.values(nonExtOffers)];
                        const formatedOffers = offers.map((offer: megabounsOffer) => {
                            let rates = null;
                            const cashback = offer?.user_percent;
                            // Удаление саб домена var result = string.replace(/^[^.]+\./g, "");
                            return {
                                offer: {
                                    name: offer?.offer_name,
                                    url: offer?.domain,
                                    logo: '',
                                    rateSymbol: offer?.offer_percent_currency,
                                },
                                serviceOfferInfo: { rates, cashback },
                            };
                        });
                        resolve(formatedOffers);
                    } else reject();
                });
        });
    }
}
