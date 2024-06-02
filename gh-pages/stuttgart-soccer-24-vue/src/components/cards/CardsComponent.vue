<template>
    <div id="cards" class="row col-12">
        <card-component v-for="(item, index) in cardsData" :data="item"></card-component>
    </div>
</template>

<script>
    import CardComponent from "./CardComponent.vue"
    export default {
        components: {
            CardComponent,
        },
        props: {
            data: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                cardsData: this.data,
            }
        },
        watch: {
            data: function (val, oldVal) {
                if (val !== oldVal) {
                    this.cardsData = val
                }
            }
        }
    }
</script>