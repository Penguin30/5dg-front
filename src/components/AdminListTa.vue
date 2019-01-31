<template>
  <div style="margin: 50px;" class="rounded-top">
    <v-toolbar flat color="white" class="elevation-5 rounded-top">
      <v-toolbar-title>List of Travel Agencies Admin</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
    </v-toolbar>


    <v-data-table :headers="headers" :items="agencies" class="elevation-5">
      <template v-if="props.item.status == null"  slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.last_name }}</td>
        <td class="text-xs-right">{{ props.item.phone }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td>{{ props.item.company }}</td>
        <td class="text-xs-right">{{ props.item.url }}</td>
        <td class="text-xs-right">{{ props.item.country }}</td>

        <td class="justify-center layout px-0">
          <v-icon :data-id="props.item.id" small class="mr-2" @click="confirm">done</v-icon>
          <v-icon :data-id="props.item.id" small class="mr-2" @click="decline">clear</v-icon>
        </td>
      </template>

    </v-data-table>
  </div>
</template>

<style>
  .rounded-top {
    border-radius:10px 10px 0px 0px;
  }

</style>

<script>
  import axios from 'axios';
  export default {
    data: () => ({
      headers: [
        { text: 'First Name', value: 'first_name', sortable: false },
        { text: 'Last Name', value: 'last_name', sortable: false },
        { text: 'Phone', align: 'right', value: 'phone', sortable: false },
        { text: 'Email', align: 'right', value: 'email', sortable: false },
        { text: 'Company', align: 'right', value: 'company', sortable: false },
        { text: 'URL', align: 'right', value: 'url', sortable: false },
        { text: 'Country', align: 'right', value: 'country', sortable: false },
      ],
      agencies: [],
      defaultItem: {
        order_id: 0,
        cruise: '',
        date: null,
        start: null,
        end: null,
        num: 0,
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
      }
    }),


    created () {
      this.initialize();
    },

    methods: {
      initialize () {
        axios.get('https://www.5degeneve.ch/api/travel_agencies')
        .then(response => (this.agencies = response.data,console.log(response.data)))
        .catch(error => console.log(error));
      },
      confirm (event) {
        let data = {
          ta_id : event.target.getAttribute('data-id'),
          status : '1',
          lang : this.$ml.current
        }
        axios.post('https://www.5degeneve.ch/api/ta_update',{data})
        .then(response => (axios.get('https://www.5degeneve.ch/api/travel_agencies')
        .then(response => (this.agencies = response.data,console.log(response.data)))
        .catch(error => console.log(error))))
        .catch(error => (console.log(error)))
      },
      decline (event) {
        let data = {
          ta_id : event.target.getAttribute('data-id'),
          status : '0',
          lang : this.$ml.current
        }
        axios.post('https://www.5degeneve.ch/api/ta_update',{data})
        .then(response => (axios.get('https://www.5degeneve.ch/api/travel_agencies')
        .then(response => (this.agencies = response.data,console.log(response.data)))
        .catch(error => console.log(error))))
        .catch(error => (console.log(error)))
      },
    }
  }
</script>