<script setup>
import { useTaskStore } from '@/stores/task.js'
import TaskItem from '@/components/atoms/TaskItem.vue'
import AddTaskForm from '@/components/molecules/AddTaskForm.vue'

const taskStore = useTaskStore()

taskStore.load()

const editTask = (task) => {
  const name = prompt(`Edit "${task}"`, task)

  if (name && name !== task) {
    taskStore.update(task, name)
  }
}
const removeTask = (task) => {
  const remove = confirm(`Remove "${task}"?`)

  if (remove) {
    taskStore.remove(task)
  }
}
const completeTask = (task) => {
  taskStore.complete(task)
}
const clearTasks = () => {
  const remove = confirm('Remove all tasks?')

  if (remove) {
    taskStore.clear()
  }
}
</script>

<template>
  <section>
    <ol class="mb-4 list-decimal ps-4">
      <li class="pb-2" v-for="task in taskStore.list" :key="task.name">
        <TaskItem :task="task" @edit="editTask" @remove="removeTask" @complete="completeTask" />
      </li>
    </ol>
    <AddTaskForm />
    <v-btn class="mt-2" variant="text" block @click="clearTasks">Clear</v-btn>
  </section>
</template>
