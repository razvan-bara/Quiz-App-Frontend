<script setup lang="ts">
import {onMounted, ref} from "vue"
import {Quiz} from "@/types/quiz.ts";
import {fetchQuizzes} from "@services/quizService.ts";
import ErrorCard from "@components/ErrorCard.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

let quizzes = ref<Quiz[]>([])
let gotError = ref<boolean>(false)
let errorMsg = ref<string>("")
let isLoading = ref<boolean>(true)
const actives = ref<boolean[]>([false,false,false])

function getQuizzes(status : string, idx : number){

  for (let i = 0; i < actives.value.length; i++) {
    actives.value[i] = idx == i;
  }

  fetchQuizzes(status).then(res => {

    if(res.data.length == 0) {
      gotError.value = true
      errorMsg.value = "There are no available quizzes at the moment"
    }

    quizzes.value = res.data
  }).catch(_ => {
    gotError.value = true
    errorMsg.value = "Something went wrong while fetching quizzes"
  }).finally(() => {

    isLoading.value = false
  })
}

onMounted(() => {
  getQuizzes("all", 0)
})

const computeDate = (date : string) : string => {
  return new Date(date).toLocaleDateString()
}

const isNotPublished = (date : string) : boolean => {
  const temp = new Date(date).getFullYear()
  return  temp == 1 || temp == 1970
}
</script>

<template>

  <div v-show="isLoading">Loading...</div>

  <div v-if="gotError">
    <ErrorCard :title=errorMsg message="Try again later" :eclass=0 />
  </div>

  <div v-else>
    <section class="hero is-primary has-text-centered">
      <div class="hero-body">
        <p class="title">
          Quizzes
        </p>
        <p class="subtitle">
          All the available quizzes
        </p>
      </div>
    </section>
    <div class="container mt-4">
      <nav class="level">
        <div class="level-left">
          <p class="level-item"><router-link :to="{name: 'quizAdd'}" class="button is-link">Add a new quiz</router-link></p>
          <p class="level-item"><strong></strong></p>
        </div>
        <div class="level-right">
          <p class="level-item" :class="{'has-text-weight-bold': actives[0]}" @click="getQuizzes('all', 0)"><a>All</a></p>
          <p class="level-item" :class="{'has-text-weight-bold': actives[1]}" @click="getQuizzes('published', 1)"><a>Published</a></p>
          <p class="level-item" :class="{'has-text-weight-bold': actives[2]}" @click="getQuizzes('draft', 2)"><a>Drafts</a></p>
        </div>
      </nav>
      <div class="columns is-multiline is-vcentered">
        <div v-for="quiz of quizzes" class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">{{ quiz.title }}</p>
              <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <font-awesome-icon class="has-text-danger-dark" icon="fa-solid fa-eraser"/>
                </span>
              </button>
            </header>
            <div class="card-content">
              <div class="content">
                {{quiz.description}}
                <br>
                <br>
                <time class="is-italic" datetime="2016-1-1">Added at {{computeDate(quiz.createdAt)}}</time>
                <p v-if="isNotPublished(quiz.publishedAt)" class="has-text-weight-bold">
                  Saved as draft
                  <br>
                  <span class="tag is-info is-light">Draft</span>
                </p>
                <p v-else>
                  <time class="is-italic has-text-weight-light" datetime="2016-1-1">
                    Published at {{computeDate(quiz.publishedAt)}}
                  </time>
                  <br>
                  <span class="tag is-primary is-light has-text-weight-bold">Published</span>
                </p>
              </div>

            </div>
            <footer class="card-footer">
              <router-link :to="{name: 'quizEdit', params: {id: quiz.ID}}" class="card-footer-item">
                <span class="icon">
                  <font-awesome-icon class="has-text-link" icon="fa-solid fa-pen"/>
                </span>
              </router-link>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>