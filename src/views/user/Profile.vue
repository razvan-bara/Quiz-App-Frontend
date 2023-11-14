<script setup lang="ts">
import {onMounted, ref} from "vue";
import {AttemptStatus, AttemptWithQuiz} from "@/types/attempt.ts";
import {fetchAttempts} from "@services/attemptService.ts";
import {fetchUserDetails} from "@services/userService.ts";

  const attempts = ref<AttemptWithQuiz[]>([])
  const user = ref<User>()

  onMounted(() => {
    fetchAttempts().then(res => {
      if (res.status == 200){

        attempts.value = res.data


        }     
    }).catch(err => {
      console.log(err)
    })

    fetchUserDetails().then(res => {

      if(res.status == 200){
        user.value = res.data
      }

    }).catch(err => {
      console.log(err)
    })
  })

function getStatus(status : AttemptStatus) : string{
  let statusString = ""
  switch (status){
    case AttemptStatus.Started:
    case AttemptStatus.NotStarted:
    case AttemptStatus.InProgress:
      statusString = "Not finished"
          break
    case AttemptStatus.Finished:
      statusString = "Finished"
          break
  }
  return statusString
}

</script>

<template>
  <div class="tile is-ancestor">
    <div v-if="user" class="tile is-parent is-3">
      <article class="tile is-child box">
        <p class="title mb-6">Account details</p>
        <p class="subtitle">Email : {{ user.email }}</p>
        <p class="subtitle">First name : {{ user.firstName }}</p>
        <p class="subtitle">Last name : {{ user.lastName }}</p>
        <p class="subtitle">Role : {{ user.isAdmin ? "admin" : "user" }}</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-white">
        <div class="content">
          <p class="title">Taken quizzes</p>
          <p class="subtitle">A list with all the quizzes you have taken so far</p>
          <div class="content">
            <table class="table">
              <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Score</th>
                <th>Taken</th>
              </tr>
              </thead>
              <tfoot>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Score</th>
                <th>Taken</th>
              </tr>
              </tfoot>
              <tbody  v-if="attempts.length > 0" >
              <tr v-for="(attemptWithQuiz, i) in attempts">
                <td>{{i+1}}</td>
                <th>{{attemptWithQuiz.quizDTO.title}}</th>
                <td>{{ getStatus(attemptWithQuiz.attemptDTO.status) }}</td>
                <td>{{ attemptWithQuiz.attemptDTO.status == 3 ? (attemptWithQuiz.attemptDTO.score != undefined  ? `${attemptWithQuiz.attemptDTO.score*10}%` : "0%") : "N/A" }}</td>
                <td>{{ new Date(attemptWithQuiz.attemptDTO.createdAt).toLocaleDateString() }}</td>
              </tr>
              </tbody>
              <tbody v-else>
                <tr class="has-text-centered has-text-info">
                  <td colspan="5">You didn't take any tests so far</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </div>
  </div>

</template>

<style scoped>
.fh{
  height: calc(100% - 150px);
}
</style>