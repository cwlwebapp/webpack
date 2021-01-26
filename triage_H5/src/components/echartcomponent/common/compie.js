export let pie_option = {
  color: ["#F05A49", "#2B91E1", "#29AB91"],
  // title: {
  //   show: true,
  //   text: "120%",
  //   x: "center",
  //   y: "center",
  //   textStyle: {
  //     color: "#FFFEFE",
  //     fontSize: 12,
  //   },
  // },
  series: [
    {
      type: "pie",
      radius: "100%",
      center: ["50%", "50%"],
      data: [
        {
          name: "%\n偏高",
          value: 0,
        },
        {
          name: "%\n偏低",
          value: 0,
        },
        {
          name: "%\n正常",
          value: 0,
        },
      ],
      animation: false,
      label: {
        position: "inside",
        alignTo: "none",
        bleedMargin: 5,
      },
    },
  ],
};
