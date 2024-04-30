<template>
  <button :class="LoadButtonClass" class="mx-2" type="button" @click="loadDictionary">
    Load 
    <i class="bi bi-file-earmark-plus"/>
  </button>
</template>

<script>
export default {
  name: 'LoadButton',
  /**
   * Component for a load button.
   *
   * @props {String} LoadButtonClass - The CSS class for the load button.
   * @props {String} id - The unique identifier for the load button.
   */
  props: {
    LoadButtonClass: String,
    id: String
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
     * Loads the dictionary by emitting a 'load-click' event with the provided ID.
     *
     * @param {number} id - The ID of the dictionary to load.
     */
    function loadDictionary(id) {
      emit('load-click', id);
    }

    return {
      loadDictionary
    };
  }
};
</script>
