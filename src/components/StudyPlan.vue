<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>My Study Plan</v-toolbar-title>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(category, index) in categories">
            <v-list-tile
              :key="category.name"
              avatar
              @click="">
              <v-list-tile-avatar>
                <v-icon>fas {{category.icon}}</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="category.name"></v-list-tile-title>
                <v-list-tile-sub-title>{{category.totalGrade}} on {{category.totalAsked}} questions, {{category.recentGrade}} on recent questions</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>

      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>Suggested Quizzes</v-toolbar-title>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(quiz, index) in suggestedQuizzes">
            <v-list-tile
              :key="quiz.name"
              avatar
              @click="launchQuiz(quiz)">

              <v-list-tile-content>
                <v-list-tile-title v-html="quiz.name"></v-list-tile-title>
                <v-list-tile-sub-title>{{quiz.reason}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import router from '../router'

  export default {
    methods: {
      launchQuiz: function(quiz) {
        router.push({ name: 'game', params: {quiz: quiz} })
      }
    },
    data () {
      return {
        categories: [
          { name: 'Personal Banking', topicCode: 'II', icon: 'fa-piggy-bank', totalGrade: 'B-', totalAsked: 37, recentGrade: 'C' },
          { name: 'Investing', topicCode: 'V', icon: 'fa-chart-line', totalGrade: 'A', totalAsked: 54, recentGrade: 'A+' },
          { name: 'Insurance', topicCode: 'IV', icon: 'fa-car-crash', totalGrade: 'B+', totalAsked: 18, recentGrade: 'B' },
          { name: 'Finance Basics', topicCode: 'I', icon: 'fa-university', totalGrade: 'B', totalAsked: 5, recentGrade: 'B' },
          { name: 'Credit', topicCode: 'III', icon: 'fa-percentage', totalGrade: 'A', totalAsked: 21, recentGrade: 'A' },
        ],
        suggestedQuizzes: [
          { name: 'Insurance', reason: 'Risky business', topicCodes: ['IV'] },
          { name: 'Personal Banking', reason: 'Do you even save bro?', topicCodes: ['II'] },
          { name: 'Potpourri', reason: 'You never know what you\'re gonna get!', topicCodes: ['II', 'IV', 'I'] },
        ]
      }
    }
  }
</script>