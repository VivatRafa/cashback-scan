<template>
    <a-card hoverable>
        <div class="wrap">
            <div class="logo">
                <img :src="service.logo">
            </div>
            <div class="info">
                <div class="name">{{ service.name }}</div>
                <div class="confirm">Период подтвреждения {{ service.confirmTime }}</div>
                <div class="cashback">Кэшбэк (до) {{ addSignToString(service.offer.cashback, '%') }}</div>
                <a-button @click="toService(service.id, service.title)" type="link">Подробнее</a-button>
            </div>
        </div>
    </a-card>
</template>

<script>
import { addSignToString } from '~/helpers';

export default {
    props: {
        service: {
            required: true,
            validator: value => typeof value === 'object' || null,
        }
    },
    data() {
        return {

        }
    },
    computed: {
        bgColor() {
            return this.service?.logo?.bgColor || 'none';
        }
    },
    methods: {
        addSignToString,
        toService(id, service) {
            this.$router.push({ path: `service/${id}`, params: { service }});
        }
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
        img {
            max-width: 90%;
        }
    }
    .confirm {
        font-size: 11px;
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
