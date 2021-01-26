const conf = {};

conf.getVersion = function () {
  return "1.0";
};
conf.getAppName = function () {
  return "h5";
};
// conf.androidDownloadUrl='http://imtt.dd.qq.com/16891/26747DD8B125A8479AD0C9D22CA47BC9.apk?fsname=com.snda.wifilocating_4.2.91_3211.apk&csr=1bbd';
conf.androidDownloadUrl='https://xz.yschsz.com/apk/YSCH_Health.apk' //下载包

conf.androidUpUrl='healthy://ysch:7380/ucar/user?name=helloworld&value=120' //唤起链接

export default conf;
