<template>
    <div id="main" class="w-100">
        <header-component></header-component>
        <div class="filters-container d-flex justify-content-around">
            <tabs-component></tabs-component>
            <dropdown-component :data="courts" @options="filterDataByCourts"></dropdown-component>
        </div>
        <cards-component :data="data"></cards-component>
    </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>

<script>
    import data from "./../../data.json"
    import HeaderComponent from "./layout/HeaderComponent.vue";
    import TabsComponent from "./filter/TabsComponent.vue";
    import DropdownComponent from "./filter/DropdownComponent.vue";
    import CardsComponent from "./cards/CardsComponent.vue";
    export default {
        components: {
            HeaderComponent,
            TabsComponent,
            DropdownComponent,
            CardsComponent,
        },
        data() {
            return {
                data: data,
                courts: [],
            }
        },
        mounted() {
            this.getCourts();
        },
        methods: {
            getCourts: function() {
                for(let i in data) {
                    if(!this.courts.includes(data[i].court)) {
                        this.courts.push(data[i].court)
                    }
                }
            },
            filterDataByCourts: function (options) {
                this.data = data;
                if(options.length > 0) {
                    this.data = this.data.filter(item => {
                        let value = '';
                        for (let i in options) {
                            if(options[i] === item.court){
                                value = options[i]
                            }
                        }
                        return value === item.court
                    })
                }
            }
        }
    }
</script>