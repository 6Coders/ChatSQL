<template>
    <div>
      <h2>Dictionary View</h2>
      <table>
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
              <LoadButton :index="index" @clicked="handleButton1Clicked" />
            </td>
            <td>
              <DeleteButton :index="index" @clicked="handleButton2Clicked" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import LoadButton from '@/components/LoadButton.vue';
  import DeleteButton from '@/components/DeleteButton.vue';
  
  export default {
    name:'ViewDictionary',
    components: {
      LoadButton,
      DeleteButton
    },
    data() {
      return {
        dictionaryEntries: [],
        rowIndex: 0
      };
    },
    methods: {
      addNewRow() {
        this.dictionaryEntries.push({ name: 'New Dictionary Entry', index: this.rowIndex });
        this.rowIndex++;
      },
      handleButton1Clicked(index) {
        console.log('LoadButton clicked for row index:', index);
      },
      handleButton2Clicked(index) {
        console.log('DeleteButton clicked for row index:', index);
      }
    }
  };
  </script>