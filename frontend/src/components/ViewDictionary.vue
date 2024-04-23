<template>
  <div>
    <h2>Dictionary View</h2>
    <button class="btn btn-primary" @click="addNewEntry('Nuova voce','2')">Aggiungi Riga</button>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Load</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in dictionaryEntries" :key="index">
          <td>{{ entry.name }}</td>
          <td>
            <LoadButton :id="entry.id" :name="entry.name"  :class="loadButtonClass"  @load-click="loadButtonClick(entry.id)" />
          </td>
          <td>
            <DeleteButton :id="entry.id" :name="entry.name" :class="deleteButtonClass" @delete-click="deleteButtonClick(entry.id)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import LoadButton from '@/components/LoadButton.vue';
import DeleteButton from '@/components/DeleteButton.vue';

export default {
  name: 'ViewDictionary',
  components: {
    LoadButton,
    DeleteButton
  },
  props: {
    loadButtonClass: String,
    deleteButtonClass: String 
  },
  setup(props, { emit }) {
    const dictionaryEntries = ref([]);

    function addNewEntry(name, id) {
      dictionaryEntries.value.push({ name: name, id: id });
    }

    function loadButtonClick(id) {
      emit('load-button-clicked', id);
    }

    function deleteButtonClick(id) {
      emit('delete-button-clicked', id);
    }

    return {
      dictionaryEntries,
      addNewEntry,
      loadButtonClick,
      deleteButtonClick,

    };
  }
};
</script>
