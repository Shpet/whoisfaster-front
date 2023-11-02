<template>
  <div class="faster">
    <header class="faster__header">
      <div class="faster__time">Time: {{ preparedTime }}s</div>
      <div class="faster__counter">{{ count }}</div>
      <div class="faster__record">Record: {{ getTimeInSec(record) }}s</div>
    </header>
    <div class="faster__dot" ref="dot" @click="handleDotClicked"></div>
    <button
      class="faster__trigger"
      :class="{ 'faster__trigger--disabled': isStarted }"
      @click="startGame"
    >
      Start
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getTimeInSec } from '@/assets/helpers/time.helper'

const MAX_COUNT = 10

const time = ref(0)
const record = ref(0)
const count = ref(0)
const dot = ref<HTMLElement | null>(null)
const isStarted = ref(false)

const preparedTime = computed(() => getTimeInSec(time.value))

const getRandomPosition = () => {
  const windowHeight = window.innerHeight - 150
  const windowWidth = window.innerWidth - 50
  const marginTop = 100

  const y = Math.floor(Math.random() * (windowHeight - marginTop + 1)) + marginTop
  const x = Math.random() * windowWidth

  return { y, x }
}

const drawDot = () => {
  if (!dot.value) {
    return
  }

  const { x, y } = getRandomPosition()
  dot.value.style.transform = `translate(${x}px, ${y}px)`
}

let intervalId: NodeJS.Timeout | string = ''

const startGame = () => {
  isStarted.value = true

  if (!dot.value) {
    return
  }

  intervalId = setInterval(() => {
    time.value++
  }, 10)
  dot.value.style.display = 'block'
  drawDot()
}

const endGame = () => {
  isStarted.value = false
  count.value = 0
  clearInterval(intervalId)

  const isNewRecord = time.value < record.value || record.value === 0

  if (isNewRecord) {
    record.value = time.value
  }

  time.value = 0

  if (dot.value) {
    dot.value.style.display = 'none'
  }
}

const handleDotClicked = () => {
  count.value++

  if (count.value >= MAX_COUNT) {
    endGame()
    isStarted.value = false

    return
  }

  drawDot()
}
</script>

<style lang="scss">
$centerOfScreenY: calc(50vh - 50px);

.faster {
  background-color: #ccc;
  min-height: 100vh;

  &__header {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 24px;
    user-select: none;

    & > * {
      flex: 0 0 30%;
      text-align: center;
    }
  }

  &__counter {
    margin: 0;
    padding-top: 20px;
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    pointer-events: none;
  }

  &__trigger {
    position: absolute;
    left: calc(50% - 100px);
    top: calc($centerOfScreenY - 100px);
    height: 200px;
    width: 200px;
    border-radius: 50%;
    border: 3px dashed #a7a7a7;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    font-size: 30px;
    transition: 0.3s;
    user-select: none;
    cursor: pointer;

    &:hover {
      background-color: #a7a7a7;
    }

    &--disabled {
      display: none;
    }
  }

  &__dot {
    width: 45px;
    height: 45px;
    background-color: red;
    border-radius: 50%;
    display: none;
  }
}
</style>
