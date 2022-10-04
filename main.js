const startBtn = document.querySelector(".startquiz-btn");
let container = document.querySelector(".container");
let containerQuestionCount = document.querySelector(".question-count");
let timeleft = document.querySelector(".time-left"); 
let timeline = document.querySelector(".session-line")
let questionText = document.querySelector(".question-text");
let optionsText = document.querySelector(".options-text");
let nextBtn = document.querySelector(".nextquest-btn");
let resultSection =document.querySelector(".result-section");

// let index = 0
let qCount = 0
let topq = 1
let timeW = 350
// let timeValue = 20;

function startTimer(time) {
    let tCount = setInterval(timer,1000)
    function timer() {
        timeleft.innerHTML = time
        time = time - 1;
        if (time < 0) {
            

            let correctAns = questions[qCount].answer;
            let allOp = optionsText.children.length;

            for (let i = 0; i < allOp; i++) {
                if (optionsText.children[i].innerHTML == correctAns) {
                    optionsText.children[i].classList.add('correct');
                }
                
            }
            for (let i = 0; i < allOp; i++) {
                optionsText.children[i].style.backgroundColor = 'black'
                optionsText.children[i].style.color = 'white'
                optionsText.children[i].classList.add('disabled')
                
            }
            clearInterval(tCount)
        }
    }
}
function timelinefunc(time) {
    let countline = setInterval(line,43);
    function line() {
        time -- ;
        timeline.style.width = time+"px";
        if (time == 1) {
            clearInterval(countline)
        }
    }
}



// IF START BUTTON
startBtn.addEventListener("click", function() {
    container.style.display = 'block'
    showQuestions(0)
    QuestionCounterDisplay(topq)
    startTimer(15);
    timelinefunc(timeW)
});

// IF NEXT BUTTON
nextBtn.addEventListener('click',()=>{
    if (qCount < questions.length -1) {
        qCount++;
        topq++;
        showQuestions(qCount)
        QuestionCounterDisplay(topq)
        startTimer(15)
        timelinefunc(timeW)
    } else{
        showResults()
    }

})



// function to show questions...
function showQuestions(index) {
    let question_tag = `<span>`+questions[index].number+'.) '+ questions[index].question+`</span>`;
    let options_tag = `<div class="options">`+ questions[index].options[0] + `</div>`+
                    `<div class="options">`+ questions[index].options[1] + `</div>`+
                    `<div class="options">`+ questions[index].options[2] + `</div>`+
                    `<div class="options">`+ questions[index].options[3] + `</div>`;
    questionText.innerHTML = question_tag;
    optionsText.innerHTML = options_tag;            
    const options = optionsText.querySelectorAll(".options");
    for (let index = 0; index < options.length; index++) {
        options[index].setAttribute("onclick","selectedoption(this)")
        
    } 
}

let score =0;
let Correcticon = `<span>Correct</span>`;
let Incorrecticon = `<span>Incorrect</span>`;


function selectedoption(answer) {
 
    let selectedOption = answer.innerHTML;
    let correctAnswer = questions[qCount].answer;
    
    if (selectedOption == correctAnswer) {
        score = score +1;
        console.log('correct')
        answer.classList.add('correct');
        console.log(selectedOption);
        console.log("correct",correctAnswer)
        console.log(answer)
    } else {
        console.log('wrong')
        answer.classList.add("incorrect");
        console.log(selectedOption);
        console.log(answer)
        console.log("correct",correctAnswer)

        // selectedOption.appendChild()
    }


}


function QuestionCounterDisplay(index) {
    let questionDisplay = `<span> ${index} of ${questions.length} </span>`
    containerQuestionCount.innerHTML=questionDisplay;
}

function showResults() {
    container.style.display = 'none';
    resultSection.style.display = 'block';
    let scoreTxt = document.querySelector(".score")
    if (score >= 3) {
        let scoreTag = `Welldone you scored ${score} out of ${questions.length}!!`
        scoreTxt.innerHTML = scoreTag;
    } else if (score < 3) {
        let scoreTag = `Fair you scored ${score} out of ${questions.length}.`;
        scoreTxt.innerHTML = scoreTag;
    } else{
        let scoreTag = `You scored ${score} out of ${questions.length}.`;
        scoreTxt.innerHTML = scoreTag;
    }

}