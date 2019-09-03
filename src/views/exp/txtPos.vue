<template>
    <div>
        POS
        <!-- <button @click="abc">登录</button> -->
        <div>{{ info }}</div>
    </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      info: null
    };
  },
  methods: {
    abc() {
      this.$axios.post("/base/pos", qs.stringify(
        {text: "创新工场大湾区人工智能工程院"}
      ), 
     
      )
      .then(res => {
          this.info = res.data;
      })
    }
  }
};
</script>

<style>

</style>