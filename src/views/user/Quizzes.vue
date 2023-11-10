<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Quiz} from "@/types/quiz.ts";
import {fetchQuizzes} from "@services/quizService.ts";

const isLoading = ref<boolean>(true)
const isError = ref<boolean>(false)
const search = ref<string>("")
const errorMsg = ref<string>("")
const currentPage = ref<number>(0)
const quizzes = ref<Quiz[]>([])
const nextQuizzes = ref<Quiz[]>([])

function getAllQuizzes(page : number, search : string){
  isLoading.value = true
  fetchQuizzes("published", page, search).then(res => {

    if(res.status == 200){
      quizzes.value = res.data
    }

  }).catch(_ => {
      isError.value = true
      errorMsg.value = "There was a problem fetching quizzes"
  }).finally( () => {
        isLoading.value =false
  })

  fetchQuizzes("published", page+1, search).then(res => {

    if(res.status == 200){
      nextQuizzes.value = res.data
    }

  })
}

function resetSearch() {
  if(search.value == "" && currentPage.value == 0){
    return
  }
  search.value = ""
  currentPage.value = 0
  getAllQuizzes(currentPage.value, search.value)
}
function fetchPage(num : number){

  if(search.value == "" && num == 0){
    return
  }

  if(num == 0){
    currentPage.value = 0
  } else {
    currentPage.value = currentPage.value + num < 0 ? currentPage.value : currentPage.value + num
  }

  getAllQuizzes(currentPage.value, search.value)
}

onMounted( () => {

  getAllQuizzes(currentPage.value, search.value)

})

</script>

<template>

  <div v-if="isLoading" class="is-loading">Loading...</div>

  <section v-else-if="isError" class="hero is-large">
    <div class="hero-body">
      <p class="title">
        {{ errorMsg }}
      </p>
    </div>
  </section>


  <div v-else class="container is-fullhd px-3">
    <section class="section has-text-centered">
      <h1 class="title">Quizzes</h1>
      <h2 class="subtitle">
        Click on the attempt button on any quiz to begin the test
      </h2>
    </section>
    <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
      <a v-show="currentPage != 0" @click="fetchPage(-1)" class="pagination-previous">Previous</a>
      <a v-show="nextQuizzes.length > 0" @click="fetchPage(1)" class="pagination-next button is-info">Next page</a>
      <ul class="pagination-list">
        <li>
          <div class="field has-addons">
            <p class="control">
              <button class="button is-info is-outlined" @click="resetSearch">
                Reset
              </button>
            </p>
            <p class="control">
              <input class="input" type="text" placeholder="Find a quiz by title" v-model="search">
            </p>
            <p class="control">
              <button class="button" @click="fetchPage(0)">
                Search
              </button>
            </p>
          </div>
        </li>
      </ul>
    </nav>

    <div v-if="quizzes.length > 0" v-for="quiz of quizzes" class=" is-light box">
      <article class="content">
        <div class="level">
          <div class="level-left">
            <h3 class="level-item">{{ quiz.title }}</h3>
          </div>
          <div class="level-right">
            <button class="level-item button is-success">Attempt quiz</button>
          </div>
        </div>
        <h4>Description:</h4>
        <p>{{quiz.description}}</p>
      </article>
    </div>

    <section v-else class="hero is-medium is-info">
      <div class="hero-body">
        <p class="title">
          There are no published quizzes or none matching your criteria, try again later
        </p>
      </div>
    </section>

    <nav class="pagination is-rounded mt-4" role="navigation" aria-label="pagination">
      <a v-show="currentPage != 0" @click="fetchPage(-1)" class="pagination-previous">Previous</a>
      <a v-show="nextQuizzes.length > 0" @click="fetchPage(1)"  class="pagination-next button is-info">Next page</a>
      <ul class="pagination-list">
        <li>
          <div class="field has-addons">
            <p class="control">
              <button class="button is-info is-outlined">
                Reset
              </button>
            </p>
            <p class="control">
              <input class="input" type="text" placeholder="Find a quiz by title" v-model="search">
            </p>
            <p class="control">
              <button class="button" @click="fetchPage(0)">
                Search
              </button>
            </p>
          </div>
        </li>
      </ul>
    </nav>

  </div>

  <div style="height: 100px"></div>
</template>

<style scoped>

</style>