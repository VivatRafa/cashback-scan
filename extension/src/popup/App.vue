<template>
    <div class="main-container">
        <app-header></app-header>
        <router-view></router-view>
    </div>
</template>

<script>
import appHeader from '~/components/header';
export default {
    components: {appHeader},
    data() {
        return {};
    },
};
</script>
<style lang="scss">
@import '~/assets/styles/styles.scss';
html {
    &::-webkit-scrollbar {
        width: 0;
    }
}
body {
    height: 100%;
    background-color: #f5f6fa;
    padding: 0;
    margin: 0;
    font-size: 14px;
    font-family: Roboto;
    -webkit-font-smoothing: antialiased;
}

.main-container {
    padding: 10px;
    min-height: 600px;
    max-width: 380px;
    min-width: 380px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}

.plugin-content {
    width: 100%;
    padding-top: 10px;
    margin: 0 auto;
    box-sizing: border-box;
}

.spinner {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
}
</style>