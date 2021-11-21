<template>
  <div class="page-title">About</div>
  <p>Delete screenshots uploaded from your iPhone by analyzing the photo Exif</p>
  <div class="about-box-items">
    <div class="about-box-item">
      <div class="about-box-item-icon"><i class="bx bx-info-circle"></i></div>
      <div class="about-box-item-title">{{ version }}</div>
      <div class="about-box-item-subtitle">Version</div>
    </div>
    <div class="about-box-item">
      <div class="about-box-item-icon"><i class="bx bxl-github"></i></div>
      <a class="about-box-item-title" href="https://github.com/gnehs/SynologyPhotosDeleter" target="_blank"> SynologyPhotosDeleter </a>
      <div class="about-box-item-subtitle">GitHub</div>
    </div>
    <div class="about-box-item">
      <div class="about-box-item-icon"><i class="bx bx-user"></i></div>
      <a class="about-box-item-title" href="https://github.com/gnehs" target="_blank"> gnehs </a>
      <div class="about-box-item-subtitle">Author</div>
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

<style lang="sass" scoped>
.about-box-items
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    gap: 16px
    @media screen and (max-width: 768px)
        grid-template-columns: 1fr
        font-size: 12px
    .about-box-item
        background-color: #f2f2f2
        padding: 16px
        border-radius: 4px
        @for $i from 0 through 10
            &:nth-child(#{$i})
                background-color: adjust-hue(#f5f7ff, $i * 60)

        .about-box-item-icon
            font-size: 2em
            margin-bottom: 8px
            opacity: 0.75
        .about-box-item-title
            font-weight: bold
            font-size: 1.5em
        .about-box-item-subtitle
            font-size: 1.2em
            opacity: 0.5
</style>