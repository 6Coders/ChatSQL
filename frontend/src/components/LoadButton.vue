<template>
  <button :class="LoadButtonClass" class="mx-2" type="button" @click="loadDictionary">Load <i class="bi bi-file-earmark-plus"></i></button>
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
