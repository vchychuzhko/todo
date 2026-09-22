<script setup lang="ts">
import { type TaskGroup, useTasks } from '@/composables/useTasks.ts'
import TaskItem from '@/components/TasksList/TaskItem.vue'
import AddTaskForm from '@/components/TasksList/AddTaskForm.vue'

const tasks = useTasks()

const props = defineProps<{
  group: TaskGroup
  groupIndex: number
}>()
const emit = defineEmits<{
  (e: 'remove'): void
}>()

const addTask = (task: string) => {
  tasks.add(props.groupIndex, task)
}
const editTask = (taskIndex: number) => {
  const task = props.group.tasks[taskIndex].name
  const name = prompt(`Edit "${task}"`, task)

  if (name && name !== task) {
    tasks.update(props.groupIndex, taskIndex, name)
  }
}
const removeTask = (taskIndex: number) => {
  const task = props.group.tasks[taskIndex].name
  const remove = confirm(`Remove "${task}"?`)

  if (remove) {
    tasks.remove(props.groupIndex, taskIndex)
  }
}
const toggleTask = (taskIndex: number) => {
  tasks.toggle(props.groupIndex, taskIndex)
}

const clearGroup = () => {
  if (!props.group.tasks.length) {
    return emit('remove')
  }

  const clear = confirm('Clear all tasks?')

  if (clear) {
    tasks.clearGroup(props.groupIndex)
  }
}
</script>

<template>
  <section class="mx-auto max-w-120">
    <ol class="mb-4 list-decimal ps-5">
      <li class="pb-2" v-for="(task, index) in group.tasks" :key="task.name">
        <TaskItem
          :task="task"
          @edit="() => editTask(index)"
          @remove="() => removeTask(index)"
          @toggle="() => toggleTask(index)"
        />
      </li>
    </ol>
    <AddTaskForm @add="addTask" />
    <v-btn
      class="mt-2"
      :text="group.tasks.length ? 'Clear' : 'Remove'"
      variant="text"
      block
      @click="clearGroup"
    />
  </section>
</template>
