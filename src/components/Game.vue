<template>
    <div>
        Game
        <!-- <div id ="quiz">
            <div v-if="introStage">
                <h1>Welcome to the Quiz: {{title}}</h1>
                <p>Some kind of text here. Blah blah.</p>
                <button @click="startQuiz">START!</button>
            </div>
            <div v-if="questionStage">
                <question 
                        :question="questions[currentQuestion]"
                        v-on:answer="handleAnswer"
                        :question-number="currentQuestion+1"
                ></question>
            </div>  
            <div v-if="resultsStage">
                You got {{correct}} right out of {{questions.length}} questions. Your percentage is {{perc}}%.
            </div>   
        </div> -->

        <h1>Quiz on Important Facts</h1>
        <div class="quiz-container">
            <div id="quiz"></div>
        </div>
        <button id="previous">Previous Question</button>
        <button id="next">Next Question</button>
        <button id="submit">Submit Quiz</button>
        <div id="results"></div>

        <!-- <div id="app">
        <h1>{{ quiz.title }}</h1>
        <div v-for="(question, index) in quiz.questions">
            <div v-show="index === questionIndex">
                <h2>{{ question.text }}</h2>
                <ol>
                    <li v-for="response in question.responses">
                    <label>
                        <input type="radio" 
                            v-bind:value="response.correct" 
                            v-bind:name="index" 
                            v-model="userResponses[index]"> {{response.text}}
                    </label>
                    </li>
                </ol>
                <button id="previous" v-if="questionIndex > 0" v-on:click="prev">
                    prev
                </button>
                <button id="next" v-on:click="next">
                    next
                </button>
            </div>
        </div>
        <div v-show="questionIndex === quiz.questions.length">
            <h2>
            Quiz finished
        </h2>
            <p>
            Total score: {{ score() }} / {{ quiz.questions.length }}
            </p>
        </div>
        </div> -->
    </div>
</template>

<style>
    @import url(https://fonts.googleapis.com/css?family=Work+Sans:300,600);

    body{
        font-size: 20px;
        font-family: 'Work Sans', sans-serif;
        color: #333;
    font-weight: 300;
    text-align: center;
    background-color: #f8f6f0;
    }
    h1{
    font-weight: 300;
    margin: 0px;
    padding: 10px;
    font-size: 20px;
    background-color: #444;
    color: #fff;
    }
    .question{
    font-size: 30px;
    margin-bottom: 10px;
    }
    .answers {
    margin-bottom: 20px;
    text-align: left;
    display: inline-block;
    }
    .answers label{
    display: block;
    margin-bottom: 10px;
    }
    button{
    font-family: 'Work Sans', sans-serif;
        font-size: 22px;
        background-color: #279;
        color: #fff;
        border: 0px;
        border-radius: 3px;
        padding: 20px;
        cursor: pointer;
        margin-bottom: 20px;
    }
    button:hover{
        background-color: #38a;
    }



    .slide{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.5s;
    }
    .active-slide{
    opacity: 1;
    z-index: 2;
    }
    .quiz-container{
    position: relative;
    height: 200px;
    margin-top: 40px;
    }

</style>


<script type="application/javascript"> 

    // export default {
    //     // Create a quiz object with a title and two questions.
    //     // A question has one or more answer, and one or more is valid.
    //     var: quiz = {
    //     title: 'My quiz',
    //     questions: [
    //         {
    //         text: "Question 1",
    //         responses: [
    //             {text: 'Test1'}, 
    //             {text: 'Test'}, 
    //             {text: 'Wrong, too bad.'}, 
    //             {text: 'Right!', correct: true}, 
    //         ]
    //         }, {
    //         text: "Question 2",
    //         responses: [
    //             {text: 'Right answer', correct: true}, 
    //             {text: 'Wrong answer'}, 
    //         ]
    //         } 
    //     ]
    //     },
            
    //     new: Vue ({
    //     el: '#app',
    //     data: {
    //         quiz: quiz,
    //         // Store current question index
    //         questionIndex: 0,
    //         // An array initialized with "false" values for each question
    //         // It means: "did the user answered correctly to the question n?" "no".
    //         userResponses: Array(quiz.questions.length).fill(false)
    //     },
    //     // The view will trigger these methods on click
    //     methods: {
    //         // Go to next question
    //         next: function() {
    //             this.questionIndex++;
    //         },
    //         // Go to previous question
    //         prev: function() {
    //             this.questionIndex--;
    //         },
    //         // Return "true" count in userResponses
    //         score: function() {
    //             return this.userResponses.filter(function(val) { return val }).length;
    //         }
    //     }
    //     })
    // }


    // export default{
    //     (function() {
    //         const myQuestions = [
    //             {
    //             question: "Who is the strongest?",
    //             answers: {
    //                 a: "Superman",
    //                 b: "The Terminator",
    //                 c: "Waluigi, obviously"
    //             },
    //             correctAnswer: "c"
    //             },
    //             {
    //             question: "What is the best site ever created?",
    //             answers: {
    //                 a: "SitePoint",
    //                 b: "Simple Steps Code",
    //                 c: "Trick question; they're both the best"
    //             },
    //             correctAnswer: "c"
    //             },
    //             {
    //             question: "Where is Waldo really?",
    //             answers: {
    //                 a: "Antarctica",
    //                 b: "Exploring the Pacific Ocean",
    //                 c: "Sitting in a tree",
    //                 d: "Minding his own business, so stop asking"
    //             },
    //             correctAnswer: "d"
    //             }
    //         ];

    //         function buildQuiz() {
    //             // we'll need a place to store the HTML output
    //             const output = [];

    //             // for each question...
    //             myQuestions.forEach((currentQuestion, questionNumber) => {
    //             // we'll want to store the list of answer choices
    //             const answers = [];

    //             // and for each available answer...
    //             for (letter in currentQuestion.answers) {
    //                 // ...add an HTML radio button
    //                 answers.push(
    //                 `<label>
    //                     <input type="radio" name="question${questionNumber}" value="${letter}">
    //                     ${letter} :
    //                     ${currentQuestion.answers[letter]}
    //                 </label>`
    //                 );
    //             }

    //             // add this question and its answers to the output
    //             output.push(
    //                 `<div class="slide">
    //                 <div class="question"> ${currentQuestion.question} </div>
    //                 <div class="answers"> ${answers.join("")} </div>
    //                 </div>`
    //             );
    //             });

    //             // finally combine our output list into one string of HTML and put it on the page
    //             quizContainer.innerHTML = output.join("");
    //         }

    //         function showResults() {
    //             // gather answer containers from our quiz
    //             const answerContainers = quizContainer.querySelectorAll(".answers");

    //             // keep track of user's answers
    //             let numCorrect = 0;

    //             // for each question...
    //             myQuestions.forEach((currentQuestion, questionNumber) => {
    //             // find selected answer
    //             const answerContainer = answerContainers[questionNumber];
    //             const selector = `input[name=question${questionNumber}]:checked`;
    //             const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    //             // if answer is correct
    //             if (userAnswer === currentQuestion.correctAnswer) {
    //                 // add to the number of correct answers
    //                 numCorrect++;

    //                 // color the answers green
    //                 answerContainers[questionNumber].style.color = "lightgreen";
    //             } else {
    //                 // if answer is wrong or blank
    //                 // color the answers red
    //                 answerContainers[questionNumber].style.color = "red";
    //             }
    //             });

    //             // show number of correct answers out of total
    //             resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    //         }

    //         function showSlide(n) {
    //             slides[currentSlide].classList.remove("active-slide");
    //             slides[n].classList.add("active-slide");
    //             currentSlide = n;
                
    //             if (currentSlide === 0) {
    //             previousButton.style.display = "none";
    //             } else {
    //             previousButton.style.display = "inline-block";
    //             }
                
    //             if (currentSlide === slides.length - 1) {
    //             nextButton.style.display = "none";
    //             submitButton.style.display = "inline-block";
    //             } else {
    //             nextButton.style.display = "inline-block";
    //             submitButton.style.display = "none";
    //             }
    //         }

    //         function showNextSlide() {
    //             showSlide(currentSlide + 1);
    //         }

    //         function showPreviousSlide() {
    //             showSlide(currentSlide - 1);
    //         }

    //         const quizContainer = document.getElementById("quiz");
    //         const resultsContainer = document.getElementById("results");
    //         const submitButton = document.getElementById("submit");

    //         // display quiz right away
    //         buildQuiz();

    //         const previousButton = document.getElementById("previous");
    //         const nextButton = document.getElementById("next");
    //         const slides = document.querySelectorAll(".slide");
    //         let currentSlide = 0;

    //         showSlide(0);

    //         // on submit, show results
    //         submitButton.addEventListener("click", showResults);
    //         previousButton.addEventListener("click", showPreviousSlide);
    //         nextButton.addEventListener("click", showNextSlide);
    //         })();
    // }
////////////////// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



        // const quizData = '{"title":"Test Quiz","questions":[{"text":"Is true true?","type":"tf","answer":"t"},{"text":"Is false true?","type":"tf","answer":"f"},{"text":"What is the best beer?","type":"mc","answers":["Coors","Miller","Bud","Anchor Steam"],"answer":"Anchor Steam"},{"text":"What is the best cookie?","type":"mc","answers":["Chocolate Chip","Sugar","Beer"],"answer":"Sugar"}]}';

        // Vue.component('question', {
        //     template:`
        // <div>
        // <strong>Question {{ questionNumber }}:</strong><br/>
        // <strong>{{ question.text }} </strong>

        // <div v-if="question.type === 'tf'">
        //     <input type="radio" name="currentQuestion" id="trueAnswer" v-model="answer" value="t"><label for="trueAnswer">True</label><br/>
        //     <input type="radio" name="currentQuestion" id="falseAnswer" v-model="answer" value="f"><label for="falseAnswer">False</label><br/>
        // </div>

        // <div v-if="question.type === 'mc'">
        //     <div v-for="(mcanswer,index) in question.answers">
        //     <input type="radio" :id="'answer'+index" name="currentQuestion" v-model="answer" :value="mcanswer"><label :for="'answer'+index">{{mcanswer}}</label><br/>
        //     </div>
        // </div>

        // <button @click="submitAnswer">Answer</button>
        // </div>
        // `,
        // data() {
        //     return {
        //     answer:''
        //     }
        // },
        //     props:['question','question-number'],
        //     methods:{
        //         submitAnswer:function() {
        //             this.$emit('answer', {answer:this.answer});
        //     this.answer = null;
        //         }
        //     }
        // });

        // const app = new Vue({
        // el:'#quiz',
        // data() {
        //     return {
        //     introStage:false,
        //     questionStage:false,
        //     resultsStage:false,
        //     title:'',
        //     questions:[],
        //     currentQuestion:0,
        //     answers:[],
        //     correct:0,
        //     perc:null
        //     }
        // },
        // created() {
        //     fetch(quizData)
        //     .then(res => res.json())
        //     .then(res => {
        //     this.title = res.title;
        //     this.questions = res.questions;
        //     this.introStage = true;
        //     })

        // },
        // methods:{
        //     startQuiz() {
        //     this.introStage = false;
        //     this.questionStage = true;
        //     console.log('test'+JSON.stringify(this.questions[this.currentQuestion]));
        //     },
        //     handleAnswer(e) {
        //     console.log('answer event ftw',e);
        //     this.answers[this.currentQuestion]=e.answer;
        //     if((this.currentQuestion+1) === this.questions.length) {
        //         this.handleResults();
        //         this.questionStage = false;
        //         this.resultsStage = true;
        //     } else {
        //         this.currentQuestion++;
        //     }
        //     },
        //     handleResults() {
        //     console.log('handle results');
        //     this.questions.forEach((a, index) => {
        //         if(this.answers[index] === a.answer) this.correct++;        
        //     });
        //     this.perc = ((this.correct / this.questions.length)*100).toFixed(2);
        //     console.log(this.correct+' '+this.perc);
        //     }
        // }
        // })
</script>
