<template ref="Dictionary">
  <div class="mt-5">
    <div>
      <button class="btn btn-primary mb-3" @click="updateEntry" data-cy="refresh-button">
        Aggiorna
        <i v-if="!isRefreshing" class="bi bi-arrow-clockwise" />
        <span v-else class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
      </button>
      <div v-if="alertMessage.value != ''" style="display: inline-block; margin-left: 10px;">
        <p class="text-secondary" data-cy="alert-message">{{ alertMessage.value }}</p>
      </div>
      <div class="table-responsive">
        <div v-if="isMobile" class="d-block d-sm-none">
          <div v-for="(entry, index) in dictionaryEntries" :key="index" class="card my-3" :class="{ 'border-success': entry.load }">
            <div class="card-header" :class="{ 'text-white': entry.load, 'bg-success': entry.load }">
              <h5 class="mb-0">
                {{ entry.name }}.{{ entry.extension }}
                <i v-if="entry.load" class="bi bi-check" />
              </h5>
            </div>
            <div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between">
                    <strong>Dimensione:</strong> <span class="text-end">{{ entry.size }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between">
                    <strong>Data di caricamento:</strong> <span class="text-end">{{ entry.date }}</span>
                  </li>
                </ul>
                <div class="text-end mt-1">
                  <LoadButton :id="entry.id" :name="entry.name" :class="loadButtonClass"
                    @load-click="loadButtonClick(entry.name)" :data-cy="entry.name + 'load'" />
                  <DeleteButton :id="entry.id" :name="entry.name" :class="deleteButtonClass"
                    @delete-click="deleteButtonClick(entry.name)"
                    :data-cy="entry.name + 'delete'" />
                </div>
              </div>
            </div>
          </div>

        </div>
        <table v-else class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Data di caricamento</th>
              <th scope="col">Dimensione</th>
              <th scope="col">Azioni</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in dictionaryEntries" :key="index" :class="{ 'table-success': entry.load }">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                {{ entry.name }}.{{ entry.extension }}
                <i v-if="entry.load" class="bi bi-check" />
              </td>
              <td>{{ entry.date }}</td>
              <td>{{ entry.size }}</td>
              <td>
                <LoadButton :id="entry.id" :name="entry.name" :class="loadButtonClass"
                  @load-click="loadButtonClick(entry.name)" :data-cy="entry.name + 'load'" />
                <DeleteButton :id="entry.id" :name="entry.name" :class="deleteButtonClass"
                  @delete-click="deleteButtonClick(entry.name)"
                  :data-cy="entry.name + 'delete'" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
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
    function addNewEntry(name, extension, date, size, loaded) {
      if (name && extension && date && size && loaded !== undefined) {
        dictionaryEntries.value.push({ id: dictionaryEntries.value.length, name: name, extension: extension, date: date, size: size, load: loaded });
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
    function updateEntry() {
      this.setAlertMessage('');
      isRefreshing.value = true;
      emit('update-entry');
    }

    /**
     * Resets the dictionary entries.
     * If the dictionary entries array has elements, it clears the array.
     */
    function resetEntry() {
      if (dictionaryEntries.value.length > 0)
        dictionaryEntries.value = [];
    }

    /**
     * Sets the alert message to be displayed.
     *
     * @param {string} message - The message to be set as the alert message.
     */
    function setAlertMessage(message) {
      alertMessage.value = message;
    }

    /**
     * Stops the refreshing process.
     */
    function isRefreshingStop() {
      isRefreshing.value = false;
    }

    const isMobile = computed(() => {
      return screen.width <= 760;
    });


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
      isRefreshingStop,
      isMobile
    };
  }
};
</script>
