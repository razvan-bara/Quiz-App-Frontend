<script setup lang="ts">


import {onMounted, ref} from "vue";
import {Attempt, AttemptStatus} from "@/types/attempt.ts";
import {createAttemptAnswer, fetchAttempt, updateAttempt} from "@services/attemptService.ts";
import {useNotification} from "@kyvg/vue3-notification";
import {QuizForm} from "@/types/quizForm.ts";
import {QuizQuestion} from "@/types/question.ts";
import {Answer} from "@/types/answer.ts";

const notification = useNotification()
const isError = ref<boolean>(false)
const errorMsg = ref<string>("")
const quizNotStarted = ref<boolean>(true)
const quizFinished = ref<boolean>(false)
const attempt = ref<Attempt>()
const quizForm = ref<QuizForm>()
const prog = ref<number>(0)
const timeRemainding = ref<number>(0)
const props = defineProps({
  quizId: {type: String, required: true},
  attemptId: {type: String, required: true}
})

const activeQuestion = ref<QuizQuestion>(new QuizQuestion())
let activeQuestionIdx : number = -1
const score = ref<number>(0)

onMounted(() => {
  fetchAttempt(props.quizId, props.attemptId).then(res => {
    if(res.status == 200) {
      if (res.data.attemptDTO.status == undefined){
        attempt.value = res.data.attemptDTO
        quizForm.value = res.data.quizForm
      }else{
        console.log("here")
        isError.value = true
        errorMsg.value = "This attempt has already been started"
      }

    }
  }).catch(_ => {
    isError.value = true
    errorMsg.value = "We couldn't start the quiz"
    notification.notify({type: "error", title: "Couldn't fetch attempt"})
  })
})

function setNextActiveQuestion(){
  if(quizForm.value == undefined){
    return
  }

  activeQuestionIdx++
  if (activeQuestionIdx < quizForm.value.questions.length){
    activeQuestion.value = quizForm.value.questions[activeQuestionIdx]
  }else {
    quizFinished.value = true
  }

}

function startQuiz(){
  quizNotStarted.value = false
  timeRemainding.value = quizForm.value!.questions.length * 10
  delegateUpdateAttempt()
  setNextActiveQuestion()
  const id = setInterval(() => {
    timeRemainding.value -= timeRemainding.value > 0 ? 1 : 0
    if(timeRemainding.value == 0) {
      clearInterval(id)
      delegateUpdateAttempt()
    }
  }, 1000)
}

function saveAnswer(answer: Answer){
 createAttemptAnswer(props.quizId, props.attemptId, answer).then(res => {
   console.log(res.data)
 }).catch(err => {
   console.log(err)
 })
}

function delegateUpdateAttempt(){
    if(attempt.value == undefined){
      return
    }

  if (attempt.value.status === undefined || attempt.value.status == AttemptStatus.NotStarted) {
    attempt.value.status = AttemptStatus.Started
  } else if(attempt.value.status == AttemptStatus.Started) {
    attempt.value.status = AttemptStatus.InProgress
  }else if( ( activeQuestionIdx == quizForm.value!.questions.length - 1 || timeRemainding.value == 0 )  && attempt.value.status == AttemptStatus.InProgress) {
    attempt.value.status = AttemptStatus.Finished
  }

  updateAttempt(props.quizId, props.attemptId, attempt.value).then(res => {
    console.log(res.data)
  }).catch(err => {
    console.log(err)
  })
}

function pickAnswer(index: number){
  const pickedAnswer = activeQuestion.value.answers[index];
  score.value += pickedAnswer.correct ? (10 / quizForm.value!.questions.length) : 0
  prog.value += 10 / quizForm.value!.questions.length * 10
  attempt.value!.score = score.value
  saveAnswer(pickedAnswer)
  delegateUpdateAttempt()
  setNextActiveQuestion()
}

</script>

<template>
  <section v-if="isError" class="hero is-medium is-danger">
    <div class="hero-body">
      <p class="title">
        Error while preparing for the test
      </p>
      <p class="subtitle">
        {{ errorMsg }}
      </p>
    </div>
  </section>
  <section v-else-if="quizNotStarted && quizForm != undefined" class="hero is-medium is-info">
    <div class="hero-body">
      <p class="title">
        Are you ready to begin the {{quizForm.title}} quiz ?
      </p>
      <p class="subtitle">
        You have a total of <strong class="is-italic">{{quizForm.questions.length}}</strong> questions
      </p>
      <p class="subtitle">
        For each questions you have a 10 seconds, so in total you have {{10 * quizForm.questions.length}} seconds to answer all the questions
      </p>
      <button class="button is-outlined is-light is-medium" @click="startQuiz" >Start</button>
    </div>

  </section>
  <section v-else-if="!quizFinished && timeRemainding !=0 && quizForm != undefined && attempt != undefined" class="fh-attempt columns is-vcentered">
    <div class="column hero is-large has-text-centered">
      <nav class="level px-6">
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              Timer {{ timeRemainding }}
            </p>
          </div>
          <div class="level-item">
            :
          </div>
          <div class="level-item">
            <p class="subtitle is-5">
              Score {{ (score*10).toFixed(2) }}%
            </p>
          </div>
        </div>

        <div class="level-right">
          <p class="level-item"><strong>Question {{activeQuestionIdx+1}} / {{quizForm.questions.length}}</strong></p>
          <progress class="progress is-small level-item" :value="prog" max="100">20%</progress>
        </div>

      </nav>
      <p class="title">{{activeQuestion.title}}</p>
      <p class="subtitle">{{activeQuestion.body}}</p>
      <div class="hero-body pt-0 pb-0 is-clickable">
        <div v-for="(answer, idx) in activeQuestion.answers" class="box answer-box" @click="pickAnswer(idx)">
          {{answer.title}}
        </div>
      </div>
      <div class="pb-6"></div>
    </div>
  </section>
  <section v-else class="hero is-medium is-info">
    <div class="hero-body">
      <p class="title">
          The quiz has been finished
      </p>
      <p class="subtitle">
        Final score: {{(score*10).toFixed(2)}}%
      </p>
    </div>
  </section>
</template>

<style scoped>
.fh-attempt{
  height: calc(100% - 150px);
}

.answer-box:hover{
  border: 1px solid hsl(171, 100%, 41%);
  transform: scale(1.1);
  transition: 0.3s transform ease-in-out;
}
</style>