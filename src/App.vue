<script setup lang="ts">
import { useTaskStore } from '@/stores/task.js'
import TasksList from './components/TasksList.vue'
import { nextTick, ref } from 'vue'

const taskStore = useTaskStore()

taskStore.load()

const tab = ref<number | null>(null)

const addGroup = () => {
  const name = prompt('Enter group name')

  if (name) {
    taskStore.addGroup(name)

    nextTick(() => {
      tab.value = taskStore.list.length - 1
    })
  } else {
    tab.value = 0
  }
}
const removeGroup = (groupIndex: number) => {
  const group = taskStore.list[groupIndex]
  const remove = confirm(`Remove "${group.name}" group?`)

  if (remove) {
    taskStore.removeGroup(groupIndex)

    tab.value = 0
  }
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <v-tabs v-model="tab">
        <v-tab
          v-for="(group, index) in taskStore.list"
          :key="group.name"
          :text="group.name"
          :value="index"
        />

        <v-tab class="min-w-auto!" slim @click.prevent="addGroup">
          <v-icon icon="mdi-plus" />
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item
            v-for="(group, index) in taskStore.list"
            :key="group.name"
            :value="index"
          >
            <TasksList :group="group" :group-index="index" @remove="() => removeGroup(index)" />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-container>
    </v-main>
  </v-app>
</template>
