/*
serial sync FLOW - execute serial functions step by step with error catching

new flow(
  [arg1, arg2, ...], //optional arguments to first function 
  [
    function(fn, arg1, ...){ ... fn(err, res1, ...) ... }, //serial steps
    function(fn, res1, ...){ ... fn(err, res2, ...) ... },
    function(fn, res2, ...){ ... fn(err, res3, ...) ... },
  ]
  ,function(err, result){ console.log('RES',err,arguments)  } 
  //optional finish callback. 
  //err != null if was error on some step
  //result - array of all steps [ [res1,...], [res2,...], ...]
)

*/

flow = function(a,b,c){
    var arg=[], qu=[], cnt=0;
    var resultFn, result_data=[];
    if(arguments.length==1){ qu=a; }//flow(q)
    if(b instanceof Array){ arg=a;qu=b;resultFn=c||resultFn; }//flow(a,q[,f])
    if(typeof(b)=='function'){qu=a;resultFn=b; }//flow(q,f)
    
    var fn = function(err){
        arg = [].slice.call(arguments,0);
        arg[0]=fn;
        if(resultFn && cnt>0)result_data.push(arg.slice(1));
        if(qu[cnt] && !err){            
            try{qu[cnt].apply(this, arg); }catch(e){ err=e; }
        }
        if(resultFn &&(err|| !qu[cnt])){
            result_data.unshift(err);
            resultFn.apply(this,result_data);
        }
        cnt++;
    };
    arg.unshift(null);
    fn.apply(this,arg);
}

