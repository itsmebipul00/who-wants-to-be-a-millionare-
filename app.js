var questions= require('./questions.js')
var readlineSync = require('readline-sync')
const chalk = require('chalk')
var score = 0
var highscores= [
  {
    name: 'Bipul',
    score: 10
  },
  {
    name: 'Tunav',
    score: 11
  }
]

function intro(){
  console.log(chalk.black.bgRed.bold('Who wants to be a millionare?\n'))
  var yesNo0= readlineSync.keyInYN('Lets Begin?')
  if(yesNo0){
    start()
  }else{
    intro()
  }
}
intro()

function start(){
  var userName= readlineSync.question('What is your name? ')
  var yesNo1= readlineSync.keyInYN(userName+ ', are you above 18? ')
  var yesNo2= readlineSync.keyInYN(userName+ ', did you score above 6 in the previous round? ')
  var yesNo3= readlineSync.keyInYN(userName+ ', are you willing to donate 10% of your earnings from this show to an NGO? ')

  if(yesNo1===true && yesNo2===true && yesNo3===true){
    console.log('\nYaah! you are qualified to play this game ')
    rules()
    begin()
  }else{
    console.log('\nYou must be above 18 , must have above 6 score and must be willing to donate 10% to start playing who wants to be a millionare. Also enter only y or n other inputs would be considered no.\n\n')
  }
}


function rules(){
    console.log(chalk.blue.bold('******************RULES***************************'))
    console.log('1. You cannot quit the game once entered.')
    console.log('2. There are 12 questions in total, a correct answer carries 1 point, you need atleast 6 points to answer the last 5 questions.')
    console.log('If you answer all qestions correctly you get a million dollars or else you: get no of questions answerd correctly x 10000 dollars')
    console.log(chalk.blue.bold('***************************************************'))
}

function begin(){
  var yesNo3= readlineSync.keyInYN('Are you ready to start the game?')
  if(yesNo3){
    console.log('---------------------------------------------------------')
    questionAnswers()
  }else{
    quit()
  }
}

function quit(){
    var yesNo4= readlineSync.keyInYN('Do you want to quit the game?')
    if(yesNo4){
      process.exit()
    }else{
      begin()
    }
}


function questionAnswers() {
    for(var i=0; i<questions.length; i++){
      if(i>=7 && score< 6) {
        console.log('You won '+ score*10000+' dollars')
        console.log('You need minimum 6 points to qualify the next round')
        process.exit()
      }else if(i>=7 && score>=6){
        play(questions[i].question, questions[i].answer, questions[i].correctAns)
      }else{
        play(questions[i].question, questions[i].answer, questions[i].correctAns)
      }
  }
    if(score<12){
      console.log(chalk.black.bgYellow.bold('You won '+ score*10000+' dollars'))
    }else{
      console.log(chalk.black.bgYellow.bold('You won a million dollars'))
    }
    showScores()
    process.exit()
}

function play(question, options, correctAns){
  var userIndex = readlineSync.keyInSelect(options, question);
  var userIndex= userIndex+1;
  if(userIndex===correctAns){
    console.log('Correct Answer')
    score++
  }else{
    console.log('Incorrect Answer')
  }
  console.log('Current score: ', score)
  console.log(chalk.bold.red('**********************************************************'))
}

function showScores(){
  console.log('Total Score: ', score)
  console.log('If your score is higher than the highscore DM me.\n'+chalk.black.bgGreen.bold('Highscores:'))
  highscores.map(score => console.log(score.name +": "+ score.score))
}
