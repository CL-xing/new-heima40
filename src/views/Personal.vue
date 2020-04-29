<template>
  <div>
      个人中心页
  </div>
</template>

<script>
import {getUserInfo} from '../api/users.js'
export default {
  mounted(){
    // console.log(this.$route);
    let id = this.$route.params.id
    getUserInfo(id)
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
      
    })
  }

}
</script>

<style>

</style>