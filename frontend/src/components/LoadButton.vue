<template>
  <button :class="LoadButtonClass" type="button" @click="loadDictionary">Load</button>
</template>

<script>
export default {
  name: 'LoadButton',
  props: {
    LoadButtonClass: String,
    id: String
  },
  setup(props, { emit }) {

    function loadDictionary() {
      emit('load-click', props.id);
    }

    return {
      loadDictionary
    };
  }
};
</script>
