const hm = {};

hm.trackPageview = function (path) {
  if (window._hmt) {
    window._hmt.push(["_trackPageview", "/#" + path]);
  } else {
    console.warn("_hmt not found");
  }
};

export default hm;
