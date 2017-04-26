#!/usr/bin/env node

const program = require('commander');
var fs = require('fs');
var myJson = require('./records.json');


//`$ store add mykey myvalue`
program
  .command('add <mykey> [myvalue]')
  .description('adds a new key value pair')
  .action(function(mykey, myvalue){
    if(myJson.hasOwnProperty(mykey)){
      console.log('Key aready exits!');
    }else{
      myJson[mykey]=myvalue;
      console.log('Record added!');
    }
    fs.writeFile( "./records.json", JSON.stringify(myJson), function (err) {
      if (err) throw err;
      });
  })

//`$ store list`
program
  .command('list')
  .description('lists all key value pairs')
  .action(function(){
    //console.log('Here are all the saved key value pairs...');
    for(var mykey in myJson) {
       console.log("Key: %s, Value:  %s", mykey, myJson[mykey]);
    }
  })

//`$ store get mykey`
program
  .command('get <mykey>')
  .description('returns the assoicated mykey myvalue pair')
  .action(function(mykey){
    if(myJson.hasOwnProperty(mykey)){
      console.log("Key: %s, Value:  %s", mykey, myJson[mykey]);
    }else{
      console.log('Key does not exist!');
    }

  })

//`$ store remove mykey`
program
  .command('remove <mykey>')
  .description('removes a new key value pair')
  .action(function(mykey){
    if(myJson.hasOwnProperty(mykey)){
      delete myJson[mykey];
      console.log('Record removed: %s', mykey);
    }else{
      console.log('Key does not exist!');
    }
    fs.writeFile( "./records.json", JSON.stringify(myJson), function (err) {
      if (err) throw err;
      console.log(JSON.stringify(myJson));
      });

  })

program.parse(process.argv);
