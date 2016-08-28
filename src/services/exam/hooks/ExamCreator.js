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

// TODO: seed random number generator
//
function createRandomTest( test, questionPool ){
   test.pool = questionPool;
   test.questions = [];

   for( var e =0; e <  questionPool.subElements.length; ++e )
   {
     var ele = questionPool.subElements[e];
     console.log( `subElement: ${ele.id}` );
     for( var s =0; s < ele.sections.length; ++s )
     {
       var section = ele.sections[s];

       console.log( `subSection: ${section.id}` );
       // pick a random question
       var pick = parseInt(section.questions.length * Math.random());
       var question = section.questions[pick];
       var q = Object.assign( {}, question.toObject() );
       console.log(q);

       var answer = q.choices[q.answer];
       q.answer = -1;

       // randomize the choices
       shuffle(q.choices);

       // reassign answer
       for( var i = 0; i < q.choices.length; ++i){
         if( answer === q.choices[i])
          q.answer = i;
       }

       //console.log(q);
       test.questions.push( q );
     }
   }

  console.log(test.questions.length);
};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    //hook.data.randomTest = true;
    var testpool = hook.app.service('/questionpools');
    console.log('Creating random test for hook: ' + JSON.stringify(hook, null, 2));

    return new Promise( (resolve, reject) => {
      testpool
        .get(hook.data.pool)
        .then( pool => {
          //console.log('Creating random test from: ' + JSON.stringify(res, null, 2));

          if( pool == undefined){
            //throw new Error( "No test pools found for: "+hook.data.pool);
            hook.data = "No test pools found for: "+hook.data.pool;
            reject(hook);
            return;
          }

          createRandomTest( hook.data, pool );
          resolve(hook);
        }).catch(function(error) {
          //throw new Error( error.stack );
          console.error(error.stack);
        });
      });
  };
};
