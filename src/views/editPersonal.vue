<template>
  <div class="editPersonal">
    <hmheader title="编辑资料">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </hmheader>
    <div class="head">
      <img alt :src="current.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <hmcell title="昵称" :desc="current.nickname" @click="nickshow=!nickshow"></hmcell>
    <van-dialog v-model="nickshow" title="标题" show-cancel-button @confirm="updateNickname">
      <van-field required label="昵称" placeholder="请输入昵称" :value="current.nickname" ref="nickname" />
    </van-dialog>
    <hmcell title="密码" :desc="current.password" @click="passshow=!passshow"></hmcell>
    <van-dialog
      v-model="passshow"
      title="标题"
      show-cancel-button
      @confirm="updatePassword"
      :before-close="beforeClose"
    >
      <van-field required label="原密码" placeholder="请输入原密码" ref="oldPwd" />
      <van-field required label="新密码" placeholder="请输入新密码" ref="newPwd" />
    </van-dialog>
    <hmcell title="性别" :desc="current.gender===1?'男':'女'" @click="gendershow=!gendershow"></hmcell>
    <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm="updateGender">

<van-picker   :columns="['女','男']" :default-index="current.gender" @change="onChange"/>
    </van-dialog>
  </div>
</template>

<script>
import hmheader from "@/components/hm_header";
import hmcell from "@/components/hm_cell.vue";
import { uploadFile } from "@/api/uploadFile.js";
import { editUser, getUserInfo } from "@/api/users.js";
export default {
  data() {
    return {
      id: "",
      current: {},
      nickshow: false,
      passshow: false,
      gendershow:false,
      genderIndex:''
    };
  },
  components: {
    hmheader,
    hmcell
  },
  async mounted() {
    this.id = this.$route.params.id;
    //进入页面后获取图片地址
    let res2 = await getUserInfo(this.id);
    if (res2.data.message === "获取成功") {
      console.log(res2);

      this.current = res2.data.data;
      if (this.current.head_img) {
        // 返回的数据可能没有图片数据，那么我们应该进行判断，如果有图片数据，则设置为当前图片，如果没有图片数据则需要设置为默认图片
        this.current.head_img =
          localStorage.getItem("hm40_baseURL") + this.current.head_img;
      } else {
        this.current.head_img =
          localStorage.getItem("hm40_baseURL") + "/uploads/image/default.png";
      }
    }
  },
  methods: {
    //实现文件上传功能
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      let formdata = new FormData();
      formdata.append("file", file.file);
      uploadFile(formdata)
        .then(async res => {
          console.log(res);
          if (res.data.message === "文件上传成功") {
            // 实现用户头像数据的更新
            //用同步的方式调用异步方法
            let res1 = await editUser(this.id, { head_img: res.data.data.url });
            if (res1.data.message === "修改成功") {
              this.$toast.success("修改用户头像成功");
              //即时刷新用户头像
              this.current.head_img =
                localStorage.getItem("hm40_baseURL") + res.data.data.url;
            } else {
              this.$toast.fail("修改用户头像失败");
            }
          } else {
            this.$toast.fail("文件上传失败，请重试");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改昵称
    async updateNickname() {
      console.log(this.$refs.nickname.$refs.input.value);
      //获取数据
      let nickname = this.$refs.nickname.$refs.input.value;
      let res = await editUser(this.id, { nickname });
      if (res.data.message === "修改成功") {
        this.$toast.success("修改成功");
        // 一定要记得修改:value所绑定的数据，不然页面不会进行刷新
        this.current.nickname = nickname;
      } else {
        this.$toast.fail("修改昵称失败");
      }
    },
    //修改密码
    async updatePassword() {
      // 1.获取原密码
      let oldPwd = this.$refs.oldPwd.$refs.input.value;
      // 2.判断输入的原密码是否和真正的原始密码一致
      if (this.current.password === oldPwd) {
        let password = this.$refs.newPwd.$refs.input.value;
        if (!/\w{3,16}/.test(password)) {
          this.$toast.fail("请输入3~16位的新密码");
          return;
        }
        // 3.调用api方法进行密码的更新
        let res = await editUser(this.id, { password });
        if (res.data.message === "修改成功") {
          this.$toast.success("修改成功");
          localStorage.removeItem("heima40_token");
          localStorage.removeItem("hm40_baseURL");
          this.$router.push({ name: "login" });
        }
      } else {
        this.$toast.fail("原始密码输入不正确");
      }
    },
    beforeClose(action, done) {
      // 1.获取原密码
      let oldPwd = this.$refs.oldPwd.$refs.input.value;
      let password = this.$refs.newPwd.$refs.input.value;
      // 2.判断输入的原密码是否和真正的原始密码一致
      //只有单击了确定的时候才需要让原密码输入正确
      if (action ==='confirm' && this.current.password !== oldPwd) {
        this.$toast.fail("原始密码不正确");
        done(false);
      } else if (action ==='confirm' && !/\w{3,16}/.test(password)) {
        this.$toast.fail("请输入3~16位的新密码");
        done(false);
      } else {
        done();
      }
    },
    //修改性别
    async updateGender(){
        let res = await editUser(this.id,{gender:this.genderIndex})
        console.log(res);
        if (res.data.message === '修改成功') {
        this.$toast.success('修改性别成功')
        this.current.gender = this.genderIndex
    } else {
        this.$toast.fail('修改性别失败')
    }
        
    },
     // picker切换时触发的事件
    onChange(picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`);
      this.genderIndex = index;
    }
  }
};
</script>

<style lang='less' scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
}
/deep/.van-uploader__upload {
  width: 100 / 360 * 100vw;
  height: 100 / 360 * 100vw;
}
/deep/.van-uploader {
  // 实现任意元素居中
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}
</style>