import { ref } from 'vue'
import { defineStore } from 'pinia'

import { get, set } from '../service/storage'

const STORAGE_KEY = 'todo'

export const useTaskStore = defineStore('task', () => {
  const list = ref([])

  const load = () => {
    list.value = get(STORAGE_KEY)
  }
  const save = () => {
    set(STORAGE_KEY, list.value)
  }
  const clear = () => {
    list.value = []

    save()
  }

  const add = (task) => {
    list.value.push({ name: task, complete: 0 })

    save()
  }
  const update = (task, name) => {
    const index = list.value.findIndex((item) => item.name === task)

    list.value[index].name = name

    save()
  }
  const remove = (task) => {
    const index = list.value.findIndex((item) => item.name === task)

    list.value.splice(index, 1)

    save()
  }

  const toggle = (task) => {
    const index = list.value.findIndex((item) => item.name === task)

    list.value[index].complete = !list.value[index].complete

    save()
  }

  return { list, load, clear, add, update, remove, toggle }
})
