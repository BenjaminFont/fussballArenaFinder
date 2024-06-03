<template>
    <div id="main" class="w-100">
        <header-component></header-component>
        <div class="filters-container d-flex justify-content-around">
            <tabs-component :data="tabs" :without-filter="withoutFilter" @dateOption="filterDataByDate"></tabs-component>
            <dropdown-component :data="courts" @options="filterDataByCourts"></dropdown-component>
        </div>
        <cards-component :data="data"></cards-component>
    </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>

<script>
    import data from "./../../data.json";
    import moment from "moment";
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
                tabs: [
                    {
                        name: 'TODAY',
                        value: moment().format('DD MMM'),
                    },
                    {
                        name: 'TOMORROW',
                        value: moment().add(1, 'days').format('DD MMM'),
                    },
                    {
                        name: 'IN 2 DAYS',
                        value: moment().add(2, 'days').format('DD MMM'),
                    }
                ],
                withoutFilter: '',
            }
        },
        mounted() {
            this.getCourts();
            this.setDate();
        },
        methods: {
            setDate() {
                this.data = data;
                for(let i in data) {
                    this.data[i].dateStart = moment(this.data[i].time_slot_start).format("HH:mm");
                    this.data[i].dateEnd = moment(this.data[i].time_slot_end);
                    this.data[i].duration = moment.duration(this.data[i].dateEnd.diff(this.data[i].time_slot_start)).asMinutes();
                    this.data[i].datePart = moment(this.data[i].time_slot_start).format("DD MMM");
                }
            },
            getCourts: function() {
                for(let i in data) {
                    if(!this.courts.includes(data[i].court)) {
                        this.courts.push(data[i].court)
                    }
                }
            },
            filterDataByCourts: function (options) {
                this.setDate();
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
                    this.withoutFilter = '';
                }
            },
            filterDataByDate: function (option) {
                if(option !== '') {
                    this.setDate();
                    this.data = this.data.filter(item => {
                        console.log(option, item.datePart, 'dateStart')

                        return option === item.datePart
                    })
                } else {
                    this.setDate();
                }
            }
        }
    }
</script>