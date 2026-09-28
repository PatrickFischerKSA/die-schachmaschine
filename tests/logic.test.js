import test from 'node:test';import assert from 'node:assert/strict';
import {newGame,moveSafely,reply,validRuleMove,squarePosition} from '../src/logic.js';
import {rules} from '../src/content.js';
test('Opening alternates legal human and machine moves',()=>{const g=newGame();assert.equal(moveSafely(g,'e2','e4').san,'e4');assert.equal(reply(g).san,'e5');assert.equal(moveSafely(g,'g1','f3').san,'Nf3');assert.ok(reply(g));assert.equal(g.history().length,4);assert.equal(g.turn(),'w');});
test('Illegal move preserves position',()=>{const g=newGame(),fen=g.fen();assert.equal(moveSafely(g,'e2','e5'),null);assert.equal(g.fen(),fen);});
test('Rules require both the matching symbol and destination',()=>{for(const r of rules){assert.ok(validRuleMove(r,r.output,r.to));assert.ok(!validRuleMove(r,r.input,r.to));assert.ok(!validRuleMove(r,r.output,'a1'));}});
test('Board coordinates preserve orientation',()=>{assert.deepEqual(squarePosition('a1'),{x:-3.5,z:3.5});assert.deepEqual(squarePosition('h8'),{x:3.5,z:-3.5});});
