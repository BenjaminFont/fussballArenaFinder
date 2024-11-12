<template>
    <div id="main" class="w-100">
        <div class="main-wrapper">
            <header-component></header-component>
            <span v-if="parsedAt !== ''">Last updated {{Math.round(parsedAt.asMinutes())}} minutes ago</span>
            <div class="filters-container">
                <tabs-component :data="tabs" @dateOption="filterDataByDateCallback"></tabs-component>
                <show-all @toggle="viewAllCards" style="margin-left: auto; margin-right: 2rem"></show-all>
                <dropdown-component :data="courts" @options="filterDataByCourtsCallback"></dropdown-component>
            </div>
            <cards-component :data="data"></cards-component>
        </div>
    </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>

<script>
    import data from "../scraped/data_today.json"
    import dataTomorrow from "../scraped/data_tomorrow.json"
    import dataOvermorrow from "../scraped/data_overmorrow.json"
    import dayjs from "dayjs";
    import duration from 'dayjs/plugin/duration'
    import HeaderComponent from "./layout/HeaderComponent.vue";
    import TabsComponent from "./filter/TabsComponent.vue";
    import DropdownComponent from "./filter/DropdownComponent.vue";
    import CardsComponent from "./cards/CardsComponent.vue";
    import ShowAll from "./buttons/ShowAll.vue";

    // senseless required step by day.js in docs https://day.js.org/docs/en/durations/durations
    dayjs.extend(duration);

    export default {
        components: {
            HeaderComponent,
            TabsComponent,
            DropdownComponent,
            CardsComponent,
            ShowAll,
        },
        data() {
            return {
                initialData: [],
                data: data,
                courts: [],
                parsedAt: '',
                tabs: [
                    {
                        name: 'TODAY',
                        value: dayjs().format('DD MMM'),
                    },
                    {
                        name: 'TOMORROW',
                        value: dayjs().add(1, 'days').format('DD MMM'),
                    },
                    {
                        name: 'IN 2 DAYS',
                        value: dayjs().add(2, 'days').format('DD MMM'),
                    }
                ],
                courtFilter: [],
                dateFilter: "",
                viewAll: false,
            }
        },
        mounted() {
            this.resetData();
            this.getCourts();
            this.transform();
            this.setParsedAt();
        },
        methods: {
            resetData(viewAll = false) {
                this.initialData = []
                const dataJoined = data.concat(dataTomorrow).concat(dataOvermorrow);
                for (let i in dataJoined) {
                    for (let j in dataJoined[i].results) {
                        const entry = dataJoined[i].results[j];
                        const date = Date.parse(entry.time_slot_start)
                        const dateStart =  dayjs(entry.time_slot_start);
                        const dateEnd = dayjs(entry.time_slot_end);
                        switch (viewAll) {
                            case false:
                                if (entry.is_available) {
                                    this.initialData.push({
                                        date: date,
                                        duration: dayjs.duration(dateEnd.diff(dateStart)).asMinutes(),
                                        court: dataJoined[i].court,
                                        datePart: dayjs(dataJoined[i].day).format("DD MMM"),
                                        sourceWebsite: dataJoined[i].source_website,
                                        availableCard: true,
                                    });
                                }
                                break;
                            case true:
                                this.initialData.push({
                                    date: date,
                                    duration: dayjs.duration(dateEnd.diff(dateStart)).asMinutes(),
                                    court: dataJoined[i].court,
                                    datePart: dayjs(dataJoined[i].day).format("DD MMM"),
                                    sourceWebsite: dataJoined[i].source_website,
                                    availableCard: entry.is_available,
                                });
                                break;
                        }
                    }
                }
            },
            transform() {
                this.data = this.initialData;
                this.filterDataByCourts(this.courtFilter);
                this.filterDataByDate(this.dateFilter);
            },
            getCourts: function () {
                for (let i in this.initialData) {
                    if (!this.courts.includes(this.initialData[i].court)) {
                        this.courts.push(this.initialData[i].court)
                    }
                }
            },
            filterDataByCourtsCallback: function(options) {
                this.courtFilter = options;
                this.transform();
            },
            filterDataByCourts: function (options) {
                if (this.courtFilter.length > 0) {
                    this.data = this.data.filter(item => {
                        let value = '';
                        for (let i in options) {
                            if (options[i] === item.court) {
                                value = options[i]
                            }
                        }
                        return value === item.court
                    })
                }
            },
            filterDataByDateCallback: function (option) {
                this.dateFilter = option;
                this.transform();
            },
            filterDataByDate: function (option) {
                if (this.dateFilter !== '') {
                    this.data = this.data.filter(item => {
                        return option === item.datePart
                    })
                }
            },
            setParsedAt: function () {
                this.parsedAt = dayjs.duration(dayjs().diff(data[0].parsed_at));
            },
            viewAllCards: function (viewAll) {
                this.viewAll = viewAll;
                this.resetData(this.viewAll)
                this.getCourts();
                this.transform();
                this.setParsedAt();
            }
        }
    }
</script>