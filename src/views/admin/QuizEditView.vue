<script setup lang="ts">

import QuizFormComponent from "@components/admin/QuizFormComponent.vue";
import {editExistingQuiz, fetchCompleteQuiz} from "@services/quizService.ts";
import {useNotification} from "@kyvg/vue3-notification";
import {QuizForm} from "@/types/quizForm.ts";
import {onMounted, ref} from "vue";

const notification = useNotification()
const foundQuiz = ref<boolean>(false)
const existingQuizForm : QuizForm = new QuizForm()
const props = defineProps({
  id: {type: String, required: true}
})
function editQuiz(quizForm : QuizForm){
  editExistingQuiz(quizForm, Number(props.id)).then( res => {
    if (res.status == 200) {
      notification.notify({type: 'success', title: 'Quiz edited'})
    }
  }).catch( _ => {
    notification.notify({type: 'error', title: 'Could not edit quiz'})
  })
}

onMounted(() => {

  fetchCompleteQuiz(Number(props.id)).then(res => {
    existingQuizForm.clone(res.data)
    console.log(existingQuizForm)
    foundQuiz.value = true
  }).catch(err => {
    console.log(err)
    notification.notify({type: 'error', title: 'Could fetch not existing quiz'})
  })

})

</script>

<template>
  <section class="hero is-info">
    <div class="hero-body">
      <p class="title has-text-centered">
        Edit a quiz
      </p>
    </div>
  </section>
  <QuizFormComponent v-if="foundQuiz"
      :existing-quiz-form="existingQuizForm"
      @emit-quiz-form="editQuiz"
  />
</template>

<style scoped>

</style>