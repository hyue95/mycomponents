export function startMove(obj, json, endFn){
  clearInterval(obj.timer)
  obj.timer = setInterval(() => {
    let bBtn = true;	
			for(let attr in json){				
				let iCur = 0;			
				if(attr == 'opacity'){
					if(Math.round(parseFloat(getStyle(obj,attr)) * 100) == 0){
					  iCur = Math.round(parseFloat(getStyle(obj,attr)) * 100);				
					}else{
						iCur = Math.round(parseFloat(getStyle(obj,attr)) * 100) || 100;
					}	
				}
				else{
					iCur = parseInt(getStyle(obj,attr)) || 0;
				}				
				let iSpeed = (json[attr] - iCur) / 8;
			  iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur != json[attr]){
					bBtn = false;
				}				
				if(attr == 'opacity'){
					obj.style.filter = `alpha(opacity=${iCur + iSpeed})`;
					obj.style.opacity = (iCur + iSpeed) / 100;					
				}
				else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}				
			}			
			if(bBtn){
				clearInterval(obj.timer);				
				if(endFn){
					endFn.call(obj);
				}
			}
  }, 30)
}

function getStyle(obj, attr){
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr]
}
