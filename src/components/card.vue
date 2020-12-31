<template>
<div :class="cardClasses" @click="click" :style="cardTransform">
    <div class="cardIn">
        <div class="cardF">
            <img src="../assets/cards/cardBack.png"/>
        </div>
        <div :data-matchkey="card.matchKey" class="cardB">
            <img :src="`${card.imgUrl}`"/>
        </div>
    </div>
</div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// source: https://morioh.com/p/9492a640932c

export default {
    name: 'card',
    props: {
        card: {
            type: Object,
            default: () => {},
        },
        cardTransform: {
            type: String,
            default: () => {},
        },
    },
    computed: {
        cardClasses() {
            return {
                'card': true,
                'card-flipped': this.card.flipped,
                'card-matched': this.card.matched,
            };
        },
    },    
    methods: {
        click() {
            this.$emit('clicked', this.card.id);
        },
    },
};

</script>

<style scoped>

.card {
    width: auto;
    max-width: 100%;
    perspective: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.card-flipped .cardIn {
    transform: rotateY(180deg);
}

.card-matched .cardIn {
    opacity: 0.2;
}

.cardF,
.cardB {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-color: white;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.cardF {
    background: darkmagenta;
    z-index: 2;
}

.cardB {
    transform: rotateY(180deg);
}

.cardIn,
.cardF,
.cardB {
    border-radius: 5px;
    width: 100%;
    height: 100%;
}

.cardB {
    align-items: center;
    display: flex;
    justify-content: center;
}

.cardB img {
    height: 100%;
}

.cardF img {
    height: 80%;
}

.cardIn {
    box-shadow: 0 0 30px rgba(0,0,0,0.1);
    transition: 0.6ns;
    transform-style: preserve-3d;
    position: relative;
}

</style>
