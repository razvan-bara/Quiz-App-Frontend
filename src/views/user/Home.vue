<script setup lang="ts">

</script>

<template>
  <div class="fh columns is-vcentered">
    <div class="tile is-ancestor column ful">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child notification is-primary">
              <p class="title has-text-centered">Welcome to the quiz app</p>
              <p class="subtitle"></p>
              <figure class="image is-4by3">
                <img src="https://static.vecteezy.com/system/resources/previews/011/085/397/non_2x/quiz-time-button-quiz-time-speech-bubble-quiz-time-text-web-template-illustration-vector.jpg">
              </figure>
            </article>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-danger">
          <div class="content">
            <p class="title">How do i gain access?</p>
            <div class="content">
              <p>In order to gain access to the available quizzes you need to:</p>
              <ol>
                <li><router-link class="has-text-weight-bold" :to="{name: 'register'}">Register</router-link> with your details</li>
                <li><router-link class="has-text-weight-bold" :to="{name: 'login'}">Login</router-link> with your new account</li>
                <li>Go to the <router-link class="has-text-weight-bold" :to="{name: 'quizzes'}">quizzes</router-link> page and start testing your knowledge</li>
              </ol>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .fh{
    height: calc(100% - 100px);
  }
</style>