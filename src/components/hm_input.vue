<template>
  <input 
  type="text" 
  class="inp"
  :value="value"
  @input="handlerinput"
  :class="{error:!statu,success:statu}"
  @blur="handlerblur"
  >
</template>

<script>
export default {
    data () {
        return {
            statu:false      
        }
    },
    //这显示的是默认的用户名并默认正确认证
    mounted(){
        this.statu=this.value?true:false
    },
     // rules:文本框的验证规则
    props:['value','rules','msg_err'],
    methods:{
        // 响应文本框内容的变化
        handlerinput(event){
            // 要告诉父组件内容变化，并且要告诉父组件内容到底现在是什么值
            let value = event.target.value
            if (this.rules) {
                if (this.rules.test(value)) {
                this.statu = true
            }else{
                this.statu = false
            }
            }else{
                //有值才是true 不然密码下划线一直是绿色
                this.statu = value?true:false
            }
            
            this.$emit('input',value)
        },
        // 响应文本框失去焦点
        handlerblur(event){
            if(this.rules &&!this.rules.test(event.target.value)){
                console.log(this.msg_err);
                
            }
        }
    }
}
</script>

<style lang='less' scoped>
.inp{
     width: 314*100vw/360;
    height: 40*100vw/360;
    border:none;
    outline: none;
    border-bottom: 2px solid rgb(117,117,117);
    font-size: 18px;
    margin: 5px 0;
    background-color: transparent;
}
.error{
    border-bottom-color: red;
}
.success{
    border-bottom-color: green;
}
</style>