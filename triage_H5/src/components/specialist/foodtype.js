export let foodtype = {
  热量: {
    less: "低体重",
    more: "超重/肥胖",
  },
  蛋白质: {
    less: "肌肉松弛、 大量掉发、免疫力差、情绪低落、睡眠质量差。",
    more: "加重肝肾负担、脱水、痛风、便秘",
  },
  脂肪: {
    less: "湿疹/皮肤粗糙、代谢能力降低、脂溶性维生素缺乏导致眼病、夜盲症、骨质疏松等女性紊乱",
    more: "肥胖、肠癌、脂肪肝、糖尿病",
  },
  总胆固醇: {
    less: "可能影响生育能力影响细胞合成影响胆汁酸、维生素D及甾体激素合成",
    more: "动脉粥样硬化、高胆固醇血症、血栓、肥胖、骨质疏松",
  },

  膳食纤维: {
    less: "便秘、心血管疾病、糖尿病、肥胖、结肠癌",
    more: "反酸、腹胀或腹痛、矿物质缺乏",
  },
  碳水: {
    less: "容易疲倦、口臭、便秘、心悸、体能下降",
    more: "浮肿、长痘、疲劳、大脑迟钝、增加肥胖、2型糖尿病等风险",
  },

  维生素C: {
    less: `	免疫抑制，频繁感染
	牙龈出血、牙齿松动
	肌肉退化和疼痛、抑郁、方向感丧失
	骨骼脆弱，关节疼痛
	小淤血点、皮肤粗糙、斑点伤痕
  伤口不易愈合`,
    more: "",
  },
  维生素B1: {
    less: `	水肿、心脏肿大、心率异常、心率衰竭
	退化、消瘦、虚弱、疼痛、冷漠、烦躁、行走困难、反应能力丧失、精神错乱、麻痹
  厌食症、体重减轻`,
    more: "",
  },
  维生素B2: {
    less: `	嘴角皲裂、舌头光滑紫红，喉咙痛
  对光过敏、角膜发红 皮疹`,
    more: "",
  },

  烟酸: {
    less: `	腹泻、呕吐、腹部疼痛
	黑色或明亮红色肿胀光舌
	易怒、食欲不振、虚弱、头疼、头晕、意思模糊发展为精神病或精神错乱
  暴露于太阳下的部分出现片状皮疹`,
    more: "",
  },
  叶酸: {
    less: `	贫血（大细胞型）
	胃灼热、腹泻、便秘
	压抑、时常发生感染
	光滑红舌
  神经管出生缺陷风险增加，抑郁、意识模糊、疲劳、烦躁、头痛`,
    more: "",
  },
  维生素B12: {
    less: `	贫血（大细胞型）
	光舌
	疲劳、神经退变发展至瘫痪
  过敏`,
    more: "",
  },
  维生素B6: { less: `贫血（小细胞型）抑郁、困惑、脑电波异常、抽搐皮疹、油腻、鳞片状皮炎` },
  泛酸: { less: `呕吐、肠道疾病失眠、疲劳低血糖、对胰岛素敏感性增加` },
  生物素: {
    less: `	心脏活动异常食欲减退、恶心
	抑郁、肌肉疼痛、虚弱、疲劳、四肢麻木
  眼睛、鼻子和口周围发干`,
    more: "",
  },
  胆碱: {
    less: `	导致脂肪肝、动脉硬化，记忆力下降
脂溶性维生素`,
    more: "",
  },
  维生素A: {
    less: `	贫血（小细胞型）
	骨生长停止、关节痛、牙釉质发育受损、牙齿裂缝、龋齿倾向
	腹泻、小肠和其他上皮组织发生病变
	频繁感染
	夜盲症、精神抑郁
	角质化、角膜退化导致失明、皮疹
  肾结石、生长发育受损`,
    more: "",
  },
  维生素D: {
    less: `	生长异常，骨骼畸形（弓形腿），软骨头，关节疼痛，畸形牙
  肌肉痉挛`,
    more: "",
  },
  维生素E: {
    less: `	红细胞破裂，贫血
  神经退化、虚弱、行走困难、腿部抽筋`,
    more: "",
  },
  维生素K: {
    less: `	出血 骨骼矿化减弱`,
    more: "",
  },

  钙: { less: `	儿童发育不良，成人骨质流失`, more: "" },

  磷: { less: `	食欲不振，骨骼疼痛，肌无力，生长发育受损，婴儿佝偻病`, more: "" },
  镁: {
    less: `	低血钙，肌肉痉挛，维生素D代谢受损，癫痫发作，动作怪异、幻觉和吞咽困难、儿童生长迟缓`,
    more: "",
  },
  钠: { less: `	肌肉痉挛，精神冷漠，食欲不振，很少缺乏`, more: "" },
  钾: { less: `	脱水、肌无力、瘫痪及神志不清、死亡`, more: "" },
  氯: { less: `	儿童生长迟缓、肌肉痉挛、精神冷漠、食欲不振、死亡（不常见），很少缺乏`, more: "" },
  硫: { less: `	尚未发现缺乏症，可能会首先出现蛋白质缺乏`, more: "" },
  微量矿物质: { less: `	缺乏症`, more: "" },
  碘: { less: `	甲状腺肿，呆小症，食盐加碘之后很少缺乏`, more: "" },
  铁: {
    less: `	贫血：虚弱、疲劳、皮肤和黏膜苍白、指甲苍白浅凹、头痛、注意力不集中、儿童认知功能受损、耐寒能力下降`,
    more: "",
  },
  锌: { less: `	儿童生长迟缓、皮炎、性功能障碍、味觉丧失，伤口愈合缓慢`, more: "" },
  硒: { less: `	一种以纤维状心脏组织（不常见）为特征的易感性心脏病`, more: "" },
  氟: { less: `	容易造成蛀牙`, more: "" },
  铬: { less: `	葡萄糖代谢异常`, more: "" },
  铜: { less: `	贫血、骨发育异常`, more: "" },
  锰: { less: `	很少缺乏`, more: "" },
  钼: { less: `	很少缺乏`, more: "" },
};
