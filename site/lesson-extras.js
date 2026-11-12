window.LessonStudy = {
 "S1-U01":{
  shortBody:`### 先让同一段代码跑两次

先点「运行 Python」，核对文字和数字 5。再用本机 VS Code 打开实践文件，在终端运行 py -3 我的练习.py。用 py -3 -c "import sys; print(sys.executable)" 看真正执行代码的解释器。

### 做一次改动就自查

把输出换成自己的学习目标，再计算 7 × 30。预期第二个结果是 210。遇到报错时，先看最后一行的异常名称，再找到指向自己文件的行号。能在网页和终端各运行一次，就进入下一课。`
 },
 "S1-U03":{
  shortBody:`### 从 C 的循环迁移过来

Python 用缩进划分代码块。遍历字符串时写 for ch in text，只有确实需要下标时才用 range。range(3) 依次产生 0、1、2。break 结束循环，continue 跳过本轮。

### 改一次计数条件

运行原示例，先解释为什么 "AI AI" 的非空格字符数是 4。再把条件改成只统计 a 或 A，预测 "aB A" 得到 2、空串得到 0。把 count 的更新放在条件分支里，然后换一份输入复核。`,
  practice:[
   "打开「我的练习.py」，先运行起始代码，再把计数条件改成只接受 a 和 A。",
   "用 aB A 和空串各运行一次，结果分别应为 2 和 0。说明空串时循环体为什么一次也不执行。"
  ]
 },
 "S1-U07":{
  after:"参数的几种常用传法",
  title:"为什么默认列表会保留上次的值？",
  explanation:[
   "定义函数时，默认值表达式只求值一次。若写成 def collect(word, words=[])，函数创建时就准备好了这一个列表。",
   "第一次省略 words 并追加 'ai' 后，默认列表变成 ['ai']。第二次省略 words 并追加 'python'，操作的仍是同一个列表，结果变成 ['ai', 'python']。",
   "要让每次省略参数都从空列表开始，可以把默认值设为 None，在函数体内判断 words is None，再创建列表。显式传入 [] 时仍使用调用者提供的列表。"
  ]
 },
 "S1-U08":{
  title:"判断谁会一起变",
  explanation:[
   "先画两层。a = [[1], [2]] 有一个外层列表和两个内层列表。b = a 只增加一个名字，b = a.copy() 会新建外层，但两份外层仍指向原来的内层。",
   "b.append([9]) 改的是外层。用浅拷贝时，只有 b 变。b[0].append(9) 改的是共享内层，用浅拷贝时，a 和 b 的第一项都会变。",
   "把复制方式换成 deepcopy 后再试内层操作。在这个例子里 a 保持 [[1], [2]]。列表内容是否相等用 ==，是否为同一对象用 is。"
  ],
  practice:[
   "先在网页图示选浅拷贝，分别预测改外层和改内层的结果。",
   "打开「我的练习.py」，只改复制方式，让原列表不受内层修改影响。运行后分别核对 a 和 b，再把第二项改掉复核。"
  ]
 },
 "S1-U09":{
  after:"先认识序列化",
  title:"空文件、空对象和坏 JSON 分别是什么？",
  explanation:[
   "词频输入 sample.txt 如果没有任何字符，split() 得到 []，循环执行零次，词频结果为 {}。",
   "把这个结果写入 counts.json 后，文件包含两个字符 {}，可以被 json.load 读成空字典。完全空白的 JSON 文件没有任何值，读取时会抛出 JSONDecodeError。",
   "排错时先看失败发生在哪一层。路径不存在通常是 FileNotFoundError，内容不是合法 JSON 是 JSONDecodeError，读出来是列表但程序需要字典则是数据结构不符。"
  ]
 },
 "S2-U02":{
  title:"跟踪生成器的当前位置",
  explanation:[
   "调用含 yield 的函数得到生成器。第一次 next() 才开始执行，遇到 yield 时交出一个值并暂停，局部变量仍保留。",
   "第二次 next() 从暂停处继续。for 会不断取值，到 StopIteration 时结束。对同一个已耗尽的生成器再跑一次 for，循环体一次都不执行。",
   "想重新计算就重新调用生成器函数。想把已生成的结果反复使用，可以先存成列表，代价是把所有结果留在内存。"
  ],
  practice:[
   "图示逐项取完，再点击一次，核对停止状态。",
   "在练习区把生成器改成提供三个词并打印长度。保留同一个生成器，连续遍历两次；再改成先转 list，比较第二次是否有输出。"
  ]
 },
 "S2-U03":{
  title:"终端能导入，为什么 VS Code 却找不到包？",
  explanation:[
   "先在能运行的终端用 python -c \"import sys; print(sys.executable)\" 查解释器路径，再在报错脚本里临时打印 sys.executable。两条路径不同，说明两个入口用了不同的环境。",
   "回到 VS Code 选择项目的解释器，用这个解释器执行 python -m pip show 包名，确认包安装在哪个环境。选完后重开终端，再核对一次解释器路径。",
   "如果两条解释器路径已经一致，下一步查看报错名称。ModuleNotFoundError 查导入与安装，FileNotFoundError 查当前工作目录与文件路径。"
  ],
  foldSections:[["从终端到断点：亲自确认一次运行环境","工具实操 · 从终端到断点核对环境"]]
 },
 "S2-U05":{
  title:"先判断操作，再预测形状",
  explanation:[
   "对形状 [2,3] 的表，sum(axis=0) 沿行方向累加，得到 3 个列和 [5,7,9]。sum(axis=1) 沿列方向累加，得到 2 个行和 [6,15]。想保留长度为 1 的轴时加 keepdims=True。",
   "先写轴名。若 X 的形状是 [样本数, 特征数]，每列偏置应对齐最后的特征轴。[2,3] + [1,3] 让每行加同一个三项向量；[2,3] + [2,1] 则让第 0 行和第 1 行各加一个标量。[2,3] + [2,2] 的最后一轴冲突。",
   "用方阵检查是否加错了轴。对 [[1,2],[3,4]]，每列加 [10,−5] 应得 [[11,−3],[13,−1]]。如果把 10 加给第一行、−5 加给第二行，则得到 [[11,12],[−2,−1]]。两种结果形状相同，抽查一格才能发现语义错误。",
   "矩阵乘法检查中间维。[2,3] @ [3,4] 得到 [2,4]。输出的每一格来自左边一行与右边一列的点积。"
  ],
  practice:[
   "网页广播加练可以先用列表实现。外层遍历样本行，内层把该行的特征与 bias 逐列配对。通过后，再对照讲义的 NumPy 写法。",
   "在本机运行 operations.py。打印 x、offset 和 w 的 shape，运行前先写下 x + offset、x.sum(axis=1) 和 x @ w 的预期形状。",
   "把 offset 改成 [3,1] 形状，使每行加不同的数。用第一行手算核对，再试一个无法广播的形状，指出冲突在哪一轴。"
  ]
 },
 "S3-M01":{
  title:"为什么验证集不能参与计算填充值？",
  explanation:[
   "假设训练集这一列是 [2,4,缺失]，验证集有 [90]。训练时只从已知训练值算均值，得到 3，再把训练缺失值填成 3。",
   "若先把两份数据拼接再求均值，填充值会变成 32。虽然没有使用验证标签，训练数据的表示已经受验证输入影响，这仍是数据泄漏。",
   "把预处理与模型放进 Pipeline 后再做交叉验证。每一折用该折的训练部分重新 fit，用得到的规则 transform 该折的验证部分。"
  ]
 },
 "S3-U05":{
  title:"拆开 logits、标签和损失",
  explanation:[
   "三分类的一条样本有三个 logits。分数最高的下标是预测类别，softmax 将一行分数变成概率。固定分数时，换真实标签不会改变预测。",
   "交叉熵只取真实类别的概率 p，损失为 −ln(p)。同一组 [2,1,0]，真实类别为 0 时 p 约 0.665；换成 2，p 约 0.090，损失会增大。",
   "用类别索引的批量任务里，logits 常是 [N,C]，标签是 [N] 的整数索引。CrossEntropyLoss 接 logits，计算前不用再调用 softmax。"
  ],
  practice:[
   "网页图示从类别 0 切到 2，核对概率表保持不变、损失变大。在网页代码里只改用于取概率的标签下标。",
   "本机运行 batches.py，找出一个 batch 中的特征和标签形状。再在模型 forward 之后核对 logits 的最后一维是否等于类别数。"
  ]
 },
 "S3-U06":{
  title:"跟一批数据走完训练和验证",
  explanation:[
   "训练批次依次清梯度、前向算 logits 和损失、反向算梯度、更新参数。只跑 forward 或 backward 都不会更新参数，更新发生在 optimizer.step()。",
   "验证时用 eval() 切换 Dropout、BatchNorm 等层的行为，再用 no_grad() 关闭梯度记录。两者控制不同的事，验证代码也没有参数更新步骤。",
   "批次大小不同时，总准确率要先加正确数和样本数。原两批是 2/2 和 1/3，总体是 3/5。再加 2/4 后变成 5/9。直接平均三个批次的准确率会给每批同样权重。"
  ],
  practice:[
   "先完成网页第三批变式，用「检查我的改动」核对总体准确率。",
   "在 train.py 的 optimizer.step() 和 evaluate() 的 for 循环各打一个断点。确认只有训练进入更新，并在验证断点查看 model.training 和 torch.is_grad_enabled()。",
   "记录一次验证的 correct 和 count。检查最后一批比前面短时，分母是否仍等于实际样本总数。"
  ]
 },
 "S4-U02":{
  after:"训练时已知答案，生成时逐步追加",
  title:"训练时读到了答案，为什么还需要因果掩码？",
  explanation:[
   "假设目标序列是「我 爱 编程」。可以把输入排成 [起始, 我, 爱]，把监督目标排成 [我, 爱, 编程]。每个位置预测它右边的词。",
   "训练时多个位置可以一起算。预测「爱」的那个位置只允许读取 [起始, 我]。如果也能看右边的输入「爱」，就提前看到该位置的标准答案。",
   "生成时没有完整目标，先根据已有前缀预测一个词，再把选出的词追加到前缀。到下一课可切换查询位置，观察允许读取的位置怎样增加。"
  ]
 },
 "S4-U03":{
  title:"只追踪一个查询位置",
  explanation:[
   "取 Q 的一行，与 K 的每一行点积并缩放，得到一行分数。每个分数都对应一个可以读取的位置。",
   "拿一组容易手算的分数 [0,0]。两个位置的 exp 都是 1，softmax 后各占 1/2。如果此时只把第二项改成 0，就得到 [1/2,0]，总和只有 1/2。",
   "改在 softmax 前屏蔽第二项。分数变成 [0,−∞]，指数项是 [1,0]，分母变成 1，权重为 [1,0]。用 V=[[10,0],[0,20]] 时，正确输出是 [10,0]；漏掉归一化就会得到 [5,0]。",
   "每个权重乘对应的 V 向量，再把贡献相加。若查询位置是 0 且因果掩码开启，后两个位置贡献都为零，改它们的 V 不会改变当前输出。"
  ],
  practice:[
   "图示选查询位置 0，开启掩码，再切换最后一个 V。记下输出是否变化，然后关闭掩码复核。",
   "回网页两键例子，在 softmax 前屏蔽第二个键。输出应等于第一个 V，也就是 [10.0, 0.0]。换一个 V 数值再核对。"
  ]
 },
 "S4-U04":{
  title:"把头数和每头维度分开",
  explanation:[
   "本课的小例子有 3 个词元，每个 6 维。选 3 个头时，每头 2 维。拆分只改变张量的组织方式，元素数量仍是 18。",
   "先把最后一维拆成头数和每头维度，再交换词元轴与头轴。得到 [批次, 头, 词元, 每头维度] 后，每个头沿自己的词元轴做注意力。",
   "把输出换回原轴顺序再合并。只拆分、换轴、还原时，原数值可以完全复原。实际模型经过注意力和输出投影后，形状可以相同，数值会改变。"
  ],
  practice:[
   "图示依次选择 2、3、4 个头，写下可行时的每头维度。",
   "网页练习改成三个六维词元和三个头。打印拆分结果，合并后用 == 核对原数据。对照讲义指出实际模型在哪一步做输出投影。"
  ]
 },
 "S4-U05":{
  title:"顺着一条残差连接核对计算",
  explanation:[
   "以网页例子为准，把主路 x=[1,2,3] 与分支 [0.5,0,−0.5] 相加，先得到 [1.5,2,2.5]。把两个张量的形状写在相加处。",
   "再看 LayerNorm。对一个词元的隐藏特征求均值和方差，每个词元单独算。上例均值为 2，减去均值后是 [−0.5,0,0.5]，最后还要除以标准差并考虑数值稳定项。",
   "读真实代码时先确认是先归一化再进入分支，还是相加后再归一化。按代码实际顺序画主路和分支，就能解释每一行的输入。"
  ],
  practice:[
   "把网页分支改为全零。先预测残差相加后仍是 [1,2,3]，再运行观察归一化后的变化。",
   "在本机实践中找出一次残差相加和一次归一化，写下各自所在行及张量形状。"
  ]
 },
 "S5-U02":{
  title:"沿着一次推理追踪张量",
  explanation:[
   "tokenizer 把文本编码为整数 ID。两条句子长度不同，组成一个批次时需要补齐到同一宽度。用 attention_mask 区分有效位置与填充位置，别靠猜测某个 ID 是否代表填充。",
   "模型先把 ID 查表成 embedding。输入形状通常是 [批次, 序列长度]，嵌入多一维 hidden_size，输出 logits 的最后一维是词表大小。单看 shape 就能分辨当前拿的是哪一种量。",
   "因果模型的 generate 通常返回输入序列和新增 ID。要只显示新回答，在解码前按输入宽度截取后缀。调试时分别查看输入 ID、掩码和新增 ID。"
  ],
  practice:[
   "先用网页例子给两条不同长度的输入补齐，打印 ID 和掩码。检查两行宽度相同，填充处掩码为 0。",
   "在本机按 README 运行 inspect_model.py。找到 input_ids、attention_mask 和 suffix 各自出现的位置，只改英文问题长度，再比较输入宽度与截取位置。"
  ]
 },
 "S5-U03":{
  after:"top-p 怎样截取候选",
  title:"温度、top-p 和贪心选择怎样接起来？",
  explanation:[
   "温度先改变分数的相对差距，再由 softmax 得出概率。温度升高时，候选概率一般更接近。推导时用正温度；框架里关闭采样的参数以接口为准。",
   "假设本步概率为 [0.60,0.25,0.10,0.05]，top-p 设为 0.8。先按概率从大到小累计，前两项合计 0.85，保留它们并将各自概率除以 0.85 后再采样。",
   "贪心选择每步直接取分数最高的候选。在上述例子中会选第一项。对比设置时固定模型和输入，只改一个生成参数，记录输出差异。"
  ]
 },
 "S6-U03":{
  foldSections:[["7. 逐步定位一个“有资料却答错”的问题","排错详解 · 召回了资料，为什么还是答错？"]]
 },
 "S6-E03":{
  foldSections:[["在一组小数据里实际走完关联与聚合","算例详解 · 用小表走一遍 JOIN 和聚合"]]
 },
 "S6-U06":{
  title:"区分工具结果和最终答复",
  explanation:[
   "工具返回 12 后，程序把它追加到 observations。此时系统只拿到一条观察记录，最终答复要等下一次决策产生。",
   "最大步数为 1 时，程序保留 [12] 并以预算用完结束。最大步数为 2 时，第二个动作返回最终答复，循环在这里停止。",
   "排错先读日志里的动作、观察和结束原因。工具失败、产生最终答复和步数耗尽应记录为不同结果，便于定位改决策还是改执行器。"
  ],
  practice:[
   "网页演示先把最大步数设为 1，执行一次。再设为 2，对照两个结束原因。",
   "在网页 Python 代码改同一个 max_steps。两次的观察记录都应含 12，只有允许第二步时才有最终答复。"
  ]
 },
 "S6-U04":{
  title:"先查证据，再判断回答",
  explanation:[
   "先核对 gold 证据和实际召回的片段。已有标准证据但没召回时，优先检查切分、检索词或召回数量。",
   "标准证据已经召回，回答仍错，就检查证据是否真的进入提示、引用能否支持结论，以及模型是否用错了证据。只看检索命中率会漏掉这种错误。",
   "无答案题单独检查是否恰当拒答。可回答题的检索命中率用可回答题作分母；回答质量和拒答表现按事先定义的口径记录。"
  ],
  practice:[
   "先预测图示中的 q2 和 q3 应从哪一步排查，再展开结果。",
   "在网页练习里只打印「有证据命中但答错」的题号。原始三题应只剩 q3。随后新增一条没有标准证据的题，单独记录是否拒答。"
  ]
 }
};

window.LessonExtras = {
 "S1-U02": [
  ["进阶 · 比赛常用 Python", "按题意读入多组数据，按格式输出", `先分清题目按行组织数据，还是把空白都当分隔符。数据量小用 input() 足够。按行读大输入可用 sys.stdin.readline()，它保留换行符，遇到文件结束返回空字符串。连续空格和换行都可作为分隔符时，split() 无参数会跳过连续空白。

把下面三行粘贴到右侧「标准输入」。第一行表示后面有两组数据，每组独占一行。点「运行 Python」后，核对输出是否恰好是两行 8 和 6。「检查我的改动」对应本课的分钟数练习。

~~~text
2
3 5
10 -4
~~~

~~~python
import sys

read = sys.stdin.readline
header = read()
if header:
    answers = []
    for _ in range(int(header)):
        a, b = map(int, read().split())
        answers.append(str(a + b))
    sys.stdout.write("\\n".join(answers) + ("\\n" if answers else ""))
~~~

把输入整块替换成一行 0，预期无输出。再恢复示例输入，并把最后一行改成 -10 4，预期第二行变成 -6。提交时按题目格式保留结果行。若题目只按空白区分记号，可用 sys.stdin.read().split() 一次读入再解析，代价是将输入留在内存。按行读时，输出量很大也可以逐行输出或分批写。只有输入确实成为瓶颈时，再试 sys.stdin.buffer，它读的是 bytes，读文字时留意编码。([Python 标准输入输出](https://docs.python.org/3/library/sys.html#sys.stdin))`]
 ],
 "S1-U06": [
  ["进阶 · 比赛常用 Python", "计数、队列、优先队列和有序边界怎么选", `计数用 Counter。需要指定同频项的顺序时，仍用本课的排序键明确规则。先进先出用 deque，append 加到右端，popleft 从左端取，避免列表 pop(0) 挪动后面的所有元素。

每次只需要取最小值时用 heapq。heap[0] 是最小值，其余位置的顺序不代表完整排序。有序数组中查找相等值的区间，用 bisect_left 找左边界、bisect_right 找右边界。两者之差是出现次数。二分定位要求列表已排序，找到插入点后插入列表仍可能移动后面的元素。

~~~python
from bisect import bisect_left, bisect_right
from collections import Counter, deque
from heapq import heapify, heappop

scores = [4, 2, 4, 9]
print(Counter(scores)[4])  # 2

queue = deque(["先到", "后到"])
print(queue.popleft())  # 先到

heap = scores.copy()
heapify(heap)
print(heappop(heap))  # 2

ordered = sorted(scores)
left = bisect_left(ordered, 4)
right = bisect_right(ordered, 4)
print(left, right, right - left)  # 1 3 2
~~~

把目标值改成 5，先预测两个边界。两者相等就表示没有匹配项，即使返回的位置落在列表内部。之后遇到按优先级处理的数据，再用二元组 (优先级, 序号) 练同优先级的顺序。([collections](https://docs.python.org/3/library/collections.html) · [heapq](https://docs.python.org/3/library/heapq.html) · [bisect](https://docs.python.org/3/library/bisect.html))`]
 ],
 "S1-U07": [
  ["主线 · 必会", "从 C 的参数习惯过渡到 Python", `调用 \`append_score(scores)\` 时，形参和实参起初指向同一个列表。函数里执行 \`scores.append(90)\` 会改变调用方看到的列表；执行 \`scores = [90]\` 只会让形参重新绑定。把返回结果接回变量是另一个独立动作。

在 VS Code 给函数第一行打断点。分别预测上述两种写法返回后调用方列表的内容，再单步运行。最后改成返回新列表且不改变原列表，换一份输入验证两份列表。`]
 ],
 "S1-U09": [
  ["工具实操 · VS Code", "从 traceback 找到出错的那一行", `打开本课的“我的练习.py”，把输入路径暂时改成 \`missing.txt\`，用终端运行。先看 traceback 最后一行的异常类型和路径，再向上找到属于你自己脚本的那一帧。给打开文件的语句打断点，观察 \`Path.cwd()\` 和 \`path.resolve()\`，判断程序实际去了哪里。

分别验证不存在的文件、存在但为空的文件、正常文件。只有第一种应报告路径错误。保留原来的统计函数，把路径检查放在读取数据的地方。验收是能说出异常发生在哪一层，以及空文件为什么不属于同一种错误。`]
 ],
 "S1-U10": [
  ["阶段项目 · 独立完成", "从空白写一个带坏行统计的文本工具", `在阶段项目的动手版新建脚本。写一个函数，接收文本行，返回有效正文的词频字典和坏行数。每行用第一个制表符分隔来源和正文。整行空白直接跳过；没有分隔符、来源为空或正文为空都计作坏行。只统计正文，统一小写，按空白拆词。

用“笔记 + 制表符 + Python AI”、空行、“没有分隔符”、“课件 + 制表符 + python”、“制表符 + 只有正文”和“课件 + 制表符 + 两个空格”核对。应得到 {"python": 2, "ai": 1}，坏行数为 3。全空白输入应得到空字典和 0。再用同一个函数处理 UTF-8 文件，并加一条自己设计的坏行。优先从输入输出推导写法；需要提示时展开下一节。`],
  ["进阶 · 卡住再看", "提示与参考写法", `先用 strip 判断整行是否空白，分隔时用原行，避免 strip 把开头或结尾的制表符去掉。partition 可以同时给出来源、分隔符和正文。字段验证通过后再统计词频，最后由入口负责打印。

写完自己的版本再对照：

~~~python
def summarize_lines(lines):
    counts, bad = {}, 0
    for line in lines:
        if not line.strip():
            continue
        source, sep, body = line.partition("\\t")
        if not sep or not source.strip() or not body.strip():
            bad += 1
            continue
        for word in body.lower().split():
            counts[word] = counts.get(word, 0) + 1
    return counts, bad
~~~`],
  ["进阶 · 科研脚本基础", "给自己的函数写可重复运行的测试", `从刚写好的词频函数开始。先为一份输入写出预期，再用 assertEqual(实际值, 预期值) 核对。每个测试只关心一个行为，失败时就能区分是空输入、大小写转换，还是空白切分出了问题。

这个网页示例直接导入本课随课文件 textstats.py，可以在右侧运行。试着故意改错一个预期，读失败报告，再修回来。

~~~python
import unittest
from textstats import count_words

class TextStatsTests(unittest.TestCase):
    def test_empty_text(self):
        self.assertEqual(count_words(""), {})

    def test_mixed_case(self):
        self.assertEqual(count_words("AI ai"), {"ai": 2})

    def test_whitespace(self):
        self.assertEqual(count_words("  ai\\n python  "), {"ai": 1, "python": 1})

if __name__ == "__main__":
    suite = unittest.defaultTestLoader.loadTestsFromTestCase(TextStatsTests)
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    if not result.wasSuccessful():
        raise AssertionError("词频测试失败，请看上面的报告")
~~~

在 VS Code 里把代码另存为 test_textstats.py，放在 textstats.py 同一目录，终端运行 python -m unittest -v test_textstats。将导入换成你自己的统计函数，再加一个项目里真实遇到的边界输入。以后修改清洗规则或评测代码，沿用同样方法检查旧行为。([Python unittest](https://docs.python.org/3/library/unittest.html))`]
 ],
 "S2-U03": [
  ["进阶 · 科研脚本基础", "让别人用同一条命令复跑你的脚本", `把会变化的输入文件、输出位置和实验参数写成命令行参数。将示例保存为 inspect_input.py，放在本课的「输入示例.txt」旁边，并在该目录打开终端。Path 让解析后的参数直接成为路径对象，--help 可以查看用法。

~~~text
import argparse
import json
from pathlib import Path

def main():
    parser = argparse.ArgumentParser(description="统计 UTF-8 文本的词数")
    parser.add_argument("input", type=Path, help="输入文本")
    parser.add_argument("--output", type=Path, required=True, help="输出 JSON")
    args = parser.parse_args()
    if args.input.resolve() == args.output.resolve():
        parser.error("输出路径不能覆盖输入文件")
    try:
        words = args.input.read_text(encoding="utf-8").split()
    except FileNotFoundError:
        parser.error(f"找不到输入文件：{args.input}。请检查当前目录和路径")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    result = {"input": str(args.input), "word_count": len(words)}
    try:
        with args.output.open("x", encoding="utf-8") as output:
            json.dump(result, output, ensure_ascii=False)
    except FileExistsError:
        parser.error(f"输出已存在：{args.output}。请换一个输出文件名")

if __name__ == "__main__":
    main()
~~~

~~~powershell
python inspect_input.py --help
python inspect_input.py "输入示例.txt" --output results/summary.json
~~~

首次运行后打开 results/summary.json。再执行同一条命令，观察打开模式 x 如何保护上一次的输出。然后换一个输出文件名，保留两份结果作对照。把实际命令和依赖版本写进 README。进入模型实验后，继续记录数据版本、随机种子、划分和评测设置。固定种子有助于比较，但结果还依赖环境和计算实现。([Python argparse](https://docs.python.org/3/library/argparse.html))`],
  ["进阶 · 冬令营衔接", "在图上看懂 Git 分支与远程同步", `先用 S2 小项目做一个修改，查看 git status 和 git diff。接着在模拟仓库完成「主要 → 基础」和「远程 → Push & Pull」，每次先预测提交图会怎么变。能说清本地提交为什么还没有出现在远程，就可以回项目继续做。([Learn Git Branching](https://learngitbranching.js.org/?locale=zh_CN))`],
  ["工具实操 · Windows / VS Code", "终端能导入，VS Code 却报错", `在项目目录用 PowerShell 执行 \`py -3 -m venv .venv\`，用 \`.\\.venv\\Scripts\\python.exe -m pip install numpy\` 安装。写一个短脚本打印 \`sys.executable\`，再导入 NumPy 并打印 \`numpy.__version__\`。先用虚拟环境的 Python 直接运行，再用 VS Code 的“运行 Python 文件”运行。

比较两次打印的解释器路径。在命令面板用 Python: Select Interpreter 选择项目的 .venv；新开终端，用 \`python -m pip --version\` 核对 pip 所在目录。如果改用 Notebook，再独立核对右上角内核和单元格里的 \`sys.executable\`。不需要为这个实验修改 PowerShell 执行策略。

进到陌生仓库时，先读 README，找入口和一份样例输入，跑通原输出。修改一处后用 \`git status --short\` 和 \`git diff\` 确认差异，再用新输入运行一次。`]
 ],
 "S2-U08": [
  ["工具实操 · VS Code", "接手陌生仓库", `用实践区的「打开接手陌生仓库练习」进入项目，先读 README，再找配置、输入文件和入口。先跑出 Python 主题的基准结果，再只改配置里的 topic 为 AI，预测变化并运行。最后从上一级目录执行同一脚本，检查为什么仍能找到数据。可用这一遍替换阶段项目的首次跟做。`]
 ],
 "S3-M01": [
  ["主线 · 必会", "做一次可重复的数据泄漏对照", `用带缺失值的数据固定一次训练/验证划分。A 先在全部样本上拟合缺失值填充器再划分；B 用 Pipeline，在训练集拟合填充规则后预测验证集。保留随机种子、分类器和指标，对比两个填充值与验证结果。

分数可能上升、下降或相同。A 的问题在于使用了验证数据决定填充规则，哪怕这一次分数相同也不符合评估约束。把同一原则迁移到标准化、特征选择和交叉验证。`]
 ],
 "S3-M04": [
  ["进阶 · 可跳过", "按人或时间划分验证集", `先修 S3-M01 和本课。若同一个人有多条记录，按行随机划分可能让同一个人同时进入训练和验证集。预测新用户时，用 GroupKFold，传入用户 ID 作为 groups；预测未来时，按时间排序，检查训练时间早于验证时间，并留意特征本身是否偷看了未来。

在阶段项目中打印每折的用户交集或时间边界，再比较随机划分的结果。选择方法前先写下模型部署后要面对什么数据。`]
 ],
 "S3-U06": [
  ["进阶 · 科研排错", "训练出问题时从哪一段查起", `- **数据读不进来**：核对 VS Code 解释器、当前目录和数据路径。先读一条记录，再取一个批次。
- **形状或标签报错**：在 forward 和损失计算前各打印一次 shape、dtype、device。这里 logits 是 [N,2]，类别索引是 long 类型的 [N]。
- **损失不下降**：固定一个小批次重复训练，比较首尾损失和一次更新前后的参数。这样能把问题缩小到前向、损失、反向或参数更新。
- **结果重跑不一致**：先比数据划分、随机种子、学习率和前两轮日志，再核对运行设备与框架版本。

如果 VS Code 报找不到 torch，先运行 python -c "import sys; print(sys.executable)"，再确认该解释器能 import torch。本机验证使用 Python 3.13 的独立环境。

从本课 train.py 开始，检查 results/history.json 中的训练、验证与最终测试记录，以及 results/best.pt 是否生成。小批次能拟合后，再用独立数据评估。`],
  ["工具实操 · VS Code / PyTorch", "用一个批次定位张量错误", `在 forward 前和计算损失前分别打印 inputs、logits、labels 的 shape、dtype、device。对使用类别索引的多分类交叉熵，常见形状是 logits [N,C]、labels [N]，标签类型为 long。确认输入与模型、预测与标签在相应的同一设备。

先在 CPU 上只跑一个批次。人为把标签变成 [N,1]，定位报错，再改回原形状。遇到错误时按“读报错 → 写期望形状 → 查上一步输出”的顺序排查。

形状正确后，固定同一小批次，关闭随机增强，重复执行清梯度、前向、反向和更新。记录第一次与最后一次损失。若这个小批次也学不动，检查标签、损失输入、参数是否有梯度以及优化器是否更新参数。能拟合这批数据只说明训练链路能工作；评估泛化仍要换独立数据。`]
 ],
 "S4-U03": [
  ["进阶 · 可跳过", "从因果掩码理解 KV cache", `先修本课和 S4-U05。自回归生成时，新位置的 Q 要读取过去各位置的 K、V。以前的位置受因果约束，不依赖后来生成的 token，所以推理时可以缓存各层的旧 K、V，随后只算新位置的投影并追加缓存。

画出生成第 3、4 个 token 时参与注意力的 K、V 行。缓存减少重复投影与旧位置计算，但新 Q 仍要和已有 K 计算分数，而且缓存随序列长度增长。这里讨论推理，训练通常以整段序列并行计算。`]
 ],
 "S5-U02": [
  ["工具实操 · Hugging Face / VS Code", "从模型卡到第一条推理", `先读模型卡，记录任务类型、模型 ID、许可、示例输入格式。本机已用 Python 3.13 在 CPU 生成过一条回答。首次运行需要取得模型文件；如果没有打印模板就失败，先区分依赖导入失败与模型文件下载失败。缓存的符号链接提示不影响本次生成。用本课的 inspect_model.py 检查 tokenizer、特殊 token、输入长度和聊天模板。如果模型提供聊天模板，再按模型的调用示例格式化消息。

先在本机跑一条短输入，限制 max_new_tokens，记录生成参数和输出。若下载卡住，先区分网络、访问权限和缓存位置；如果模型已加载才报显存错误，先缩短输入并使用适合设备的小模型。保留成功命令和模型 ID，下一课直接复用。`]
 ],
 "S3-U08": [
  ["进阶 · 冬令营衔接", "从本站实验接到原仓库 Lab", `先用 Lab-07-2 对照 MNIST 如何载入，再用 Lab-10-1 和 Lab-10-2 对照卷积和 MNIST CNN。换成自有图片时走 Lab-10-4，之后用 Lab-10-5 和 Lab-10-6 比较 VGG 与 ResNet，再读 Lab-10-7。阅读时沿数据、模型、损失、训练循环四处定位。([冬令营 PyTorch 实验仓库](https://github.com/deeplearningzerotoall/PyTorch#part-3-convolutional-neural-network))

用 yunjey 的 CNN 和 Deep Residual Network 小节对读 forward，重点找张量形状和残差相加的位置。仓库列的是较早环境，先用本站脚本跑通本机环境，再对照实现。([yunjey PyTorch Tutorial](https://github.com/yunjey/pytorch-tutorial#2-intermediate))`],
  ["选修 · 模型组", "用同一份 MNIST 比较 MLP 与 CNN", `先修 S3-U05 至 U08。MNIST 图像批次形状是 [N,1,28,28]。MLP 把每张图展平成 784 个数。CNN 让同一组卷积核扫描不同位置，保留二维结构。卷积输出边长为 floor((输入边长 + 2×填充 − 卷积核边长) / 步长) + 1，这里膨胀率取 1。先用本课图示核对默认输出，再只把填充改成 0，预测池化后的边长与 Linear 的输入特征数。([Conv2d 形状说明](https://docs.pytorch.org/docs/stable/generated/torch.nn.Conv2d.html))

在 VS Code 打开图像分类实验。用同一个 seed、同一数据划分和同样的训练轮数跑 MLP 和 CNN。两者都返回十类 logits，仍沿用交叉熵。记录验证正确数、分母、准确率和参数规模。([Torchvision MNIST](https://docs.pytorch.org/vision/stable/generated/torchvision.datasets.MNIST.html))`],
  ["进阶 · 模型组", "读懂残差连接，再迁移到图像文件夹", `先完成本课 CNN。对着一个残差块追踪 x → F(x) → F(x) + x。加法两侧的形状需要兼容；若改变通道或分辨率，检查捷径是否用了投影。VGG 可以先读卷积堆叠和池化的位置，再与残差块比较。迁移到 ImageFolder 时按类别分子目录，先分训练与验证集，并检查 class_to_idx 映射一致。随后仍复用 S3 的训练循环。([ResNet 原论文](https://arxiv.org/abs/1512.03385))`],
  ["主线 · 实验记录", "留下一份能复跑的基线", `在现有实验记录里留五项：数据与划分、运行命令与配置、这次只改了什么、基线和本次指标、一个失败样例及下一步。另记随机种子和模型文件位置。用相同验证样本重跑一次，确认记录足以找到同一份输出。这个格式在 S5-U05 和 S6-U04 接着用。`]
 ],
 "S5-U05": [
  ["主线 · 实验记录", "用同一份记录对比两版提示", `复用 S3-U08 的五项记录。固定评测样例、模型和生成参数，只改提示版本。把格式有效数、正确数和 gold 总数分别记下来，附一个失败 ID。缺预测的样例仍留在分母。下次改提示时，先用同一个失败样例验证修正，再重跑整组。`]
 ],
 "S5-E01": [
  ["进阶 · 冬令营衔接", "沿 base-llm 第三部分继续微调", `先把本站 LoRA 基线跑通，再读第三部分第 1 章的 PEFT 和 LoRA，核对哪些参数可训练。项目确实需要偏好数据时接第 2 章 DPO，部署遇到显存约束时接第 3 章量化。沿用固定评测集，每次只改变训练或推理的一项设置。([Datawhale base-llm](https://github.com/datawhalechina/base-llm))`],
  ["进阶 · 可跳过", "量化与 LoRA 分别改了什么", `先完成 S5-U05 的固定评测。量化用更低精度表示权重等数值，主要影响内存占用和运算，效果取决于硬件和实现。LoRA 冻结基础权重并训练低秩更新，用来适配任务；它仍需要训练数据和验证。两者可以组合。

先记录基础模型结果，再一次只改变一项。报告格式通过率、任务指标和至少一个失败样例，同时记录设备及精度。不要用单条看起来更好的回答判断是否值得微调。`]
 ],
 "S6-U01": [
  ["工具实操 · 本机 Python", "用状态码和超时定位接口失败", `先运行本课的模拟响应，再换真实接口。把密钥放在环境变量，给请求设置超时。记录状态码、耗时和不含敏感信息的错误摘要。401 先核对凭据，429 先看服务端提示的等待时间，超时先检查网络和服务响应，不要无限重试。

用模拟输入分别制造一个超时、一个 HTTP 错误和一个合法 JSON 但缺字段的响应。分别说明错误发生在连接、服务端响应还是业务校验。`]
 ],
 "S6-U04": [
  ["主线 · 实验记录", "沿同一个失败问题追到出错阶段", `复用 S3-U08 的五项记录。固定问题集、文档和生成配置，本次只改切分长度或检索数量中的一项。分别记录证据命中、回答正确、引用支持以及无答案样例的处理结果。给一个失败 ID 附召回片段编号，再写下一步该改检索还是生成。`],
  ["进阶 · 可跳过", "混合检索与重排如何做公平对照", `先修 S6-U02 至 U04。关键词检索适合术语和编号，向量检索可能找到换一种表达的同义内容。先分别召回候选，再按名次合并，最后只对少量候选重排。重排无法补回根本没召回的证据。

固定文档、切分和问题集，比较关键词、向量、合并候选三组。对同一问题同时检查证据命中、引用是否支持回答、无答案时是否拒答，再记录每组耗时。`]
 ],
 "S6-E02": [
  ["选修 · 后端组", "把已有实验记录做成可查询的 API", `先学 SQLite 和本课 FastAPI。打开实验记录服务，用 /docs 或 curl 查看请求、状态码与返回体。先 POST 三条记录，再逐次加阶段筛选、标题搜索、分数排序和分页。先筛选，再排序，再取一页；total 是同一筛选条件下的全部条数。用 page=0 检查参数错误，用不存在的标题检查空结果。([FastAPI 查询参数](https://fastapi.tiangolo.com/tutorial/query-params/))`]
 ],
 "S6-E03": [
  ["本机验证 · MySQL", "连接失败先查服务，再查账号和练习库", `先在 VS Code 选能导入 mysql.connector 的解释器，再核对 MYSQL_HOST、MYSQL_PORT、MYSQL_USER 和 MYSQL_DATABASE。脚本默认端口 3306，其他端口可用 MYSQL_PORT 指定。只在自己的练习库运行：脚本会新增并提交一条记录。用另一次连接查到该记录，才能确认写入已持久保存。`],
  ["选修 · 后端组", "从本机 SQLite 到 Compose 中的 MySQL", `先在 S6-E02 的实验记录服务跑通请求。再按项目 README 启动 API 和 MySQL。应用在容器里用服务名 db 连接数据库，数据库用卷保存数据，健康检查确认数据库能处理查询后才启动 API。用同一组 API 请求复查筛选与分页。([Compose 启动顺序](https://docs.docker.com/compose/how-tos/startup-order/))

迁移成冬令营论坛时，再加用户、分区、帖子及外键。用户登录需要密码哈希与身份验证，创建帖子还要检查权限。把 Nginx、缓存和公网访问留到交付时按需求扩展。`],
  ["工具实操 · MySQL / FastAPI", "沿着一次查询检查数据在哪一层出错", `先修 SQLite 实验记录课及 FastAPI 接口课。在本机用 MySQL 客户端确认当前数据库，再执行实验记录表的参数化查询。用项目代码插入一条测试记录，确认提交后新连接也能查询到，再把同一个读取函数接到 GET 接口。

分别查询存在和不存在的实验编号。检查客户端直接查到的行、Python 返回的数据结构和接口返回的 JSON 是否一致。把密钥放在环境变量，SQL 参数交给驱动绑定。若写入失败，先确认事务是否回滚，再查接口报错。`]
 ]
};
