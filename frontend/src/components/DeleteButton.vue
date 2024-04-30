<template>
    <button :class="DeleteButtonClass" type="button" @click="deleteDictionary">Delete <i class="bi bi-file-earmark-minus"></i></button>
  </template>
  
  <script>
  export default {
    name: 'DeleteButton',
    props: {
      DeleteButtonClass: String,
      id: String
    },
    setup(props, { emit }) {
  
      function deleteDictionary() {
        emit('delete-click', props.id);
      }
  
      return {
        deleteDictionary
      };
    }
    
  };
  </script>