<script setup lang="ts">

import QuizFormComponent from "@components/admin/QuizFormComponent.vue";
import {addNewQuiz} from "@services/quizService.ts";
import {useNotification} from "@kyvg/vue3-notification";
import {QuizForm} from "@/types/quizForm.ts";

const notification = useNotification()
function addQuiz(quizForm : QuizForm){
  addNewQuiz(quizForm).then( res => {
    if (res.status == 201) {
      notification.notify({type: 'success', title: 'Quiz registered with success'})
    }
  }).catch( _ => {
    notification.notify({type: 'error', title: 'Could not register quiz'})
  })
}

</script>

<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <p class="title has-text-centered">
        Create a new quiz
      </p>
    </div>
  </section>
  <QuizFormComponent
    @emit-quiz-form="addQuiz"
  />
</template>

<style scoped>

</style>