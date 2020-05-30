<template>
    <a-card hoverable @click="toService(service.serviceOfferId)">
        <div class="wrap">
            <div :class="['logo', { black: darkLogoService.includes(service.name) }]">
                <img :src="`../../../../../assets/${logos[service.name.toLowerCase()]}`" />
            </div>
            <div class="info">
                <div class="name">{{ service.name }}</div>
                <div class="confirm">Период подтвреждения: {{ service.offer.confirmTime || 'уточняем' }}</div>
                <div class="cashback">
                    Кэшбэк {{ service.offer.isRatesMoreThanOne ? 'до' : '' }}
                    {{ addSignToString(service.offer.cashback, service.offer.rateSymbol) }}
                </div>
                <a-button type="link">Подробнее</a-button>
            </div>
        </div>
    </a-card>
</template>

<script>
import { addSignToString, getConfigModule } from '~/helpers';
// засунуть в миксин
import cash4brands from '../../../../../assets/images/cash4brands.png';
import backit from '../../../../../assets/images/backit.svg';
import kopikot from '../../../../../assets/images/kopikot.png';
import letyshops from '../../../../../assets/images/letyshops.svg';
import skidka from '../../../../../assets/images/skidka.svg';

const { darkLogoService } = getConfigModule('common');

export default {
    props: {
        service: {
            required: true,
            validator: value => typeof value === 'object' || null,
        },
    },
    data() {
        return {
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
        toService(serviceOfferId) {
            this.$router.push({ path: `service/${serviceOfferId}` });
        },
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

    .name {
        font-weight: 400;
        font-size: 16px;
    }
    .logo {
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        border-radius: 3px;
        img {
            max-width: 90%;
        }
        &.black {
            background-color: #000;
        }
    }
    .confirm {
        font-size: 11px;
        min-height: 16px;
        margin: 5px 0;
    }
    .cashback {
        font-weight: 500;
        font-size: 16px;
    }
    .ant-btn {
        padding: 0;
        height: auto;
        margin-top: 5px;
        font-size: 12px;
    }
}
</style>
