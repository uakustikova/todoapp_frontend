<template>
  <input class="todo-input" type="text" placeholder="Enter next todo..."
         v-model="value"
         @keyup.enter="enter"
  >
</template>

<script>
export default {
  name: "TodoInput",
  data() {
    return {
      value: null
    }
  },
  methods: {
    enter() {
      this.$emit('new-todo', this.value);
      this.value = null;
    }
  }
}
</script>

<style scoped>
.todo-input {
  line-height: 1.6;
  font-size: 15px;
  color: var(--color-text);
  width: 400px;
  padding: 10px 20px;
  margin: 10px;

  border: 1px solid grey;
  border-radius: 20px;

  display: flex;
  flex-wrap: nowrap;

  background-color: #282828;
  transition: background-color 0.2s;
}

.todo-input:focus {
  background-color: #2c3e50;
  outline: none;
}
</style>