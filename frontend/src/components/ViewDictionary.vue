<template ref="Dictionary">
  <div class="mt-5">
    <button class="btn btn-primary mb-3" @click="updateEntry">Aggiorna <i class="bi bi-arrow-clockwise"></i></button>
    <div class="table-responsive">
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
          <td>{{ entry.name }}
            <div class="spinner-grow text-success spinner-grow-sm" role="status"/>
          </td>
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

    function addNewEntry(id,name,extension,date,size,load) {
      dictionaryEntries.value.push({id:id , name: name, extension:extension , date: date, size: size , load: load});
    }

    function loadButtonClick(id) {
      emit('load-button-clicked', id);
    }

    function deleteButtonClick(id) {
      emit('delete-button-clicked', id);
    }

    function updateEntry(){
      dictionaryEntries.value = [];
      emit('update-entry');
    }

    return {
      dictionaryEntries,
      addNewEntry,
      loadButtonClick,
      deleteButtonClick,
      updateEntry

    };
  }
};
</script>
