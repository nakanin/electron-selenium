<template>
  <div id="app">
    <p>下記のURLを新しいBrowserViewで開きます</p>
    <div class="full-width">
      <input v-model="url">
    </div>
    <button>開く</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      url: 'https://teams.microsoft.com/_?lm=deeplink&lmsrc=NeutralHomePageWeb&cmpid=WebSignIn&culture=ja-jp&country=jp#/conversations/?ctx=chat'
    }
  },
  mounted () {
    // setInterval(() => this.nowTime = new Date(), 60*1000)
  },
  computed: {
    nowTimeLabel () {
      return null
    }
  },
  methods: {
    open () {
      // this.startTime = loadStartTime()
    }
  }
}
</script>
<style>
input {
  width: 100%;
}
</style>