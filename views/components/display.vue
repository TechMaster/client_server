<!-- TODO: Hãy viết thành một component hoàn chỉnh -->
<template lang="html">
        <div>
          <img v-for="item in things" :src="'/public/image/' + item.photo" :alt="item.name" :style="img">
        </div>
</template>

<script>
export default {
    props: ['things'],
    data() {
      return {
        img : {
          width : "128px",
          height : "128px"
       }
      }
    }
}
</script>

<style lang="css">

</style>
