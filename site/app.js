const stages={S1:"Python 基础",S2:"工程与科学计算",S3:"机器学习与深度学习",S4:"序列与 Transformer",S5:"大模型基础与实践",S6:"RAG 与 Agent"};
const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const localRoot="D:/学习/个人学习";
const practiceFolders={S1:"01_Python基础",S2:"02_Python工程与科学计算",S3:"03_PyTorch与深度学习基础",S4:"04_序列与Transformer",S5:"05_大模型基础与实践",S6:"06_RAG与Agent入门"};
function localPracticePath(l,project=false){const folder=practiceFolders[l.stage];return project?localRoot+"/"+folder+"/03_项目/"+l.stage+"-P01_"+l.project.title+"/动手版/我的项目.py":localRoot+"/"+folder+"/02_练习/"+l.id+"/我的练习.py";}
function localLessonUrl(l){return "http://127.0.0.1:19867/#"+l.id;}
function setPracticeTarget(l,project=false){const path=localPracticePath(l,project);$("vscode-path").textContent=path.replaceAll("/", "\\");$("vscode-link").href="vscode://file/"+encodeURI(path);$("vscode-link").textContent=project?"直接打开阶段项目文件 ↗":"直接打开练习文件 ↗";$("local-site-link").href=localLessonUrl(l);}
let course=[],current,samples=[],busy=false,pythonWorker=null,pythonReady=null,pythonSeq=0,pythonRequest=null,pythonTimer=null,loadTimer=null;
const storage={get(k){try{return localStorage.getItem("zhixing:"+k)}catch{return null}},set(k,v){try{localStorage.setItem("zhixing:"+k,v)}catch{}}};
const progressUrl="http://127.0.0.1:19868";
function readProgress(){try{const p=JSON.parse(storage.get("progress")||"{}");return {records:p.records||{},events:p.events||[],updatedAt:p.updatedAt||null}}catch{return {records:{},events:[],updatedAt:null}}}
let progressData=readProgress(),progressConnected=false;
const progressLabels={learning:"学习中",practice:"需补练",independent:"初步掌握",reuse:"稳定掌握"};
function inline(t){return esc(t).replace(/\x60([^\x60]+)\x60/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noreferrer">$1</a>');}
function markdown(text){
 let html="",paragraph=[],inCode=false,code=[],lang="",list=false;
 const flush=()=>{if(paragraph.length){html+="<p>"+inline(paragraph.join(" "))+"</p>";paragraph=[]}};
 const close=()=>{if(list){html+="</ul>";list=false}};
 for(const line of text.split("\n")){
  const fence=line.match(/^(?:~~~|\x60{3})(.*)$/);
  if(fence){flush();close();if(!inCode){inCode=true;lang=fence[1].trim();code=[]}else{let raw=code.join("\n"),i=samples.push(raw)-1;html+='<div class="code-sample"><pre>'+esc(raw)+'</pre>'+(/^(python|py)(?:$|\s)/i.test(lang)?'<button data-sample="'+i+'">在练习区修改并运行 ↗</button>':"")+"</div>";inCode=false}continue;}
  if(inCode){code.push(line);continue;}
  if(/^#{1,4}\s/.test(line)){flush();close();html+="<h3>"+inline(line.replace(/^#+\s*/,""))+"</h3>";continue;}
  if(/^\s*[-*]\s/.test(line)){flush();if(!list){html+="<ul>";list=true}html+="<li>"+inline(line.replace(/^\s*[-*]\s/,""))+"</li>";continue;}
  if(!line.trim()){flush();close();continue;}close();paragraph.push(line);
 }
 flush();close();if(inCode)html+='<pre>'+esc(code.join("\n"))+'</pre>';return html;
}
function flow(labels,caption){
 const bw=(650-12*(labels.length-1))/labels.length;
 let svg='<svg viewBox="0 0 650 100" role="img" aria-label="'+esc(caption)+'"><defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#698174"/></marker></defs>';
 labels.forEach((label,i)=>{let x=i*(bw+12);svg+='<rect x="'+(x+1)+'" y="20" width="'+(bw-2)+'" height="56" rx="5" fill="'+(i===labels.length-1?"#dcebdc":"#eef2eb")+'" stroke="#d3dfd1"/><text x="'+(x+bw/2)+'" y="53" text-anchor="middle" font-size="13" fill="#294e3b">'+esc(label)+'</text>';if(i<labels.length-1)svg+='<path d="M'+(x+bw)+' 48h10" stroke="#698174" marker-end="url(#arrow)"/>';});
 return '<figure class="figure">'+svg+"</svg><figcaption>"+esc(caption)+"</figcaption></figure>";
}
function diagram(l){
 const custom=window.StudyDemos?.render(l);if(custom)return custom;
 if(l.id==="S1-U04")return '<figure class="figure"><div class="slider-row"><label>起点 <input id="slice-start" type="number" min="-5" max="5" value="1"></label><label>终点 <input id="slice-stop" type="number" min="-5" max="6" value="4"></label></div><div id="slice-view"></div><figcaption>改变边界，看 numbers[start:stop] 选中哪些位置；步长固定为 1，终点不包含。</figcaption></figure>';
 if(l.id==="S1-U08")return '<figure class="figure"><svg viewBox="0 0 650 160" role="img" aria-label="赋值与浅拷贝引用关系"><text x="15" y="30">a</text><text x="15" y="75">b = a</text><path d="M85 26L220 50M85 70L220 50" stroke="#567363"/><rect x="220" y="28" width="150" height="48" rx="5" fill="#dcebdc"/><text x="295" y="58" text-anchor="middle">外层列表 A</text><text x="15" y="135">c = a.copy()</text><path d="M130 130h90" stroke="#567363"/><rect x="220" y="106" width="150" height="42" rx="5" fill="#eef2eb"/><text x="295" y="132" text-anchor="middle">外层列表 B</text><path d="M370 50L490 80M370 125L490 80" stroke="#567363"/><rect x="490" y="58" width="150" height="45" rx="5" fill="#e8eee1"/><text x="565" y="86" text-anchor="middle">共享的内层对象</text></svg><figcaption>赋值共享外层；浅拷贝换了外层，却仍可能共享内层。修改哪一层，决定谁会看见变化。</figcaption></figure>';
 if(l.id==="S4-U03")return '<figure class="figure"><div class="slider-row"><label>第一个相关性分数 <input id="score" type="range" min="-3" max="5" step=".25" value="1"></label><span id="score-value">1</span></div><div id="attention-view"></div><figcaption>交互示意：softmax([分数, 1, 0]) 转为和为 1 的权重；本图只解释权重，不代表完整多头注意力。</figcaption></figure>';
 const byId={
 "S2-U02":[["函数与参数","对象方法","迭代协议","还原简写"],"先看输入输出与调用关系，再读注解、生成器和装饰器。"],
 "S2-U03":[["选择解释器","核对 pip","运行脚本","断点观察"],"环境决定能导入哪些包；调试器帮助检查实际变量。"],
 "S3-M01":[["划分数据","仅训练集 fit","分别 transform","Pipeline 预测"],"验证集、测试集不能参与均值、标准差或编码规则的拟合。"],
 "S3-M03":[["一个特征","选择分割阈值","形成左右分支","叶节点预测"],"深树可以记住训练细节；深度选择要看验证结果。"],
 "S3-M05":[["缩放特征","选择簇数 / 维数","拟合训练数据","检查结果"],"聚类发现相似结构，PCA 保留方差方向；两者都不自动产生业务标签。"],
 "S6-E03":[["Python 客户端","连接 MySQL","参数化 SQL","提交 / 回滚"],"MySQL 作为独立服务保存数据；连接、事务与关系查询各有职责。"],
 "S6-E01":[["实验记录","参数化 SQL","事务提交","条件查询"],"将文件中的记录保存为表；查询条件与写入操作要区分。"],
 "S6-E02":[["HTTP 请求","验证 JSON","调用函数","JSON 响应"],"路由决定哪个函数处理请求，验证先于业务处理。"],
 "S1-U01":[["源代码 .py","Python 解释器","实际输出"],"编辑器写代码，解释器执行，终端展示输出。"],
 "S1-U02":[["input 字符串","类型转换","数字运算","格式化输出"],"先确认类型，再判断数值计算与文本操作。"],
 "S1-U03":[["读取一个值","检查条件","执行分支","继续下一项"],"循环提供数据，条件决定这一轮做什么。"],
 "S1-U05":[["文本","lower / split","遍历单词","字典累加"],"旧知识串成第一个可用的词频处理过程。"],
 "S1-U06":[["词频字典","items 键值对","key 排序","编号显示"],"保留计数逻辑，改善结果组织。"],
 "S1-U07":[["实参 text","形参绑定","函数处理","return 结果"],"print 面向阅读者，return 把对象交回后续程序。"],
 "S1-U09":[["UTF-8 文件","字符串","统计函数","JSON 文件"],"输入来源改变时，统计函数继续复用。"],
 "S1-U10":[["main.py 入口","导入 textstats","调用函数","保存结果"],"文件围绕职责划分，区分导入和直接运行。"],
 "S2-U01":[["类的定义","创建实例","self 关联实例","调用方法"],"类组织数据与操作；不同实例可以有自己的状态。"],
 "S2-U04":[["列表数据","数组与 dtype","shape / 索引","复制或视图"],"先明确形状，再判断修改共享了哪一层数据。"],
 "S2-U05":[["检查 shape","对齐尾部维度","广播规则","逐元素结果"],"逐元素运算与矩阵乘法使用不同的形状规则。"],
 "S3-U03":[["输入 x","前向计算 y","损失 L","链式法则 dL/dx"],"梯度说明局部变化率；更新参数是后续单独的一步。"],
 "S3-U08":[["模型与配置","保存状态","重新构建模型","加载后预测"],"权重文件不自动说明所有运行条件，配置与数据处理同样需要保留。"],
 "S5-U04":[["明确任务","给出示例","约束输出","固定样例比较"],"提示的变化需要用相同标准比较，不能只挑成功结果。"],
 "S6-U05":[["模型请求工具","检查参数","执行 Python 函数","结果回传"],"提出调用的是模型，实际运行函数的是程序。"],
 "S6-U06":[["读取状态","选择动作","执行工具","观察结果","结束或继续"],"每一轮检查停止条件，不能把无限循环当成自主能力。"]};
 const defaults={
 S4:[["词元与表示","注意力模块","前馈与残差","输出"],"先标出输入形状，再把各个模块连接起来。"],
 S1:[["已有数据","处理规则","结果"],"用清楚的步骤完成当前问题。"],
 S2:[["原始数据","检查清理","数组 / 表格","统计图形"],"文件、函数与模块继续组织新的数据操作。"],
 S3:[["数据批次","模型预测","损失","梯度","参数更新"],"训练循环：参数更新针对训练数据，评价使用留出数据。"],
 S5:[["文本模板","tokenizer","模型推理","解码","固定评价"],"推理不等于训练；沿用前面的基准与数据划分。"],
 S6:[["问题","检索资料","组织上下文","模型回答","检查依据"],"普通 RAG 需要资料与回答相互对应，工具调用在此基础上增加。"]};
 const f=byId[l.id]||defaults[l.stage];return flow(f[0],f[1]);
}
function wireDiagram(){
 window.StudyDemos?.wire();
 if($("slice-start")){const update=()=>{let a=+$("slice-start").value,b=+$("slice-stop").value,norm=n=>Math.min(5,Math.max(0,n<0?5+n:n)),s=norm(a),e=norm(b);$("slice-view").innerHTML='<svg viewBox="0 0 650 100" role="img" aria-label="切片选中位置">'+[10,20,30,40,50].map((n,i)=>'<rect x="'+(i*128+2)+'" y="15" width="115" height="48" rx="4" fill="'+(i>=s&&i<e?"#bad5b8":"#eef2eb")+'"/><text x="'+(i*128+59)+'" y="45" text-anchor="middle">'+n+'</text><text x="'+(i*128+59)+'" y="88" text-anchor="middle" fill="#7b8e80" font-size="12">索引 '+i+'</text>').join("")+"</svg>"};$("slice-start").oninput=update;$("slice-stop").oninput=update;update();}
 if($("score")){const update=()=>{let v=+$("score").value,m=Math.max(v,1),raw=[v,1,0].map(n=>Math.exp(n-m)),sum=raw.reduce((a,b)=>a+b);$("score-value").textContent=v;$("attention-view").innerHTML='<svg viewBox="0 0 650 130" role="img" aria-label="注意力权重">'+raw.map((n,i)=>{let p=n/sum;return '<text x="0" y="'+(25+i*42)+'" font-size="13">位置 '+i+'</text><rect x="65" y="'+(8+i*42)+'" width="'+(p*475)+'" height="26" rx="3" fill="#82b098"/><text x="'+(75+p*475)+'" y="'+(25+i*42)+'" font-size="12">'+p.toFixed(3)+'</text>'}).join("")+"</svg>"};$("score").oninput=update;update();}
}
function nav(query=""){
 const filtered=course.filter(l=>(l.id+" "+l.title+" "+l.lead+" "+l.body).toLowerCase().includes(query.toLowerCase()));
 $("course-nav").innerHTML=Object.keys(stages).map(s=>{
  let items=filtered.filter(l=>l.stage===s);
  if(!items.length)return "";
  let expanded=Boolean(query)||current?.stage===s,panel="stage-list-"+s;
  return '<section class="stage"><button class="stage-toggle" data-stage="'+s+'" aria-expanded="'+expanded+'" aria-controls="'+panel+'">'+s+' / '+stages[s]+' ('+items.length+')</button><div id="'+panel+'" '+(!expanded?'hidden':"")+'>'+items.map(l=>{const status=progressData.records[l.id]?.status;return '<button class="lesson-link '+(l.id===current?.id?"active":"")+'" data-id="'+l.id+'"><span>'+l.id+(l.id.includes("-E")?" · 选修":"")+(status?' · '+esc(status):'')+'</span>'+esc(l.title)+'</button>'}).join("")+'</div></section>';
 }).join("");
}
function setCourseOpen(open){document.body.classList.toggle("course-open",open);$("menu-toggle").setAttribute("aria-expanded",String(open));}
function setLabOpen(open){document.body.classList.toggle("lab-open",open);$("toggle-lab").setAttribute("aria-expanded",String(open));$("toggle-lab").textContent=open?"返回讲义":"打开练习区";}
function files(items){$("file-list").innerHTML=Object.entries(items).map(([n,b])=>'<p><strong>'+esc(n)+'</strong></p><pre class="file-content">'+esc(b)+'</pre>').join("")||"<p>本课没有预置文件，可在代码中创建小文件。</p>";}
function readingBody(lesson){const html=markdown(lesson.body),anchor=lesson.visualAfter?"<h3>"+inline(lesson.visualAfter)+"</h3>":"<h3>",at=html.indexOf(anchor);const next=html.indexOf("<h3>",at+anchor.length);return next<0?html+diagram(lesson):html.slice(0,next)+diagram(lesson)+html.slice(next);}
function progressHintLabel(value){return ({none:"未用提示",partial:"使用了部分提示",full:"看过完整示例/答案"})[value]||"未记录提示情况";}
function progressTime(value){const date=new Date(value);return Number.isNaN(date.valueOf())?value:date.toLocaleString("zh-CN",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"});}
function progressPanel(l){const record=progressData.records[l.id],status=record?.status||"尚未记录",statusClass={"学习中":"progress-learning","需补练":"progress-practice","初步掌握":"progress-initial","稳定掌握":"progress-stable"}[status]||"",canReuse=status==="初步掌握"||status==="稳定掌握",practiceCount=(progressData.events||[]).filter(event=>event.lessonId===l.id&&event.action==="practice").length,last=record?'<aside class="progress-last"><strong>上次记录 · '+esc(progressTime(record.updatedAt||""))+'</strong><p>'+esc(record.note||"没有填写依据或卡点。")+'</p><small>'+progressHintLabel(record.hintLevel)+(practiceCount?' · 本课已记录 '+practiceCount+' 次补练':'')+'</small></aside>':'';return '<section class="progress-card"><div class="progress-heading"><h2>本课学习记录</h2><span class="progress-badge '+statusClass+'">'+esc(status)+'</span></div><p>此记录会影响下一步推荐。网站读取状态、提示级别和补练次数；文字卡点留作下次继续分析，不以阅读或运行示例自动判定掌握。</p>'+last+'<label for="progress-note">本次依据或卡点 <span>补练写遇到的具体问题；独立完成写你自己做成了什么</span></label><textarea id="progress-note" rows="2" maxlength="1000" placeholder="例如：循环结束后列表长度不对，我还没定位是哪次更新出错"></textarea><label for="progress-hint">本次提示使用情况 <span>如标记独立完成或稳定复用，必须选择“未用提示”</span></label><select id="progress-hint"><option value="">选择本次提示使用情况</option><option value="none">未用提示</option><option value="partial">使用了部分提示</option><option value="full">看过完整示例/答案</option></select><div class="progress-actions"><button data-progress-action="learning">继续学习</button><button data-progress-action="practice">需要补练</button><button data-progress-action="independent">本次独立完成</button><button data-progress-action="reuse" '+(!canReuse?'disabled title="先记录一次未使用提示的独立完成，再在后续任务中独立复用。"':'')+'>后续任务复用成功</button></div><p class="progress-rule">“本次独立完成”和“后续任务复用成功”要求至少 8 个字的真实证据；使用了提示就记录为“需要补练”。</p><p id="progress-message" class="progress-message" aria-live="polite">'+(progressConnected?'已连接本机记录助手，数据只写入本机。':'先启动本机助手，再点右上角“同步本机记录”。')+'</p></section>';}
function refreshProgressViews(){nav($("search").value);if(current){const note=$("reading").querySelector("#progress-note")?.value||"",hint=$("reading").querySelector("#progress-hint")?.value||"",panel=$("reading").querySelector(".progress-card");if(panel){panel.outerHTML=progressPanel(current);$("reading").querySelector("#progress-note").value=note;$("reading").querySelector("#progress-hint").value=hint;}}else showMap();}
async function connectProgress(){const status=$("sync-status"),message=$("progress-message");status.textContent="正在连接…";if(message)message.textContent="正在读取本机学习记录…";try{const response=await fetch(progressUrl+"/api/progress",{method:"GET",cache:"no-store",credentials:"omit"});const data=await response.json();if(!response.ok||data.version!==1)throw new Error(data.error||"助手版本不匹配");progressData={records:data.records||{},events:data.events||[],updatedAt:data.updatedAt||null};progressConnected=true;storage.set("progress",JSON.stringify(progressData));status.textContent="已连接本机";status.className="sync-connected";status.title="本机助手已连接；学习记录只保存在本机。";$("connect-progress").textContent="刷新本机记录";refreshProgressViews();const hint=$("progress-message");if(hint)hint.textContent="已从本机读取学习记录；记录仍保存在电脑中。";return true;}catch(error){progressConnected=false;status.textContent="未连接";status.className="sync-disconnected";status.title="先双击 00_学习管理/进度同步助手/启动学习进度助手.bat 并允许浏览器访问本机网络。";if(message)message.textContent=(error.message&&error.message!=="Failed to fetch"?error.message+"。":"连接失败。")+"请确认本机“学习进度同步助手”正在运行，并允许网站访问本机网络。课程阅读和练习仍可继续。";return false;}}
async function saveProgress(action){if(!current)return;const note=$("progress-note")?.value.trim()||"",hintLevel=$("progress-hint")?.value||"";if(["practice","independent","reuse"].includes(action)&&note.length<8){$("progress-message").textContent="请至少写 8 个字，记录具体卡点或本次独立完成的证据。";$("progress-note").focus();return;}if(["practice","independent","reuse"].includes(action)&&!hintLevel){$("progress-message").textContent="请选择本次提示使用情况，方便后续判断这项知识是否能独立使用。";$("progress-hint").focus();return;}if(["independent","reuse"].includes(action)&&hintLevel!=="none"){ $("progress-message").textContent="使用提示后完成不能记作独立掌握；请改记为“需要补练”，并保留提示级别。";$("progress-hint").focus();return;}if(!progressConnected&&!await connectProgress())return;const message=$("progress-message");message.textContent="正在保存本次学习记录…";try{const response=await fetch(progressUrl+"/api/progress",{method:"POST",cache:"no-store",credentials:"omit",headers:{"Content-Type":"application/json"},body:JSON.stringify({lessonId:current.id,action,note,hintLevel})});const data=await response.json();if(!response.ok)throw new Error(data.error||"保存失败");progressData=data.progress;storage.set("progress",JSON.stringify(progressData));$("progress-note").value="";$("progress-hint").value="";refreshProgressViews();const updated=$("progress-message");if(updated)updated.textContent="已保存到本机 · "+(progressLabels[action]||"学习记录")+(data.warning?"；Markdown 摘要未能更新，请检查文件占用。":"");}catch(error){if(error instanceof TypeError){progressConnected=false;$("sync-status").textContent="未连接";$("sync-status").className="sync-disconnected";$("connect-progress").textContent="同步本机记录";}const updated=$("progress-message");if(updated)updated.textContent=error.message||"保存失败。请确认本机助手仍在运行后重试。";}}
function resetPythonWorker(error){clearTimeout(pythonTimer);clearTimeout(loadTimer);pythonWorker?.terminate();pythonWorker=null;pythonReady=null;const request=pythonRequest;pythonRequest=null;if(request)request.reject(error||new Error("浏览器 Python 已重置。"));}
function ensurePythonWorker(){
 if(pythonReady)return pythonReady;
 pythonWorker=new Worker("./pyodide-worker.js",{type:"module"});
 pythonReady=new Promise((resolve,reject)=>{
  pythonWorker.onmessage=event=>{
   const data=event.data||{};
   if(data.type==="ready"){clearTimeout(loadTimer);resolve();return;}
   if(data.type==="fatal"){reject(new Error(data.error||"Pyodide 加载失败。"));resetPythonWorker();return;}
   if(pythonRequest&&data.id===pythonRequest.id){clearTimeout(pythonTimer);const request=pythonRequest;pythonRequest=null;data.error?request.reject(new Error(data.error)):request.resolve(data.result);}
  };
  pythonWorker.onerror=event=>{const error=new Error(event.message||"浏览器 Python Worker 加载失败。");reject(error);resetPythonWorker(error);};
  loadTimer=setTimeout(()=>{const error=new Error("首次加载 Pyodide 超时，请检查网络后重试。");reject(error);resetPythonWorker(error);},90000);
 });
 return pythonReady;
}
async function executeInPythonWorker(payload){
 await ensurePythonWorker();
 return new Promise((resolve,reject)=>{
  const id=++pythonSeq;pythonRequest={id,resolve,reject};
  pythonTimer=setTimeout(()=>{const error=new Error("执行超过 15 秒，已停止。");error.timeout=true;resetPythonWorker(error);},15000);
  pythonWorker.postMessage({...payload,id});
 });
}
function practiceGuide(l){
 const p=l.practicePlan,j=l.project;if(!p||!j)return "";
 const scripts=Object.keys(l.practiceFiles||{}).filter(name=>name.endsWith(".py"));
 return '<section class="practice-guide"><h2>在 VS Code 完成这一步</h2><p>先在网页练习区完成本课示例和改动任务，再直接打开本机已有实践文件。</p><p><strong>自己修改：</strong>'+esc(p.change)+'</p><p><strong>文件怎么用：</strong>在本机目录中先读“开始实践.md”，从“起始示例.py”复制一份，保留自己的实现。'+(scripts.length?'本课另有 '+scripts.map(n=>'<code>'+esc(n)+'</code>').join('、')+'，按目录中的 README 准备环境，再复制一份改写。':'')+'</p><button data-open="lesson">在 VS Code 打开本课实践</button><p><strong>后面接着用：</strong>'+esc(p.transfer)+'</p><details><summary>阶段项目：'+esc(j.title)+' · '+esc(j.after)+' 后整合</summary><p>'+esc(j.carry)+'</p><p>阶段项目文件已在本机，直接打开动手版即可。</p><button data-open="project">在 VS Code 打开阶段项目</button></details></section>';
}
function showMap(){
 current=null;samples=[];document.body.classList.add("is-map");setLabOpen(false);setCourseOpen(false);
 $("breadcrumb").textContent="学习全景 / 50 必修 · 4 选修";
  $("reading").innerHTML=window.LearningMap.render(course,stages,esc,storage.get("last"),progressData);
 $("open-local-study").disabled=true;$("toggle-lab").hidden=true;nav($("search").value);window.scrollTo(0,0);
}
function show(id){
 if(id==="map"||!id){showMap();return;}
 document.body.classList.remove("is-map");setLabOpen(false);setCourseOpen(false);$("open-local-study").disabled=false;$("toggle-lab").hidden=false;
 const found=course.find(l=>l.id===id);if(!found){if(course.length)show(course[0].id);return;}current=found;samples=[];document.body.dataset.stage=current.stage;
 $("breadcrumb").textContent=stages[current.stage]+" / "+current.id+" · "+course.length+" 课（含选修）";
  $("reading").innerHTML='<div class="eyebrow">'+current.id+' / '+stages[current.stage]+'</div><h1>'+esc(current.title)+'</h1><p class="lead">'+esc(current.lead)+'</p><div class="carry"><strong>接着用：</strong>'+esc(current.prior)+'<br><strong>本次要做到：</strong>'+esc(current.goal)+'</div>'+'<div class="prose">'+readingBody(current)+'</div>'+practiceGuide(current)+'<div class="check"><strong>现在能继续了吗？</strong><br>'+esc(current.check)+'</div>'+progressPanel(current)+'<details class="sources"><summary>本课来源与使用边界</summary><p>本课为针对你重写的讲义。标准库初始实验已执行核对；框架实践需按正文准备环境，不表示已经验证全部外部模型。</p>'+current.sources.map(s=>'<a href="'+esc(s)+'" target="_blank" rel="noreferrer">'+esc(s)+'</a><br>').join("")+'</details><div class="paging"><button id="previous">← 上一课</button><button id="next">下一课 →</button></div>';
 $("code").value=storage.get(current.id)??current.starter;$("stdin").value=storage.get(current.id+":stdin")??current.stdin??"";$("expected").textContent=current.expected;$("task").textContent=current.task;$("hint").textContent=current.hint;$("solution-code").textContent=current.solution;$("solution-code").hidden=true;$("solution").setAttribute("aria-expanded","false");$("output").textContent="先预测，再运行代码。";$("run-status").textContent="代码草稿保存在此浏览器；每次运行使用新的临时目录。";files(current.files||{});
 const i=course.indexOf(current),next=current.id.includes("-E")?course[i+1]:course.slice(i+1).find(l=>!l.id.includes("-E"));
 $("previous").disabled=i===0;$("next").disabled=!next;$("next").textContent=next?"下一课 →":"已到主线末课";
 $("previous").onclick=()=>location.hash=course[i-1].id;$("next").onclick=()=>{if(next)location.hash=next.id};
 
 setPracticeTarget(current);
 $("vscode-status").textContent="路径指向本机已有文件。若浏览器询问，请允许打开 Visual Studio Code。";
 const refs=current.visualRefs||[];
 if(refs.length)$("reading").querySelector(".sources").insertAdjacentHTML("beforebegin",'<details class="sources"><summary>延伸可视化：看另一个具体演示</summary>'+refs.map(r=>'<p><a href="'+esc(r.url)+'" target="_blank" rel="noreferrer">'+esc(r.title)+'</a><br>'+esc(r.reason)+'</p>').join("")+'</details>');
nav($("search").value);wireDiagram();storage.set("last",id);window.scrollTo(0,0);
}
$("course-nav").onclick=e=>{let b=e.target.closest("[data-id]"),s=e.target.closest("[data-stage]");if(b)location.hash=b.dataset.id;else if(s){let panel=s.nextElementSibling;panel.hidden=!panel.hidden;s.setAttribute("aria-expanded",String(!panel.hidden));}};
$("reading").onclick=e=>{let tracked=e.target.closest("[data-progress-action]");if(tracked){saveProgress(tracked.dataset.progressAction);return;}let jump=e.target.closest("[data-map-scroll]");
 if(jump){$("tree-"+jump.dataset.mapScroll).scrollIntoView({block:"start"});return;}
 let projectOpen=e.target.closest("[data-map-open]");
 if(projectOpen){openWorkspace(true,course.find(l=>l.stage===projectOpen.dataset.mapOpen));return;}
 let project=e.target.closest("[data-project-stage]");
 if(project){
  const l=course.find(l=>l.stage===project.dataset.projectStage),j=l.project,box=$("map-project");
  box.hidden=false;box.innerHTML='<h2>'+esc(j.title)+'</h2><p>'+esc(j.carry)+'</p><p>学到 '+esc(j.after)+' 后完成整合。项目文件已在本机目录，可直接打开动手版。</p><button data-map-open="'+l.stage+'">在 VS Code 打开阶段项目</button>';
  box.scrollIntoView({block:"center"});return;
 }
 let open=e.target.closest("[data-open]");if(open){openWorkspace(open.dataset.open==="project");return;}let b=e.target.closest("[data-sample]");if(b){$("code").value=samples[+b.dataset.sample];storage.set(current.id,$("code").value);$("run-status").textContent="已载入讲义片段。需要前文变量的例子请补齐上下文；PyTorch 等本机依赖请在本机学习站或 VS Code 中继续。";$("code").focus();if(innerWidth<1180)setLabOpen(true);}};
$("code").oninput=()=>storage.set(current.id,$("code").value);
$("code").onkeydown=e=>{if(e.key==="Tab"){e.preventDefault();let t=e.target;t.setRangeText("    ",t.selectionStart,t.selectionEnd,"end");storage.set(current.id,t.value)}if((e.ctrlKey||e.metaKey)&&e.key==="Enter"){e.preventDefault();run()}};
async function run(){
 if(busy||!current)return;busy=true;$("run").disabled=true;let id=current.id;$("run-status").textContent="Python 正在执行…";$("output").textContent="";
 try{let data=await executeInPythonWorker({id,code:$("code").value,stdin:$("stdin").value,files:current.files||{}});if(current?.id!==id)return;$("output").textContent=(data.stdout||"")+(data.stderr?"\n"+data.stderr:"")+(data.error?"\n"+data.error:"")||"程序没有打印内容。表达式需要 print 才会显示。";$("run-status").textContent=data.exitCode===0?"执行完成。请试着解释结果，再改一个条件。":"出现 Python 错误：先读最后一行，再找对应代码位置。PyTorch 等本机依赖请转到本机学习站或 VS Code。";files(data.files||{});}
 catch(error){$("run-status").textContent=error.timeout?"执行超过 15 秒，已停止。长任务请在本机学习站或 VS Code 中运行。":"浏览器 Python 未能启动；首次运行需要联网加载 Pyodide，请检查网络后重试。";$("output").textContent=error.message||"浏览器 Python 运行器暂时不可用。"}finally{busy=false;$("run").disabled=false;}
}
$("run").onclick=run;$("reset").onclick=()=>{$("code").value=current.starter;$("stdin").value=current.stdin||"";storage.set(current.id,current.starter);storage.set(current.id+":stdin",current.stdin||"");$("run-status").textContent="已还原初始实验。"};
$("solution").onclick=()=>{const open=$("solution-code").hidden;$("solution-code").hidden=!open;$("solution").setAttribute("aria-expanded",String(open));};$("print").onclick=()=>window.print();$("connect-progress").onclick=connectProgress;
$("toggle-lab").onclick=()=>setLabOpen(!document.body.classList.contains("lab-open"));
$("open-local-study").onclick=()=>{if(current)window.open(localLessonUrl(current),"_blank","noopener,noreferrer");};

$("search").oninput=()=>nav($("search").value);window.onhashchange=()=>show(location.hash.slice(1));
fetch("./content/course.json").then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>{course=data.lessons;$("runtime").textContent="Python · Pyodide";show(location.hash.slice(1)||"map")}).catch(()=>{$("reading").innerHTML='<div class="notice"><h1>课程暂时无法读取</h1><p>请确认网页资源加载完成后刷新。浏览器运行 Python 首次需要联网加载 Pyodide。</p></div>';});

$("stdin").oninput=()=>storage.set(current.id+":stdin",$("stdin").value);
async function openWorkspace(project=false,lesson=current){
 if(!lesson)return;setPracticeTarget(lesson,project);$("vscode-status").textContent="正在打开本机已有文件；如浏览器询问，请选择打开 Visual Studio Code。";window.location.href=$("vscode-link").href;
}
$("open-vscode").onclick=()=>openWorkspace();


$("menu-toggle").onclick=()=>setCourseOpen(!document.body.classList.contains("course-open"));

$("home").onclick=()=>{if(location.hash==="#map")showMap();else location.hash="map"};
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&document.body.classList.contains("lab-open")){setLabOpen(false);$("toggle-lab").focus();}});
