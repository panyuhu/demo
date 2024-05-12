<template>
    <div class="xxx">
        <div class="mark"></div>
        <div class="dialogContent" v-drag="{ handler: 'ai-header'}">
            <div class="ai-header"></div>
            <div class="ai-body"></div>
            <div class="ai-footer"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            test: '12'
        }
    },
    methods: {
        xxx(){
            
        }
    }
}
</script>

<style lang="less" scoped>
.xxx {
    span {
        color: red;
    }

    .mark {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        background: #000;
        opacity: 0.6;
    }
    .dialogContent{
        width: 600px;
        height: 700px;
        position: fixed;
        top: 50%;
        right: 10px;
        z-index: 1000;
        background: #fff;
        box-shadow: 0 0 2px 0px #fff;;
        transform: translate(0,-50%);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        .ai-header{
            height: 40px;
            border-bottom: 1px solid #999;
        }
        .ai-body{
            flex: 1;
            overflow: auto;
        }
        .ai-footer{
            height: 48px;
            border-top: 1px solid #999;
        }
    }
}
</style>