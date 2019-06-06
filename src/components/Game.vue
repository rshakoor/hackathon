<template>
  <v-layout row fill-height>
    <v-flex xs12 sm6 offset-sm3 fill-height>
      <v-card class="flexcard" height="100%">
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>{{quiz.name}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="grow">
          <div v-if="state == 'start'">
            Welcome to the quiz of Important Information
          </div>
          <div v-else-if="state == 'end'">
            You got {{this.questionsRight}} out of {{this.totalQuestions}}.
          </div>
          <div v-else>
            <div class="question-number">Question {{currentQuestion.number}}</div>
            <div class="question">
              {{currentQuestion.text}}
            </div>
            <ul class="answers">
              <li v-for="(answer, index) in currentQuestion.answers" :key="index" @click="selectAnswer(answer)" :class="answer === selectedAnswer ? 'selected' : ''">{{answer}}</li>
            </ul>
          </div>
        </v-card-text>
        <v-card-actions>
          <div v-if="state == 'start'">
            <v-btn @click="startQuiz()">Start Quiz</v-btn>
          </div>
          <div v-else-if="state == 'end'">
            <v-btn @click="endQuiz()">End Quiz</v-btn>
          </div>
          <div v-else>
            <v-btn :disabled="!this.selectedAnswer" @click="nextQuestion()">Next</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style>
  @import url(https://fonts.googleapis.com/css?family=Work+Sans:300,600);

  body{
      font-size: 16px;
      font-family: 'Work Sans', sans-serif;
      color: #333;
  font-weight: 300;
  background-color: #f8f6f0;
  }

  .flexcard {
    display: flex;
    flex-direction: column;
  }
  .selected {
    background-color: #ccc;
  }
  .question-number {
    font-style: italic;
    font-size: 90%;
    margin-bottom: 1rem;
  }

  .question {
    margin-bottom: 1rem;
  }

  .answers {
    list-style: none;
    margin: 0px;
    padding: 0px;
  }

  .answers li {
    border: 1px solid black;
    padding: 1rem;
  }

</style>


<script type="application/javascript"> 
  import questionDb from '../questions.json'
  import router from '../router'

  export default {
    methods: {
      startQuiz: function() {
        this.randomQuestions = this.questions.map( question => {
          question.rand = Math.random();
          return question;
        });
        this.randomQuestions.sort((left, right) => left.rand - right.rand);
        this.randomQuestions = this.randomQuestions.slice(0, 10);
        for (let i = 0; i < this.randomQuestions.length; i++) this.randomQuestions[i].number = i + 1;

        this.currentQuestion = this.randomQuestions[0];
        this.state = 'going';
      },

      nextQuestion: function() {
        if (this.currentQuestion.answer == this.selectedAnswer) this.questionsRight++;
        
        this.selectedAnswer = null;
        this.randomQuestions = this.randomQuestions.slice(1);
        this.totalQuestions++;
        if (this.randomQuestions.length > 0) {
          this.currentQuestion = this.randomQuestions[0];
        }
        else {
          this.state = 'end';
        }
      },

      endQuiz: function() {
        router.go(-1);
      },

      selectAnswer: function(answer) {
        this.selectedAnswer = answer;
      }
    },
    data() {
      return {
        quiz: this.$route.params.quiz,
        state: 'start',
        questions: questionDb.questions.filter( question => this.$route.params.quiz.topicCodes.includes(question.topiccode) ),
        currentQuestion: null,
        selectedAnswer: null,
        questionsRight: 0,
        totalQuestions: 0,
      }
    }
  }
</script>
