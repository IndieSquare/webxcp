 # WebXCP

Javascript code for Counterparty webXCP api.

## Rational

Counterparty wallets that conform to the webXCP standard as outlined below and off the ability for web applications to request wallet specific functions. For example a web app may want the users wallet to sign a transaction or request the users address.
Such a set up allows secure wallets to be built that store the users private keys nativley (in an iOS app / Android app / chrome extension etc) whilst also allowing applications to be built for the web browser. Once such example is a simple game developed in HTML5 that can be loaded inside of the IndieSquare wallet though the app browser tab and request the users address inorder to utilize the users token balance as game items.

## Example

For developers creating web applications that which to use the web3 standard they can call the following 3 functions to request any listening wallet to perform the requested task.

### Get Users Address

parameters: 
* **basePath** : <string> base path of requested address or null to get wallets default account 
  
* **callback** : callback function with error and address
```
webXCP.getAccounts(null,(err, address) => {
    if(err != null){
      //handle error
    }else 
     console.log(address);
    }
});

webXCP.getAccounts("m/0'/0/2",(err, address) => {
    if(err != null){
      //handle error
    }else 
     console.log(address);
    }
});

```

### Request Sign Message

parameters: 
* **basePath** : <string> base path of key pair to sign with or null to use the wallets default key pair 

* **message** : <string> message to sign 

* **callback** : callback function with error and signature
```
webXCP.signMessage(msg,null,(err, signature) => {
    if(err != null){
      //handle error
    }else 
     console.log(signature);
    }
});

```

### Request Sign Transaction

parameters: 
* **basePath** : <string> base path of key pair to sign with or null to use the wallets default key pair 

* **rawtx** : <string> raw transaction to sign 

* **callback** : callback function with error and the signed transaction
```
webXCP.signTransaction(rawtx,null,(err, result) => {
    if(err != null){
      //handle error
    }else 
     console.log(result.raw);
    }
});

```
