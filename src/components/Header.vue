<template>
  <div id="header">
    <div class="title">
      <div class="logo">Synology Photos Deleter</div>
      <div class="version">{{ version }}</div>
    </div>
    <div class="header-items">
      <router-link to="/" class="header-item">Home</router-link>
      <router-link to="/about" class="header-item">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      version: '#.#.#'
    }
  },
  mounted() {
    fetch('/api/info')
      .then((res) => res.json())
      .then((data) => {
        this.version = data.version
      })
  }
}
</script>

<style lang="sass">
#header
    display: flex
    align-items: center
    justify-content: space-between
    padding: 16px
    .title
        display: flex
        .logo
            font-weight: bold
            font-size: 1.5em
        .version
            margin-left: 0.5em
            opacity: 0.5
    .header-items
        display: flex
        gap: 8px
        .header-item
            text-decoration: none
            color: #000
            opacity: .5
            min-width: 70px
            text-align: center
            padding: 8px
            border-radius: 4px
            transition: all .2s ease-in-out
            &:hover
                background-color: #eee
            &.router-link-exact-active
                opacity: 1
                background-color: #eee
</style>