<template>
<div class="checkmark">
    <div class="checkmark_circle"></div>
    <div v-if="done" class="checkmark_stem"></div>
    <div v-if="done" class="checkmark_kick"></div>
</div>
</template>

<script>
export default {
  name: "Checkmark",
  props: {
    done: Boolean
  }
}
</script>

<style scoped>
.checkmark {
  display: inline-block;
  width: 22px;
  height: 22px;
  -ms-transform: rotate(45deg); /* IE 9 */
  -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
  transform: rotate(45deg);
}

.checkmark_circle {
  position: absolute;
  width: 22px;
  height: 22px;
  border: 1px solid grey;
  border-radius: 11px;
  left: 0;
  top: 0;
}

.checkmark_stem {
  position: absolute;
  width: 3px;
  height: 9px;
  background-color: grey;
  left: 11px;
  top: 6px;
}

.checkmark_kick {
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: grey;
  left: 8px;
  top: 12px;
}
</style>