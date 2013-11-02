/*
* parse_tpl(tpl, data)
* tpl - string with template with {{name.path}} pattern
* data - object with data 
*/

function parse_tpl(tpl, data){
  function c(a,o){var v=o;  for(var i in a){ v=v[a[i]];if(!v)return v; };return v; }  
  return tpl.replace(/{{(.+?)}}/g, function(r,n){ 
    var k = c(n.split('.'),data); 
    return typeof k=='undefined'?'':k;  
  });
}//parse_tpl
