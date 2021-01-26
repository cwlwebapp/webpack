<template>
  <div ref="fieldUp">
    <ul class="field-identity context">
      <li>身份证上传</li>
      <van-uploader v-model="infoList.fileList" multiple :after-read="afterRead" :max-count="1" />
      <!-- capture="camera" -->
      <li class="head">头像</li>
      <li class="avatar">
        <van-image round width="6rem" height="6rem" fit="cover" :src="infoList.photo" />
        <input
          multiple="multiple"
          type="file"
          accept="image/*"
          @change="upImage"
          class="input-avatar"
        />
      </li>
    </ul>
    <van-field
      v-model="infoList.name"
      maxlength="6"
      type="text"
      name="姓名"
      label="姓名"
      placeholder="请填写姓名"
    />
    <ul class="field-identity identity-sex">
      <li class="sex">性别</li>
      <van-radio-group v-model="infoList.gender" direction="horizontal">
        <van-radio name="1">男</van-radio>
        <van-radio name="2">女</van-radio>
      </van-radio-group>
    </ul>
    <van-field
      v-model="infoList.idCardNumber"
      type="text"
      name="身份证"
      label="身份证"
      placeholder="请填写身份证"
      maxlength="18"
      @focus="focus"
    />
    <!-- <van-field v-model="infoList.address" type="text" name="住址" label="住址" placeholder="住址" /> -->
    <div style="margin: 36px 16px 16px;">
      <van-button round block type="info" @click.native="submit">提交</van-button>
    </div>
    <van-number-keyboard
      :show="show"
      extra-key="X"
      close-button-text="完成"
      @blur="blur"
      @input="onInput"
      @delete="onDelete"
      ref="keyboardxx"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 图片回显
      infoList: {
        fileList: [],
        idCardNumber: "",
        gender: "",
        name: "",
        photo: "",
        birthday: "",
        address: "",
        race: ""
      },
      imagtype: 0,
      folderList: {
        file: null,
        imgfile: null,
        upfileInfo: null
      },
      show: false
    };
  },

  watch: {
    show(newVal, oldVal) {
      if (newVal) {
        this.$nextTick(() => {
          //使用nextTick为了保证dom元素都已经渲染完毕
          // console.log(this.$refs.keyboardxx.$el.offsetHeight)
          let height = this.$refs.keyboardxx.$el.offsetHeight;
          this.$refs.fieldUp.style.position = "fixed";
          this.$refs.fieldUp.style.width = 100 + "%";
          this.$refs.fieldUp.style.bottom = height + "px";
        });
      }
    }
  },

  computed: {},
  components: {},
  methods: {
    // 文件上传
    afterRead(files) {
      // this.folderList.file = file.file;
      // this.folderList.file = this.$util.compress(file.file, 1);
      let file = files.file;
      let size = 1;
      if (file.size <= 0) {
        return;
      }
      this.$store.commit("setDataLoading", true);
      // 文件大小
      let fileSize = file.size / 1024 / 1024;
      console.log(fileSize, "fileSize");
      if (fileSize > size) {
        let dir = size / fileSize || 0.1;
        let reader = new FileReader();
        reader.onload = f => {
          console.log(f, "f");
          let content = f.target.result; //图片的src，base64格式
          let canvaspart = content.split(";base64,");
          let canvasType = canvaspart[0].split(":")[1];
          let img = new Image();
          img.src = content;
          img.onload = () => {
            //图片加载完毕
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            let initSize = img.src.length;
            let width = img.width;
            let height = img.height;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            let dataURL = canvas.toDataURL(canvasType, dir);
            let blob = base64ToBlob(dataURL);
            if (blob) {
              this.folderList.file = blob;
              this.imagtype = 0;
              this.upfile();
            }
            function base64ToBlob(code) {
              let parts = code.split(";base64,");
              let contentType = parts[0].split(":")[1];
              let raw = window.atob(parts[1]);
              let rawLength = raw.length;

              let uInt8Array = new Uint8Array(rawLength);

              for (let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
              }
              return new Blob([uInt8Array], { type: contentType });
            }
          };
        };
        reader.readAsDataURL(file);
      } else {
        // return file;
        this.folderList.file = files.file;
        this.imagtype = 0;
        this.upfile();
      }
    },
    // 图片
    upImage(e) {
      // this.folderList.imgfile = file;
      // this.folderList.imgfile = this.$util.compress(file, 1);
      let file = e.target.files[0];
      let size = 1;
      if (file.size <= 0) {
        return;
      }
      this.$store.commit("setDataLoading", true);
      // 文件大小
      let fileSize = file.size / 1024 / 1024;
      if (fileSize > size) {
        let dir = size / fileSize || 0.1;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = f => {
          let content = f.target.result; //图片的src，base64格式
          let canvaspart = content.split(";base64,");
          let canvasType = canvaspart[0].split(":")[1];
          let img = new Image();
          img.src = content;
          img.onload = () => {
            //图片加载完毕
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            let initSize = img.src.length;
            let width = img.width;
            let height = img.height;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            console.log(canvasType, "canvasType");
            let dataURL = canvas.toDataURL(canvasType, dir);
            let blob = base64ToBlob(dataURL);
            if (blob) {
              this.folderList.imgfile = blob;
              this.imagtype = 1;
              this.upfile();
            }
            function base64ToBlob(code) {
              let parts = code.split(";base64,");
              let contentType = parts[0].split(":")[1];
              let raw = window.atob(parts[1]);
              let rawLength = raw.length;

              let uInt8Array = new Uint8Array(rawLength);

              for (let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
              }
              return new Blob([uInt8Array], { type: contentType });
            }
          };
        };
      } else {
        // return file;
        this.folderList.imgfile = file;
        this.imagtype = 1;
        this.upfile();
      }
    },
    // 阿里接口
    upfile() {
      let url = "ajax/web/user/avatar?filename=";
      if (this.imagtype == 1) {
        url = "ajax/user/wx/triage/avatar?filename=";
      }
      console.log(url, "avatar");
      this.$http
        .request({
          method: "post",
          url: url + new Date().getTime() + ".png"
        })
        .then(res => {
          if (res.respStatus == 1 && res.respBody) {
            this.folderList.upfileInfo = JSON.parse(res.respBody);
            this.confirm();
          }
        });
    },
    // 数据提交
    confirm() {
      let fileData = {
        //签名信息
        OSSAccessKeyId: this.folderList.upfileInfo.accessid,
        policy: this.folderList.upfileInfo.policy,
        signature: this.folderList.upfileInfo.signature,
        key: this.folderList.upfileInfo.key,
        success_action_status: "200",
        //文件信息
        file: this.folderList.file
      };

      if (this.imagtype == 1) {
        fileData = {
          //签名信息
          OSSAccessKeyId: this.folderList.upfileInfo.accessid,
          policy: this.folderList.upfileInfo.policy,
          signature: this.folderList.upfileInfo.signature,
          key: this.folderList.upfileInfo.key,
          success_action_status: "200",
          //文件信息
          file: this.folderList.imgfile
        };
      }
      //将对象格式转换成form-data格式
      let fd = new FormData();
      for (let o in fileData) {
        fd.append(o, fileData[o]);
      }
      this.$http
        .request({
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,OPTIONS",
            "Access-Control-Allow-Headers": "*"
          },
          method: "POST",
          url: this.folderList.upfileInfo.host,
          data: fd
        })
        .then(res => {
          if (this.imagtype == 1) {
            this.infoList.photo = this.folderList.upfileInfo.avatar_url;
          } else {
            this.identification(this.folderList.upfileInfo.avatar_url);
          }

          // this.shuiyingUrl(this.folderList.upfileInfo.avatar_url);
        });
    },
    //身份证水印背面
    shuiyingUrl(url) {
      this.$http
        .request({
          method: "get",
          url: "/ajax/web/user/idcard/getCardUrl",
          params: {
            fileUrl: url
          }
        })
        .then(res => {
          console.log(res.respBody, "水印");
        });
    },
    //获取焦点
    focus(e) {
      document.activeElement.blur();
      this.show = true;
    },
    //身份证输入
    onInput(value) {
      if (this.infoList.idCardNumber.length < 18) {
        this.infoList.idCardNumber += value;
      } else {
        this.$toast("超出身份证位数了!");
        return;
      }
    },
    //身份证删除
    onDelete() {
      this.infoList.idCardNumber = this.infoList.idCardNumber.slice(
        0,
        this.infoList.idCardNumber.length - 1
      );
    },
    //完成身份证输入
    blur() {
      this.$refs.fieldUp.style.position = "static";
      this.$refs.fieldUp.style.bottom = "";
      this.show = false;
    },
    // 身份证识别
    identification(url) {
      this.$http
        .request({
          method: "get",
          url: "ajax/web/user/idNumberDiscern",
          params: {
            idNumberFrontUrl: url
          }
        })
        .then(res => {
          if (res.success && res.respBody) {
            res.respBody.gender = res.respBody.gender == "男" ? "1" : "2";
            res.respBody.photo =
              "data:image/png;base64," +
              (res.respBody.photo ? res.respBody.photo : "");
            Object.assign(this.infoList, res.respBody);
          } else if (res.respStatus == 5000) {
            (this.infoList = {
              fileList: [],
              idCardNumber: "",
              gender: "",
              name: "",
              photo: "",
              birthday: "",
              address: "",
              race: ""
            }),
              this.$Dialog
                .alert({
                  title: "标题",
                  message: "身份证照片无法识别,请手动输入!"
                })
                .then(() => {
                  // on close
                  // this.$util.goApp();
                });
          }
        });
    },

    // 表单提交
    submit(values) {
      if (!this.infoList.photo) {
        this.$toast("请上传头像!");
        return;
      } else if (
        !this.infoList.idCardNumber &&
        !/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
          this.infoList.idCardNumber
        )
      ) {
        this.$toast("填写合法身份证号码!");
        return;
      } else if (!this.infoList.name) {
        this.$toast("请填写姓名!");
        return;
      } else if (!this.infoList.gender) {
        this.$toast("请选择性别!");
        return;
      }
      this.$http
        .request({
          method: "post",
          url: "/ajax/user/wx/triage/addRelationByIdNumber",
          data: {
            // avatarUrl: this.folderList.upfileInfo.avatar_url,
            avatarUrl: this.infoList.photo,
            idNumber: this.infoList.idCardNumber,
            name: this.infoList.name,
            sex: this.infoList.gender
          }
        })
        .then(res => {
          if (res.respStatus == 6034) {
            this.$Dialog
              .alert({
                title: "您不是管理员 无法操作!"
                // message: "您不是管理员 无法操作!"
              })
              .then(() => {
                // on close
                this.$util.goApp();
              });
          } else {
            this.$Dialog
              .alert({
                title: "添加成功!"
                // message: "上传成功!"
              })
              .then(() => {
                // on close
                // this.$util.goApp();
                app.addSuccess(0); //传参默认为0、
              });
          }
        });
    }
  },
  // 刷新taken
  created() {
    this.$http.request({
      url: "/ajax/web/report/weeks",
      method: "get",
      params: {
        pageNum: 1,
        pageSize: 5
      }
    }).then(res=>{
      console.log(res,'res')
    });
  }
};
</script>
<style lang='scss' scoped>
@import "src/style/mixin";
.field-identity {
  padding: 0 16px;

  & > li {
    padding: 32px 60px 16px 0;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    &.avatar {
      position: relative;
    }

    .input-avatar {
      position: absolute;
      left: 0;
      top: 0;
      width: 26%;
      height: 100%;
      opacity: 0;
    }
  }
  &.identity-sex {
    display: flex;
    align-items: center;
    & > li {
      color: #323233;
    }
  }
  .head {
    padding-top: 16px;
    padding-bottom: 0;
  }
  .sex {
    padding-top: 16px;
  }
}
</style>
