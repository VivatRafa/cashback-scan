export interface Service {
    getOffer(): Promise<Boolean>;
    getOffers(): Promise<Boolean>;
}
