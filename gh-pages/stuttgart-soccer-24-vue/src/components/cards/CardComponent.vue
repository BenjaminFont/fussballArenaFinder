<template>
    <div class="card-wrapper col-1 col-md-2 col-md-3 col-lg-4 col-xl-3">
        <div class="title">{{data.court}}</div>
        <div class="pre-title">{{data.datePart}}</div>
        <div class="description">{{data.dateStart}}</div>
        <div class="second-description"><img src="./../../assets/icons/clock.svg" width="20" height="20">{{data.duration}}m</div>
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