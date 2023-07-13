<script setup lang='ts'>
import { useModal } from 'vue-final-modal'
import MyModal from './MyModal.vue'

const { open } = useModal({
  component: MyModal,
  attrs: {
    title: 'Hello World!',
  },
  slots: {
    default: '<p>The content of the modal</p>',
  },
})
</script>

<template>
  <div>
    <font-awesome-icon icon='fa-solid fa-home' class='fa-fw fa-lg' @click='() => open()'/>
    <font-awesome-icon icon='fa-solid fa-user' class='fa-fw fa-lg'/>
    <font-awesome-icon icon='fa-brands fa-github' class='fa-fw fa-lg'/>
    <h1 class='text-3xl font-bold underline'>Spinny Boi</h1>
  </div>
</template>