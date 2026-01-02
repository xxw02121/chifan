import { Recipe } from './types';

export const recipes: Recipe[] = [
  {
    id: 'chicken-mushroom',
    name: '香菇滑鸡腿',
    type: 'protein',
    oil_tsp: 1,
    time_min: 18,
    ingredients: [
      { item: '去骨鸡腿肉', amount: 200, unit: 'g' },
      { item: '香菇', amount: 4, unit: '朵' },
      { item: '姜', amount: 3, unit: '片' },
      { item: '生抽', amount: 1, unit: '汤匙' },
      { item: '蚝油', amount: 0.5, unit: '汤匙' },
      { item: '淀粉', amount: 1, unit: '茶匙' }
    ],
    steps: [
      '鸡腿肉切小块，加生抽、蚝油、淀粉拌匀腌10分钟。',
      '香菇切片、姜切丝备用。',
      '热锅后倒入1茶匙油，姜丝爆香，鸡肉滑炒至表面变色。',
      '放入香菇翻炒，若干水沿锅边少量润锅，盖盖焖3分钟。',
      '开盖大火收汁至微黏，尝味调整后出锅。'
    ],
    tags: ['快手', '嫩滑', '鸡腿']
  },
  {
    id: 'pork-greenpepper',
    name: '青椒里脊丝',
    type: 'protein',
    oil_tsp: 1.2,
    time_min: 15,
    ingredients: [
      { item: '猪里脊', amount: 200, unit: 'g' },
      { item: '青椒', amount: 2, unit: '个' },
      { item: '蒜', amount: 2, unit: '瓣' },
      { item: '生抽', amount: 1, unit: '汤匙' },
      { item: '老抽', amount: 0.3, unit: '汤匙' },
      { item: '淀粉', amount: 1, unit: '茶匙' }
    ],
    steps: [
      '里脊切丝，加生抽、少许老抽、淀粉和一丢丢水抓匀。',
      '青椒切丝，蒜拍碎。',
      '热锅下1茶匙油，蒜末炒香，倒入里脊大火划散。',
      '肉变色后淋0.2茶匙油提香，加入青椒丝翻炒至断生。',
      '尝盐度，微收汁即可出锅，保持青椒脆口。'
    ],
    tags: ['家常', '青椒', '快手']
  },
  {
    id: 'tomato-beef',
    name: '番茄牛肉片',
    type: 'protein',
    oil_tsp: 1.2,
    time_min: 20,
    ingredients: [
      { item: '牛里脊/牛腱片', amount: 180, unit: 'g' },
      { item: '番茄', amount: 2, unit: '个' },
      { item: '洋葱', amount: 0.25, unit: '个' },
      { item: '生抽', amount: 1, unit: '汤匙' },
      { item: '蚝油', amount: 0.5, unit: '汤匙' }
    ],
    steps: [
      '牛肉逆纹切薄片，加生抽、蚝油、一撮糖和少许淀粉腌10分钟。',
      '番茄切块，洋葱切丝。',
      '热锅下1茶匙油，洋葱炒软，倒入牛肉快速划散至变色即盛出。',
      '同锅加0.2茶匙油，番茄翻炒出汁，加少量水煮成酱。',
      '倒回牛肉大火翻匀，微收汁即可，保持牛肉嫩度。'
    ],
    tags: ['番茄', '酸甜', '牛肉']
  },
  {
    id: 'garlic-shrimp',
    name: '蒜香虾仁',
    type: 'protein',
    oil_tsp: 1,
    time_min: 12,
    ingredients: [
      { item: '虾仁', amount: 200, unit: 'g' },
      { item: '蒜', amount: 4, unit: '瓣' },
      { item: '葱', amount: 1, unit: '根' },
      { item: '生抽', amount: 0.5, unit: '汤匙' },
      { item: '白胡椒', amount: 0.25, unit: '茶匙' }
    ],
    steps: [
      '虾仁吸干水，撒白胡椒和一丢丢盐拌匀。',
      '蒜切末、葱切段。',
      '锅热下0.8茶匙油，蒜末小火炒香后放虾仁。',
      '虾仁变粉红立即关小火，淋生抽翻匀，撒葱段出锅。',
      '如果喜欢汁水，可沿锅边淋少量热水再大火收一下。'
    ],
    tags: ['虾仁', '低油', '快手']
  },
  {
    id: 'blackpepper-pork',
    name: '黑椒猪里脊丁',
    type: 'protein',
    oil_tsp: 1.2,
    time_min: 16,
    ingredients: [
      { item: '猪里脊', amount: 220, unit: 'g' },
      { item: '彩椒', amount: 1, unit: '个' },
      { item: '洋葱', amount: 0.25, unit: '个' },
      { item: '黑胡椒碎', amount: 0.5, unit: '茶匙' },
      { item: '生抽', amount: 1, unit: '汤匙' }
    ],
    steps: [
      '里脊切丁，生抽和少许淀粉抓匀腌8分钟。',
      '彩椒、洋葱切块。',
      '热锅下1茶匙油，肉丁翻炒至微焦盛出。',
      '同锅加0.2茶匙油，彩椒洋葱断生。',
      '倒回肉丁撒黑胡椒，大火翻匀出锅，留脆嫩口感。'
    ],
    tags: ['黑胡椒', '彩椒', '脆嫩']
  },
  {
    id: 'soy-fish',
    name: '豆豉蒸鱼柳',
    type: 'protein',
    oil_tsp: 0.8,
    time_min: 14,
    ingredients: [
      { item: '白身鱼柳', amount: 220, unit: 'g' },
      { item: '豆豉', amount: 1, unit: '汤匙' },
      { item: '姜', amount: 3, unit: '片' },
      { item: '葱', amount: 1, unit: '根' }
    ],
    steps: [
      '鱼柳改刀，加少许盐胡椒抓匀。',
      '姜丝、葱段铺底，鱼放上，撒豆豉。',
      '锅里水开后蒸8-10分钟。',
      '取出淋0.8茶匙热油激香豆豉即可。',
      '不喜欢淋油可直接吃，更清爽。'
    ],
    tags: ['清淡', '蒸', '鱼']
  },
  {
    id: 'mapo-tofu',
    name: '家常麻婆豆腐（减油版）',
    type: 'protein',
    oil_tsp: 1.1,
    time_min: 18,
    ingredients: [
      { item: '北豆腐', amount: 300, unit: 'g' },
      { item: '猪肉末', amount: 80, unit: 'g' },
      { item: '郫县豆瓣', amount: 1, unit: '汤匙' },
      { item: '蒜', amount: 2, unit: '瓣' },
      { item: '花椒粉', amount: 0.25, unit: '茶匙' }
    ],
    steps: [
      '豆腐切丁，热水焯1分钟去豆腥。',
      '锅下1茶匙油炒香蒜末和豆瓣，放肉末炒散。',
      '加入少量开水或高汤，倒入豆腐小火煮4分钟。',
      '淀粉水勾薄芡，撒花椒粉，淋0.1茶匙油提香。',
      '尝味咸度，出锅撒葱花即可。'
    ],
    tags: ['豆腐', '下饭', '微辣']
  },
  {
    id: 'cumin-lamb',
    name: '孜然小炒羊肉',
    type: 'protein',
    oil_tsp: 1.2,
    time_min: 17,
    ingredients: [
      { item: '羊肉片', amount: 200, unit: 'g' },
      { item: '洋葱', amount: 0.25, unit: '个' },
      { item: '青椒', amount: 1, unit: '个' },
      { item: '孜然粉', amount: 0.5, unit: '茶匙' },
      { item: '生抽', amount: 0.5, unit: '汤匙' }
    ],
    steps: [
      '羊肉片撒生抽、孜然粉抓匀。',
      '洋葱、青椒切丝。',
      '热锅下1茶匙油，羊肉大火炒散至变色盛出。',
      '同锅下0.2茶匙油，炒香洋葱青椒。',
      '回锅羊肉，快速翻匀收干水分即可。'
    ],
    tags: ['孜然', '快手', '羊肉']
  },
  {
    id: 'ginger-chicken',
    name: '姜葱鸡腿丁',
    type: 'protein',
    oil_tsp: 1,
    time_min: 16,
    ingredients: [
      { item: '去骨鸡腿肉', amount: 220, unit: 'g' },
      { item: '姜', amount: 4, unit: '片' },
      { item: '葱', amount: 1, unit: '根' },
      { item: '生抽', amount: 1, unit: '汤匙' },
      { item: '黄酒', amount: 0.5, unit: '汤匙' }
    ],
    steps: [
      '鸡腿肉切丁，生抽和黄酒腌10分钟。',
      '姜切丝，葱切段。',
      '热锅倒1茶匙油，姜丝小火煸香。',
      '下鸡肉丁大火翻炒至出油后加葱段。',
      '翻匀收汁，咸淡适中即可出锅。'
    ],
    tags: ['鸡腿', '姜葱', '快手']
  },
  {
    id: 'pepper-shredded-beef',
    name: '彩椒炒牛柳',
    type: 'protein',
    oil_tsp: 1.1,
    time_min: 15,
    ingredients: [
      { item: '牛里脊', amount: 200, unit: 'g' },
      { item: '彩椒', amount: 1, unit: '个' },
      { item: '蒜', amount: 2, unit: '瓣' },
      { item: '黑胡椒碎', amount: 0.5, unit: '茶匙' },
      { item: '生抽', amount: 0.8, unit: '汤匙' }
    ],
    steps: [
      '牛肉切条，生抽、黑胡椒和淀粉抓腌。',
      '彩椒切条，蒜拍碎。',
      '热锅下1茶匙油，蒜末炒香后放牛柳，快速划散。',
      '牛柳变色即加入彩椒，翻炒30秒断生。',
      '淋0.1茶匙油提香，尝味出锅，保持牛柳嫩。'
    ],
    tags: ['牛肉', '彩椒', '下饭']
  },
  {
    id: 'pan-fry-saumon',
    name: '香煎三文鱼',
    type: 'protein',
    oil_tsp: 1,
    time_min: 12,
    ingredients: [
      { item: '三文鱼排', amount: 200, unit: 'g' },
      { item: '柠檬', amount: 1, unit: '片' },
      { item: '黑胡椒', amount: 0.25, unit: '茶匙' },
      { item: '盐', amount: 0.25, unit: '茶匙' }
    ],
    steps: [
      '三文鱼排抹盐和黑胡椒，室温静置5分钟。',
      '不粘锅中火，下1茶匙油推匀。',
      '鱼排皮面朝下煎4分钟，转另一面再煎2-3分钟。',
      '关火挤柠檬汁，静置30秒锁汁后装盘。',
      '配少量现磨黑胡椒即可。'
    ],
    tags: ['鱼', '低碳', '快煎']
  },
  {
    id: 'kungpao-chicken',
    name: '简易宫保鸡丁（少油版）',
    type: 'protein',
    oil_tsp: 1.2,
    time_min: 20,
    ingredients: [
      { item: '去骨鸡腿肉', amount: 220, unit: 'g' },
      { item: '花生米', amount: 30, unit: 'g' },
      { item: '干辣椒', amount: 4, unit: '个' },
      { item: '蒜', amount: 2, unit: '瓣' },
      { item: '生抽', amount: 1, unit: '汤匙' },
      { item: '陈醋', amount: 0.5, unit: '汤匙' }
    ],
    steps: [
      '鸡腿丁加生抽、少许糖和淀粉腌10分钟。',
      '干辣椒剪段，蒜切片，花生提前炒香备用。',
      '锅热下1茶匙油，小火煸香辣椒蒜片。',
      '转大火下鸡丁翻炒至熟，沿锅边淋少许水，调入生抽和陈醋。',
      '收汁后撒花生米，淋0.2茶匙油翻匀出锅。'
    ],
    tags: ['鸡丁', '微辣', '花生']
  },
  {
    id: 'soy-braised-pork',
    name: '快手酱爆肉片',
    type: 'protein',
    oil_tsp: 1.1,
    time_min: 14,
    ingredients: [
      { item: '前腿肉/梅花肉', amount: 200, unit: 'g' },
      { item: '洋葱', amount: 0.25, unit: '个' },
      { item: '甜面酱', amount: 1, unit: '汤匙' },
      { item: '生抽', amount: 0.5, unit: '汤匙' }
    ],
    steps: [
      '肉切薄片，生抽、少许淀粉抓匀。',
      '洋葱切丝。甜面酱加少量清水调开备用。',
      '锅热下1茶匙油，肉片滑炒至变色。',
      '倒入酱汁和洋葱，大火翻炒到酱汁包裹肉片。',
      '淋0.1茶匙油提香，收汁即可。'
    ],
    tags: ['酱香', '快手', '猪肉']
  },
  {
    id: 'garlic-eggplant',
    name: '蒜香肉末茄丁',
    type: 'protein',
    oil_tsp: 1.2,
    time_min: 18,
    ingredients: [
      { item: '紫茄子', amount: 1, unit: '根' },
      { item: '猪肉末', amount: 100, unit: 'g' },
      { item: '蒜', amount: 3, unit: '瓣' },
      { item: '生抽', amount: 1, unit: '汤匙' },
      { item: '醋', amount: 0.5, unit: '汤匙' }
    ],
    steps: [
      '茄子切丁，微波炉叮2分钟或蒸软省油。',
      '锅热下0.8茶匙油，蒜末和肉末炒香炒散。',
      '下茄丁翻炒，沿锅边淋少量水，加入生抽和醋。',
      '盖盖焖3分钟，开盖收汁。',
      '淋0.4茶匙油提香，尝味出锅。'
    ],
    tags: ['茄子', '肉末', '减油']
  },
  {
    id: 'homestyle-pork-belly',
    name: '家常回锅肉（薄片轻油版）',
    type: 'protein',
    oil_tsp: 1.2,
    time_min: 20,
    ingredients: [
      { item: '五花肉', amount: 180, unit: 'g' },
      { item: '青蒜/蒜苗', amount: 1, unit: '根' },
      { item: '郫县豆瓣', amount: 1, unit: '汤匙' },
      { item: '豆豉', amount: 0.5, unit: '汤匙' }
    ],
    steps: [
      '五花肉冷水下锅煮8分钟，晾凉切薄片。',
      '锅不放油，小火煸出五花肉自带油。',
      '加入豆瓣、豆豉炒红油，视情况补0.6茶匙油。',
      '放青蒜大火翻炒10秒出锅，保持脆嫩。',
      '咸度够就不必再加盐，避免过咸。'
    ],
    tags: ['川味', '豆瓣', '五花肉']
  },
  {
    id: 'stirfried-egg-tomato',
    name: '番茄炒蛋',
    type: 'protein',
    oil_tsp: 1,
    time_min: 12,
    ingredients: [
      { item: '鸡蛋', amount: 3, unit: '个' },
      { item: '番茄', amount: 2, unit: '个' },
      { item: '葱', amount: 1, unit: '根' },
      { item: '盐', amount: 0.5, unit: '茶匙' }
    ],
    steps: [
      '鸡蛋打散，加一小撮盐。番茄切块，葱切末。',
      '锅中下0.6茶匙油，倒蛋液中火炒成大块盛出。',
      '同锅补0.4茶匙油，番茄翻炒出汁。',
      '把鸡蛋倒回去翻匀，尝味调整，撒葱花出锅。',
      '想多汁可加一点点水淀粉收汁。'
    ],
    tags: ['家常', '番茄', '鸡蛋']
  },

  // 素菜
  {
    id: 'garlic-lettuce',
    name: '蒜蓉生菜',
    type: 'veg',
    oil_tsp: 0.6,
    time_min: 8,
    ingredients: [
      { item: '生菜/油麦菜', amount: 250, unit: 'g' },
      { item: '蒜', amount: 3, unit: '瓣' },
      { item: '生抽', amount: 0.5, unit: '汤匙' }
    ],
    steps: [
      '蒜切末，生菜洗净沥干。',
      '锅热下0.6茶匙油，蒜末小火爆香。',
      '转大火下生菜快速翻炒，淋生抽。',
      '断生立刻出锅，保持清脆。',
      '若出水多，可大火收几秒。'
    ],
    tags: ['清爽', '快手', '生菜']
  },
  {
    id: 'broccoli-garlic',
    name: '清炒西兰花',
    type: 'veg',
    oil_tsp: 0.8,
    time_min: 10,
    ingredients: [
      { item: '西兰花', amount: 250, unit: 'g' },
      { item: '蒜', amount: 3, unit: '瓣' },
      { item: '盐', amount: 0.3, unit: '茶匙' }
    ],
    steps: [
      '西兰花掰小朵，热水焯1分钟捞出。',
      '锅热下0.8茶匙油，蒜末炒香。',
      '下西兰花翻炒，加一丢丢盐。',
      '淋少量水焖30秒，保持翠绿。',
      '大火收干水分即可。'
    ],
    tags: ['西兰花', '蒜香', '低油']
  },
  {
    id: 'tomato-cabbage',
    name: '番茄包菜',
    type: 'veg',
    oil_tsp: 0.8,
    time_min: 12,
    ingredients: [
      { item: '圆白菜', amount: 300, unit: 'g' },
      { item: '番茄', amount: 1, unit: '个' },
      { item: '蒜', amount: 2, unit: '瓣' }
    ],
    steps: [
      '包菜手撕块，番茄切丁，蒜拍碎。',
      '锅热下0.6茶匙油炒蒜末出香。',
      '加入番茄炒出汁，再下包菜。',
      '翻炒1-2分钟断生，补0.2茶匙油提香。',
      '尝咸度即可出锅。'
    ],
    tags: ['包菜', '番茄', '清爽']
  },
  {
    id: 'mushroom-snowpea',
    name: '香菇荷兰豆',
    type: 'veg',
    oil_tsp: 0.9,
    time_min: 10,
    ingredients: [
      { item: '荷兰豆', amount: 200, unit: 'g' },
      { item: '香菇', amount: 4, unit: '朵' },
      { item: '蒜', amount: 2, unit: '瓣' }
    ],
    steps: [
      '荷兰豆去筋，香菇切片。',
      '锅热下0.7茶匙油，蒜末炒香。',
      '下香菇翻炒出香气，再放荷兰豆。',
      '大火翻炒1分钟，撒少许盐，淋0.2茶匙油亮色即可。',
      '保持脆嫩口感为佳。'
    ],
    tags: ['香菇', '荷兰豆', '脆嫩']
  },
  {
    id: 'potato-strips',
    name: '醋溜土豆丝',
    type: 'veg',
    oil_tsp: 0.8,
    time_min: 10,
    ingredients: [
      { item: '土豆', amount: 250, unit: 'g' },
      { item: '青椒', amount: 0.5, unit: '个' },
      { item: '醋', amount: 0.8, unit: '汤匙' }
    ],
    steps: [
      '土豆切丝泡水去淀粉，青椒切丝。',
      '锅热下0.6茶匙油，放土豆丝大火快炒。',
      '加入青椒丝，淋醋翻炒均匀。',
      '再补0.2茶匙油提香，保持脆感。',
      '少量盐调味即可。'
    ],
    tags: ['酸香', '脆口', '快手']
  },
  {
    id: 'carrot-egg',
    name: '胡萝卜炒蛋',
    type: 'veg',
    oil_tsp: 0.9,
    time_min: 11,
    ingredients: [
      { item: '胡萝卜', amount: 200, unit: 'g' },
      { item: '鸡蛋', amount: 2, unit: '个' },
      { item: '葱', amount: 1, unit: '根' }
    ],
    steps: [
      '胡萝卜切薄片或细丝。鸡蛋打散。',
      '锅下0.5茶匙油炒蛋成块盛出。',
      '同锅补0.4茶匙油，胡萝卜翻炒至变软。',
      '倒回鸡蛋，撒葱花翻匀。',
      '根据口味加盐即可。'
    ],
    tags: ['胡萝卜', '家常', '甜脆']
  },
  {
    id: 'eggplant-greenpepper',
    name: '青椒炒茄子',
    type: 'veg',
    oil_tsp: 1,
    time_min: 14,
    ingredients: [
      { item: '紫茄子', amount: 1, unit: '根' },
      { item: '青椒', amount: 1, unit: '个' },
      { item: '蒜', amount: 2, unit: '瓣' }
    ],
    steps: [
      '茄子切条微波2分钟或蒸软，省油。',
      '锅热下0.8茶匙油，蒜末炒香，放茄子翻炒。',
      '加青椒条继续翻炒，淋少量生抽。',
      '补0.2茶匙油提香，大火收汁。',
      '尝味出锅，保持微湿润口感。'
    ],
    tags: ['茄子', '青椒', '减油']
  },
  {
    id: 'cucumber-wood-ear',
    name: '木耳拌黄瓜',
    type: 'veg',
    oil_tsp: 0.5,
    time_min: 8,
    ingredients: [
      { item: '黄瓜', amount: 1, unit: '根' },
      { item: '木耳', amount: 80, unit: 'g' },
      { item: '蒜', amount: 2, unit: '瓣' },
      { item: '香醋', amount: 0.5, unit: '汤匙' }
    ],
    steps: [
      '木耳泡发焯水，黄瓜拍碎切段，蒜拍成蒜泥。',
      '少许盐和香醋调和，加入蒜泥。',
      '淋0.5茶匙热油激香蒜泥，拌入木耳黄瓜。',
      '静置2分钟入味即可。',
      '夏天可冷藏一会儿更脆爽。'
    ],
    tags: ['凉拌', '低油', '爽脆']
  },
  {
    id: 'stirfry-cabbage',
    name: '蒜香手撕包菜',
    type: 'veg',
    oil_tsp: 0.8,
    time_min: 9,
    ingredients: [
      { item: '圆白菜', amount: 280, unit: 'g' },
      { item: '蒜', amount: 2, unit: '瓣' },
      { item: '酱油', amount: 0.5, unit: '汤匙' }
    ],
    steps: [
      '包菜手撕块，蒜切片。',
      '热锅下0.6茶匙油，蒜片炒香。',
      '下包菜大火快炒，淋酱油。',
      '补0.2茶匙油翻匀，保持脆嫩。',
      '出锅前尝味调整。'
    ],
    tags: ['包菜', '蒜香', '快手']
  },
  {
    id: 'tomato-tofu',
    name: '番茄烧豆腐',
    type: 'veg',
    oil_tsp: 0.9,
    time_min: 14,
    ingredients: [
      { item: '嫩豆腐', amount: 300, unit: 'g' },
      { item: '番茄', amount: 2, unit: '个' },
      { item: '葱', amount: 1, unit: '根' }
    ],
    steps: [
      '豆腐切块，番茄切丁。',
      '锅下0.6茶匙油炒番茄成酱，加少量水。',
      '放入豆腐轻推，煮4分钟入味。',
      '淋0.3茶匙油提香，撒葱花。',
      '汤汁微收即可。'
    ],
    tags: ['番茄', '豆腐', '软嫩']
  },
  {
    id: 'bokchoy-oyster',
    name: '蚝油小白菜',
    type: 'veg',
    oil_tsp: 0.7,
    time_min: 9,
    ingredients: [
      { item: '小白菜', amount: 250, unit: 'g' },
      { item: '蒜', amount: 2, unit: '瓣' },
      { item: '蚝油', amount: 0.5, unit: '汤匙' }
    ],
    steps: [
      '小白菜洗净切段，蒜拍碎。',
      '锅热下0.6茶匙油，蒜末爆香。',
      '下小白菜大火快炒，淋蚝油。',
      '翻匀后补0.1茶匙油亮色，出锅。',
      '保持清脆口感。'
    ],
    tags: ['蚝油', '绿叶', '快炒']
  },
  {
    id: 'stirfry-kelp',
    name: '蒜香海带丝',
    type: 'veg',
    oil_tsp: 0.7,
    time_min: 10,
    ingredients: [
      { item: '海带丝', amount: 200, unit: 'g' },
      { item: '蒜', amount: 3, unit: '瓣' },
      { item: '米醋', amount: 0.5, unit: '汤匙' }
    ],
    steps: [
      '海带丝洗净焯水1分钟。',
      '锅热下0.7茶匙油，蒜末炒香。',
      '下海带丝翻炒，淋米醋。',
      '大火翻匀，少量盐调味即可。',
      '保持爽脆为佳。'
    ],
    tags: ['海带', '蒜香', '爽口']
  },
  {
    id: 'stirfry-mushroom',
    name: '小炒香菇胡萝卜',
    type: 'veg',
    oil_tsp: 0.8,
    time_min: 12,
    ingredients: [
      { item: '香菇', amount: 5, unit: '朵' },
      { item: '胡萝卜', amount: 120, unit: 'g' },
      { item: '蒜', amount: 2, unit: '瓣' }
    ],
    steps: [
      '香菇切片，胡萝卜切薄片。',
      '锅热下0.6茶匙油，蒜末炒香。',
      '放香菇胡萝卜翻炒，淋少量水润锅。',
      '补0.2茶匙油提香，炒至胡萝卜软脆即可。',
      '根据口味加盐。'
    ],
    tags: ['香菇', '胡萝卜', '快手']
  },
  {
    id: 'stirfry-corn-pea',
    name: '清甜玉米青豆',
    type: 'veg',
    oil_tsp: 0.6,
    time_min: 9,
    ingredients: [
      { item: '甜玉米粒', amount: 150, unit: 'g' },
      { item: '青豆', amount: 100, unit: 'g' },
      { item: '黄油或植物油', amount: 0.6, unit: '茶匙' }
    ],
    steps: [
      '冷冻玉米和青豆提前解冻。',
      '锅热下0.6茶匙油，倒入青豆玉米翻炒。',
      '加一撮盐和白胡椒，保持微脆。',
      '不用额外放油，关火即可。',
      '喜欢奶香可用黄油同量替代。'
    ],
    tags: ['清甜', '配色', '低油']
  }
];

export const proteinRecipes = recipes.filter(r => r.type === 'protein');
export const vegRecipes = recipes.filter(r => r.type === 'veg');

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find(r => r.id === id);
}
