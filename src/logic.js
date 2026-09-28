import {Chess} from 'chess.js';
export function moveSafely(game,from,to){try{return game.move({from,to,promotion:'q'});}catch{return null;}}
export function reply(game){const moves=game.moves({verbose:true}); const preferred=['e5','d5','Nc6','Nf6','Bc5']; const move=preferred.map(s=>moves.find(m=>m.san===s)).find(Boolean)||moves[0]; return move?game.move(move.san):null;}
export function newGame(){return new Chess();}
export function squarePosition(square){return {x:square.charCodeAt(0)-97-3.5,z:3.5-(Number(square[1])-1)};}
export function validRuleMove(rule,symbol,square){return rule.output===symbol&&rule.to===square;}
