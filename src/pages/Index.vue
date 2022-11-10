<template>
  <div v-if="items && items.length">
    <div class="header">
      <div class="page-title">{{ items.length }} photos</div>
      <div class="actions">
        <a @click="selectAll" class="btn" v-show="selectedItems.length != items.length">Select All</a>
        <a @click="unselectAll" class="btn" v-show="selectedItems.length == items.length">Unselect all</a>
      </div>
    </div>
    <div class="items">
      <div v-for="item of items" :key="item.url" class="item" :class="{ selected: item.selected }" @click="item.selected = !item.selected">
        <img :src="`/api/${item.url}`" />
      </div>
    </div>
    <div class="toolbar" :class="{ show: selectedItems.length > 0 }">
      <div class="text">{{ selectedItems.length }} photos selected</div>
      <a class="btn" @click="deleteselected">Delete</a>
    </div>
  </div>
  <div v-else-if="items">
    <div class="header">
      <div class="page-title">No photos</div>
    </div>
    <p>
      If you think this is an error, please check that your photos folder is correctly mapped to '/app/photos' and that it contains images
      such as screenshots
    </p>
  </div>
  <div v-else>
    <div class="header">
      <div class="page-title">Loading...</div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      items: null
    }
  },
  computed: {
    selectedItems() {
      return this.items.filter((item) => item.selected)
    }
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    fetchItems() {
      fetch('/api/list')
        .then((res) => res.json())
        .then((data) => {
          this.items = data.map(({ file, selected }) => ({ url: file, selected }))
        })
    },
    selectAll() {
      this.items.forEach((item) => (item.selected = true))
    },
    unselectAll() {
      this.items.forEach((item) => (item.selected = false))
    },
    async deleteselected() {
      const urls = this.selectedItems.map((item) => item.url)
      this.items = null
      await fetch('/api/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(urls)
      }).then((res) => res.json())
      this.fetchItems()
    }
  }
}
</script>
<style lang="sass" scpoed>
.header
  display: flex
  align-items: center
  justify-content: space-between
  margin-bottom: 16px
  .actions
    .btn
      background-color: #eee
      border-radius: 4px
      padding: 8px
      cursor: pointer
      user-select: none
      &:hover
        background-color: #ddd
      &:active
        background-color: #ccc
.items
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))
  gap: 24px
  .item
    border-radius: 4px
    overflow: hidden
    aspect-ratio: 1 / 1
    transition: all .2s ease
    cursor: pointer
    background-color: #eee
    &.selected
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #0070f3
      transform: scale(.95)
      background-color: #0070f3
      img
        opacity: 0.5
    img
      width: 100%
      height: 100%
      object-fit: cover
.toolbar
  position: fixed
  bottom: 8px
  left: 0
  right: 0
  background-color: rgb(30 30 30 / 80%)
  backdrop-filter: blur(10px)
  color: #fff
  padding: 8px 16px
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  max-width: 400px
  margin: 0 auto
  border-radius: 4px
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
  transform: translateY(100px)
  transition: all .2s ease
  opacity: 0
  &.show
    transform: translateY(0)
    opacity: 1
  .btn
    text-decoration: none
    color: #fff
    background-color: #0070f3
    padding: 8px
    border-radius: 4px
    cursor: pointer
    &:hover
      background-color: #0060e9
    &:active
      background-color: #0050d7
</style>