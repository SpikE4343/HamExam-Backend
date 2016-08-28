'use strict';

// src/services/test/hooks/randomTest.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function createRandomTest( questionPool ){
   var test = {
     pool: questionPool._id,
     name: questionPool.name,
     user: 0,
     questions: []
   };

   for( var sub in questionPool.pool )
   {
     console.log( sub );
     var ele  = questionPool.pool[sub];
     for( var section in ele.sections )
     {
       var s = ele.sections[section];
       var qnames = Object.keys(s.questions);
       var nameIndex = parseInt(qnames.length * Math.random());
       var pick = qnames[nameIndex];

       var question = s.questions[pick];
       var q = {
         answer: '',
         choices: []
       };

       // randomize the choices
       for( var c in question.choices )
          q.choices.push ( [c, question.choices[c]]);

       q.answer = '';
       shuffle(q.choices);

       console.log(q);
       test.questions.push( q );
     }
   }

  console.log(test.questions.length);
  return test;
};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    hook.data.randomTest = true;
    var testpool = hook.app.service('/pools');
    console.log('Creating random test for hook: ' + JSON.stringify(hook, null, 2));

    return new Promise( (resolve, reject) => {
      testpool
        .find({ query: { tag: hook.data.pool} })
        .then( res => {
          //console.log('Creating random test from: ' + JSON.stringify(res, null, 2));

          if( res == null || res.total < 1){
            //throw new Error( "No test pools found for: "+hook.data.pool);
            hook.data = "No test pools found for: "+hook.data.pool;
            reject(hook);
            return;
          }

          var test = createRandomTest( res.data[0] );
          hook.data = test;
          hook.data.created = new Date();
          resolve(hook);
        });
      });
  };
};
