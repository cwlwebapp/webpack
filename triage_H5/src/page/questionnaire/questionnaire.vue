<template>
  <div class="question-bg">
    <ul class="head">
      <li
        class="head-li"
        :class="{ oli: active == index }"
        @click="addactive(index)"
        v-for="(item, index) in tagList"
        :key="index"
      >
        {{ index | title }}
      </li>
    </ul>
    <!-- <div class="question-content" v-for="(item,index) in tagList"> -->
    <div class="question-content">
      <!-- <div class="question-title">{{active|title}}</div> -->
      <ul
        v-show="show(active, oitem.key) && !oitem.ishow && oitem.show !== false"
        v-for="(oitem, oindex) in tagList[active]"
        :key="oindex"
      >
        <li v-show="oitem.key != 'sex'" class="question-head">
          <div>
            {{ oitem.label }}
            <span>{{ oitem.type | type }}</span>
          </div>
          <input
            v-show="
              oitem.type == 'input' ||
              oitem.type == 'date' ||
              oitem.type == 'search'
            "
            v-model="answerList[active][oitem.key]"
            @input="
              oitem.type == 'search'
                ? oinput(
                    active,
                    oitem.key,
                    oitem.searchOptions,
                    answerList[active][oitem.key]
                  )
                : ''
            "
            @change="oitem.type == 'search' ? '' : changed(active, oitem.key)"
            @focus="oitem.type == 'search' ? '' : focus(oitem.key)"
            :type="
              oitem.key == 'birthday' || oitem.type == 'search'
                ? 'text'
                : 'number'
            "
            :style="{
              width: oitem.type == 'search' ? '100%' : '',
              margin: oitem.type == 'search' ? '10px 0' : '',
            }"
          />
          <!-- <van-field   
           v-if="oitem.type=='input'||oitem.type=='date'"
          v-model="answerList[index][oitem.key]"  type="digit" />-->
          <div
            v-show="oitem.type == 'search' && tablist && tablist.length != 0"
            class="tablist"
          >
            <span v-for="(cwitem, cwindex) in tablist" :key="cwindex"
              >{{ cwitem.name }}
              <span
                class="internalDesc"
                v-show="cwitem.internalDesc && cwitem.internalDesc.length != 0"
                >({{ cwitem.internalDesc | internalDesc }})</span
              >
              <span
                @click="tabdelete(cwindex)"
                class="iconfont icon-guanbi"
              ></span>
            </span>
          </div>
          <div
            class="searchList"
            v-show="
              oitem.type == 'search' && searchList && searchList.length != 0
            "
            @scroll="scrolllist($event)"
          >
            <p
              v-for="(citem, cindex) in searchList"
              :key="cindex"
              @click="checksearch(cindex)"
            >
              {{ citem.name }}
              <span
                v-show="citem.internalDesc && citem.internalDesc.length != 0"
                >({{
                  citem.internalDesc && citem.internalDesc.join(",")
                }})</span
              >
            </p>
          </div>
        </li>
        <li class="question-tag" :class="[oitem.key == 'sex' ? 'sex' : '']">
          <div style="float: left" v-show="oitem.key == 'sex'">
            性别
            <a v-show="!issex" style="color: #f00; transform: scale(0.8)"
              >(性别确定,无法修改)</a
            >
          </div>
          <div>
            <span
              v-for="(zitem, zindex) in oitem.value"
              :class="[
                oitem.key == 'sex' ? 'sex' : '',
                oitem.key == 'sex' &&
                answerList[active][oitem.key] == zitem.value
                  ? 'fontactiv'
                  : '',
                oitem.key != 'sex' &&
                answer(answerList[active][oitem.key], zitem.value)
                  ? 'active'
                  : '',
              ]"
              :key="zindex"
              @click="choose(oitem.type, active, oitem.key, zitem.value)"
              >{{ zitem.label }}</span
            >
          </div>
        </li>
      </ul>
    </div>
    <div class="save">
      <div class="save-bnt" v-show="isactive" @click="save">保存</div>
    </div>
    <div class="cdate" v-show="cdate.iscdate">
      <van-datetime-picker
        class="c-datetime-picker"
        v-model="cdate.currentDate"
        type="date"
        title="选择年月日"
        :min-date="cdate.minDate"
        :max-date="cdate.maxDate"
        @confirm="confirm"
        @cancel="cancel"
      />
    </div>
    <div class="cdate" v-show="isheight">
      <van-picker
        class="c-datetime-picker"
        title="身高(厘米)"
        show-toolbar
        :columns="height"
        @confirm="onConfirm"
        @cancel="onCancel"
        :default-index="iheight"
      />
    </div>
    <div class="cdate" v-show="isweight">
      <van-picker
        class="c-datetime-picker"
        show-toolbar
        title="体重(公斤)"
        :columns="weight"
        @confirm="wConfirm"
        @cancel="wCancel"
      />
    </div>
  </div>
</template>

<script>
import date from "@/libs/dateutil.js";
// 问题排序
let config = [
  "info",
  "life",
  "measure",
  "useDrugs",
  "selfSymptom",
  "selfDisease",
  "familyDisease",
];
// 关联配置
let ishow = {
  smoke: ["smokeYearNum"],
  drink: ["drinkWeekNum", "drunk"],
  // sportTimes:['sportDuration','sportFeel']
};
// 多行选择互斥
let configshow = ["disease"];
// 小数位
let digits = { high: 0, weight: 1, heartRate: 0 };
// 剔除食物
let deletelist = ["tabooFoods"];
// let deletelist = [];
// 定时器
let timer = null;
// 18岁的配置
let birth = {
  info: ["phone"],
  life: ["workType", "sportTimes", "sportDuration", "sportFeel"],
  measure: [],
  selfDisease: "all",
};

export default {
  data() {
    let arr = [],
      left = [],
      middle = [];
    for (let i = 50; i < 250; i++) {
      arr.push(i);
    }
    for (let i = 30; i <= 200; i++) {
      left.push(i);
    }
    middle = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return {
      active: "info",
      // 题目
      tagList: [],
      // 答案
      answerList: {},
      //参数
      params: {
        qid: "nutrition",
        questionnaireType: "nutrition",
      },
      //  params: {
      //   qid: 1,
      //   questionnaireType: 1
      // },
      // 日期
      cdate: {
        iscdate: false,
        minDate: new Date(1900, 1, 1),
        maxDate: new Date(2021, 1, 1),
        currentDate: new Date(1970, 6, 15),
      },
      // 搜索食品列表
      searchList: [],
      oinputobj: {
        pages: 1,
        url: "",
        params: {
          pageNum: 1,
          pageSize: 10,
        },
      },
      tablist: [],
      height: arr,
      isheight: false,
      iheight: arr.indexOf(170),
      weight: [
        // 第一列
        {
          values: left,
          defaultIndex: left.indexOf(55),
        },
        // 第二列
        {
          values: middle,
          defaultIndex: middle.indexOf(5),
        },
      ],
      isweight: false,
      isphone: false,
      issex: false,
      // 传参
      obj: {
        category: 2,
        type: 0,
      },
      // 不要数据
      aa: "",
    };
  },
  filters: {
    // 标题
    title(value) {
      let obj = {
        info: "个人资料",
        life: "生活习惯",
        selfDisease: "过往病史",
        familyDisease: "家族病史",
        useDrugs: "用药情况",
        measure: "测量数据",
        selfSymptom: "个人症状",
        t: function (value) {
          return this[value];
        },
      };
      return obj.t(value);
    },
    // 类型
    type(value) {
      let obj = {
        select: "单选",
        check: "多选",
        t: function (value) {
          return this[value] || "";
        },
      };
      if (obj.t(value)) {
        return `(${obj.t(value)})`;
      } else {
        return "";
      }
    },
    internalDesc(val) {
      console.log(val, "========val");
      if (Array.isArray(val)) {
        return val.join(",");
      } else {
        return val;
      }
    },
  },
  computed: {
    isactive() {
      let arr = Object.keys(this.tagList);
      return this.active == arr[arr.length - 1];
    },
  },
  components: {},
  methods: {
    addactive(value) {
      console.log(value, "---value");
      this.active = value;
    },
    // 题目界面
    pageData() {
      this.$http
        .request({
          method: "get",
          url: "/ajax/wx/qa/findQ",
          params: this.params,
        })
        .then((res) => {
          if (
            res &&
            res.respBody &&
            this.answerList.info &&
            this.answerList.info.birthday &&
            date.birthday(this.answerList.info.birthday) <= 18
          ) {
            // 过滤不需要的参数
            for (let key in res.respBody) {
              if (!Array.isArray(res.respBody[key])) {
                delete res.respBody[key];
              }
            }
            // 进行排序
            console.log(res.respBody, "======res.respBody");
            let obj = {},
              arr = [];
            config.forEach((item, index) => {
              if (!!res.respBody[item]) {
                arr = res.respBody[item].filter((oitem) => {
                  if (
                    birth[item] != "all" &&
                    birth[item].indexOf(oitem.key) == -1
                  ) {
                    return oitem;
                  }
                });

                if (arr.length > 0) {
                  obj[item] = arr;
                }
              }
            });
            console.log(obj, "===obj");
            this.tagList = obj;
          } else if (res && res.respBody) {
            // 过滤不需要的参数
            for (let key in res.respBody) {
              if (!Array.isArray(res.respBody[key])) {
                delete res.respBody[key];
              }
            }
            // 筛选
            // for (let key in res.respBody) {
            //   let object1 = res.respBody[key];
            //   object1.forEach((item, index) => {
            //     if (item.value && item.type == "check") {
            //       item.value.find((oitem, oindex) => {
            //         if (oitem.eventObject) {
            //           configshow.push(item.key);
            //           // console.log(item.key, configshow, "----");
            //           return true;
            //         }
            //       });
            //     }
            //   });
            // }

            // 进行排序
            let obj = {};
            config.forEach((item, index) => {
              if (!!res.respBody[item]) {
                obj[item] = res.respBody[item];
              }
            });
            // console.log(obj, "==========");
            // // 禁忌食物统一
            // obj.life && obj.life[4] && obj.life[4].key == "tabooFoods"
            //   ? (obj.life[4].type = "input")
            //   : (obj.life[4].type = "");
            this.tagList = obj;
          }
        });
    },
    // 题目答案
    pageanswer() {
      this.$http
        .request({
          method: "get",
          url: "/ajax/wx/qa/findLastQA",
          params: this.params,
        })
        .then((res) => {
          if (res && res.respBody) {
            if (res.respBody.info && res.respBody.info.birthday) {
              if (!!res.respBody.info.sex) {
                this.issex = true;
              }

              if (res.respBody.info.birthday) {
                let timet = date.timetype(res.respBody.info.birthday);

                if (timet.length != 0) {
                  console.log(timet[0], timet[1], timet[2], "timet[0]");
                  this.cdate.currentDate = new Date(
                    timet[0] * 1,
                    timet[1] * 1,
                    timet[2] * 1
                  );
                }
                res.respBody.info.birthday = date.time(
                  res.respBody.info.birthday
                );
              }

              if (res.respBody.info.high) {
                this.iheight = this.height.indexOf(res.respBody.info.high * 1);
              }
              if (res.respBody.info.weight) {
                let doglight = (res.respBody.info.weight + "").split(".");
                console.log(doglight, "doglight");
                this.weight[0].defaultIndex = this.weight[0].values.indexOf(
                  doglight[0] * 1
                );
                this.weight[1].defaultIndex = this.weight[1].values.indexOf(
                  doglight[1] * 1 || 0
                );
              }
            }
            if (
              res.respBody.life &&
              res.respBody.life.tabooFoods &&
              Array.isArray(res.respBody.life.tabooFoods) &&
              res.respBody.life.tabooFoods.length != 0
            ) {
              console.log(112);
              let klist = [],
                value = [];
              res.respBody.life.tabooFoods.forEach((item, index) => {
                for (let key in item) {
                  if (item[key] && item[key].split("$")[0]) {
                    this.tablist.push({
                      id: key,
                      name: item[key].split("$")[0] || "",
                      internalDesc: item[key].split("$")[2] || [],
                    });
                  }
                }
              });
              console.log(this.tablist, " this.tablist==========");
            }
            res.respBody.life.tabooFoods = null;
            this.pageData();
            this.answerList = res.respBody;
          }
        });
    },
    // 多状态判断
    answer(oldvalue, newvalue) {
      let str = [];
      return str.concat(oldvalue).indexOf(newvalue) != -1;
    },
    //状态处理
    show(type, key) {
      // console.log(type, key, "value");
      let arr = [];
      if (key in ishow) {
        arr = arr.concat(this.answerList[type][key]);
        // console.log(arr, isInclude(arr), "key");
        if (isInclude(arr)) {
          ishow[key].forEach((item, index) => {
            let zindex = this.tagList[type].findIndex((oitem, oindex) => {
              if (item == oitem.key) {
                return oindex;
              }
            });
            this.$set(this.tagList[type][zindex], "ishow", true);
            if (Array.isArray(this.answerList[type][item])) {
              this.answerList[type][item] = [];
            } else {
              this.answerList[type][item] = null;
            }
          });
        }
      }
      return true;
      function isInclude(arr) {
        return arr.some((item, index) => {
          if (!item) {
            return true;
          }
          return false;
        });
      }
    },
    // 选择问题
    choose(otype, type, key, value) {
      // console.log(otype, type, key, value, "type");
      let arr = [];
      if (otype == "select") {
        if (type == "info" && key == "sex" && this.issex) {
          this.$toast("性别不支持修改!");
          return;
        }
        // 单选
        this.answerList[type][key] = value;
        if (key in ishow) {
          arr = arr.concat(this.answerList[type][key]);
          console.log(arr, isInclude(arr), "key");
          if (isInclude(arr)) {
            ishow[key].forEach((item, index) => {
              this.tagList[type].forEach((oitem, oindex) => {
                if (item == oitem.key) {
                  this.$set(this.tagList[type][oindex], "ishow", false);
                  return;
                  // this.$forceUpdate();
                }
              });
            });
          }
          function isInclude(arr) {
            return arr.some((item, index) => {
              if (item) {
                return true;
              }
              return false;
            });
          }
        }
        this.answerList[type][key] = value;
      } else if (otype == "check") {
        // 多选
        if (Array.isArray(this.answerList[type][key])) {
          if (this.answerList[type][key].includes(value)) {
            this.answerList[type][key].remove(value);
          } else {
            if (configshow.includes(key)) {
              if (!value) {
                this.answerList[type][key] = [value];
              } else {
                this.answerList[type][key] = this.answerList[type][key].filter(
                  (item, index) => {
                    if (item) {
                      return item;
                    }
                  }
                );

                this.answerList[type][key].push(value);
              }
            } else {
              this.answerList[type][key].push(value);
            }
          }
        } else {
          this.answerList[type][key] = [value];
        }
        if (key in ishow) {
          arr = arr.concat(this.answerList[type][key]);
          // console.log(arr, isInclude(arr), "key");
          if (isInclude(arr)) {
            ishow[key].forEach((item, index) => {
              let zindex = this.tagList[type].forEach((oitem, oindex) => {
                if (item == oitem.key) {
                  this.$set(this.tagList[type][oindex], "ishow", false);
                  if (this.answerList[type][key].includes(value)) {
                    this.answerList[type][key].remove(value);
                  } else {
                    this.answerList[type][key].push(value);
                  }
                  return;
                  // this.$forceUpdate();
                }
              });
            });
          }
          function isInclude(arr) {
            return arr.some((item, index) => {
              if (item) {
                return true;
              }
              return false;
            });
          }
        }
      }
    },
    // 数据处理
    changed(type, key) {
      console.log(this.answerList[type][key], key, "key");
      // 电话验证
      if (
        key == "phone" &&
        !/^1[3456789]\d{9}$/.test(this.answerList[type][key])
      ) {
        this.isphone = true;
        this.$toast("电话号码不合法!");
        return;
      }
      this.isphone = false;
      // 身高 心率 保留数
      if (key in digits) {
        this.answerList[type][key] = (this.answerList[type][key] * 1).toFixed(
          digits[key]
        );
      }
    },
    // 搜索禁忌食物
    oinput(type, key, url, val) {
      // 判断是否是汉字
      console.log(val, "val=========");
      var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (reg.test(val)) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          let ourl = url.url.replace("{code}", "").replace("{name}", val);
          this.oinputobj.url = ourl;
          this.$http
            .request({
              method: "get",
              url: ourl,
              params: this.oinputobj.params,
            })
            .then((res) => {
              console.log(res, "========");
              if (res && res.respBody) {
                this.oinputobj.pages = res.respBody.pages;
                this.searchList = res.respBody.list;
              }
            });
        }, 1000);
      } else if (!val) {
        this.oinputobj.params.pageNum = 1;
        this.searchList = [];
      }
    },
    //选择着色
    checksearch(index) {
      // console.log(index, "=======", this.searchList[index]);
      let childindex = this.tablist.some((item, oindex) => {
        console.log(item.id, this.searchList[index].id);
        return item.id == this.searchList[index].id;
      });
      console.log(childindex, "===========", this.searchList[index]);
      if (!childindex) {
        this.tablist.push(this.searchList[index]);
        console.log(this.tablist, "======", this.tablist, "====");
      }
    },
    // 删除选中的
    tabdelete(childindex) {
      console.log(childindex, this.searchList[childindex], "=========");
      if (this.searchList && this.searchList.length != 0) {
        let oindex = this.searchList[childindex].index;
      }
      this.tablist.splice(childindex, 1);
    },
    // 滚动监听
    scrolllist(e) {
      if (
        e.target.scrollHeight <
        e.target.scrollTop + e.target.clientHeight + 6
      ) {
        if (this.oinputobj.params.pageNum >= this.oinputobj.pages) {
          this.$toast("已经没有了哦!");
          return;
        }
        this.oinputobj.params.pageNum++;
        this.$http
          .request({
            method: "get",
            url: this.oinputobj.url,
            params: this.oinputobj.params,
          })
          .then((res) => {
            // console.log(res, "========");
            if (res && res.respBody) {
              this.searchList = this.searchList.concat(res.respBody.list);
            }
          });
      }

      // e.target.scrollHeight=== e.target.clientHeight+e.target.scrollTop;
    },
    // 日历拉起
    focus(key) {
      if (key == "birthday") {
        document.activeElement.blur();
        this.cdate.iscdate = true;
      } else if (key == "high") {
        document.activeElement.blur();
        this.isheight = true;
      } else if (key == "weight") {
        document.activeElement.blur();
        this.isweight = true;
      }
    },
    // 时间确定
    confirm(value) {
      console.log(value, "confirm");
      this.answerList.info.birthday = date.time(value);
      this.cdate.iscdate = false;
      this.pageData();
    },
    // 时间确定
    cancel(value) {
      console.log(value, "cancel");
      this.cdate.iscdate = false;
    },
    // 身高
    onConfirm(val) {
      this.answerList.info.high = val;
      this.isheight = false;
    },
    onCancel(err) {
      this.isheight = false;
    },
    // 体重
    wConfirm(val) {
      console.log(val, "====");
      this.answerList.info.weight = val.join(".");
      this.isweight = false;
    },
    wCancel() {
      this.isweight = false;
    },
    // 数据处理
    filterlist() {
      // 数据提示
      let object = this.answerList;

      let toast = (key, key1) => {
        console.log(this.tagList[key],key,'===========')
        return this.tagList[key].find((item, index) => {
          return item.key == key1;
        });
      };

      for (let key in object) {
        let object1 = object[key];
        for (let key1 in object1) {
          let arr = [];
          arr = arr.concat(object1[key1]);
          console.log(arr, "arr");
          if ((arr.includes(null, undefined) &&!deletelist.includes(key1) &&!deletelist.includes(key) )
          ) {
            this.$toast(`${toast(key, key1).label}未填写!`);
            return true;
          }
        }
      }
    },
    // 答案提交
    save() {
      if (date.birthday(this.answerList.info.birthday) <= 18) {
        for (let key in birth) {
          if (birth[key] == "all") {
            deletelist = deletelist.concat("selfDisease");
          } else {
            deletelist = deletelist.concat(birth[key]);
          }
          // deletelist.remove('tabooFoods')
        }
      }
      if (this.filterlist()) {
        return;
      }

      if (date.birthday(this.answerList.info.birthday) >= 18&&this.isphone) {
        this.$toast("电话号码不合法!");
        return;
      }
      this.answerList.info.birthday = date.valueOf(
        this.answerList.info.birthday
      );

      // 禁忌食物判断
      console.log(this.tablist, "===123");
      if (this.tablist.length != 0) {
        let arr = [];
        this.tablist.forEach((item, index) => {
          if (item.id) {
            arr.push({
              [item.id]: item.name + "$" + item.id + "$" + item.internalDesc,
            });
          }
        });
        this.answerList.life.tabooFoods = arr;
        console.log(this.answerList, "===this.answerList");
      } else {
        if (date.birthday(this.answerList.info.birthday) <= 18) {
          this.$toast("禁忌食物未填写!");
          return;
        }
        this.answerList.life.tabooFoods = null;
      }

      // 答案过滤
      if (date.birthday(this.answerList.info.birthday) <= 18) {
        // 过滤不需要的参数
        let obj = this.answerList;
        for (let key in birth) {
          if (Array.isArray(birth[key])) {
            birth[key].forEach((item) => {
              obj[key][item] = null;
            });
          } else {
            obj[key].disease = null;
          }
        }
        this.answerList = obj;
      }

      this.$http
        .request({
          method: "post",
          url: "/ajax/wx/qa/saveQA",
          data: this.answerList,
        })
        .then((res) => {
          console.log(res, "res");
          this.answerList.info.birthday = date.time(
            this.answerList.info.birthday
          );
          // category==1 饮食
          if (this.obj.category == 1) {
            this.$router.push({
              name: "questionReport",
              query: { type: this.obj.type },
            });
            // category==2 运动
          } else if (this.obj.category == 2) {
            if (this.$util.isApp()) {
              // app.goApp("com.ysch.platform.sport.ui.activity.CPETActivity");
              if (date.birthday(this.answerList.info.birthday) <= 20) {
                // this.$router.push({
                //   name: "movement",
                //   query: { type: this.obj.type },
                // });
                window.location.href = "/movement/?type=" + this.obj.type;
              } else {
                app.goApp(
                  "com.ysch.platform.sport.ui.activity.CPETActivity?type=" +
                    this.obj.type
                );
              }
            } else {
              this.$router.push({
                name: "questionReport",
                query: { type: this.obj.type },
              });
            }
          } else {
            this.$router.push({
              name: "questionReport",
              query: { type: this.obj.type },
            });
          }
        });
    },
  },
  created() {
    Object.assign(this.obj, this.$route.query);
  },
  mounted() {
    this.pageanswer();
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.question-bg {
  background-color: #eeeeef;
  // padding-bottom: rem(140);
  padding-top: rem(148);
  box-sizing: border-box;
  min-height: 100vh;
  .head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: rem(128);
    padding: 0 rem(40);
    color: #1b66ff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #eeeeef;
    border-bottom: 1px solid #fff;
    .head-li {
      // width: rem(80);
      // height: rem(80);
      padding: rem(50);
      text-align: center;
      line-height: rem(40);
      &.oli {
        background-color: #55b3c2;
        border-radius: 50%;
        padding: rem(10);
        box-sizing: content-box;
        color: #fff;
      }
    }
  }
  .question-title {
    height: rem(128);
    line-height: rem(108);
    text-align: center;
    font-size: rem(40);
  }
  .question-content {
    margin: 0 rem(16) rem(16);
    padding: rem(24) rem(20) rem(20) rem(30);
    // background-color: #fff;
    border-radius: rem(12);
    .question-head {
      margin-top: rem(24);
      min-height: rem(120);
      font-size: rem(28);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      input {
        border: rem(1) solid #ccc;
        border-radius: rem(12);
        padding: rem(12);
      }
      div > span {
        font-size: rem(18);
      }
      .tablist {
        & > span {
          font-size: rem(28);
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          border: rem(2) solid #ccc;
          justify-content: center;
          margin-bottom: rem(16);
          margin-right: rem(16);
          border-radius: rem(20);
          padding: rem(20);
          position: relative;
          & > .internalDesc {
            transform: scale(0.8);
          }
          & > .iconfont {
            font-size: rem(32);
            position: absolute;
            width: rem(30);
            height: rem(30);
            right: rem(-15);
            top: rem(-15);
          }
          .icon-guanbi::before {
            color: #666;
          }
        }
      }
      .searchList {
        margin: rem(8) 0;
        width: 100%;
        height: rem(400);
        overflow: auto;
        padding-left: rem(8);
        background-color: rgba(255, 255, 255, 1);
        border-radius: rem(12);
        & > p {
          font-size: rem(32);
          color: #000000;
          line-height: rem(48);
          & > span {
            font-size: rem(22);
            color: #999999;
            transform: scale(0.8);
          }
        }
        & > p:hover {
          background-color: #2674fd;
        }
      }
    }
    .question-tag {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      border-bottom: rem(2) solid #d9d9d9;
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        span {
          min-width: rem(282);
          height: rem(72);
          font-size: rem(28);
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          border: rem(2) solid #ccc;
          justify-content: center;
          margin-bottom: rem(16);
          border-radius: rem(20);
          padding: 0 rem(10);
          &.sex {
            border: none;
            min-width: rem(122);
          }
          &.sex::before {
            content: "";
            // display: inline-block;
            width: rem(30);
            height: rem(30);
            margin-right: rem(18);
            background-color: #ccc;
            border-radius: 50%;
          }
          &.fontactiv.sex::before {
            background-color: #2674fd;
          }

          &.active {
            background-color: #2674fd;
            color: #fff;
          }
        }
        &.sex {
          // justify-content: flex-end;
        }
      }
    }
  }
  .save {
    position: relative;
    // width: 100%;
    height: rem(116);
    bottom: 0;
    left: 0;
    // background-color: #fff;
    .save-bnt {
      position: absolute;
      bottom: rem(16);
      left: 50%;
      margin-left: rem(-300);
      width: rem(600);
      height: rem(100);
      text-align: center;
      line-height: rem(100);
      color: #fff;
      font-size: rem(32);
      border-radius: rem(46);
      background-color: #2674fd;
    }
  }
  .cdate {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.3);
    .c-datetime-picker {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>
