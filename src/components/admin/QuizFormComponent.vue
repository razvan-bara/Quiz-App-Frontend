<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {QuizForm} from "@/types/quizForm.ts";
import QuestionFormComponent from "@components/admin/QuestionFormComponent.vue";
import {useNotification} from "@kyvg/vue3-notification";
import {deleteQuestion} from "@services/questionService.ts";

const props = defineProps({
  existingQuizForm: {type: QuizForm, required: false},
  isEdit: {type: Boolean, required: true, default: false}
})

const quizForm = ref<QuizForm>(new QuizForm())

const showQuestionModal = ref<boolean>(false)
const showAnswerModal = ref<boolean>(false)
let questionIdToDelete : number = 0
let questionIndexToDelete : number = 0
let questionIndexToDeleteAnswer : number = 0
let answerIdToDelete : number = 0
let answerIndexToDelete : number = 0

const notification = useNotification()

const hasQuestions = computed(() : boolean => {
  return quizForm.value.hasQuestions()
})

const emits = defineEmits<{
  emitQuizForm: [quizForm : QuizForm, saveMode: string]
}>()

onMounted(() => {

  if(props.existingQuizForm != undefined){
    quizForm.value = props.existingQuizForm
  }else {

  }

})
function addQuestion(){
  quizForm.value.addQuestion()
}
function attemptToDeleteQuestion(id : number, index : number, needConfirmation : boolean){

  if(props.isEdit && quizForm.value.questions.length <= 2){
    notification.notify({type: 'error', title: 'Quiz should have a minimum of 2 remanding questions'})
    return
  }

  if(props.isEdit && id > 0 && !quizForm.value.hasAtLeastThreeQuestionStored()){
    notification.notify({type: 'error', title: 'Quiz should have a minimum of 2 stored questions'})
    return;
  }

  if((id > 0 || quizForm.value.questions[index].answers.length >= 1) && needConfirmation) {

    showQuestionModal.value = true
    questionIndexToDelete = index
    questionIdToDelete = id
    console.log("confirmation modal")
    return

  }else {
    showQuestionModal.value = false
  }

  if (id != 0) {

    deleteQuestion(id).then(res => {

      if (res.status == 204) {
        quizForm.value.deleteQuestion(index)
        notification.notify({type: 'success', title: 'Question deleted'})
      }

    }).catch(_ => {
      notification.notify({type: 'error', title: 'Could not delete question'})
    })

  } else {
    quizForm.value.deleteQuestion(index)
    notification.notify({type: 'success', title: 'Question deleted'})
  }

}

function attemptToDeleteAnswer(id : number, questionIndex: number, index : number,  needConfirmation : boolean){

  if(props.isEdit && quizForm.value.questions[questionIndex].answers.length <= 2){
    notification.notify({type: 'error', title: 'Question should have a minimum of 2 remanding answers'})
    return
  }

  if(id > 0 && needConfirmation) {

    showAnswerModal.value = true
    answerIndexToDelete = index
    answerIdToDelete = id
    questionIndexToDeleteAnswer = questionIndex
    return

  }else {
    showAnswerModal.value = false
  }

  quizForm.value.deleteAnswerForQuestion(questionIndex, index)
}

function validateQuiz() : boolean {

  if(quizForm.value.title.length < 10){
    notification.notify({type: "error", title: "Title must have minimum 10 characters"})
    return false
  }

  if(!quizForm.value.description.length){
    notification.notify({type: "error", title: "Description must not be empty must"})
    return false
  }

  if(quizForm.value.questions.length < 2){
    notification.notify({type: "error", title: "Quiz must have a minimum of two questions"})
    return false
  }

  for (const question of quizForm.value.questions) {
    if(question.title.length < 10){
      notification.notify({type: "error", title: "Each question's title must be minimum 10 characters long"})
      return false
    }

    if(!question.body.length){
      notification.notify({type: "error", title: "Each question's body must not be empty"})
      return false
    }

    if(question.answers.length < 2){
      notification.notify({type: "error", title: "Each question must have at least 2 answers"})
      return false
    }

    let hasCorrectAnswer = false
    for (const answer of question.answers) {
      if(!answer.title){
        notification.notify({type: "error", title: "Each answer's title must not be empty"})
        return false
      }

      if(answer.correct) {
        hasCorrectAnswer = true
      }
    }

    if(!hasCorrectAnswer){
      notification.notify({type: "error", title: "Each question must have at least one correct answer"})
      return false
    }

  }

  return true
}
function submit(saveMode : string){

  if (!validateQuiz()) {
    return
  }
  emits("emitQuizForm", quizForm.value, saveMode)
}

</script>

<template>
  <section class="container mt-4 has-height">
    <div class="container is-max-desktop is-fullheight">

      <form v-on:submit.prevent="" v-if="quizForm != undefined">

        <div class="field">
          <label class="label">Quiz title</label>
          <div class="control">
            <input class="input" type="text" placeholder="Enter a quiz title" v-model="quizForm.title">
          </div>
        </div>

        <div class="field">
          <label class="label">Quiz description</label>
          <div class="control">
            <textarea class="textarea" placeholder="Enter a description for the quiz" v-model="quizForm.description"></textarea>
          </div>
        </div>

        <nav class="level">
          <div class="level-left">
            <div class="level-item has-text-weight-bold">
              Questions
            </div>
          </div>
          <div class="level-right">
            <p class="level-item" @click="addQuestion"><a class="button is-small is-success">Add question</a></p>
          </div>
        </nav>

        <div class="menu" v-if="hasQuestions">
          <ul class="menu-list box">
            <li class="mb-6" v-for="(question, qidx) in quizForm.questions">
              <QuestionFormComponent
                  :question-idx="qidx"
                  :question="question"
                   @delete-question="attemptToDeleteQuestion"
                  @delete-answer="attemptToDeleteAnswer"
              />
            </li>
          </ul>
        </div>

        <div class="control mt-2 buttons">
          <button class="button is-primary" @click="submit('publish')">Publish</button>
          <button class="button is-inverted is-primary" @click="submit('draft')">Save as draft</button>
        </div>



            <template class="" v-for="(q) in quizForm.questions">
              <div style="height: 150px"></div>
              <template class="" v-for="(_) in q.answers">
                <div style="height: 50px"></div>
              </template>
            </template>

      </form>
    </div>
  </section>
  <div class="modal is-active" v-if="showQuestionModal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <article class="message is-danger">
        <div class="message-header">
          <p>Warning</p>
        </div>
        <div class="message-body">
          Deleting this question will also will delete all its attached answers.
          <br>
          The effects of this operation irreversible!
          <div class="buttons are-small is-right">
            <button class="button is-outlined is-danger" @click="showQuestionModal = false">Cancel</button>
            <button
                class="button is-danger"
                @click="attemptToDeleteQuestion(questionIdToDelete, questionIndexToDelete, false)">Confirm</button>
          </div>
        </div>
      </article>
    </div>
  </div>

  <div class="modal is-active" v-if="showAnswerModal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <article class="message is-danger">
        <div class="message-header">
          <p>Warning</p>
        </div>
        <div class="message-body">
          Are you sure you want to delete this answer? The effects of this operation irreversible!
          <div class="buttons are-small is-right">
            <button class="button is-outlined is-danger" @click="showAnswerModal = false">Cancel</button>
            <button
                class="button is-danger"
                @click="attemptToDeleteAnswer(answerIdToDelete, questionIndexToDeleteAnswer, answerIndexToDelete, false)">Confirm</button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style>
ul.menu-list > li.mb-6:last-child{
  margin-bottom: 0!important;
}
</style>