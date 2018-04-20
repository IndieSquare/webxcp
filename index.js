const ProviderEngine = require('web3-provider-engine')
const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js')
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js')
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js')
const VmSubprovider = require('web3-provider-engine/subproviders/vm.js')
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js')
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js')
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js')

CURRENT_TASK = null;

CURRENT_CALLBACK = null;

CLEAR_TASK = function(){ 

 CURRENT_TASK = null;

}
CLEAR_CALLBACK = function(error){

   CURRENT_CALLBACK(error,null);

}

START_CALLBACK = function(response){


CLEAR_TASK();

try{

    var data = JSON.parse(response);
    

    if(CURRENT_CALLBACK != null){

    if(data.chain == "eth"){

      if(data.type == "getAccount"){

     
          CURRENT_CALLBACK(null,[data.data]);

        
         
      }
      else if(data.type == "signMessage"){
 
          CURRENT_CALLBACK(null,data.data);
         
      }
      else if(data.type == "signTransaction"){
 
          CURRENT_CALLBACK(null,data.data);
         
      }
      else if(data.type == "sendTransaction"){
 
          CURRENT_CALLBACK(null,data.data);
         
      }

      }
      else if(data.chain = "XCP"){
      if(data.type == "getAccount"){

        
          CURRENT_CALLBACK(null,data.data);
 
         
      }
      else if(data.type == "signMessage"){
 
          CURRENT_CALLBACK(null,data.data);
         
      }
      else if(data.type == "signTransaction"){
 
          CURRENT_CALLBACK(null,data.data);
         
      }

      }

    }
    else{
      return "callback null";
    }

  }
  catch(e){
     console.error("callback error",e);
     return "error "+e;
  }
  

}
 

GET_CURRENT_TASK = function(){

if(CURRENT_TASK == null){
    return null;
}
   
  var currentTaskCopy = CURRENT_TASK+"";
  CURRENT_TASK = null;
  return currentTaskCopy;
   
}
  
 Web3 = require('web3')

 try{

var engine = new ProviderEngine()
 web3 = new Web3(engine)
 
  
 engine.addProvider(new HookedWalletSubprovider({
  getAccounts: function(cb){
      
       CURRENT_TASK = JSON.stringify({
        "chain":"eth",
        "type":"getAccount",
       });

       CURRENT_CALLBACK = cb;
       
      
    },
    signMessage: function(data,cb){
    
       CURRENT_TASK = JSON.stringify({
       "chain":"eth",
        "type":"signMessage",
        "data":data
       });
        

        CURRENT_CALLBACK = cb;
       
       
      
    },
    signTransaction: function(data,cb){
    
       CURRENT_TASK = JSON.stringify({
        "chain":"eth",
        "type":"signTransaction",
        "data":data
       });
        

        CURRENT_CALLBACK = cb;
       
       
      
    } 


    

}))


    web3.eth.sendTransaction = function(data,cb){
    
       CURRENT_TASK = JSON.stringify({
        "chain":"eth",
        "type":"sendTransaction",
        "data":data
       });
        

        CURRENT_CALLBACK = cb;
        
    } 


// data source
engine.addProvider(new RpcSubprovider({
  rpcUrl: 'add rpc url',
}))
 

// network connectivity error
engine.on('error', function(err){
  // report connectivity errors
  console.error(err.stack)
})


engine.start();
 
 
}
catch(e){
  console.error(e);
  
}

try{

  

 webXCP = [];
  
  
  webXCP.getAccounts = function(basePath = null,cb){
      
       CURRENT_TASK = JSON.stringify({
       "chain":"XCP",
        "type":"getAccount",
        "basePath":basePath
       });

        

       CURRENT_CALLBACK = cb;
       
      
    };
    webXCP.signMessage = function(basePath = null,data,cb){


    
       CURRENT_TASK = JSON.stringify({
       "chain":"XCP",
        "type":"signMessage",
        "data":data,
        "basePath":basePath
       });


        CURRENT_CALLBACK = cb;
       
       
      
    };
     webXCP.signTransaction = function(basePath = null,data,cb){
    
       CURRENT_TASK = JSON.stringify({
        "chain":"XCP",
        "type":"signTransaction",
        "data":data,
        "basePath":basePath
       });
        

        CURRENT_CALLBACK = cb;
       
       
      
    } 

 
}
catch(e){
  console.error(e);
  alert(e);
}