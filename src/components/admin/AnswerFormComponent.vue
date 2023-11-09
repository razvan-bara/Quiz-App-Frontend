<script setup lang="ts">
import {Answer} from "@/types/answer.ts";
import {ref, computed} from "vue";

const props = defineProps({
  answer: {type: Answer, required: true},
  answerIdx: {type: Number, required: true},
  questionIdx: {type: Number, required: true},
})

const emits = defineEmits<{
  deleteAnswer: [id: number, questionIndex : number, index : number]
}>()

function deleteAnswer(){
  emits('deleteAnswer', props.answer.ID, props.questionIdx, props.answerIdx)
}

let showAnswer = ref<boolean>(false)

const displayTitle = computed( () => {
  return props.answer.title.length > 0 ? props.answer.title : "Answer"
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
      <p class="level-item is-clickable">
        <span class="icon is-small is-right" @click="showAnswer = !showAnswer">
          <font-awesome-icon v-show="!showAnswer" icon="fa-solid fa-caret-down"/>
          <font-awesome-icon v-show="showAnswer" icon="fa-solid fa-caret-up"/>
        </span>
      </p>
      <p class="level-item" @click="deleteAnswer">
        <span class="delete"></span>
      </p>
    </div>
  </div>
  <template v-if="showAnswer">
    <div class="field">
      <label class="label has-text-weight-normal">Answer</label>
      <div class="control">
        <input class="input" type="text" placeholder="Enter a answer title" v-model="props.answer.title">
      </div>
    </div>

    <div class="control">
      <label class="label has-text-weight-normal">Is correct answer?</label>
      <label class="radio">
        <input type="radio" :name="'q'+props.questionIdx+'a'+props.answerIdx" v-bind:value="true" v-model="props.answer.correct">
        Yes
      </label>
      <label class="radio">
        <input type="radio" :name="'q'+props.questionIdx+'a'+props.answerIdx" v-bind:value="false" v-model="props.answer.correct">
        No
      </label>
    </div>
  </template>
</template>