<template ref="Dictionary">
  <div class="mt-5">
    <div>
      <button class="btn btn-primary mb-3" @click="updateEntry">
        Aggiorna 
        <i v-if="!isRefreshing" class="bi bi-arrow-clockwise"/>
        <span v-else class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>
      </button>
      <div v-if="alertMessage.value!=''" style="display: inline-block; margin-left: 10px;">
        <p class="text-secondary">{{ alertMessage.value }}</p>
      </div>
    <div class="table-responsive">
    </div>
      <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">Estensione</th>
          <th scope="col">Data di caricamento</th>
          <th scope="col">Dimensione</th>
          <th scope="col">Azioni</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in dictionaryEntries" :key="index" :class="{'table-success':entry.load}">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ entry.name }}</td>
          <td>{{entry.extension}}</td>
          <td>{{entry.date}}</td>
          <td>{{entry.size}}</td>
          <td>
            <LoadButton :id="entry.id" :name="entry.name" :class="loadButtonClass" @load-click="loadButtonClick(entry.id)" />
            <DeleteButton :id="entry.id" :name="entry.name" :class="deleteButtonClass" @delete-click="deleteButtonClick(entry.id)" />
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { reactive } from 'vue';
import LoadButton from '@/components/LoadButton.vue';
import DeleteButton from '@/components/DeleteButton.vue';

export default {
  name: 'ViewDictionary',
  components: {
    LoadButton,
    DeleteButton
  },
  /**
   * Component props for ViewDictionary.vue.
   *
   * @prop {String} loadButtonClass - The CSS class for the load button.
   * @prop {String} deleteButtonClass - The CSS class for the delete button.
   */
  props: {
    loadButtonClass: String,
    deleteButtonClass: String,
  },
  setup(props, { emit }) {

    /**
     * @property {Array} dictionaryEntries - The array of dictionary entries.
     * @property {Object} alertMessage - The reactive object for displaying alert messages.
     * @property {boolean} isRefreshing - A boolean indicating whether the component is currently refreshing.
     */
    const dictionaryEntries = ref([]);
    const alertMessage = reactive({ value: '' });
    const isRefreshing = ref(false);

    /**
     * Adds a new entry to the dictionary.
     * 
     * @param {number} id - The ID of the entry.
     * @param {string} name - The name of the entry.
     * @param {string} extension - The extension of the entry.
     * @param {string} date - The date of the entry.
     * @param {number} size - The size of the entry.
     * @param {boolean} load - The load status of the entry.
     */
    function addNewEntry(name, extension, date, size, load) {
      if (name && extension && date && size && load !== undefined) {
        dictionaryEntries.value.push({ id: dictionaryEntries.value.length, name: name, extension: extension, date: date, size: size, load: load });
      }
    }

    /**
     * Calls the 'load-button-clicked' event with the provided id.
     * @param {string} id - The id of the button clicked.
     */
    function loadButtonClick(id) {
      emit('load-button-clicked', id);
    }

    /**
     * Handles the click event of the delete button.
     * Emits a custom event with the provided ID.
     *
     * @param {number} id - The ID of the item to be deleted.
     */
    function deleteButtonClick(id) {
      emit('delete-button-clicked', id);
    }

    /**
     * Updates the entry in the dictionary.
     * Clears the alert message and sets the `isRefreshing` flag to true.
     * Emits the 'update-entry' event.
     */
    function updateEntry(){
      this.setAlertMessage('');
      isRefreshing.value=true;
      emit('update-entry');
    }

    /**
     * Resets the dictionary entries.
     * If the dictionary entries array has elements, it clears the array.
     */
    function resetEntry(){
      if(dictionaryEntries.value.length>0)
        dictionaryEntries.value=[];
    }

    /**
     * Sets the alert message to be displayed.
     *
     * @param {string} message - The message to be set as the alert message.
     */
    function setAlertMessage(message){
      alertMessage.value = message;
    }

    /**
     * Stops the refreshing process.
     */
    function isRefreshingStop(){
      isRefreshing.value=false;
    }

    return {
      dictionaryEntries,
      addNewEntry,
      loadButtonClick,
      deleteButtonClick,
      updateEntry,
      resetEntry,
      setAlertMessage,
      alertMessage,
      isRefreshing,
      isRefreshingStop

    };
  }
};
</script>
