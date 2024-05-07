<template>
  <button :class="LoadButtonClass" class="mx-2" type="button" @click="loadDictionary">
    Load
    <i class="bi bi-file-earmark-plus" />
  </button>
</template>

<script>
export default {
  name: 'LoadButton',
  /**
   * Component for a load button.
   *
   * @props {String} LoadButtonClass - The CSS class for the load button.
   * @props {String} filename - The name of the file to be loaded.
   */
  props: {
    LoadButtonClass: String,
    filename: String
  },
  /**
   * Sets up the component and defines the loadDictionary function.
   *
   * @param {Object} props - The component props.
   * @param {Object} context - The component context.
   * @param {Function} context.emit - The emit function to trigger events.
   * @returns {Object} - An object containing the loadDictionary function.
   */
  setup(props, { emit }) {

    /**
     * Loads the dictionary by emitting a 'load-click' event with the provided filename.
     *
     * @param {String} filename - The filename of the dictionary to load.
     */
    function loadDictionary() {
      emit('load-click', props.filename);
    }

    return {
      loadDictionary
    };
  }
};
</script>
