/* 小型计算可视化：显示可核对的中间量，不代替 Python/框架实践。 */
window.StudyDemos = (() => {
 const el=id=>document.getElementById(id);
 const num=n=>Number(n).toFixed(3);
 const wrap=(title,controls,caption)=>'<figure class="figure teaching-demo"><h3>'+title+'</h3>'+controls+'<div id="demo-result"></div><figcaption>'+caption+'</figcaption></figure>';
 function render(l){
  if(l.id==="S2-U02")return wrap("逐项取值，看生成器停在哪里",'<button type="button" id="generator-next">取下一项</button> <button type="button" id="generator-reset">重新创建</button>',"模拟依次 yield AI、Python、RAG 的生成器。每次只向前一步。耗尽后重新遍历同一个对象也不会产生值。");
  if(l.id==="S3-U05")return wrap("同一组 logits，换一个真实类别",'<label>真实类别 <select id="target-class"><option>0</option><option>1</option><option>2</option></select></label>',"固定 logits [2, 1, 0]。选择标签只会改变损失，预测和概率保持不变。PyTorch 的 CrossEntropyLoss 接收原始 logits 和类别索引。");
  if(l.id==="S4-U04")return wrap("拆头和合并时，哪些轴在移动",'<label>头数 <select id="head-count"><option>2</option><option>3</option><option>4</option></select></label>',"固定三个词元、每个六维。先只演示形状变化，真实多头注意力还会进行 Q、K、V 投影和逐头计算。");
  if(l.id==="S6-U06")return wrap("一步一步看 Agent 为什么停止",'<label>最大步数 <select id="agent-budget"><option>1</option><option selected>2</option><option>3</option></select></label> <button type="button" id="agent-next">执行下一步</button> <button type="button" id="agent-reset">重置</button>',"重放本课的固定动作：先调用 double(6)，再返回最终答复。把预算设为 1，观察工具已有结果时为什么仍没有最终答复。");
  if(l.id==="S5-U02")return wrap("看见补齐后的 ID 和掩码",'<label><input id="token-pad-short" type="checkbox" checked>第二条输入只有一个词元</label>',"教学示例用 0 补齐，掩码 1 表示有效输入，0 表示填充。真实模型的填充方向和填充 ID 以 tokenizer 配置为准。");
  if(l.id==="S6-U04")return wrap("同样答错，下一步查哪里",'<label>评测样例 <select id="rag-diagnosis"><option value="q2">q2 · 标准 c3，召回 c2、c4，答错</option><option value="q3">q3 · 标准 c5，召回 c5、c6，答错</option><option value="none">新增题 · 无标准证据，仍给出断言</option></select></label> <button type="button" id="rag-reveal">核对排查顺序</button>',"q2 和 q3 来自本课代码。先判断是没找到证据、找到了却答错，还是应当拒答。");
  if(l.id==="S3-U08")return wrap("卷积与池化怎样改变图像尺寸",'<label>卷积核 <select id="cnn-kernel"><option>3</option><option>5</option></select></label> <label>步长 <select id="cnn-stride"><option>1</option><option>2</option></select></label> <label>填充 <select id="cnn-padding"><option>0</option><option selected>1</option><option>2</option></select></label>',"输入为 28 × 28 的单通道图像，卷积输出 8 通道，膨胀率为 1。后面固定接 2 × 2、步长 2 的最大池化。先预测，再切换参数核对。");
  if(l.id==="S3-U06")return wrap("批次大小不同时，怎样算总体准确率",'<label><input id="third-batch" type="checkbox">加入第三批（2 / 4）</label>',"先预测加一批后总体准确率，再对照讲义里的汇总代码。每个样本权重相同，所以用总正确数除以总样本数。");
  if(l.id==="S6-U05")return wrap("请求经过哪一关才会调用函数",'<label>模拟请求 <select id="tool-case"><option value="valid">已注册工具，count = 3</option><option value="bad-count">已注册工具，count = 0</option><option value="unknown">未知工具，count = 3</option></select></label>',"教学演示只模拟检查顺序，不连接模型。选择一种请求，判断执行器会在哪一步停下。");
  if(l.id==="S1-U08")return wrap("先预测哪些列表会一起变",'<label>建立 b 的方式 <select id="copy-kind"><option value="alias">b = a</option><option value="shallow">b = a.copy()</option><option value="deep">b = deepcopy(a)</option></select></label> <label>操作 <select id="copy-operation"><option value="outer">b.append([9])</option><option value="inner">b[0].append(9)</option></select></label> <button id="copy-reveal" type="button">看结果</button>',"每次从 a = [[1], [2]] 开始。预测 a 会不会跟着变，再看结果。");
  if(l.id==="S2-U03")return wrap("同一段代码从哪个目录找文件",'<label>终端当前位置 <select id="cwd-choice"><option>项目</option><option>上一级</option></select></label> <label>路径写法 <select id="path-kind"><option value="relative">Path("data.csv")</option><option value="script">Path(__file__).parent / "data.csv"</option></select></label>',"设 report.py 和 data.csv 都在项目目录。点击两个选项对照查找位置，再回到 VS Code 检查实际终端目录。");
  if(l.id==="S3-M01")return wrap("同一份数据，两种填充值",'<label><input id="fit-all" type="checkbox">拟合时混入验证集</label>',"训练已观测值是 2 和 4，验证已观测值是 90。切换后观察验证集怎样改变训练阶段本应独立得出的规则。");
  if(l.id==="S3-U03")return wrap("同一个 x 走两条路，梯度相加",'<label>x <input id="branch-x" type="range" min="-3" max="3" step=".5" value="2"></label>',"标量图 y=x×x+x。沿 u=x×x 的贡献为 2x，直接路径贡献为 1，总梯度为 2x+1。这里只展示局部链式关系，不运行自动求导库。");
  if(l.id==="S4-U01")return wrap("把下一词元与填充位置分开",'<label><input id="padding-short" type="checkbox" checked>第二条序列较短，需要填充</label>',"示意词元 ID，0 是本例 padding，−100 是本例损失忽略值。表格手动错位用于理解目标；实际 CausalLM 接口可能内部错位，不能重复操作。");
  if(l.id==="S5-U04")return wrap("把模型原文交给程序核验",'<label>模拟响应 <select id="prompt-response"><option value="valid">字段和证据符合约定</option><option value="unsupported">证据在原文中找不到</option><option value="missing">缺少 evidence 字段</option><option value="syntax">JSON 后面追加说明</option></select></label>',"输入固定为「物流很快，但商品损坏了」。任务约定优先评价商品，label 只能取正面、负面、中性。证据核验只检查非空片段是否来自原文，标签是否正确仍需和标准答案比较。");
  if(l.id==="S5-U05")return wrap("格式通过，答案仍可能错",'<label>模型原响应 <select id="response-case"><option value="correct">合法 JSON、标签正确</option><option value="wrong">合法 JSON、标签错误</option><option value="syntax">不是 JSON</option><option value="field">JSON 合法、字段类型错误</option></select></label>',"同一条真实标签 positive 的样例：依次检查 JSON 语法、对象与字段、允许取值，最后才比较标签。失败样本仍留在总分母里。");
  if(l.id==="S6-E03")return wrap("有实验，没有运行：连接后会发生什么",'<label>连接类型 <select id="join-kind"><option value="left">LEFT JOIN</option><option value="inner">INNER JOIN</option></select></label> <label><input id="join-run" type="checkbox">给 pending 增加一次分数 0.5 的运行</label>',"网页按三组教学记录计算对应查询结果，不连接 MySQL。COUNT(r.id) 统计实际运行，AVG 忽略无匹配的 NULL；后续到本机执行相同 SQL。");

  if(l.id==="S3-M02")return wrap("移动拟合直线，观察每个误差",'<label>斜率 w <input id="fit-w" type="range" min="0" max="3" step=".1" value=".5"></label> <label>截距 b <input id="fit-b" type="range" min="-2" max="2" step=".1" value="0"></label>',"四个观测点为 (1,2)、(2,3)、(3,5)、(4,6)。竖线是预测与真实值的差，MSE 是四个平方误差的平均；手动调参之后再学习优化器怎样自动更新。");
  if(l.id==="S3-M04")return wrap("改变阈值，比较漏报与误报",'<label>判为正类的阈值 <input id="metric-threshold" type="range" min="0" max="1" step=".05" value=".5"></label>',"固定预测概率 [0.9,0.7,0.6,0.4,0.3,0.1]，真实标签 [1,0,1,1,0,0]；概率 ≥ 阈值时预测为正。这里不重新训练模型，变化只来自决策阈值。");

  if(l.id==="S1-U05")return wrap("一轮一轮看字典累加",'<button id="word-step">处理下一个词</button> <button id="word-reset">重新开始</button>',"固定文本 Python AI Python：每处理一项，观察旧次数如何变成新次数。图解与本课 Python 使用相同计数逻辑。");
  if(["S2-U04","S2-U05"].includes(l.id))return wrap("广播不是把维度随意凑在一起",'<label>B 的形状 <select id="broadcast-shape"><option value="1,3">[1, 3]</option><option value="2,1">[2, 1]</option><option value="2,2">[2, 2]（不兼容）</option></select></label>',"A 固定为 [[1,2,3],[4,5,6]]，形状 [2,3]；从尾部对齐，维度必须相等或其中一个为 1。这里显示逐元素相加，不是矩阵乘法。");
  if(["S3-U03","S3-U04"].includes(l.id))return wrap("看一次参数更新怎样改变损失",'<label>w <input id="gradient-w" type="range" min="-1" max="4" step=".05" value=".5"></label> <button id="gradient-step">做一步梯度下降</button>',"单样本 x=2，目标 y=4，预测 ŷ=w×x，损失 L=(ŷ−y)²，学习率 0.1。先算梯度，再更新参数；这不是完整网络训练。");
  if(["S4-U03","S4-U06"].includes(l.id))return wrap("从分数、掩码到加权结果",'<label>查询位置 <select id="query-position"><option value="0">位置 0</option><option value="1" selected>位置 1</option><option value="2">位置 2</option></select></label> <label><input id="causal-enabled" type="checkbox" checked>因果掩码</label> <label><input id="change-last-value" type="checkbox">改位置 2 的 V 为 [8,1]</label>',"单头示例：Q=K=[[1,0],[0,1],[1,1]]，V=[[1,0],[0,2],[2,1]]。分数除以 √2，再屏蔽未来位置、softmax，最后按权重加权 V；省略学习投影和多头拼接。");
  if(l.id==="S5-U03")return wrap("温度改变概率分布",'<label>温度 <input id="temperature" type="range" min=".2" max="2" step=".1" value="1"></label>',"教学 logits=[3,2,1]，按 softmax(logits/T) 计算三个候选的概率。它只说明采样分布，不执行真实语言模型，也不承诺输出质量随温度单调变化。");
  if(l.id==="S6-U02")return wrap("检索到的资料决定回答依据",'<label>检索问题 <input id="retrieval-query" value="python 函数 参数"></label> <label>每段词数 <select id="chunk-size"><option>3</option><option selected>6</option></select></label>',"这个本地示意采用词项重合评分，分词按空白，非 embedding 检索。先看评分与原文，再去本课 VS Code 实践运行真实向量检索。");
  if(l.id==="S6-U03")return wrap("追踪一条证据怎样进入答案",'<label>检索结果 <select id="rag-evidence"><option value="hit">命中 c1</option><option value="missing">未找到依据</option></select></label>',"保持问题不变，切换检索结果。模拟回答使用课内的规则函数。到 VS Code 换成真实模型后，逐条核对回答与所引资料。");
  return "";
 }
 function bars(values,labels){
  return '<svg viewBox="0 0 650 150" role="img" aria-label="计算结果">'+values.map((p,i)=>'<text x="0" y="'+(25+i*45)+'" font-size="13">'+labels[i]+'</text><rect x="100" y="'+(8+i*45)+'" width="'+(p*450)+'" height="28" rx="3" fill="#82b098"/><text x="'+(110+p*450)+'" y="'+(26+i*45)+'" font-size="12">'+num(p)+'</text>').join("")+'</svg>';
 }
 function wire(){
  const out=el("demo-result");if(!out)return;
  if(el("generator-next")){
   const words=["AI","Python","RAG"];
   let position=0;
   el("generator-reset").onclick=()=>{
    position=0;
    out.textContent="新生成器还没有取出任何值。";
   };
   el("generator-next").onclick=()=>{
    if(position===words.length){
     out.textContent="已耗尽。next() 会得到 StopIteration，for 循环会结束。";
     return;
    }
    const word=words[position++];
    out.textContent="yield "+word+"（长度 "+word.length+"），已取 "+position+" / "+words.length+" 项。";
   };
   el("generator-reset").onclick();
  }
  if(el("target-class")){
   const logits=[2,1,0];
   const exp=logits.map(score=>Math.exp(score-2));
   const total=exp.reduce((sum,value)=>sum+value,0);
   const probabilities=exp.map(value=>value/total);
   const update=()=>{
    const target=Number(el("target-class").value);
    out.textContent="概率 ["+probabilities.map(num).join(", ")+"]，预测类别 0。真实类别 "+target+
     " 的概率是 "+num(probabilities[target])+"，交叉熵 −ln(p) = "+num(-Math.log(probabilities[target]))+"。";
   };
   el("target-class").onchange=update;
   update();
  }
  if(el("head-count")){
   const update=()=>{
    const heads=Number(el("head-count").value);
    const width=6/heads;
    out.textContent=Number.isInteger(width)
     ? "输入 [1,3,6] → 拆分 [1,3,"+heads+","+width+"] → 换轴 [1,"+heads+",3,"+width+
       "] → 换回并拼接 [1,3,6]。轴顺序是批次、头、词元、每头维度。"
     : "六维不能均分给四个头。先检查隐藏维度能否整除头数。";
   };
   el("head-count").onchange=update;
   update();
  }
  if(el("agent-budget")){
   let step=0;
   const reset=()=>{
    step=0;
    el("agent-next").disabled=false;
    out.textContent="待执行。观察记录 []。";
   };
   el("agent-next").onclick=()=>{
    step++;
    const exhausted=Number(el("agent-budget").value)===1;
    out.textContent=step===1
     ? "第 1 步：double(6) → 12，观察记录 [12]。"+(exhausted?"步数用完，尚无最终答案。":"还可以执行下一步。")
     : "第 2 步：产生最终答案，停止。观察记录 [12]。";
    el("agent-next").disabled=exhausted||step===2;
   };
   el("agent-budget").onchange=reset;
   el("agent-reset").onclick=reset;
   reset();
  }
  if(el("prompt-response")){
   const source="物流很快，但商品损坏了";
   const responses={
    valid:'{"label":"负面","evidence":"商品损坏了"}',
    unsupported:'{"label":"负面","evidence":"商家拒绝退款"}',
    missing:'{"label":"负面"}',
    syntax:'{"label":"负面","evidence":"商品损坏了"} 以上是分类结果'
   };
   out.innerHTML='<pre></pre><p role="status"></p>';
   const update=()=>{
    const raw=responses[el("prompt-response").value];
    let verdict;
    try{
     const value=JSON.parse(raw);
     if(!["正面","负面","中性"].includes(value.label)||typeof value.evidence!=="string"||!value.evidence.trim()){
      verdict="JSON 可解析 → 字段校验失败。检查 label 取值和 evidence 是否为非空文本。";
     }else{
      verdict=source.includes(value.evidence)
       ?"JSON 可解析 → 字段有效 → 证据核验通过。下一步比较标签与标准答案。"
       :"JSON 可解析 → 字段有效 → 证据核验失败。这个片段没有出现在输入原文中。";
     }
    }catch{
     verdict="JSON 解析失败。额外说明和对象一起交给 json.loads 时会出错。";
    }
    out.firstElementChild.textContent=raw;
    out.lastElementChild.textContent=verdict;
   };
   el("prompt-response").onchange=update;
   update();
  }
  if(el("rag-evidence")){
   out.innerHTML='<pre role="status"></pre>';
   const update=()=>{
    const hit=el("rag-evidence").value==="hit";
    const context=hit?"[c1] 列表 copy 创建浅拷贝\n来源：notes.md":"（没有可用片段）";
    const answer=hit?"列表 copy 创建浅拷贝 [c1]":"资料不足，暂时无法回答。";
    out.firstElementChild.textContent="问题：列表 copy 做了什么？\n\n模型上下文\n"+context+"\n\n模拟答案\n"+answer;
   };
   el("rag-evidence").onchange=update;
   update();
  }

  if(el("token-pad-short")){
   const update=()=>{
    const short=el("token-pad-short").checked;
    out.innerHTML='<table class="metric-table"><thead><tr><th>样本</th><th>input_ids</th><th>attention_mask</th></tr></thead>'+
     '<tbody><tr><th>第一条</th><td>[4, 5, 6]</td><td>[1, 1, 1]</td></tr>'+
     '<tr><th>第二条</th><td>'+(short?'[7, 0, 0]':'[7, 8, 9]')+'</td><td>'+
     (short?'[1, 0, 0]':'[1, 1, 1]')+'</td></tr></tbody></table>'+
     '<p>批次形状 [2, 3]，有效位置共 '+(short?4:6)+' 个。</p>';
   };
   el("token-pad-short").onchange=update;
   update();
  }
  if(el("rag-diagnosis")){
   const outcomes={
    q2:"先查检索。c3 没进入候选，先看切分、关键词和召回数量。",
    q3:"先查生成与证据使用。c5 已召回，核对它是否进入提示，以及引用能否支持答案。",
    none:"单独查拒答表现。题目没有标准证据，查看模型是否说明证据不足。"
   };
   const reset=()=>{out.textContent="先在心里选一个要检查的步骤。";};
   el("rag-diagnosis").onchange=reset;
   el("rag-reveal").onclick=()=>{out.textContent=outcomes[el("rag-diagnosis").value];};
   reset();
  }
  if(el("cnn-kernel")){
   const update=()=>{
    const kernel=Number(el("cnn-kernel").value);
    const stride=Number(el("cnn-stride").value);
    const padding=Number(el("cnn-padding").value);
    const conv=Math.floor((28+2*padding-kernel)/stride)+1;
    const pool=Math.floor((conv-2)/2)+1;
    out.textContent="输入 [N, 1, 28, 28] → 卷积 [N, 8, "+conv+", "+conv+
     "] → 池化 [N, 8, "+pool+", "+pool+"] → 展平 [N, "+(8*pool*pool)+"]";
   };
   for(const id of ["cnn-kernel","cnn-stride","cnn-padding"])el(id).onchange=update;
   update();
  }
  if(el("third-batch")){
   const update=()=>{
    const rows=[[2,2],[1,3]];
    if(el("third-batch").checked)rows.push([2,4]);
    const correct=rows.reduce((n,[hits])=>n+hits,0);
    const total=rows.reduce((n,[,size])=>n+size,0);
    const mean=rows.reduce((n,[hits,size])=>n+hits/size,0)/rows.length;
    out.innerHTML='<table class="metric-table"><thead><tr><th>批次</th><th>正确数 / 样本数</th></tr></thead><tbody>'+
     rows.map(([hits,size],i)=>'<tr><th>'+(i+1)+'</th><td>'+hits+' / '+size+'</td></tr>').join("")+
     '</tbody></table><p><strong>总体准确率 '+correct+' / '+total+' = '+num(correct/total)+
     '</strong>。直接平均各批准确率会得到 '+num(mean)+'。</p>';
   };
   el("third-batch").onchange=update;
   update();
  }
  if(el("tool-case")){
   const update=()=>{
    const kind=el("tool-case").value;
    const steps=["检查工具名"];
    if(kind==="unknown")steps.push("拒绝：工具未注册");
    else{
     steps.push("进入 average，检查 count");
     if(kind==="bad-count")steps.push("拒绝：count 必须大于 0");
     else steps.push("计算 240 / 3 = 80","将结果交还模型");
    }
    out.textContent=steps.join(" → ");
   };
   el("tool-case").onchange=update;
   update();
  }
  if(el("copy-kind")){
   const hide=()=>{out.textContent="先想一想 a 的外层和第一项分别指向哪里。";};
   el("copy-kind").onchange=hide;
   el("copy-operation").onchange=hide;
   el("copy-reveal").onclick=()=>{
    const a=[[1],[2]];
    const kind=el("copy-kind").value;
    const b=kind==="alias"?a:kind==="shallow"?a.slice():a.map(row=>row.slice());
    if(el("copy-operation").value==="outer")b.push([9]);
    else b[0].push(9);
    out.textContent="a = "+JSON.stringify(a)+"；b = "+JSON.stringify(b)+
     "。外层"+(a===b?"共享":"独立")+"，第一项"+(a[0]===b[0]?"共享":"独立")+"。";
   };
   hide();
  }
  if(el("cwd-choice")){
   const update=()=>{
    const inProject=el("cwd-choice").value==="项目"||el("path-kind").value==="script";
    out.textContent=inProject?"查找 项目/data.csv，找到文件。":"查找 上一级/data.csv，找不到项目里的文件。";
   };
   el("cwd-choice").onchange=update;
   el("path-kind").onchange=update;
   update();
  }
  if(el("fit-all")){
   const update=()=>{
    const all=el("fit-all").checked;
    out.innerHTML=all?"<p>拟合用到 [2, 4, 90] → 均值 <strong>32</strong> → 填补缺失值。验证数据参与了规则拟合。</p>"
     :"<p>拟合只用 [2, 4] → 均值 <strong>3</strong> → 用同一规则填补训练集和验证集的缺失值。</p>";
   };
   el("fit-all").onchange=update;
   update();
  }
  if(el("branch-x")){
   const update=()=>{const x=+el("branch-x").value,u=x*x,y=u+x;
    out.innerHTML='<svg viewBox="0 0 620 175" role="img" aria-label="共享变量的两条求导路径"><path d="M100 85L230 35L425 85M100 85L425 85" fill="none" stroke="#698174" stroke-width="2"/><rect x="5" y="60" width="95" height="50" rx="5" fill="#e8f2ed"/><text x="52" y="90" text-anchor="middle">x='+x+'</text><rect x="220" y="10" width="120" height="50" rx="5" fill="#eaf0f8"/><text x="280" y="40" text-anchor="middle">u=x²='+num(u)+'</text><rect x="425" y="60" width="185" height="50" rx="5" fill="#f0edf7"/><text x="517" y="90" text-anchor="middle">y=u+x='+num(y)+'</text><text x="150" y="145" font-size="13">经过 u：'+num(2*x)+'</text><text x="350" y="145" font-size="13">直接路径：1</text></svg><p>总梯度 dy/dx = '+num(2*x)+' + 1 = <strong>'+num(2*x+1)+'</strong></p>'};
   el("branch-x").oninput=update;el("branch-x").onchange=update;update();
  }
  if(el("padding-short")){
   const update=()=>{const short=el("padding-short").checked;
    out.innerHTML='<table class="metric-table"><caption>先明确哪些位置是真实训练对</caption><thead><tr><th>样本</th><th>输入 ID</th><th>下一项标签</th><th>注意力掩码</th></tr></thead><tbody><tr><td>1</td><td>[4, 5]</td><td>[5, 6]</td><td>[1, 1]</td></tr><tr><td>2</td><td>[7, '+(short?'0':'8')+']</td><td>[8, '+(short?'<strong>−100</strong>':'9')+']</td><td>[1, '+(short?'0':'1')+']</td></tr></tbody></table><p>有效目标位置：'+(short?'3 / 4':'4 / 4')+'。注意力掩码控制可读输入；损失忽略值控制哪些目标参与误差平均。</p>'};
   el("padding-short").onchange=update;update();
  }
  if(el("response-case")){
   const update=()=>{const text={correct:'{"label":"positive"}',wrong:'{"label":"negative"}',syntax:'positive',field:'{"label":[]}'}[el("response-case").value];let parsed,label,valid=false,syntax=true;
    try{parsed=JSON.parse(text);label=parsed&&typeof parsed==="object"&&!Array.isArray(parsed)?parsed.label:undefined;valid=typeof label==="string"&&["positive","negative"].includes(label)}catch{syntax=false}
    out.innerHTML='<pre>原响应：'+text+'\n真实标签：positive\nJSON 可解析：'+syntax+'\n字段与取值有效：'+valid+'\n任务正确：'+(valid&&label==="positive")+'</pre><p>任务正确数 / 总数 = '+(valid&&label==="positive"?'1':'0')+' / 1；不能把格式错误样本从分母中删去。</p>'};
   el("response-case").onchange=update;update();
  }
  if(el("join-kind")){
   const update=()=>{const added=el("join-run").checked,left=el("join-kind").value==="left",rows=[["baseline",[.6,.8]],["revised",[.9]],["pending",added?[.5]:[]]].filter(([,scores])=>left||scores.length);
    out.innerHTML='<table class="metric-table"><caption>按实验分组后的教学查询结果</caption><thead><tr><th>name</th><th>COUNT(r.id)</th><th>AVG(score)</th><th>COUNT(*)</th></tr></thead><tbody>'+rows.map(([name,a])=>'<tr><td>'+name+'</td><td>'+a.length+'</td><td>'+(a.length?num(a.reduce((x,y)=>x+y,0)/a.length):'NULL')+'</td><td>'+Math.max(1,a.length)+'</td></tr>').join("")+'</tbody></table><p>'+(left?'LEFT JOIN 保留没有运行的实验；无匹配行的平均数不是 0。':'INNER JOIN 只保留存在匹配运行的实验。')+'</p>'};
   el("join-kind").onchange=update;el("join-run").onchange=update;update();
  }
  if(el("fit-w")){
   const update=()=>{let w=+el("fit-w").value,b=+el("fit-b").value,points=[[1,2],[2,3],[3,5],[4,6]],mse=points.reduce((s,[x,y])=>s+(w*x+b-y)**2,0)/points.length;
    const sx=x=>50+x*110,sy=y=>260-y*16;
    let svg='<svg viewBox="0 0 580 300" role="img" aria-label="观测点与预测直线"><path d="M50 15V260H560" stroke="#68746e" fill="none"/><text x="550" y="285">x</text><text x="15" y="25">y</text>';
    for(let i=0;i<=4;i++)svg+='<text x="'+sx(i)+'" y="282" text-anchor="middle" font-size="12">'+i+'</text>';
    for(let y=0;y<=14;y+=2)svg+='<text x="35" y="'+(sy(y)+4)+'" text-anchor="end" font-size="12">'+y+'</text>';
    svg+='<path d="M'+sx(0)+' '+sy(b)+' L'+sx(4.5)+' '+sy(4.5*w+b)+'" stroke="#236b59" stroke-width="2"/>';
    svg+=points.map(([x,y])=>'<path d="M'+sx(x)+' '+sy(y)+'V'+sy(w*x+b)+'" stroke="#b86c42" stroke-dasharray="4 3"/><circle cx="'+sx(x)+'" cy="'+sy(y)+'" r="5" fill="#294e3b"/>').join("");
    out.innerHTML='<p>ŷ = '+num(w)+'x + '+num(b)+'；MSE = '+num(mse)+'</p>'+svg+'</svg><pre>'+points.map(([x,y])=>'x='+x+'，真实='+y+'，预测='+num(w*x+b)+'，平方误差='+num((w*x+b-y)**2)).join("\n")+'</pre>'};
   el("fit-w").oninput=update;el("fit-b").oninput=update;el("fit-w").onchange=update;el("fit-b").onchange=update;update();
  }
  if(el("metric-threshold")){
   const update=()=>{let t=+el("metric-threshold").value,p=[.9,.7,.6,.4,.3,.1],labels=[1,0,1,1,0,0],tp=0,fp=0,fn=0,tn=0;
    p.forEach((v,i)=>{if(v>=t){if(labels[i])tp++;else fp++}else{if(labels[i])fn++;else tn++}});
    const precision=tp+fp?num(tp/(tp+fp)):"未定义（没有预测正类）",recall=tp+fn?num(tp/(tp+fn)):"未定义（没有真实正类）";
    out.innerHTML='<p>阈值 = '+num(t)+'；预测 = ['+p.map(v=>v>=t?1:0).join(", ")+']</p><table class="metric-table"><caption>混淆矩阵：行是真实类别，列是预测类别</caption><thead><tr><th></th><th>预测正</th><th>预测负</th></tr></thead><tbody><tr><th>真实正</th><td>TP = '+tp+'</td><td>FN = '+fn+'</td></tr><tr><th>真实负</th><td>FP = '+fp+'</td><td>TN = '+tn+'</td></tr></tbody></table><p>Precision = TP / (TP + FP) = '+precision+'<br>Recall = TP / (TP + FN) = '+recall+'<br>Accuracy = (TP + TN) / 6 = '+num((tp+tn)/6)+'</p>'};
   el("metric-threshold").oninput=update;el("metric-threshold").onchange=update;update();
  }
  if(el("word-step")){
   const words=["python","ai","python"];let i=0,counts={};
   const update=()=>{out.innerHTML='<pre>已处理：'+i+' / 3\n当前词：'+(i?words[i-1]:"尚未开始")+'\n字典：'+JSON.stringify(counts)+'</pre>';el("word-step").disabled=i>=3};
   el("word-step").onclick=()=>{let w=words[i++];counts[w]=(counts[w]||0)+1;update()};
   el("word-reset").onclick=()=>{i=0;counts={};update()};update();
  }
  if(el("broadcast-shape")){
   const update=()=>{let [r,c]=el("broadcast-shape").value.split(",").map(Number);
    if(c!==3&&c!==1){out.innerHTML="<p>不兼容：[2,3] 与 [2,2] 的最后一维 3 和 2 不相等，也都不是 1，不能相加。</p>";return}
    const a=[[1,2,3],[4,5,6]],b=Array.from({length:r},(_,i)=>Array.from({length:c},(_,j)=>(i*c+j+1)*10));
    const result=a.map((row,i)=>row.map((v,j)=>v+b[r===1?0:i][c===1?0:j]));
    out.innerHTML="<pre>A = "+JSON.stringify(a)+"\nB = "+JSON.stringify(b)+"\n结果 = "+JSON.stringify(result)+"\n结果形状：[2,3]</pre>"};
   el("broadcast-shape").onchange=update;update();
  }
  if(el("gradient-w")){
   const update=()=>{let w=+el("gradient-w").value,y=2*w,loss=(y-4)**2,g=4*(y-4);out.innerHTML="<pre>w = "+num(w)+"\n预测 ŷ = "+num(y)+"\n损失 = "+num(loss)+"\n梯度 dL/dw = "+num(g)+"\n下一步 w = w − 0.1 × 梯度 = "+num(w-.1*g)+"</pre>"};
   el("gradient-w").oninput=update;el("gradient-w").onchange=update;
   el("gradient-step").onclick=()=>{let w=+el("gradient-w").value;el("gradient-w").value=w-.4*(2*w-4);update()};update();
  }
  if(el("query-position")){
   const update=()=>{let q=+el("query-position").value,mask=el("causal-enabled").checked;
    const qk=[[1,0],[0,1],[1,1]],v=[[1,0],[0,2],[el("change-last-value").checked?8:2,1]];
    const scores=qk.map(k=>(qk[q][0]*k[0]+qk[q][1]*k[1])/Math.sqrt(2));
    const valid=scores.map((s,i)=>mask&&i>q?-Infinity:s),m=Math.max(...valid),e=valid.map(s=>Math.exp(s-m)),sum=e.reduce((a,b)=>a+b),p=e.map(x=>x/sum);
    const result=[0,1].map(d=>p.reduce((acc,w,i)=>acc+w*v[i][d],0));
    const rows=p.map((weight,i)=>{
     const contribution=v[i].map(value=>num(weight*value));
     return '<tr><th scope="row">'+i+'</th><td>'+num(scores[i])+'</td><td>'+
      (valid[i]===-Infinity?"屏蔽":num(valid[i]))+'</td><td>'+num(weight)+'</td><td>['+
      contribution.join(", ")+']</td></tr>';
    }).join("");
    out.innerHTML='<div class="demo-table-scroll"><table class="metric-table"><thead><tr>'+
     '<th>位置</th><th>缩放分数</th><th>掩码后</th><th>权重</th><th>对输出的贡献</th>'+
     '</tr></thead><tbody>'+rows+'</tbody></table></div>'+
     '<p>各位置贡献相加 → <strong>['+result.map(num).join(", ")+']</strong></p>'};
   el("query-position").onchange=update;el("causal-enabled").onchange=update;el("change-last-value").onchange=update;update();
  }
  if(el("temperature")){
   const update=()=>{let t=+el("temperature").value,s=[3,2,1].map(x=>x/t),m=Math.max(...s),e=s.map(x=>Math.exp(x-m)),sum=e.reduce((a,b)=>a+b);out.innerHTML="<p>温度 T = "+t+"</p>"+bars(e.map(x=>x/sum),["候选 A","候选 B","候选 C"])};
   el("temperature").oninput=update;el("temperature").onchange=update;update();
  }
  if(el("retrieval-query")){
   const docs=["python 函数 使用 参数 和 返回值","python 列表 用于 保存 多个 元素","注意力 通过 权重 聚合 信息"];
   const update=()=>{const tokens=new Set(el("retrieval-query").value.trim().split(/\s+/));
    const size=Number(el("chunk-size").value);
    const chunks=docs.flatMap((doc,i)=>{
     const words=doc.split(" ");
     return Array.from({length:Math.ceil(words.length/size)},(_,j)=>{
      const part=words.slice(j*size,(j+1)*size);
      return {label:(i+1)+"."+(j+1),text:part.join(" "),score:part.filter(w=>tokens.has(w)).length};
     });
    });
    const ranked=chunks.filter(chunk=>chunk.score>0).sort((a,b)=>b.score-a.score).slice(0,2);
    out.innerHTML=ranked.map(r=>"<p>候选片段 "+r.label+" · 分数 "+r.score+"<br>"+r.text+"</p>").join("")+(ranked.length?"<p>下一步应把相关原文连同资料编号送入提示，并检查回答是否真的得到支持。</p>":"<p>没有匹配片段。先换关键词，或根据无证据的情况拒答。</p>")};
   el("retrieval-query").oninput=update;el("chunk-size").onchange=update;update();
  }
 }
 return {render,wire};
})();
