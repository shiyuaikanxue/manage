<template>
    <div class="item">
        <slot name="main"></slot>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" >
.item{
    height: 5.0625rem;
    border: 1px solid rgb(236, 234, 234);
    margin: .25rem;
    background-color: rgb(165, 154, 154);
}
</style>