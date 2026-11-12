/* Plain-language notes for APIs that appear in runnable course examples. */
window.CodeNotes = {
  symbols: {
    print: "把值显示到终端或输出区；它负责展示，不负责把结果交给下一段程序。",
    input: "读取一行输入并返回字符串；要做数字运算时通常还要用 int() 或 float() 转换。",
    len: "返回容器或字符串中元素的数量。",
    range: "生成一段整数序列，常用于固定次数循环；终点不包含在结果中。",
    type: "查看对象的类型。",
    int: "把可转换的值变成整数；例如 int(\"12\") 得到 12。",
    float: "把可转换的值变成浮点数。",
    str: "把值转换成字符串。",
    bool: "把值转换成 True 或 False。",
    list: "创建列表，或把可迭代对象转换成列表。",
    tuple: "创建元组，或把可迭代对象转换成元组。",
    dict: "创建字典，或把键值对转换成字典。",
    set: "创建只保留不重复元素的集合。",
    sorted: "返回一个新的、已排序的列表；原序列不因此改变。",
    sum: "把一组数相加。",
    min: "取得最小值。",
    max: "取得最大值。",
    abs: "取得绝对值。",
    round: "按指定小数位数进行四舍五入式的数值舍入。",
    enumerate: "遍历时同时给出编号和元素，默认编号从 0 开始。",
    zip: "把多个序列中相同位置的元素配成组，遇到最短序列结束。",
    all: "检查所有元素是否都为真值。",
    any: "检查是否至少有一个元素为真值。",
    isinstance: "检查对象是否属于指定类型。",
    next: "从迭代器中取出下一个值。",
    iter: "取得对象的迭代器，供逐项读取。",
    open: "打开文件；配合 with 使用可在代码块结束时自动关闭。",
    append: "把一个元素原地加到列表末尾。",
    extend: "把另一组元素逐个加到列表末尾。",
    insert: "把元素插入列表的指定位置。",
    remove: "从列表删除第一个与给定值相等的元素。",
    pop: "删除并返回列表中指定位置的元素；省略位置时通常取末尾。",
    clear: "清空容器中的内容。",
    copy: "创建浅拷贝；只复制最外层容器，嵌套对象可能仍共享。",
    get: "从字典按键取值；键不存在时可以返回备用值，避免 KeyError。",
    items: "逐对提供字典中的键和值。",
    keys: "提供字典中的所有键。",
    values: "提供字典中的所有值。",
    lower: "返回小写形式的新字符串。",
    strip: "返回去掉两端空白后的新字符串。",
    split: "按分隔规则把字符串拆成列表；默认按空白拆分。",
    join: "用当前字符串作为分隔符，把多个字符串连接起来。",
    replace: "返回把指定旧文本替换后的新字符串。",
    count: "统计某个值或子串出现的次数。",
    resolve: "把路径整理成绝对路径，并解析可确定的路径部分。",
    cwd: "返回当前工作目录，也就是进程运行时所在的目录。",
    mkdir: "创建目录；parents=True 可连同缺少的上级目录一起创建。",
    read_text: "读取文件内容并返回字符串。",
    write_text: "把字符串写入文件；具体覆盖或追加行为取决于调用方式。",
    dumps: "把 Python 数据转换成 JSON 字符串。",
    loads: "把 JSON 字符串解析成 Python 数据。",
    read_csv: "用 pandas 读取 CSV 文件并得到 DataFrame 表格。",
    DataFrame: "创建 pandas 二维表格对象。",
    groupby: "按一列或多列分组，为每组分别统计。",
    drop_duplicates: "返回去掉重复行后的表格。",
    array: "创建 NumPy 数组；数组适合对整组数值进行向量化计算。",
    arange: "按步长生成 NumPy 数值序列。",
    zeros: "创建元素全为 0 的数组或张量。",
    ones: "创建元素全为 1 的数组或张量。",
    reshape: "改变数组或张量的形状，元素总数通常必须保持一致。",
    transpose: "交换数组或张量的维度顺序。",
    sqrt: "逐元素计算平方根（NumPy）或相应数学运算。",
    exp: "逐元素计算自然指数。",
    log: "逐元素计算自然对数。",
    allclose: "检查两个数组的数值是否在容差范围内近似相等。",
    argsort: "返回能把数值排序的下标顺序。",
    argmax: "返回最大值所在的位置。",
    fit: "让模型或处理器从训练数据中学习参数或规则。",
    transform: "应用已经学好的规则转换数据，不在此步骤重新学习规则。",
    predict: "让已经训练好的模型对输入数据给出预测。",
    train_test_split: "把样本分成训练部分和测试部分。",
    StandardScaler: "按训练数据的均值和标准差缩放数值特征。",
    Pipeline: "把预处理和模型按顺序连接，避免训练与预测流程分叉。",
    DataLoader: "把数据集按批次提供给训练循环，可按设置打乱样本。",
    TensorDataset: "把若干个长度相同的张量按样本位置组合成数据集。",
    tensor: "创建 PyTorch 张量；张量是可参与自动求导和设备加速的多维数值对象。",
    Linear: "创建全连接线性层，执行输入乘权重再加偏置。",
    ReLU: "逐元素把负数变为 0 的激活函数。",
    Dropout: "训练时随机屏蔽部分输出以减少过拟合；评估时应关闭这种随机屏蔽。",
    MSELoss: "创建均方误差损失，常用于回归预测。",
    CrossEntropyLoss: "创建分类常用损失；通常接收原始 logits 和类别编号，不先手动做 softmax。",
    backward: "沿自动微分记录的计算关系计算梯度；它本身不更新参数。",
    zero_grad: "清除或重置已有梯度，避免它们意外累积到下一步。",
    step: "让优化器根据当前梯度更新参数。",
    no_grad: "暂时关闭梯度跟踪，常用于手动更新参数或不训练的预测计算。",
    inference_mode: "在推理时关闭自动求导并减少相关开销的上下文管理器。",
    eval: "把模型切换到评估状态，例如关闭 Dropout；不等于计算评价分数。",
    state_dict: "取得 PyTorch 模型可保存的参数状态字典。",
    load_state_dict: "把已保存的参数状态装回模型。",
    from_pretrained: "从模型库或本地目录加载预训练模型/tokenizer；具体下载内容由所用类决定。",
    apply_chat_template: "按模型指定的格式把角色消息整理为模型输入。",
    generate: "根据输入和生成参数逐步产生新词元。",
    encode: "把文本转换成词元编号；具体行为取决于所调用的 tokenizer 或编码器。",
    decode: "把词元编号还原为可读文本。",
    SentenceTransformer: "加载句向量模型，用来把文本编码为可比较的稠密向量。",
    connect: "建立到数据库或服务的连接；参数指定连接目标和配置。",
    execute: "执行一条 SQL 或其他命令；SQL 中的数据值应使用参数传入。",
    executemany: "把同一条参数化 SQL 对多组数据重复执行。",
    fetchone: "从查询结果中取一行；没有更多结果时返回 None。",
    commit: "提交当前数据库事务，让其中的修改正式生效。",
    rollback: "撤销当前尚未提交的事务修改。",
    FastAPI: "创建 FastAPI 应用对象；路由函数会注册到这个应用上。",
    Field: "声明并约束数据模型字段，例如最小长度或数值范围。",
    post: "把处理函数注册为接受 HTTP POST 请求的路由。",
    urlopen: "向网址发起请求并取得响应；需检查状态与响应内容。",
    savefig: "把 Matplotlib 图表保存为图像文件。",
    subplots: "创建图表画布和坐标区域。",
    set_title: "设置图表标题。",
    set_ylabel: "设置纵轴说明文字。",
    make_pipeline: "按顺序创建包含预处理和估计器的 scikit-learn 流水线。",
    classification_report: "汇总分类任务的 precision、recall、F1 等指标。",
    confusion_matrix: "统计真实类别与预测类别的对应数量。",
    KMeans: "创建按距离把样本分组的 K 均值聚类模型。",
    PCA: "创建主成分分析器，用较少的新维度概括数据变化。",
    AdamW: "创建常用的梯度优化器；step() 时按梯度和配置更新参数。",
    get_peft_model: "把参数高效微调配置应用到已有模型，返回可训练适配模型。",
    LoraConfig: "设置 LoRA 适配器的秩、作用层等微调参数。",
    Path: "创建 pathlib 的路径对象；可用它组合、检查、读取和写入文件路径。",
    Counter: "创建计数器，常用于统计每个词或类别出现的次数。",
    ValueError: "表示值的类型可以接受，但具体内容不合适，例如把非数字文字转换为整数。",
    SGD: "创建随机梯度下降优化器，按学习率和梯度更新模型参数。",
    Sequential: "按顺序把多个 PyTorch 网络层串成一个模型。",
    StringIO: "在内存中模拟一个文本文件，便于把字符串交给文件读取接口。",
    Request: "表示一次 HTTP 请求；具体字段取决于所使用的服务框架。",
    CountRequest: "本课定义的 Pydantic 请求模型，用于验证 /count 接口收到的 text 字段。",
    Document: "本课中的文档记录对象，通常保存原文、来源和元数据。",
    Reader: "本课定义的读取器对象；查看它的类定义可以确认它从哪里读数据。",
    Notebook: "本课示例里的笔记本对象；实际字段与行为由该类的定义决定。",
    Classifier: "本课定义或配置的分类模型；查看初始化与 fit() 代码了解其输入输出。",
    bar: "在 Matplotlib 坐标区域绘制柱状图。",
    basicConfig: "设置 Python logging 的基础日志等级和输出格式。",
    info: "写一条普通信息级别的日志，通常用于记录程序进度。",
    close: "关闭已经打开的文件、连接或资源；具体对象应与打开它的对象对应。",
    item: "把只含一个数值的 PyTorch 张量取成普通 Python 数字，常用于显示或记录。",
    detach: "返回与当前计算图断开的张量视图；后续运算不会通过它继续求梯度。",
    isclose: "检查两个浮点数是否在给定误差范围内近似相等。",
    isdisjoint: "检查两个集合是否没有共同元素。",
    isna: "检查 pandas 数据是否为缺失值，返回对应布尔结果。",
    notna: "检查 pandas 数据是否不是缺失值，返回对应布尔结果。",
    merge: "按键列把两个 pandas 表格关联起来，类似数据库 JOIN。",
    manual_seed: "固定随机数种子，帮助重复得到相同的随机序列。",
    softmax: "把一组分数转换为总和为 1 的权重或概率；维度参数决定在哪一行计算。",
    sort: "原地排序列表；与 sorted() 返回新列表不同。",
    super: "取得父类实现，常用于子类初始化时调用父类的 __init__。",
    tanh: "双曲正切激活函数，把数值压到 -1 到 1 之间。",
    tight_layout: "自动调整 Matplotlib 子图边距，减少标题、轴标签被裁切。",
    tolist: "把 NumPy 数组或张量转换成嵌套的 Python 列表。",
    train: "把 PyTorch 模型切换到训练状态，例如启用 Dropout；不等于开始完整训练循环。",
    read: "从文件或流中读取内容；读取数量由对象和传入参数决定。",
    write: "把文本或数据写到文件或流中；是否覆盖由打开方式决定。",
    save: "把对象或图表保存到文件；具体格式取决于调用者。",
    load: "从文件或来源读取对象；使用 pickle 等不可信输入可能执行危险代码。",
    cross_entropy: "根据 logits 与正确类别计算交叉熵损失。",
    mse_loss: "计算预测值与目标值的均方误差。",
    equal: "逐元素比较两个张量是否相等，结果通常是布尔张量。",
    parameters: "迭代提供模型中可训练的参数，常传给优化器。",
    is_dir: "检查路径是否指向已存在的目录。",
    to_csv: "把 pandas 表格保存为 CSV 文件。",
    add_argument: "给命令行解析器登记一个可接受的选项或位置参数。",
    parse_args: "读取命令行实际输入，并生成带有对应属性的参数对象。",
    set_num_threads: "设置 PyTorch CPU 运算使用的线程数。",
    send_response: "设置 HTTP 响应状态码。",
    send_header: "向 HTTP 响应添加一个头字段。",
    end_headers: "结束 HTTP 响应头，接下来可以发送响应正文。",
    send_error: "向 HTTP 客户端返回一个错误状态及说明。",
    serve_forever: "持续运行 HTTP 服务，循环接收并处理请求。",
    cosine: "计算向量夹角的余弦相似度；需确认两向量的维度与归一化约定。",
    get_header: "从 HTTP 请求中读取指定头字段。",
    count_words: "本课前面定义的词频统计函数；传入文本，返回词到次数的字典。",
    select_words: "本课定义的筛选函数；查看参数与 return 行可确认筛选条件和返回值。",
    total_minutes: "本课定义的函数；查看函数体可确认它怎样合计传入的分钟数。",
    answer_from_hits: "本课定义的回答组装函数；检查命中的文档如何进入回答。",
    clean: "本课定义的数据清理函数；查看其输入输出和正文说明，不要假定清理规则通用。",
    average: "本课定义的平均值计算函数；查看它如何处理空数据和分母。",
    demo_predict: "本课演示模型预测函数；当前示例是否真实训练需看函数内部实现。",
    parse_output: "本课定义的解析函数；查看它怎样验证并提取模型输出字段。",
    get_total: "本课示例函数；返回值由它的函数体决定。",
    count_lines: "本课定义的行数统计函数；查看它对空文本和换行符的处理。",
    count_items: "本课定义的计数函数；查看返回值与输入数据的对应关系。",
    show_total: "本课定义的展示函数；它负责输出，不一定返回计算结果。",
    total: "本例中的名称；若它带括号被调用，请先找到对应定义或导入。",
    model: "本例中的模型对象；调用含义取决于它的类型以及前面的模型定义。",
    tokenizer: "本例中的分词器对象；调用前查看它的加载来源和词元/编号约定。",
    loss: "本例中的损失值或损失函数；查看它如何由预测和目标计算。",
    loss_fn: "通常表示损失函数；查看初始化处以确认使用的是哪种损失。",
    steps: "本例中的步骤函数或变量；需要结合定义位置确认其含义。",
    runs: "本例中的运行记录或函数；先查看定义，再确认其返回结构。",
    restored: "本例中的恢复后对象；检查前面的加载语句确认恢复了什么。",
    collect: "本课定义的收集函数；查看函数体确认如何保存遍历结果。",
    announce: "本课定义的说明函数；查看函数体确认它打印或返回什么。",
    fn: "函数参数名；调用 fn() 时执行的是调用者传进来的那个函数。",
    Note: "本课定义的记录类；括号中的值会传给它的初始化方法，查看类定义可知各参数代表什么。",
    Notes: "本课定义的记录集合类；创建它会运行其初始化方法，方法内容决定保存哪些记录。",
    linear: "本例模型中的线性层；调用时对输入执行权重变换和偏置相加。",
    label: "本课示例对象的方法；根据类定义返回该对象保存的标签。"
  },
  explainLine(line, definedNames, classNames = new Set()) {
    const text = line.trim();
    if (!text) return "空行只用于分隔代码块，帮助看清逻辑段落。";
    if (text.startsWith("#")) return "注释：给读者看的说明，Python 执行时会忽略这一行。";
    if (text.startsWith("@")) return "装饰器：把下面定义的函数交给一个包装规则处理；要看它具体做什么，查对应导入或正文解释。";
    if (/^(from|import)\s/.test(text)) return "导入：把模块或第三方库中的名字引入当前文件，便于后续使用。";
    if (/^class\s/.test(text)) return "定义类：描述之后创建的对象拥有哪些数据和操作；缩进块是类的内容。";
    if (/^def\s/.test(text)) return "定义函数：把缩进块里的步骤命名起来；定义时不执行，调用时才执行。";
    if (/^(if|elif|else|for|while|try|except|finally|with|match|case)\b/.test(text)) {
      if (/^if\b|^elif\b/.test(text)) return "条件分支：条件为真时执行下一段缩进代码；冒号后开始代码块。";
      if (/^else\b/.test(text)) return "备选分支：前面的条件都不成立时，执行这一段缩进代码。";
      if (/^for\b/.test(text)) return "循环：从可迭代对象逐项取值，每次把当前值绑定到循环变量后执行代码块。";
      if (/^while\b/.test(text)) return "条件循环：只要条件仍为真就重复执行；要确认循环中有机会让条件变假。";
      if (/^with\b/.test(text)) return "上下文管理：进入代码块时准备资源，离开时自动完成清理，例如关闭文件。";
      if (/^try\b/.test(text)) return "异常处理：标出可能失败的代码；后面的 except 应只处理预期错误。";
      if (/^except\b/.test(text)) return "异常分支：仅在 try 中出现匹配错误时执行；不要用空 except 隐藏问题。";
      return "流程控制语句：和相邻缩进块配合，决定程序在哪种情况下继续或收尾。";
    }
    if (/^return\b/.test(text)) return "返回：结束当前函数，并把后面的值交给调用它的代码；这和 print 显示结果不同。";
    if (/^yield\b/.test(text)) return "生成器产出：暂时交出一个值并暂停函数，下次取值时从这里继续。";
    if (/^raise\b/.test(text)) return "主动报告异常：当前操作无法继续时，把具体错误交给调用者或匹配的 except。";
    if (/^(break|continue|pass)\b/.test(text)) return "流程控制：break 结束循环，continue 开始下一轮，pass 则是暂时不做事的占位语句。";
    const calls = [...text.matchAll(/(?:\b|\.)([A-Za-z_]\w*)\s*\(/g)].map(m => m[1]);
    const uniqueCalls = [...new Set(calls)].filter(name => !["if", "for", "while", "with", "def", "class", "return", "lambda"].includes(name));
    const details = uniqueCalls.map(name => {
      if (classNames.has(name)) return "调用本例定义的 `" + name + "` 类来创建对象；括号里的值会传给它的初始化方法。";
      if (definedNames.has(name)) return "本例自己定义的 `" + name + "()` 函数，向上查找它的 def 看具体步骤。";
      return this.symbols[name] || "调用 `" + name + "()`；这是本例使用的函数或方法，请结合它的导入来源和本节正文确认用途。";
    });
    if (/^[A-Za-z_]\w*\s*(?:\+=|-=|\*=|\/=|=)/.test(text)) return "赋值：把右侧计算结果绑定到左侧名字；复合赋值会基于原值继续运算。" + (details.length ? " " + details.join(" ") : "");
    if (uniqueCalls.length) return "执行表达式：从左到右计算参数，再调用函数或方法。" + details.join(" ");
    return "计算或设置表达式：先看本行读取了哪些名字，再检查结果如何被下一行使用。";
  },
  explainSqlLine(line) {
    const text = line.trim();
    if (!text) return "空行只用于分隔 SQL 步骤。";
    if (/^(--|#)/.test(text)) return "注释：给人看的说明，数据库不会执行这一行。";
    if (/^SELECT\b/i.test(text)) return "SELECT：指定要查询并返回的列；* 表示所有列，教学与实际项目中优先列出需要的字段。";
    if (/^FROM\b/i.test(text)) return "FROM：指定从哪张表读取记录。";
    if (/^WHERE\b/i.test(text)) return "WHERE：逐行筛选满足条件的记录；先筛选再参与后续分组或返回。";
    if (/^JOIN\b/i.test(text)||/\bJOIN\b/i.test(text)) return "JOIN：依据 ON 后的关联条件把另一张表的列接进查询结果。";
    if (/^ON\b/i.test(text)) return "ON：写出两张表如何对应，通常比较主键与外键。";
    if (/^GROUP\s+BY\b/i.test(text)) return "GROUP BY：把某列相同的记录放入同一组，供 COUNT、SUM、AVG 等聚合计算。";
    if (/^ORDER\s+BY\b/i.test(text)) return "ORDER BY：对查询结果排序；ASC 为升序，DESC 为降序。";
    if (/^INSERT\s+INTO\b/i.test(text)) return "INSERT INTO：向指定表新增记录；列名与 VALUES 中的值按位置对应。";
    if (/^VALUES\b/i.test(text)) return "VALUES：给新增记录提供数据；问号 ? 是参数占位符，实际值应单独传入而不是拼成 SQL。";
    if (/^UPDATE\b/i.test(text)) return "UPDATE：修改已有记录；执行前要确认后续 WHERE 限定了目标行。";
    if (/^SET\b/i.test(text)) return "SET：指定要修改的列及新值。";
    if (/^DELETE\s+FROM\b/i.test(text)) return "DELETE FROM：删除记录；执行前确认 WHERE 范围，缺少条件可能删除整张表的数据。";
    if (/^CREATE\s+TABLE\b/i.test(text)) return "CREATE TABLE：定义一张表及其列、类型和约束。";
    if (/^PRIMARY\s+KEY\b/i.test(text)) return "PRIMARY KEY：声明能唯一识别一行记录的主键列。";
    if (/^FOREIGN\s+KEY\b/i.test(text)) return "FOREIGN KEY：声明当前表中的值必须关联到另一张表的有效记录。";
    if (/^COMMIT\b/i.test(text)) return "COMMIT：提交事务，使这一事务中的数据库修改生效。";
    if (/^ROLLBACK\b/i.test(text)) return "ROLLBACK：撤销尚未提交的事务修改。";
    if (/\?/.test(text)) return "问号是参数占位符；数据库驱动会把实际值作为参数传入，避免把用户输入拼进 SQL 字符串。";
    return "SQL 语句片段：结合上一行和本课说明读出操作对象、筛选条件与结果。";
  }
};
