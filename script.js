// HTML Elements
let cage = document.getElementsByClassName('monkeyCage')[0]
let vocabEl = document.getElementsByClassName('learnedWords')[0]
// Arrays
let vocabList = []
// Classes
class Monkey {
  constructor(options) {
    options = (options || {})
    this.intelligence = (options.intelligence || 0.1)
    this.speed = (options.speed || 5)

    this.canGuess = true
    let el = document.createElement('span')
    el.classList.add('monkey')
    cage.append(el)
    this.el = el
    let elTxt = document.createElement('span')
    // elTxt.classList.add('monkey')
    this.el.append(elTxt)
    this.elTxt = elTxt
    this.newWord()
  }
  newWord() {
    this.stop()
    this.word = randomFrom(wordList)
    if (vocabList.includes(this.word)) {
      setTimeout(() => {this.newWord()},500)
    } else {
      this.letters = new Array(2)
      this.guessing = false
      for (let i = 0; i < this.word.length; i++) {
        this.letters[i] = randomFrom('alphabet')
      }
      this.canGuess = true
    }
  }
  start() {
    this.canGuess = true
    this.guess()
  }
  stop() {
    this.canGuess = false
  }
  guess() {
    if (!this.canGuess) {
      return
    }
    this.elTxt.innerHTML = ''
    let correctWord = true
    let correctNum = 0
    for (let i = 0; i < this.word.length; i++) {
      if (this.letters[i] != this.word[i]){
        let letterGuess = randomFrom(alphabet)
        if (Math.random() > this.intelligence) {
          while (letterGuess == this.word[i]) {
            letterGuess = randomFrom(alphabet)
          }
        } else {
          letterGuess = this.word[i]
        }
        this.letters[i] = letterGuess
      }
      let letter = document.createElement('code')
      if (this.letters[i] == this.word[i]) {
        letter.classList.add('correct')
        correctNum++
      } else {
        letter.classList.add('incorrect')
        correctWord = false
      }
      // letter.classList.add(correct ? 'correct' : 'incorrect')
      this.elTxt.style.fontSize = (125/this.word.length)+'px'
      letter.innerText = this.letters[i]
      this.elTxt.append(letter)
    }
    if (!correctWord){
      setTimeout(() => {this.guess()}, 1000/this.speed)
    } else {
      onNewWord(this.word)
      this.newWord()
      setTimeout(() => {this.guess()},1000)
      // this.guess()
    }
  }
}
// functions
function onNewWord(word) {
  vocabList.push(word)
  document.getElementsByTagName('title')[0].innerText = vocabList[vocabList.length-1]
  vocabList = vocabList.sort((a,b)=>{
    if (a > b) {
      return 1
    }
    return -1
  })
  vocabEl.innerHTML = ''
  let section
  for (let i = 0; i < vocabList.length; i++) {
    if (i % 25 == 0) {
      section = document.createElement('span')
      section.classList.add('section')
      vocabEl.append(section)
    }
    let wordEl = document.createElement('p')
    wordEl.innerText = vocabList[i]
    section.append(wordEl)
  }
  // vocabEl.innerText
}

let genOptions = {
  speed: 25,
  intelligence: 0.01
}
let ape1 = new Monkey(genOptions)
ape1.guess()
let ape2 = new Monkey(genOptions)
ape2.guess()
let ape3 = new Monkey(genOptions)
ape3.guess()
let ape4 = new Monkey(genOptions)
ape4.guess()
let ape5 = new Monkey(genOptions)
ape5.guess()
