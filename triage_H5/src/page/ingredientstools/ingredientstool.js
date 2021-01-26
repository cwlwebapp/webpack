// 轮播图数据源
let cereal = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/cereal.png";
let vegetables = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/vegetables.png";
let meat = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/meat.png";
let seafood = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/seafood.png";

let fruits = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/fruits.png";
let soymilk = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/soymilk.png";
let nut = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/nut.png";
let herb = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/herb.png";
export let vantlist = [
  {
    headlist: [
      {
        icon: cereal,
        name: "五谷杂粮",
        category: "01,02,03",
      },
      {
        icon: vegetables,
        name: "蔬菜菌类",
        category: "04,05",
      },
      {
        icon: meat,
        name: "肉类/蛋类",
        category: "08,09,11",
      },
      {
        icon: seafood,
        name: "水产/海鲜",
        category: "12",
      },
    ],
    foodlist: [
      {
        icon: fruits,
        name: "水果",
        category: "06",
      },
      {
        icon: soymilk,
        name: "豆奶制品",
        category: "10",
      },
      {
        icon: nut,
        name: "坚果",
        category: "07",
      },
      {
        icon: herb,
        name: "补品/草药",
        category: "99",
      },
    ],
  },
];

// 食材黑白
export let title_list = [
  { name: "高血压", active: false, disease: "高血压" },
  { name: "糖尿病", active: false, disease: "糖尿病" },
  { name: "慢性肾病", active: false, disease: "慢性肾病" },
  { name: "高血脂", active: false, disease: "高血脂" },
  { name: "高尿酸血症", active: false, disease: "高尿酸血症" },
];
let ke = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/yi.png";
let yi = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/ke.png";
let sh = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/sh.png";

let food = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/food.png";
let food2 = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/food2.png";
let food3 = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/food3.png";
export let img_list = [
  { img: food, icon: yi, iconname: "宜吃", diseaseType: 1 },
  { img: food2, icon: ke, iconname: "可吃", diseaseType: 0 },
  { img: food3, icon: sh, iconname: "慎吃", diseaseType: -1 },
];

// 卡片集合
export let carlist = [
  {
    icon: yi,
    name: "西瓜",
    subhead: "(新鲜)",
    des: "麒麟瓜",
    num: 116,
    taglist: [
      {
        tagname: "高血压",
        tagicon: yi,
      },
      {
        tagname: "糖尿病",
        tagicon: ke,
      },
      {
        tagname: "高尿酸血症",
        tagicon: sh,
      },
    ],
  },
  {
    icon: yi,
    name: "西瓜",
    subhead: "(新鲜)",
    des: "麒麟瓜",
    num: 116,
    taglist: [
      {
        tagname: "高血压",
        tagicon: yi,
      },
      {
        tagname: "糖尿病",
        tagicon: ke,
      },
      {
        tagname: "高尿酸血症",
        tagicon: sh,
      },
    ],
  },
  {
    icon: yi,
    name: "西瓜",
    subhead: "(新鲜)",
    des: "麒麟瓜",
    num: 116,
    taglist: [
      {
        tagname: "高血压",
        tagicon: yi,
      },
      {
        tagname: "糖尿病",
        tagicon: ke,
      },
      {
        tagname: "高尿酸血症",
        tagicon: sh,
      },
    ],
  },
];

// ----------------------------------------------------------------------------------------
// 黑白工具
export let classlist = [
  {
    name: "人群",
    titlelsit: [
      { title: "高血压", active: false, disease: "高血压" },
      { title: "糖尿病", active: false, disease: "糖尿病" },
      { title: "慢性肾病", active: false, disease: "慢性肾病" },
      { title: "高血脂", active: false, disease: "高血脂" },
      { title: "高尿酸血症", active: false, disease: "高尿酸血症" },
    ],
  },
  {
    name: "状态",
    titlelsit: [
      { title: "宜吃", active: false, diseaseType: 1 },
      { title: "可吃", active: false, diseaseType: 0 },
      { title: "慎吃", active: false, diseaseType: -1 },
    ],
  },
  {
    name: "食物分类",
    titlelsit: [
      {
        title: "全部",
        category: "",
        active: false,
      },
      {
        title: "五谷杂粮",
        category: "01,02,03",
        active: false,
      },
      {
        title: "蔬菜菌类",
        category: "04,05",
        active: false,
      },
      {
        title: "肉类/蛋类",
        category: "08,09,11",
        active: false,
      },
      {
        title: "水产/海鲜",
        category: "12",
        active: false,
      },

      {
        title: "水果",
        category: "06",
        active: false,
      },
      {
        title: "豆奶制品",
        category: "10",
        active: false,
      },
      {
        title: "坚果",
        category: "07",
        active: false,
      },
      {
        title: "补品/草药",
        category: "99",
        active: false,
      },
    ],
  },
];
// 食材列表
export let foodlist = [
  { icon: yi, iconname: "宜吃", diseaseType: 1, active: false },
  { icon: ke, iconname: "可吃", diseaseType: 0, active: false },
  { icon: sh, iconname: "慎吃", diseaseType: -1, active: false },
];

export let pie0 = {
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["70%", "90%"],
      avoidLabelOverlap: false,
      animation: false,
      label: {
        position: "center",
        alignTo: "none",
        bleedMargin: 5,
      },
      data: [
        {
          value: 10,
          name: "10%",
          itemStyle: { color: "#29AB91" },
        },
        {
          value: 90,
          name: "",
          itemStyle: { color: "#EEEEEE" },
        },
      ],
    },
  ],
};
export let pie1 = {
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["70%", "90%"],
      avoidLabelOverlap: false,
      animation: false,
      label: {
        show: true,
        position: "center",

      },
      data: [
        {
          value: 10,
          name: "10%",
          itemStyle: { color: "#F05A49" },
        },
        {
          value: 90,
          name: "",
          itemStyle: { color: "#EEEEEE" },
        },
      ],
    },
  ],
};
export let pie2 = {
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["70%", "90%"],
      avoidLabelOverlap: false,
      animation: false,
      label: {
        show: true,
        position: "center",
      },
      data: [
        {
          value: 10,
          name: "10%",
          itemStyle: { color: "#2B91E1" },
        },
        {
          value: 90,
          name: "",
          itemStyle: { color: "#EEEEEE" },
        },
      ],
    },
  ],
};

// 营养素列表
export let nutritionlist = [
  {
    title: "基础营养素",
    nutritiontableleft: [
      {
        project: "项目",
        unit: "g",
        many: "每100g",
        style: "#4EBE93",
        titlecolor: "#fff",
      },
      {
        project: "膳食纤维",
        unit: "g",
        many: "16",
        style: "#D5F6DB",
      },
      {
        project: "饱和脂肪",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },

      {
        project: "总胆固醇",
        unit: "g",
        many: "16",
        style: "#D5F6DB",
      },
      {
        project: "反式脂肪",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "蛋白质",
        unit: "g",
        many: "16",
        style: "#D5F6DB",
      },
    ],
    nutritiontableright: [
      {
        project: "项目",
        unit: "g",
        many: "每100g",
        style: "#4EBE93",
        titlecolor: "#fff",
      },
      {
        project: "脂肪",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "单不饱和脂肪",
        unit: "g",
        many: "16",
        style: "#D5F6DB",
      },
      {
        project: "碳水化合物",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "多不饱和脂肪",
        unit: "g",
        many: "16",
        style: "#D5F6DB",
      },
      {
        project: "糖",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
    ],
  },
  {
    title: "基础营养素",
    nutritiontableleft: [
      {
        project: "项目",
        unit: "g",
        many: "每100g",
        style: "#4EBE93",
        titlecolor: "#fff",
      },
      {
        project: "膳食纤维",
        unit: "g",
        many: "16",
        style: "#D5F6DB",
      },
      {
        project: "饱和脂肪",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },

      {
        project: "总胆固醇",
        unit: "g",
        many: "16",
        style: "#D5F6DB",
      },
      {
        project: "反式脂肪",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "蛋白质",
        unit: "g",
        many: "16",
        style: "#D5F6DB",
      },
    ],
    nutritiontableright: [
      {
        project: "项目",
        unit: "g",
        many: "每100g",
        style: "#4EBE93",
        titlecolor: "#fff",
      },
      {
        project: "脂肪",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "单不饱和脂肪",
        unit: "g",
        many: "16",
        style: "#D5F6DB",
      },
      {
        project: "碳水化合物",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "多不饱和脂肪",
        unit: "g",
        many: "16",
        style: "#D5F6DB",
      },
      {
        project: "糖",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
    ],
  },
  {
    title: "矿物质",
    nutritiontableleft: [
      {
        project: "项目",
        unit: "g",
        many: "每100g",
        style: "#4C6DCF",
        titlecolor: "#fff",
      },
      {
        project: "铁",
        unit: "g",
        many: "16",
        style: "#E5ECF4",
      },
      {
        project: "碘",
        unit: "g",
        many: "16",
        style: "#FFF",
      },

      {
        project: "锌",
        unit: "g",
        many: "16",
        style: "#E5ECF4",
      },
      {
        project: "氟",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "钙",
        unit: "g",
        many: "16",
        style: "#E5ECF4",
      },
      {
        project: "磷",
        unit: "g",
        many: "16",
        style: "#fff",
      },
    ],
    nutritiontableright: [
      {
        project: "项目",
        unit: "g",
        many: "每100g",
        style: "#4C6DCF",
        titlecolor: "#fff",
      },
      {
        project: "铜",
        unit: "g",
        many: "16",
        style: "#FFF",
      },
      {
        project: "钾",
        unit: "g",
        many: "16",
        style: "#E5ECF4",
      },
      {
        project: "锰",
        unit: "g",
        many: "16",
        style: "#FFF",
      },
      {
        project: "钠",
        unit: "g",
        many: "16",
        style: "#E5ECF4",
      },
      {
        project: "硒",
        unit: "g",
        many: "16",
        style: "#FFF",
      },
      {
        project: "镁",
        unit: "g",
        many: "16",
        style: "#FFF",
      },
    ],
  },
  {
    title: "维生素",
    nutritiontableleft: [
      {
        project: "项目",
        unit: "g",
        many: "每100g",
        style: "#F97A78",
        titlecolor: "#fff",
      },
      {
        project: "维生素A",
        unit: "g",
        many: "16",
        style: "#F8E4E5",
      },
      {
        project: "维生素D",
        unit: "g",
        many: "16",
        style: "#fff",
      },

      {
        project: "胡萝卜素",
        unit: "g",
        many: "16",
        style: "#F8E4E5",
      },
      {
        project: "烟酸",
        unit: "g",
        many: "16",
        style: "#fff",
      },
      {
        project: "维生素K",
        unit: "g",
        many: "16",
        style: "#F8E4E5",
      },
      {
        project: "叶酸",
        unit: "g",
        many: "16",
        style: "#fff",
      },
      {
        project: "维生素B1",
        unit: "g",
        many: "16",
        style: "#F8E4E5",
      },
    ],
    nutritiontableright: [
      {
        project: "项目",
        unit: "g",
        many: "每100g",
        style: "#F97A78FF",
        titlecolor: "#fff",
      },
      {
        project: "铜",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "钾",
        unit: "g",
        many: "16",
        style: "#F8E4E5",
      },
      {
        project: "锰",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "钠",
        unit: "g",
        many: "16",
        style: "#F8E4E5",
      },
      {
        project: "硒",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "镁",
        unit: "g",
        many: "16",
        style: "#F8E4E5",
      },
    ],
  },
  {
    title: "矿物质",
    nutritiontableleft: [
      {
        project: "项目",
        unit: "g",
        many: "每100g",
        style: "#4C6DCFFF",
        titlecolor: "#fff",
      },
      {
        project: "铁",
        unit: "g",
        many: "16",
        style: "#E5ECF4FF",
      },
      {
        project: "碘",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },

      {
        project: "锌",
        unit: "g",
        many: "16",
        style: "#E5ECF4FF",
      },
      {
        project: "氟",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "钙",
        unit: "g",
        many: "16",
        style: "#E5ECF4FF",
      },
      {
        project: "磷",
        unit: "g",
        many: "16",
        style: "#fff",
      },
    ],
    nutritiontableright: [
      {
        project: "项目",
        unit: "g",
        many: "每100g",
        style: "#4C6DCFFF",
        titlecolor: "#fff",
      },
      {
        project: "铜",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "钾",
        unit: "g",
        many: "16",
        style: "#E5ECF4FF",
      },
      {
        project: "锰",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "钠",
        unit: "g",
        many: "16",
        style: "#E5ECF4FF",
      },
      {
        project: "硒",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "镁",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
    ],
  },
  {
    title: "其他",
    nutritiontableleft: [
      {
        project: "项目",
        unit: "g",
        many: "每100g",
        style: "#333333",
        titlecolor: "#fff",
      },
      {
        project: "维生素A",
        unit: "g",
        many: "16",
        style: "#E8E8E8",
      },
      {
        project: "维生素D",
        unit: "g",
        many: "16",
        style: "#fff",
      },

      {
        project: "胡萝卜素",
        unit: "g",
        many: "16",
        style: "#E8E8E8",
      },
      {
        project: "烟酸",
        unit: "g",
        many: "16",
        style: "#fff",
      },
      {
        project: "维生素K",
        unit: "g",
        many: "16",
        style: "#E8E8E8",
      },
      {
        project: "叶酸",
        unit: "g",
        many: "16",
        style: "#fff",
      },
      {
        project: "维生素B1",
        unit: "g",
        many: "16",
        style: "#E8E8E8",
      },
    ],
    nutritiontableright: [
      {
        project: "项目",
        unit: "g",
        many: "每100g",
        style: "#333333",
        titlecolor: "#fff",
      },
      {
        project: "铜",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "钾",
        unit: "g",
        many: "16",
        style: "#E8E8E8",
      },
      {
        project: "锰",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "钠",
        unit: "g",
        many: "16",
        style: "#E8E8E8",
      },
      {
        project: "硒",
        unit: "g",
        many: "16",
        style: "#FFFFFF",
      },
      {
        project: "镁",
        unit: "g",
        many: "16",
        style: "#E8E8E8",
      },
    ],
  },
];
