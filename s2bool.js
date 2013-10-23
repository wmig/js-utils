/*
* s2bool(val) Convert Stringifit (val) boolean or other type to real boolean 
* val - any type 
*/

function s2bool(val){
  return val?!/^(|null|false|NaN|undefined|0+)$/.test(val):val;
}
