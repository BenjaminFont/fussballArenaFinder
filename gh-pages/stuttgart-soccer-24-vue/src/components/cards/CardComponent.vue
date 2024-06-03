<template>
    <div class="card-wrapper col-3">
        <div>{{data.court}}</div>
        <div>{{data.datePart}}</div>
        <div>{{data.dateStart}}</div>
        <div>{{data.duration}}m</div>
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