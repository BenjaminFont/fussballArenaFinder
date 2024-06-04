<template>
    <div class="tabs-filter">
        <div
                class="tab"
                v-on:click="addOption('')"
                v-bind:class="{selected: this.filter === ''}">
            NO FILTER
        </div>
        <div
                class="tab"
                v-for="(item, index) in data"
                v-on:click="addOption(item.value)"
                v-bind:class="{selected: this.filter === item.value}">
            {{item.name}}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                filter: ''
            }
        },
        methods: {
            addOption: function (option) {
                this.filter = option;
                this.$emit("dateOption", option);
            }
        }
    }
</script>