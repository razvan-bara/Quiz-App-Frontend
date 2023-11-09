<script setup lang="ts">

import QuizFormComponent from "@components/admin/QuizFormComponent.vue";
import {editExistingQuiz, fetchCompleteQuiz} from "@services/quizService.ts";
import {useNotification} from "@kyvg/vue3-notification";
import {QuizForm} from "@/types/quizForm.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const notification = useNotification()
const foundQuiz = ref<boolean>(false)
const existingQuizForm : QuizForm = new QuizForm()
const errorMsg = ref<string>()
const props = defineProps({
  id: {type: String, required: true}
})
const router = useRouter()
function editQuiz(quizForm : QuizForm, saveMode : string){
  editExistingQuiz(quizForm, Number(props.id), saveMode).then( res => {

    if (res.status == 200) {
      notification.notify({type: 'success', title: 'Quiz edited'})
      router.push({name: 'adminQuizzes'})
    }

  }).catch( _ => {

    notification.notify({type: 'error', title: 'Could not edit quiz'})
  })
}

onMounted(() => {

  fetchCompleteQuiz(Number(props.id)).then(res => {
    existingQuizForm.clone(res.data)
    foundQuiz.value = true
  }).catch(err => {
    console.log(err)
    const status = err.response.status
    if (status <= 500) {
      errorMsg.value = "Couldn't find quiz"
    } else if (status <= 600) {
      errorMsg.value = "Server error, try again later"
    }
  })

})

</script>

<template>
  <div v-if="foundQuiz">
    <section class="hero is-info" >
      <div class="hero-body">
        <p class="title has-text-centered">
          Edit a quiz
        </p>
      </div>
    </section>
    <QuizFormComponent
        :existing-quiz-form="existingQuizForm"
        :is-edit="true"
        @emit-quiz-form="editQuiz"
    />
  </div>
  <section v-else class="hero is-danger" >
    <div class="hero-body">
      <p class="title has-text-centered">
        {{ errorMsg }}
      </p>
    </div>
  </section>
</template>

<style scoped>

</style>