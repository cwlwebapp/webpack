webpackJsonp([0],{544:function(t,e,a){function r(t){o||a(550)}var o=!1,n=a(42)(a(545),a(549),r,"data-v-fb0caa44",null);n.options.__file="F:\\git\\triage_H5\\src\\page\\reportDetails.vue",n.esModule&&Object.keys(n.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)}),n.options.functional,t.exports=n.exports},545:function(t,e,a){"use strict";function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}Object.defineProperty(e,"__esModule",{value:!0});var o,n=a(546),i=a(136),s=function(t){return t&&t.__esModule?t:{default:t}}(i),l="https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/0.png",c="https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/1.png",u="https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/2.png",h="https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/3.png",d="https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/4.png",f="https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/5.png",p=a(548).Base64;e.default=(o={data:function(){return{a:l,foodbg:"https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/food-bg.png",bg:"https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/bg.png",point:"cholesterol",offtrumpet:"https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/trumpet-off.png",ontrumpet:"https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/trumpet-on.gif",istrumpet:!1,headdata:{scoreLeft:"",sections:[]},message:[],beneficial:{name:"",image:"",pinyin:""},aa:0,params:{id:"5ce23cb297749e87bf1d343f",relationUserId:""},myAuto:"",myAutolock:!1,wxsData:{common:{app_id:""},business:{vcn:"xiaoyan",aue:"lame",speed:50,sfl:1,tte:"UTF8"},data:{status:2,text:"5L2g5aW9"}}}},filters:{imageUrl:function(t,e){var a={};return t?("cholesterol"==t?a={0:u,1:h,2:f}:"2"==t?a={0:u,1:d}:"uricAcid"==t?a={0:l,1:c,2:u,3:h,4:f}:"temperature"==t?a={0:c,1:u,2:h,3:f}:"glu"==t?a={0:l,1:c,2:u,3:h,4:d,5:f}:"bloodpressure"==t?a={0:l,1:c,2:u,3:h,4:d,5:f,6:"https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/6.png"}:"waistline"==t?a={0:u,1:d}:"weight"==t&&(a={0:c,1:u,2:h,3:f}),a[""+e]):l},hour:function(t){if(t){var e=function(t){return t=t.toString(),t[1]?t:"0"+t},a=new Date(1*t);return[a.getHours(),a.getMinutes()].map(e).join(":")}return"--:--"},day:function(t){if(t){var e=function(t){return t=t.toString(),t[1]?t:"0"+t},a=new Date(1*t);return[a.getFullYear(),a.getMonth()+1,a.getDate()].map(e).join("-")}return" "},foodName:function(t){return{calory:"卡路里",carbohydrate:"碳水",fat:"脂肪",protein:"蛋白质"}[t]},foodUnti:function(t){return{milliGrams:"毫克",KCAL:"千卡",grams:"克"}[t]},tofie:function(t,e){if(t){var a=t.toString(),r=a&&a.indexOf(".");if("glu"==e)return Number(t).toFixed(1);if("weight"==e)return"";if(-1!=r){return a.slice(r).length>2?"uricAcid"==e?Number(t).toFixed(0):Number(t).toFixed(2):Number(t)}return t}return""}},computed:{foodType:function(){for(var t=["carbohydrate","fat","protein","calory"],e={},a=0,o=0;o<t.length;o++)this.beneficial&&this.beneficial.nutrients&&this.beneficial.nutrients[t[o]]&&("calory"==t[o]?(this.aa=a.toFixed(1),Object.assign(e,r({},t[o],this.beneficial.nutrients[t[o]]))):(a+=1*this.beneficial.nutrients[t[o]].value,Object.assign(e,r({},t[o],this.beneficial.nutrients[t[o]]))));return e},showtrumpet:function(){return this.istrumpet?this.ontrumpet:this.offtrumpet}},components:{},created:function(){Object.assign(this.params,this.$route.query||{id:"5ce23cb297749e87bf1d343f",relationUserId:""})},methods:{foodpercent:function(t,e,a){var r=0;switch(e){case"carbohydrate":r=100*parseFloat(t)/15;break;case"fat":r=100*parseFloat(t)/3.3;break;case"protein":r=100*parseFloat(t)/7.5;break;case"calory":r=100*parseFloat(t)/120}return r>=100?100:r.toFixed(2)},foodcolor:function(t){return{calory:"#343896",carbohydrate:"#f7cd26",fat:"#f62e52",protein:"#c059fa"}[t]},pagedetail:function(){var t=this;this.$http.request({url:"/ajax/user/wx/healthindicator/detail",method:"get",params:this.params}).then(function(e){if(e&&e.respBody){var a=e.respBody.healthIndicator,r=t.refactoring(a),o=a.healthStatus,i=0,l=[],c=void 0,u=[];if("cholesterol"==a.type?(l=[null,null,"正常","偏高",null,"严重偏高"],a.healthStatus=a.healthStatus-1):"2"==a.type?l=[null,null,"正常",null,"异常",null]:"uricAcid"==a.type?(l=["严重过低","偏低","正常","偏高",null,"严重偏高"],a.healthStatus=a.healthStatus+1):"temperature"==a.type?l=[null,"体温偏低","体温正常","低烧",null,"高烧"]:"glu"==a.type?(l=["严重过低","偏低","正常","轻度偏高","偏高","严重超高"],a.healthStatus=a.healthStatus+1):"bloodpressure"==a.type?(l=["严重过低","低血压","正常血压","正常高值","1级高血压","2级高血压","3级高血压"],a.healthStatus=a.healthStatus+1):"waistline"==a.type?(l=[null,null,"正常",null," 腹型肥胖",null],a.healthStatus=a.healthStatus-1):"weight"==a.type&&(l=[null,"偏轻","正常","偏重",null,"超重"]),c=506/l.notempty().length*a.healthStatus-25,i=506/l.notempty().length*.5+c,i=i/750*100+"vw",u=l.map(function(t){return{name:t}}),"temperature"!=a.type){var h=a.type;"uricAcid"==a.type&&(h="uric_acid"),t.$http({url:"/ajax/user/wx/knowledge/ingredient",method:"get",params:{dataType:h,status:o}}).then(function(e){e&&e.respBody&&e.respBody.beneficial&&(e.respBody.beneficial[0].pinyin=s.default.py(e.respBody.beneficial[0].name),t.beneficial=e.respBody.beneficial[0])})}t.headdata={datatime:a.addtime||a.measureDateTime,sections:u,value:r.value,scoreLeft:i,healthStatus:a.healthStatus,type:a.type,beforemeal:a.scord?"":function(t){if(t.scord)return"";if(t.values&&t.values.dineType){return{1:"早餐前",2:"早餐后",3:"午餐前",4:"午餐后",5:"晚餐前",6:"晚餐后",7:"睡前"}[t.values.dineType+""]||""}return t.values&&t.values.type?1==t.values.type?"空腹":2==t.values.type?"空腹":3==t.values.type?"餐后":"":""}(a)},(0,n.circular)("diagram",r);var d="";t.message=e.respBody.message&&e.respBody.message.suggest.map(function(t,e){return Array.isArray(t)&&t.length>1&&(d=t.slice(1).join(" "),t[1]=d),t})}else t.$store.commit("setDataLoading",!0)})},refactoring:function(t){(t.record_status||0==t.record_status)&&(t.healthStatus=t.record_status),"uric_acid"==t.type&&(t.type="uricAcid",t.values[t.type]=(1*t.values[t.type]).toFixed(0)),"cholesterol"==t.type&&(t.values[t.type]=(1*t.values[t.type]).toFixed(2)),"glu"==t.type&&(t.values[t.type]=(1*t.values[t.type]).toFixed(1)),"waistline"==t.type&&(t.values[t.type]=(1*t.values[t.type]).toFixed(1)),document.title=(0,n.health)(t.type,null)+document.title;var e={value:t.scord||t.values[t.type],unit:t.values&&t.values.unit||(0,n.unit)(t.type,0==t.healthStatus?String(t.healthStatus):t.healthStatus),title:"weight"==t.type?(0,n.health)(t.type,t.values[t.type],t.values.height):(0,n.health)(t.type,0==t.healthStatus?String(t.healthStatus):t.healthStatus),color:(0,n.color)(t.type,0==t.healthStatus?String(t.healthStatus):t.healthStatus),beforemeal:t.scord?"":(t.values.type&&1==t.values.type?"空腹":2==t.values.type?"空腹":3==t.values.type?"餐后":"")||"",id:t.record_id||t.id,measureTime:t.addtime&&String(t.addtime)||t.measureTime,measureDateTime:t.addtime||t.measureDateTime,dineType:t.scord?"":t.values.dineType||""};if("bloodpressure"==t.type){var a;a={value:t.values,unit:(0,n.unit)(t.type,0==t.healthStatus?String(t.healthStatus):t.healthStatus),title:(0,n.health)(t.type,0==t.healthStatus?String(t.healthStatus):t.healthStatus),color:(0,n.color)(t.type,0==t.healthStatus?String(t.healthStatus):t.healthStatus),measureTime:t.measureTime,measureDateTime:t.measureDateTime},r(a,"color",(0,n.color)(t.type,0==t.healthStatus?String(t.healthStatus):t.healthStatus)),r(a,"id",t.id),e=a}return e},trumpet:function(){var t=this;if(this.myAuto)return void(this.istrumpet?(this.myAuto.pause(),this.istrumpet=!1):(this.myAuto.play(),this.istrumpet=!0,this.myAuto.addEventListener("pause",function(){t.istrumpet=!1})));this.$store.commit("setDataLoading",!0),this.$http.request({url:"/ajax/user/wx/xf/authorization",method:"get"}).then(function(e){e&&e.respBody&&(t.$store.commit("setDataLoading",!0),t.wxsData.common.app_id=e.respBody.appId,t.wxsData.data.text=p.encode(t.message[0][0]),t.socket(e.respBody.path))})},socket:function(t){var e=this,a=new WebSocket(t),r="";a.onopen=function(){a.send(JSON.stringify(e.wxsData))},a.onmessage=function(t){if(t&&t.data){var a=JSON.parse(t.data);0==a.code&&(r+=window.atob(a.data.audio),2==a.data.status&&(e.$store.commit("setDataLoading",!1),e.istrumpet=!0,e.audio(r)))}},a.onerror=function(t){},a.onclose=function(t){}},audio:function(t){var e=this;this.$store.commit("setDataLoading",!1),this.myAuto=document.createElement("audio"),this.myAuto.src=function(t){for(var e=t.length,a=new Uint8Array(e),r=0;r<e;++r)a[r]=t.charCodeAt(r);return URL.createObjectURL(new Blob([a],{type:"audio/wav"}))}(t),this.myAuto.play(),this.myAuto.addEventListener("pause",function(){e.istrumpet=!1})},goapp:function(){var t=this.$refs.imageWrapper;this.$htmlcanvas(t)}}},r(o,"created",function(){Object.assign(this.params,this.$route.query)}),r(o,"mounted",function(){this.pagedetail()}),o)},546:function(t,e,a){"use strict";function r(t,e){var a=document.getElementById(t),r=a.getContext("2d");a.width=a.offsetWidth,a.height=a.offsetHeight;var n={x:a.offsetWidth/2,y:a.offsetHeight/2};r.beginPath(),r.strokeStyle="#A9B8D5",r.lineWidth=6,r.arc(n.x,n.y,n.x-24,0,2*Math.PI),r.stroke(),r.beginPath(),r.lineCap="round";var i=r.createLinearGradient(0,0,2*n.y,0);if(i.addColorStop(0,e.color),i.addColorStop(1,e.color),r.strokeStyle=i,r.lineWidth=8,r.arc(n.x,n.y,n.x-24,.75*Math.PI,.75*Math.PI+1.5*Math.PI),r.stroke(),r.beginPath(),r.fillStyle=e.color,r.textAlign="center",r.textBaseline="middle","[object Object]"==Object.prototype.toString.call(e.value)){var s=r.measureText(o(e.value.systolic)+"").width,l=r.measureText(o(e.value.diastolic)+"").width,c=r.measureText(o(e.value.rate)+"").width;r.font="normal bold 12px sans-serif",r.fillText(o(e.value.systolic),.6*n.x,.7*n.y),r.fillText(o(e.value.diastolic),1.2*n.x,.7*n.y),r.fillText(o(e.value.rate),.9*n.x,1.1*n.y)}else{r.font="normal bold 33px sans-serif";var u=r.measureText(o(e.value)+"").width;r.fillText(o(e.value,e.type),n.x-.15*u,n.y)}if(r.beginPath(),r.fillStyle="#9C9C9C",r.textAlign="center",r.textBaseline="top","[object Object]"==Object.prototype.toString.call(e.value)){r.font="normal normal 8px sans-serif";var h=r.measureText(e.unit+"").width,d=r.measureText("搏/分").width;r.fillText(e.unit,.6*n.x+.7*h+.5*s,.7*n.y),r.fillText(e.unit,1.2*n.x+.7*h+.5*l,.7*n.y),r.fillText("搏/分",.9*n.x+.7*d+.5*c,1.1*n.y)}else{r.font="normal normal 10px sans-serif";var f=r.measureText(e.unit+"").width;r.fillText(e.unit,n.x+.5*f+.5*u,n.y)}"[object Object]"==Object.prototype.toString.call(e.value)&&(r.beginPath(),r.fillStyle="#333333",r.textAlign="middle",r.textBaseline="top",r.font="normal normal 10px sans-serif",r.fillText("脉搏",.9*n.x+.35*h+.25*c,1.1*n.y+10),r.fillText("高压",.6*n.x+.35*d+.25*s,.7*n.y+10),r.fillText("低压",1.2*n.x+.35*d+.25*l,.7*n.y+10)),r.beginPath(),r.fillStyle="#333333",r.textAlign="middle",r.textBaseline="top",r.font="normal normal 14px sans-serif","[object Object]"==Object.prototype.toString.call(e.value)?r.fillText(e.title,n.x,n.y+40):r.fillText(e.title,n.x,n.y+30)}function o(t,e){if(t){var a=t.toString(),r=a&&a.indexOf(".");if("glu"==e)return Number(t).toFixed(1);if(-1!=r){return a.slice(r).length>2?"uricAcid"==e?Number(t).toFixed(0):"cholesterol"==e?Number(t).toFixed(1):Number(t).toFixed(2):Number(t)}return t}return t}function n(t,e,a){var r={};return"cholesterol"==t?e?(r={0:"总胆固醇偏低",1:"总胆固醇正常",2:"总胆固醇偏高",3:"总胆固醇严重偏高"},r[""+e]):"总胆固醇":"2"==t?0==e||1==e?(r={0:"尿检正常",1:"尿检异常"},r[""+e]):"尿检":"uricAcid"==t?e?(r={"-1":"血尿酸严重过低",0:"血尿酸偏低",1:"血尿酸正常",2:"血尿酸偏高",3:"血尿酸严重偏高"},r[""+e]):"血尿酸":"temperature"==t?e?(r={0:"体温偏低",1:"体温正常",2:"低烧",3:"高烧"},r[""+e]):"体温":"bloodpressure"==t?e?(r={"-1":"血压严重过低",0:"低血压",1:"正常血压",2:"正常高值",3:"1级轻度高血压",4:"2级中度高血压",5:"3级严重高血压"},r[""+e]):"血压":"glu"==t?e?(r={"-1":"血糖严重过低",0:"血糖偏低",1:"血糖正常",2:"轻度偏高",3:"血糖偏高",4:"血糖严重超高"},r[""+e]):"血糖":"waistline"==t?e?(r={1:"正常",2:"腹型肥胖"},r[""+e]):"腰围":"weight"==t?e?"BIM "+(e/Math.pow(.01*a,2)).toFixed(1):"体重":"未知状态"}function i(t,e){return"cholesterol"==t?e?"mmol/L":"未知":"2"==t?0==e||1==e?"分":"未知":"uricAcid"==t?e?"umol/L":"未知":"temperature"==t?e?"℃":"未知":"bloodpressure"==t?e?"mmHg":"未知":"glu"==t?e?"mmol/L":"未知":"waistline"==t?e?"cm":"未知":"weight"==t?e?"kg":"未知":"xxx"}function s(t,e){var a={};return"cholesterol"==t?e?(a={0:"#00BFBF",1:"#87CD41",2:"#FDD600",3:"#EB6100"},a[""+e]):"#000":"2"==t?0==e||1==e?(a={0:"#87CD41",1:"#FE9011"},a[""+e]):"未知":"uricAcid"==t?e?(a={"-1":"#5CCBFA",0:"#00BFBF",1:"#87CD41",2:"#FDD600",3:"#EB6100"},a[""+e]):"未知":"temperature"==t?e?(a={0:"#00BFBF",1:"#87CD41",2:"#FDD600",3:"#EB6100"},a[""+e]):"未知":"bloodpressure"==t?e?(a={"-1":"#5CCBFA",0:"#00BFBF",1:"#87CD41",2:"#FDD600",3:"#FE9011",4:"#EB6100",5:"#E22323"},a[""+e]):"未知":"glu"==t?e?(a={"-1":"#5CCBFA",0:"#00BFBF",1:"#87CD41",2:"#FDD600",3:"#FE9011",4:"#EB6100"},a[""+e]):"未知":"waistline"==t?e?(a={1:"#87CD41",2:"#FE9011"},a[""+e]):"腰围":"weight"==t?e?(a={0:"#00BFBF",1:"#87CD41",2:"#FDD600",3:"#EB6100"},a[""+e]):"体重":"未知状态"}Object.defineProperty(Array.prototype,"notempty",{value:function(){return this.filter(function(t){return!!t})}}),t.exports={circular:r,health:n,unit:i,color:s}},547:function(t,e,a){e=t.exports=a(58)(),e.push([t.i,'\n.healthlist[data-v-fb0caa44]{width:100%;height:103.33333vw;position:relative\n}\n.healthlist .healthlist-bg[data-v-fb0caa44]{position:absolute;left:0;top:0;width:100%;height:100%\n}\n.healthlist .calendar[data-v-fb0caa44]{position:absolute;left:5.27778vw;top:5.27778vw;width:16.66667vw;height:18.05556vw;background-color:#ffffff;border-radius:.69444vw;border:solid 1px #1b66ff;overflow:hidden\n}\n.healthlist .calendar .calendar-head[data-v-fb0caa44]{height:10.83333vw;font-family:SourceHanSansCN-Medium;font-size:3.88889vw;color:#1b66ff;text-align:center;box-sizing:border-box;padding-top:1.38889vw\n}\n.healthlist .calendar .calendar-head[data-v-fb0caa44]::before{content:" ";position:absolute;left:1.38889vw;top:1.11111vw;width:.83333vw;height:.83333vw;background-color:#ffffff;border:solid 1px #1b66ff;border-radius:50%\n}\n.healthlist .calendar .calendar-head[data-v-fb0caa44]::after{content:" ";position:absolute;right:1.38889vw;top:1.11111vw;width:.83333vw;height:.83333vw;background-color:#ffffff;border:solid 1px #1b66ff;border-radius:50%\n}\n.healthlist .calendar .calendar-head .calendar-head-time[data-v-fb0caa44]{font-size:2.22222vw;color:#1b66ff;transform:scale(0.7);white-space:nowrap\n}\n.healthlist .calendar .calendar-bottom[data-v-fb0caa44]{height:7.22222vw;width:100%;text-align:center;background-color:#1b66ff;color:#fbfcfd\n}\n.healthlist .calendar .calendar-bottom>span[data-v-fb0caa44]{width:100%;display:inline-block;font-size:4.44444vw;white-space:nowrap\n}\n.healthlist .calendar .calendar-bottom .time[data-v-fb0caa44]{font-size:2.22222vw;transform:scale(0.8)\n}\n.healthlist .blockprogress[data-v-fb0caa44]{position:absolute;left:16.94444vw;top:76.38889vw;width:70.27778vw;height:16.66667vw\n}\n.healthlist .blockprogress .progress[data-v-fb0caa44]{position:absolute;left:0;top:7.5vw;width:100%;height:1.66667vw;display:flex;border-radius:1.66667vw\n}\n.healthlist .blockprogress .progress-content[data-v-fb0caa44]{flex:1\n}\n.healthlist .blockprogress .progress-content[data-v-fb0caa44]:first-child{border-radius:1.66667vw 0 0rem 12\n}\n.healthlist .blockprogress .progress-content[data-v-fb0caa44]:nth-last-child(3){border-radius:0rem 12 1.66667vw 0\n}\n.healthlist .blockprogress .bg0[data-v-fb0caa44]{background-color:#5ccbfa\n}\n.healthlist .blockprogress .bg1[data-v-fb0caa44]{background-color:#00bfbf\n}\n.healthlist .blockprogress .bg2[data-v-fb0caa44]{background-color:#87cd41\n}\n.healthlist .blockprogress .bg3[data-v-fb0caa44]{background-color:#fdd600\n}\n.healthlist .blockprogress .bg4[data-v-fb0caa44]{background-color:#fe9011\n}\n.healthlist .blockprogress .bg5[data-v-fb0caa44]{background-color:#eb6100\n}\n.healthlist .blockprogress .bg6[data-v-fb0caa44]{background-color:#e22323\n}\n.healthlist .blockprogress .borderRadius[data-v-fb0caa44]{position:absolute;left:0;top:-7.77778vw;width:6.94444vw;height:7.77778vw;transition:all 500ms linear\n}\n.healthlist .blockprogress .borderRadius img[data-v-fb0caa44]{width:6.94444vw;height:7.77778vw\n}\n.healthlist .blockprogress .borderRadius>span[data-v-fb0caa44]{position:absolute;left:0;top:0;width:6.94444vw;height:7.77778vw;line-height:7.5vw;text-align:center;font-family:ArialMT;font-size:2.5vw;color:#fcfdfb\n}\n.healthlist .blockprogress .progress-title[data-v-fb0caa44]{position:absolute;left:0;top:4.44444vw;height:auto;width:100%;display:flex;align-items:center;text-align:center;font-family:SourceHanSansCN-Regular;font-size:3.05556vw;color:#666666\n}\n.healthlist .blockprogress .progress-title>div[data-v-fb0caa44]{flex:1\n}\n.healthlist .circular[data-v-fb0caa44]{position:absolute;left:50%;top:50%;margin-left:-33.33333vw;margin-top:-41.66667vw;display:flex;align-items:center;justify-content:center;width:63.88889vw;height:63.88889vw;background-color:#f1f4f9;border-radius:50%\n}\n.healthlist .circular #diagram[data-v-fb0caa44]{width:61.11111vw;height:61.11111vw\n}\n.line[data-v-fb0caa44]{height:1.94444vw;background-color:#f2f2f2\n}\n.chart[data-v-fb0caa44]{padding:0 3.88889vw 5.55556vw\n}\n.chart .chart-title[data-v-fb0caa44]{margin-top:2.22222vw;display:flex;align-items:center;height:11.11111vw;font-family:SourceHanSansCN-Regular;font-size:4.44444vw;font-weight:normal;font-stretch:normal;letter-spacing:.27778vw;color:#666666\n}\n.chart .chart-title[data-v-fb0caa44]::before{content:"";width:1.38889vw;height:6.94444vw;background-color:#1b66ff;margin-right:3.05556vw\n}\n.chart .chart-title .trumpet[data-v-fb0caa44]{width:7.5vw;height:7.5vw;margin-left:1.66667vw;border:none\n}\n.chart .chart-status[data-v-fb0caa44]{min-height:19.44444vw;font-family:SourceHanSansCN-Normal;font-size:3.88889vw;color:#666666;padding-bottom:2.77778vw;padding-left:1.38889vw\n}\n.chart .chart-content[data-v-fb0caa44]{height:44.72222vw;background-color:#9fe487;border-radius:2.77778vw;position:relative\n}\n.chart .chart-content .chart-food-title[data-v-fb0caa44]{position:absolute;left:4.72222vw;top:7.77778vw;letter-spacing:.55556vw;color:#ffffff;text-align:center;font-size:6.66667vw\n}\n.chart .chart-content .chart-food-title>span[data-v-fb0caa44]{font-size:3.88889vw\n}\n.chart .chart-content .chart-food-bg[data-v-fb0caa44]{position:absolute;bottom:0;left:0;width:100%\n}\n.chart .chart-content .chart-food-icon[data-v-fb0caa44]{position:absolute;right:12.77778vw;top:5vw\n}\n.chart .chart-content-food[data-v-fb0caa44]{display:flex;align-items:center;height:17.22222vw;color:#333333;font-size:4.44444vw\n}\n.chart .chart-content-food img[data-v-fb0caa44]{width:5.83333vw;height:5.83333vw;background-color:#93dafe;border-radius:1.38889vw;margin-right:2.5vw\n}\n.chart .chart-content-food .chart-subhead-food[data-v-fb0caa44]{font-size:2.22222vw\n}\n.chart ul[data-v-fb0caa44]{padding:0 2.77778vw 0 1.11111vw\n}\n.chart ul li[data-v-fb0caa44]{display:flex;height:7.77778vw;align-items:center;justify-content:space-between\n}\n.chart ul li .progress-left[data-v-fb0caa44]{width:13.88889vw;color:#666666;font-size:3.33333vw\n}\n.chart ul li>.progress[data-v-fb0caa44]{width:44.44444vw\n}\n.chart ul li .progress-right[data-v-fb0caa44]{width:19.44444vw;font-size:3.33333vw;letter-spacing:.55556vw\n}\n.chart .food-introduce[data-v-fb0caa44]{padding:5.55556vw 5.55556vw 15vw 1.11111vw;font-size:3.88889vw;line-height:5.55556vw;letter-spacing:.55556vw;color:#666666\n}\n',""])},548:function(module,exports,__webpack_require__){(function(global){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;!function(t,e){module.exports=e(t)}("undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==global?global:this,function(global){"use strict";global=global||{};var _Base64=global.Base64,version="2.5.2",buffer;if(void 0!==module&&module.exports)try{buffer=eval("require('buffer').Buffer")}catch(t){buffer=void 0}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b64tab=function(t){for(var e={},a=0,r=t.length;a<r;a++)e[t.charAt(a)]=a;return e}(b64chars),fromCharCode=String.fromCharCode,cb_utob=function(t){if(t.length<2){var e=t.charCodeAt(0);return e<128?t:e<2048?fromCharCode(192|e>>>6)+fromCharCode(128|63&e):fromCharCode(224|e>>>12&15)+fromCharCode(128|e>>>6&63)+fromCharCode(128|63&e)}var e=65536+1024*(t.charCodeAt(0)-55296)+(t.charCodeAt(1)-56320);return fromCharCode(240|e>>>18&7)+fromCharCode(128|e>>>12&63)+fromCharCode(128|e>>>6&63)+fromCharCode(128|63&e)},re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,utob=function(t){return t.replace(re_utob,cb_utob)},cb_encode=function(t){var e=[0,2,1][t.length%3],a=t.charCodeAt(0)<<16|(t.length>1?t.charCodeAt(1):0)<<8|(t.length>2?t.charCodeAt(2):0);return[b64chars.charAt(a>>>18),b64chars.charAt(a>>>12&63),e>=2?"=":b64chars.charAt(a>>>6&63),e>=1?"=":b64chars.charAt(63&a)].join("")},btoa=global.btoa?function(t){return global.btoa(t)}:function(t){return t.replace(/[\s\S]{1,3}/g,cb_encode)},_encode=function(t){return"[object Uint8Array]"===Object.prototype.toString.call(t)?t.toString("base64"):btoa(utob(String(t)))},encode=function(t,e){return e?_encode(String(t)).replace(/[+\/]/g,function(t){return"+"==t?"-":"_"}).replace(/=/g,""):_encode(t)},encodeURI=function(t){return encode(t,!0)},re_btou=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,cb_btou=function(t){switch(t.length){case 4:var e=(7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3),a=e-65536;return fromCharCode(55296+(a>>>10))+fromCharCode(56320+(1023&a));case 3:return fromCharCode((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return fromCharCode((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},btou=function(t){return t.replace(re_btou,cb_btou)},cb_decode=function(t){var e=t.length,a=e%4,r=(e>0?b64tab[t.charAt(0)]<<18:0)|(e>1?b64tab[t.charAt(1)]<<12:0)|(e>2?b64tab[t.charAt(2)]<<6:0)|(e>3?b64tab[t.charAt(3)]:0),o=[fromCharCode(r>>>16),fromCharCode(r>>>8&255),fromCharCode(255&r)];return o.length-=[0,0,2,1][a],o.join("")},_atob=global.atob?function(t){return global.atob(t)}:function(t){return t.replace(/\S{1,4}/g,cb_decode)},atob=function(t){return _atob(String(t).replace(/[^A-Za-z0-9\+\/]/g,""))},_decode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(t){return(t.constructor===buffer.constructor?t:buffer.from(t,"base64")).toString()}:function(t){return(t.constructor===buffer.constructor?t:new buffer(t,"base64")).toString()}:function(t){return btou(_atob(t))},decode=function(t){return _decode(String(t).replace(/[-_]/g,function(t){return"-"==t?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))},noConflict=function(){var t=global.Base64;return global.Base64=_Base64,t};if(global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict,__buffer__:buffer},"function"==typeof Object.defineProperty){var noEnum=function(t){return{value:t,enumerable:!1,writable:!0,configurable:!0}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum(function(){return decode(this)})),Object.defineProperty(String.prototype,"toBase64",noEnum(function(t){return encode(this,t)})),Object.defineProperty(String.prototype,"toBase64URI",noEnum(function(){return encode(this,!0)}))}}return global.Meteor&&(Base64=global.Base64),void 0!==module&&module.exports?module.exports.Base64=global.Base64:(__WEBPACK_AMD_DEFINE_ARRAY__=[],void 0!==(__WEBPACK_AMD_DEFINE_RESULT__=function(){return global.Base64}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__))&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)),{Base64:global.Base64}})}).call(exports,__webpack_require__(43))},549:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"imageWrapper"},[a("div",{staticClass:"healthlist"},[a("shareIcon",{on:{goapp:t.goapp}}),t._v(" "),a("img",{staticClass:"healthlist-bg",attrs:{src:t.bg}}),t._v(" "),a("div",{staticClass:"calendar"},[a("div",{staticClass:"calendar-head"},[t._v("\n        "+t._s(t._f("hour")(t.headdata.datatime))+"\n        "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.headdata.beforemeal,expression:"headdata.beforemeal"}],staticClass:"calendar-head-time"},[t._v("\n          "+t._s(t._f("day")(t.headdata.datatime))+"\n        ")])]),t._v(" "),a("div",{staticClass:"calendar-bottom"},[t.headdata.beforemeal?a("span",[t._v(t._s(t.headdata.beforemeal))]):t.headdata.beforemeal?t._e():a("span",{staticClass:"time"},[t._v(t._s(t._f("day")(t.headdata.datatime)))])])]),t._v(" "),t._m(0),t._v(" "),a("div",{staticClass:"blockprogress"},[a("div",{staticClass:"progress"},[t._l(t.headdata.sections,function(t,e){return a("div",{directives:[{name:"show",rawName:"v-show",value:t.name,expression:"item.name"}],key:e,class:[0==e?"bg0":1==e?"bg1":2==e?"bg2":3==e?"bg3":4==e?"bg4":5==e?"bg5":"bg6","progress-content"]})}),t._v(" "),a("div",{staticClass:"borderRadius",style:{left:t.headdata.scoreLeft}},[a("img",{attrs:{src:t._f("imageUrl")(t.headdata.type,t.headdata.healthStatus)}}),t._v(" "),t.headdata.value&&t.headdata.value.diastolic?a("span"):t.headdata.value&&!t.headdata.value.diastolic?a("span",[t._v(t._s(t._f("tofie")(t.headdata.value,t.headdata.type)))]):t._e()]),t._v(" "),a("div",{staticClass:"progress-title"},t._l(t.headdata.sections,function(e,r){return a("div",{directives:[{name:"show",rawName:"v-show",value:e.name,expression:"oitem.name"}],key:r},[t._v("\n            "+t._s(e.name&&e.name)+"\n          ")])}),0)],2)])],1),t._v(" "),a("div",{staticClass:"line"}),t._v(" "),t._l(t.message,function(e,r){return a("div",{directives:[{name:"show",rawName:"v-show",value:e&&Array.isArray(e)&&0!=e.length,expression:"item && Array.isArray(item) && item.length != 0"}],key:r,staticClass:"chart"},[a("div",{staticClass:"chart-title"},[a("span",[t._v(t._s(e.length>1?e[0]:"结果解读"))]),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:!(e.length>1),expression:"item.length > 1 ? false : true"}],staticClass:"trumpet",attrs:{src:e.length>1?"":t.showtrumpet,alt:""},on:{click:function(e){return t.trumpet()}}})]),t._v(" "),a("p",{staticClass:"chart-status"},[t._v(t._s(e.length>1?e[1]:e[0]))])])}),t._v(" "),a("div",{staticClass:"line"}),t._v(" "),t.beneficial.id&&(t.beneficial.name||t.foodType)?a("div",{staticClass:"chart"},[a("div",{staticClass:"chart-title"},[t._v("推荐饮食")]),t._v(" "),a("div",{staticClass:"chart-content"},[a("span",{staticClass:"chart-food-title"},[t._v("\n        "+t._s(t.beneficial.name)+"\n        "),a("br"),t._v(" "),a("span",[t._v(t._s(t.beneficial.pinyin))])]),t._v(" "),a("img",{staticClass:"chart-food-bg",attrs:{src:t.foodbg,alt:""}}),t._v(" "),a("van-image",{directives:[{name:"show",rawName:"v-show",value:t.beneficial.image,expression:"beneficial.image"}],staticClass:"chart-food-icon",attrs:{round:"",width:"6rem",height:"6rem",fit:"cover",src:t.beneficial.image}})],1),t._v(" "),a("div",{staticClass:"chart-content-food"},[a("img",{attrs:{src:t.a,alt:""}}),t._v("\n      营养成分表\n      "),a("span",{staticClass:"chart-subhead-food"},[t._v("(每100克所含)")])]),t._v(" "),a("ul",t._l(t.foodType,function(e,r){return a("li",{key:r},[a("span",{staticClass:"progress-left"},[t._v(t._s(t._f("foodName")(r)))]),t._v(" "),a("div",{staticClass:"progress"},[a("van-progress",{attrs:{percentage:t.foodpercent(e.value,r,e.unit),color:t.foodcolor(r),"show-pivot":!1}})],1),t._v(" "),a("span",{staticClass:"progress-right",style:{color:t.foodcolor(r)}},[t._v(t._s(e.value)+t._s(t._f("foodUnti")(e.unit)))])])}),0),t._v(" "),a("p",{staticClass:"food-introduce"},[t._v(t._s(t.beneficial.desc))])]):t._e()],2)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"circular"},[a("canvas",{attrs:{id:"diagram"}})])}]},t.exports.render._withStripped=!0},550:function(t,e,a){var r=a(547);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(59)("798524a1",r,!1,{})}});