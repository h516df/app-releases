export const INFO = Object.freeze({
  walkpaint: {description:'走过的路，慢慢变成自己的地图。',keywords:'足迹 GPS 地图 探索 记录'},
  jiyixia: {description:'随手记录，把事情和日记留在手机里。',keywords:'文字 记录 日记 事项 备忘'},
  liuzheba: {description:'整理人物、物品与照片，留一份本地档案。',keywords:'档案 照片 视频 分类 标签 记录'},
  xiayizhang: {description:'自己的文字，接着读下一章。',keywords:'阅读 文本 小说'},
  timeworth: {description:'把消费换成时间，看清每一笔的价值。',keywords:'时薪 消费 账单 分期 目标 生活'},
  kaifanla: {description:'关于吃什么的旧项目，保留历史记录。',keywords:'吃饭 餐饮 生活 历史',archived:true}
});
const ID=/^[a-z][a-z0-9-]{0,49}$/;
const SHA=/^[a-f0-9]{64}$/;
const VERSION=/^[0-9]+(?:\.[0-9]+){1,5}$/;
export function parseCatalog(data) {
  if(data?.schemaVersion!==1||data.repositoryId!==1426495445||!Array.isArray(data.apps)||data.apps.length>50)throw Error('应用目录暂时不可用');
  const seen=new Set();
  return data.apps.map(app=>{
    if(!ID.test(app.appId)||seen.has(app.appId)||typeof app.displayName!=='string'||app.displayName.length>60||!app.displayName.trim()||
       app.channels?.stable!==`apps/${app.appId}/stable.json`)throw Error('应用目录资料不完整');
    seen.add(app.appId);
    return {id:app.appId,name:app.displayName,path:app.channels.stable,...(INFO[app.appId]??{description:'查看正式版本与更新说明。',keywords:''})};
  });
}
export function parseRelease(data,app) {
  if(data?.schemaVersion!==1||data.repositoryId!==1426495445||data.appId!==app.id||data.channel!=='stable')throw Error('正式版本资料不匹配');
  if(data.status==='unavailable')return null;
  const r=data.release,a=r?.apk;
  if(data.status!=='published'||typeof data.applicationId!=='string'||!r||!Number.isSafeInteger(r.versionCode)||r.versionCode<1||
     typeof r.versionName!=='string'||!VERSION.test(r.versionName)||r.tag!==`${app.id}-stable-v${r.versionName}`||
     !Number.isSafeInteger(r.releaseId)||r.releaseId<1||!a||!Number.isSafeInteger(a.assetId)||a.assetId<1||
     !Number.isSafeInteger(a.size)||a.size<1||a.size>1024*1024*1024||!SHA.test(a.sha256)||!SHA.test(r.signingCertificateSha256)||
     !Number.isSafeInteger(r.minSdk)||r.minSdk<21||!Array.isArray(r.abis)||!r.abis.length||
     typeof a.fileName!=='string'||!/^[A-Za-z0-9._-]+\.apk$/.test(a.fileName)||
     a.url!==`https://github.com/h516df/app-releases/releases/download/${r.tag}/${a.fileName}`||
     !Number.isFinite(Date.parse(r.publishedAt)))throw Error('正式版本资料不完整');
  return r;
}
export function matches(app,query) {
  const text=`${app.name} ${app.id} ${app.description} ${app.keywords}`.normalize('NFKC').toLowerCase();
  return query.normalize('NFKC').toLowerCase().trim().split(/\s+/).every(word=>text.includes(word));
}
export function sizeLabel(size) { return `${(size/1024/1024).toLocaleString('zh-CN',{maximumFractionDigits:1})} MB`; }
export function releasePage(app) {return `https://github.com/h516df/app-releases/releases?q=${encodeURIComponent(app.id+'-stable-')}`;}
export function androidLabel(sdk) {const versions={21:'5.0',22:'5.1',23:'6.0',24:'7.0',25:'7.1',26:'8.0',27:'8.1',28:'9',29:'10',30:'11',31:'12',32:'12L',33:'13',34:'14',35:'15',36:'16'};return versions[sdk]?`Android ${versions[sdk]} 及以上`:`Android API ${sdk} 及以上`;}
