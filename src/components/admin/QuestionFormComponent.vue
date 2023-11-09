<script setup lang="ts">
import {QuizQuestion} from "@/types/question.ts";
import {computed, ref} from "vue";
import AnswerFormComponent from "@components/admin/AnswerFormComponent.vue";

const props = defineProps({
  question: {type: QuizQuestion, required: true},
  questionIdx: {type: Number, required: true}
})

const emits = defineEmits<{
  deleteQuestion: [id: number, index : number, needConfirmation: boolean]
  deleteAnswer: [id: number, questionIndex : number ,index : number, needConfirmation: boolean]
}>()

let showQuestion = ref<boolean>(false)

function addAnswer(question : QuizQuestion){
  question.addAnswer()
}

function deleteQuestion(){
  emits('deleteQuestion', props.question.ID, props.questionIdx, true)
}

function deleteAnswer(answerID : number, questionIndex : number, answerIndex : number){
  emits('deleteAnswer', answerID, questionIndex, answerIndex, true)
}

const hasAnswers = (question : QuizQuestion) => {
  return question.hasAnswers()
}

const displayTitle = computed( () => {
  return props.question.title.length > 0 ? props.question.title : "Question"
})

</script>

<template>

  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <label class="label">{{ displayTitle }}</label>
      </div>
    </div>
    <div class="level-right">
      <p class="level-item is-clickable" @click="showQuestion = !showQuestion">
          <span class="icon is-small is-right">
              <font-awesome-icon v-show="!showQuestion" icon="fa-solid fa-caret-down"/>
              <font-awesome-icon v-show="showQuestion" icon="fa-solid fa-caret-up"/>
          </span>
      </p>
      <p class="level-item" @click="deleteQuestion">
        <span class="delete"></span>
      </p>
    </div>
  </div>

  <template v-if="showQuestion">
    <div class="field">
      <label class="label has-text-weight-normal">Question title</label>
      <div class="control">
        <input class="input" type="text" placeholder="Enter a quiz title" v-model="props.question.title">
      </div>
    </div>

    <div class="field ">
      <label class="label has-text-weight-normal">Question body</label>
      <div class="control">
        <textarea class="textarea" placeholder="Enter a description for the quiz" v-model="props.question.body">
        </textarea>
      </div>
    </div>

    <nav class="level">
      <div class="level-left">
        <div class="level-item has-text-weight-bold">
          Answers
        </div>
      </div>
      <div class="level-right">
        <p class="level-item" @click="addAnswer(question)"><a class="button is-small is-success">Add answer</a></p>
      </div>
    </nav>

    <div class="menu" v-if="hasAnswers(question)">
      <ul class="menu-list box">
        <li class="mb-6" v-for="(answer, answerIdx) in question.answers">

          <AnswerFormComponent
              :answer="answer"
              :question-idx="questionIdx"
              :answer-idx="answerIdx"
              @delete-answer="deleteAnswer"
          />

        </li>
      </ul>
    </div>
  </template>
</template>