<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/task.js'

const taskStore = useTaskStore()

const task = ref('')

const addTask = () => {
  if (!task.value) return

  taskStore.add(task.value)

  task.value = ''
}
</script>

<template>
  <v-form @submit.prevent="addTask">
    <v-text-field v-model="task" label="Your task" />
    <v-btn type="submit" block>Add</v-btn>
  </v-form>
</template>
