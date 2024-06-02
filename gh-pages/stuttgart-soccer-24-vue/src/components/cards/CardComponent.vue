<template>
    <div class="card-wrapper col-3">
        <div>{{data.court}}</div>
        <div>{{data.time_slot_start}}</div>
        <div>{{data.time_slot_end}}</div>
        <div>{{}}m</div>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true
            },
        },
    }
</script>