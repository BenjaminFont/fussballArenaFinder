<template>
    <div class="dropdown">
        <Multiselect
                style="min-width: 200px; max-width: 500px;"
                class=""
                mode="tags"
                placeholder="Filter Courts"
                :close-on-select="false"
                :searchable="true"
                :create-option="true"
                :options="data"
                v-on:change.native="addOption($event)"
        />
    </div>
</template>

<script>
    import Multiselect from '@vueform/multiselect'

    export default {
        components: {
            Multiselect,
        },
        props: {
            data: {
                type: Array,
                required: true
            },
        },
        methods: {
            addOption: function (options) {
                this.$emit("options", options);
            }
        }
    }
</script>

<style scoped>
.dropdown {
  display: flex;
  align-items: center;
}
</style>

