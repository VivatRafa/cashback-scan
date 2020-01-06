<template>
    <div class="plugin-content">
        <offer-name />
        <div>
            <service v-for="service of services"   :service="service" :key="service.id" />
        </div>
    </div>
</template>

<script>
import { openWebVersion, getTabInfo, bgPage } from '~/helpers';
import { mapGetters } from 'vuex';
import service from './service';
import offerName from '~/components/offer-name';

export default {
    components: { service, offerName },

    data() {
        return {
            services: [],
            offerName: null,
        }
    },

    asyncComputed: {
        url() {
            return getTabInfo('url').then(url => url);
        },
    },

    computed: {
        ...mapGetters('services', ['getServicesByIds']),
    },
    
    watch: {
        url(newValue) {
            if (newValue) this.getServiceData(newValue);
        },
    },

    methods: {
        async getServiceData(url) {
            const { offer, serviceOffers } = await bgPage.offers.getServiceOffer(url) || {};
            const serviceIds = serviceOffers.map(({ serviceId }) => serviceId);
            const services = this.getServicesByIds([serviceIds]);
            this.services = services.map(service => {
                let tempService = { ...service };
                serviceOffers.forEach(serviceOffer => {
                    if (service.id === serviceOffer.serviceId) {
                        const { cashback, confirmTime } = serviceOffer;
                        tempService = {
                            ...tempService,
                            cashback,
                            confirmTime,
                        }
                    }
                });
            })
        }


    },
};
</script>

<style lang="scss" scoped>
</style>
