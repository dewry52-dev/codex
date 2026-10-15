// Measured source rectangles keep each generated pose isolated and feet aligned.
export const frames=[{x:22,y:5,w:454,h:479},{x:538,y:14,w:456,h:470},{x:1084,y:10,w:443,h:475},{x:21,y:513,w:469,h:476},{x:554,y:580,w:458,h:409},{x:1078,y:485,w:456,h:486}];
export function pose(p){
  if(p.windup>0)return {frame:4,sx:1.06,sy:.92,bob:0};
  if(!p.ground){const rise=p.vy<0;return {frame:5,sx:rise?.92:1.03,sy:rise?1.09:.96,bob:0};}
  if(p.landAge<.15){const a=1-p.landAge/.15;return {frame:4,sx:1+a*.08,sy:1-a*.06,bob:0};}
  if(p.vx)return {frame:Math.floor(p.runPhase)%4,sx:1,sy:1,bob:-Math.abs(Math.sin(p.runPhase*Math.PI))*3};
  return {frame:-1,sx:1,sy:1,bob:0};
}
