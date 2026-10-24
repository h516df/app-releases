import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseCatalog,parseRelease,matches} from '../site/catalog.mjs';
const root=new URL('../',import.meta.url);
const read=path=>JSON.parse(readFileSync(new URL(path,root),'utf8'));
const catalog=read('catalog.json');
const apps=parseCatalog(catalog);
const app=apps.find(app=>read(app.path).status==='published');
const current=read(app.path);
test('all real catalog entries parse their current stable contract without hardcoded versions',()=>{
  assert.equal(apps.length,catalog.apps.length);
  for(const entry of apps){const raw=read(entry.path);const release=parseRelease(raw,entry);assert.equal(release!==null,raw.status==='published');}
});
test('unavailable channels do not invent a download',()=>{
  const raw={schemaVersion:1,repositoryId:1426495445,appId:app.id,channel:'stable',status:'unavailable'};
  assert.equal(parseRelease(raw,app),null);
});
test('cross-app, invalid digest, zero size and foreign download addresses are rejected',()=>{
  for(const change of [m=>m.appId='different-app',m=>m.release.apk.sha256='invalid',m=>m.release.apk.size=0,
    m=>m.release.apk.url='https://example.invalid/install.apk',m=>m.release.tag='other-stable-v'+m.release.versionName]){
    const copy=structuredClone(current);change(copy);assert.throws(()=>parseRelease(copy,app));
  }
});
test('catalog path traversal and duplicate IDs are rejected',()=>{
  const copy=structuredClone(catalog);copy.apps[0].channels.stable='../private.json';assert.throws(()=>parseCatalog(copy));
  const duplicate=structuredClone(catalog);duplicate.apps.push(duplicate.apps[0]);assert.throws(()=>parseCatalog(duplicate));
});
test('search supports Chinese purpose and normalized Latin text',()=>{
  const journal=apps.find(app=>app.id==='jiyixia');assert(matches(journal,'日记'));
  const time=apps.find(app=>app.id==='timeworth');assert(matches(time,'ＴＩＭＥＷＯＲＴＨ'));assert(!matches(time,'照片'));
});
