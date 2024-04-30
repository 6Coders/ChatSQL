<template ref="Dictionary">
  <div class="mt-5">
    <div>
      <button class="btn btn-primary mb-3" @click="updateEntry">Aggiorna 
        <i v-if="!isRefreshing" class="bi bi-arrow-clockwise"></i>
        <span v-else class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
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
  props: {
    loadButtonClass: String,
    deleteButtonClass: String,
  },
  setup(props, { emit }) {
    const dictionaryEntries = ref([]);
    const alertMessage = reactive({ value: '' });
    const isRefreshing=ref(false);

    function addNewEntry(id,name,extension,date,size,load) 
    {
      dictionaryEntries.value.push({id:id , name: name, extension:extension , date: date, size: size , load: load});
    }

    function loadButtonClick(id) {
      emit('load-button-clicked', id);
    }

    function deleteButtonClick(id) {
      emit('delete-button-clicked', id);
    }

    function updateEntry(){
      this.setAlertMessage('');
      isRefreshing.value=true;
      emit('update-entry');
    }

    function deleteEntry(){
      dictionaryEntries.value = [];
    
    }

    function resetEntry(){
      console.log('Resetting entry');
      dictionaryEntries.value=[];
    }

    function setAlertMessage(message){
      this.isRefreshingStop();
      alertMessage.value = message;
    }

    function isRefreshingStop(){
      isRefreshing.value=false;
    }

    return {
      dictionaryEntries,
      addNewEntry,
      loadButtonClick,
      deleteButtonClick,
      updateEntry,
      deleteEntry,
      resetEntry,
      setAlertMessage,
      alertMessage,
      isRefreshing,
      isRefreshingStop

    };
  }
};
</script>
