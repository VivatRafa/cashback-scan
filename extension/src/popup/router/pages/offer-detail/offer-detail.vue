<template>
    <div class="plugin-content">
        <a-card v-if="offer">
            <div class="wrap">
                <div class="logo">
                    <img :src="offer.logo" />
                </div>
                <div class="info">
                    <div class="panel">
                        <div class="name">{{ offer.name }}</div>
                        <a-button type="primary" @click="toOffersList">
                            <a-icon type="close" />
                        </a-button>
                    </div>
                    <!-- Указать самый большой кэшбэк и самый
                     маленький период подтверждения -->
                </div>
            </div>
            <a-divider type="horizontal">Кэшбэк сервисы</a-divider>
            <div class="service">
                <div class="item" v-for="service in offer.services" :key="service.name" @click="openWebVersion(service.link)">
                    <img :class="['service-logo', { black: darkLogoService.includes(service.name) }]" :src="`../../../../assets/${logos[service.name.toLowerCase()]}`" />
                    <div class="name">{{ service.name }}</div>
                    <div class="value">{{ addSignToString(service.cashback, offer.rateSymbol) }}</div>
                </div>
            </div>
            <!-- <a-divider type="horizontal" />
            <a-button type="primary" class="btn-center">Перейти на сайт</a-button>
            <a-divider type="horizontal" /> -->
        </a-card>
    </div>
</template>

<script>
import { bgPage, addSignToString, getConfigModule, openWebVersion } from '~/helpers';
// засунуть в миксин
import cash4brands from '../../../../assets/images/cash4brands.png';
import backit from '../../../../assets/images/backit.svg';
import kopikot from '../../../../assets/images/kopikot.png';
import letyshops from '../../../../assets/images/letyshops.svg';
import skidka from '../../../../assets/images/skidka.svg';

const { darkLogoService } = getConfigModule('common');

export default {
    props: {
        offerId: {
            required: true,
            validator: value => typeof value === 'number',
        },
    },

    data() {
        return {
            offer: null,
            darkLogoService,
            logos: {
                backit,
                letyshops,
                kopikot,
                skidka,
                cash4brands,
            },
        };
    },

    methods: {
        addSignToString,
        openWebVersion,
        toOffersList() {
            this.$router.push('/offers');
        },
    },

    async created() {
        const { offer, serviceOffers } = (await bgPage.offers.getServiceOffersAndOfferBy({ id: this.offerId })) || {};
        if (!offer || !serviceOffers) return;

        const serviceIds = serviceOffers.map(({ serviceId }) => serviceId);
        const services = bgPage.services.getServicesByIds(serviceIds);

        this.offer = {
            ...offer,
            services: serviceOffers
                .map(serviceOffer => {
                    let serviceInfo = {};
                    services.forEach(({ id, name, referalLink, logo }) => {
                        if (serviceOffer.serviceId === id) {
                            serviceInfo = {
                                name,
                                cashback: serviceOffer.cashback,
                                link: referalLink,
                                logo,
                            };
                        }
                    });
                    return serviceInfo;
                })
                .filter(({ cashback }) => cashback),
        };
    },
};
</script>

<style lang="scss" scoped>
.ant-card {
    margin-bottom: 10px;
}
/deep/ .ant-card-body {
    padding: 10px;
}
.wrap {
    display: flex;
    color: #010101;
    .logo {
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        img {
            max-width: 90%;
        }
    }
    .info {
        width: 100%;
        .panel {
            display: flex;
            .name {
                font-weight: 500;
                font-size: 20px;
            }
            .ant-btn {
                margin-left: auto;
                padding: 0;
                width: 24px;
                height: 24px;
            }
        }
    }
}

.service {
    .item {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        font-size: 18px;
        font-weight: 500;
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid #e8e8e8;
        cursor: pointer;
        &:last-child {
            margin-bottom: 0;
            border-bottom: 0;
        }
        .service-logo {
            width: 35px;
            height: auto;
            &.black {
                background-color: #000;
            }
        }
        div {
            width: 33%;
        }
    }
}
.ant-btn {
    font-size: 12px;
}
.btn-center {
    margin: auto;
    display: block;
}
.ant-divider-horizontal.ant-divider-with-text {
    font-size: 14px;
}
</style>
