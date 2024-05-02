<template>
    <button :class="DeleteButtonClass" type="button" @click="deleteDictionary">
      Delete 
      <i class="bi bi-file-earmark-minus"/>
    </button>
</template>
  
<script>
  export default {
    name: 'DeleteButton',
    /**
     * Component for rendering a delete button.
     *
     * @component DeleteButton
     * @props {String} DeleteButtonClass - The CSS class for styling the delete button.
     * @props {String} filename - The filename for the item to be deleted.
     */
    props: {
      DeleteButtonClass: String,
      filename: String
    },
    /**
     * Sets up the DeleteButton component.
     *
     * @param {Object} props - The component props.
     * @param {Function} emit - The emit function from the Vue composition API.
     * @returns {Object} - An object containing the deleteDictionary function.
     */
    setup(props, { emit }) {

      /**
       * Deletes the dictionary item.
       *
       * @emits delete-click - Event emitted when the delete button is clicked.
       * @param {number} filename - The filename of the dictionary item to be deleted.
       */
      function deleteDictionary() {
        emit('delete-click', props.filename);
      }
      return {
        deleteDictionary
      };
    }
    
  };
</script>