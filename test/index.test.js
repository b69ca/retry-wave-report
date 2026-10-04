import test from 'node:test';import assert from 'node:assert/strict';import { analyze } from '../src/index.js';
test('detects synchronized clients',()=>{const rows=['a','b','c'].map((client,i)=>({timestamp:i*10,operation:'pay',client,attempt:2}));const r=analyze(rows);assert.equal(r.waveCount,1);assert.equal(r.waves[0].clientCount,3)});
test('ignores initial attempts',()=>assert.equal(analyze([{timestamp:0,operation:'x',client:'a',attempt:1}]).retryCount,0));
test('separates distant clusters',()=>{const rows=[0,10,2000,2010].map((timestamp,i)=>({timestamp,operation:'x',client:String(i),attempt:2}));assert.equal(analyze(rows,{minClients:2,windowMs:100}).waveCount,2)});
test('does not count repeated events from one client as a wave',()=>{const rows=[0,10,20].map(timestamp=>({timestamp,operation:'x',client:'a',attempt:2}));assert.equal(analyze(rows).waveCount,0)});
