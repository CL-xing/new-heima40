<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
          <!-- <hminput 
            placeholder="请输入用户名" 
            :value='user.username' 
            @input="hanlderinput"
            > 
            //上面这两段代码相当于v-model
          </hminput> -->
          <hminput
            placeholder="请输入用户名/手机号" 
            v-model="user.username"
            :rules = '/^1\d{10}$/'
            msg_err = '手机号输入不合法，请输入11位手机号'
          ></hminput>
       
          <hminput 
            placeholder="请输入密码"
            
          >
          </hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <hmbutton text="登录" @click="login"></hmbutton>
    </div>
  </div>
</template>

<script>
//引入子组件并注册
import hmbutton from '@/components/hm_button.vue'
import hminput from '@/components/hm_input.vue'
export default {
  data () {
    return {
    user:{
      username:'11',
      password:'22'
    }  
    }
  },
  components:{
    hmbutton,
    hminput
  },
  methods:{
    login(event){
      // console.log(event);
      console.log(this.user);
    },
    // hanlderinput(data){
    //     // console.log(data);
    //     this.user.username = data;
      // 这段代码是配合上面hanlderinput写的
    // }
  }
};
</script>

<style lang="less">
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>