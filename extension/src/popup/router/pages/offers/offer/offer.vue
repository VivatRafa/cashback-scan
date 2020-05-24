<template>
    <a-card hoverable @click="toOffer(offer.id)">
        <img class="offer-img" :src="offer.logo" slot="cover" />
        <a-card-meta :title="offer.name" />
    </a-card>
</template>

<script>
export default {
    props: {
        offer: {
            required: true,
            validator: value => typeof value === 'object' || null,
        },
    },
    methods: {
        toOffer(offerId) {
            this.$router.push({ path: `offer/${offerId}` });
        },
    },
};
</script>

<style lang="scss" scoped>
.ant-card {
    width: 166px;
    margin-bottom: 10px;
    margin-right: 10px;
    /deep/ .ant-card-cover {
        height: 100px;
    }
    .offer-img {
        display: block;
        margin: auto;
        width: 60%;
        height: 100%;
        object-fit: contain;
    }
    /deep/ .ant-card-meta-title {
        text-align: center;
    }
    /deep/ .ant-card-body {
        padding: 2px 0;
        border: 1px solid rgba(0,0,0,0.1);
        border-right: 0;
        border-left: 0;
        margin-top: 24px;
        margin-bottom: 24px;
    }
    &:nth-child(even) {
        margin-right: 0;
    }
}
</style>
