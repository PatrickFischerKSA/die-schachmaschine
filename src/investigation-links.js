export const investigationScenes={buehne:[[3,1],[3,5],[4,11]],intrige:[[3,5],[3,8],[4,2],[4,11],[4,13]],julie:[[3,3],[4,9],[4,10]]};
export const investigationTitles={buehne:'Die Maschine sind Sie',intrige:'Wer weiss vom Kasten?',julie:'Die Figur widerspricht'};
export function investigationsFor(page){return Object.keys(investigationScenes).filter(id=>investigationScenes[id].some(([act,scene])=>page.act===act&&page.scene===scene));}
export function requestInvestigation(station){document.dispatchEvent(new CustomEvent('open-investigation',{detail:{station}}));}
