//
// Load Test question pool
//

function QuestionPoolParser(url){
  var self = this;
  self.StateEnum = {
    READY : 0,
    SUBELEMENT : 1,
    SECTION : 2,
    QUESTION_HEADER: 3,
    QUESTION : 4,
    ANSWERS : 5
  };

  self.state = self.StateEnum.READY;
  self.class = '';
  self.test = {
    name: url,
    url: url,
    subElements: {}
  };

  self.parsingSubElement = null;
  self.parsingSection = null;
  self.parsingQuestionHeader = null;

  self.parseLine = function(line){
    //var line = lineInput.replace(/�/g, '-' );
    //console.log('input: ' +lineInput);
    //console.log('replaced: '+line);
    var startState = self.state;
    switch (self.state) {
      default:
      case self.StateEnum.SUBELEMENT:
      case self.StateEnum.SECTION:
        if( self.parseSubElement(line)){
          self.state = self.StateEnum.SUBELEMENT;
          console.log(self.state);
          return;
        }

        if( self.parseQuestionHeader(line)) {
          self.state = self.StateEnum.QUESTION;
          console.log(self.state);
          return;
        }

        // section
        if( self.parseSection(line) ){
          self.state = self.StateEnum.SECTION;
          console.log(self.state);
          return;
        }
        break;

      case self.StateEnum.QUESTION:
        if( self.parseQuestion(line))
          self.state = self.StateEnum.ANSWERS;
        break;

      case self.StateEnum.ANSWERS:
        if( !self.parseAnswer(line))
          self.state = self.StateEnum.SECTION;
        break;
    }

    console.log(self.state);
  };

  self.subElementRegExp = /SUBELEMENT ([A-Z]\d+)\s(.*)/;
  self.parseSubElement = function( line ) {
    var match = self.subElementRegExp.exec( line );
    if( match == undefined )
      return false;

    self.parsingSubElement = {
      description: match[2],
      sections: {}
    };
    self.test.subElements[match[1]] = self.parsingSubElement;
    return true;
  };

  self.sectionRegExp = new RegExp(/(.*?) (.*) (.*)/);
  self.parseSection = function( line ){
    var match = self.sectionRegExp.exec(line);
    if( match == undefined )
      return false;

    // start of a new section
    self.parsingSection = {
      description: match[2],
      questions: {}
    };

    self.parsingSubElement.sections[match[1]] = self.parsingSection;

    return true;
  };

  self.questionHeaderRegExp = new RegExp(/(.*?) \(([A-Z])\)\s*(.*)/)
  self.parseQuestionHeader = function(line){
    var match = self.questionHeaderRegExp.exec(line);
    if( match == undefined)
      return false;

    self.parsingQuestion = {
      question: '',
      sourceSection: '',
      answer: match[2],
      choices: {}
    };

    self.parsingSection.questions[match[1]] = self.parsingQuestion;
    return true;
  };

  self.parseQuestion = function(line){
    self.parsingQuestion.question = line;
    return true;
  };

  self.answerRegExp = new RegExp(/^([A-Z])\..*?\s(.*)/);
  self.answersEndRegExp = new RegExp(/^~~$/);
  self.parseAnswer = function(line){
    var match = self.answerRegExp.exec( line );
    if( match != null ) {
      self.parsingQuestion.choices[match[1]] = match[2];
      return true;
    }

    return self.answersEndRegExp.test(line);
  };
};

module.exports = QuestionPoolParser;
