export function debounce(func,delay=50) {
  let timer = null
  return function (...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      // func.apply(f1,args),this指f1，即function f1(...args)
      func.apply(this,args)
    },delay)
  }
}

export function formatDate(date, fmt) {
  //1.获取年份  date.getFullYear() + ''转成字符串
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';    //str为空时，长度为1
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {    //补成两位数显示
  return ('00' + str).substr(str.length);
};
