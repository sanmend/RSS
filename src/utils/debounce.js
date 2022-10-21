//防抖
export const debounce= function (fn,wait,immediate){
  let timer
  return function(...arg){
    timer&&clearTimeout(timer)
    if(immediate){
      if(!timer){
        fn.apply(this,arg)
      }
      timer=setTimeout(() => {
        timer=null
      }, wait);
    }else{
      timer=setTimeout(() => {
        fn.apply(this,arg)
      }, wait);
    }
  }
}