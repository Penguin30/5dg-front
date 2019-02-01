<template>
  <div style="margin: 50px;" class="rounded-top">
    <v-toolbar flat color="white" class="elevation-5 rounded-top">
      <v-toolbar-title>List of Orders Admin</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-radio-group v-on:change="change_status" v-model="status" row>
        <v-radio label="All" value="all"></v-radio>
        <v-radio label="To be checked" value=""></v-radio>
        <v-radio label="Approved" value="option1"></v-radio>
        <v-radio label="Declined" value="option2"></v-radio>
      </v-radio-group>
    </v-toolbar>


    <v-data-table :headers="headers" :items="orders" class="elevation-5">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.first_name }}</td>
        <td>{{ props.item.last_name }}</td>
        <td class="text-xs-right">{{ props.item.phone }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td>{{ props.item.cruise }}</td>
        <td class="text-xs-right">{{ props.item.date }}</td>
        <td class="text-xs-right">{{ props.item.start }}</td>
        <td class="text-xs-right">{{ props.item.end }}</td>
        <td class="text-xs-right">{{ props.item.num }}</td>
        <td class="text-xs-right">{{ (props.item.order_status == '') ? 'to be checked' : (props.item.order_status == 'option1') ? 'approved' : 'declined' }}</td>

        <td class="justify-center layout px-0" v-if="props.item.order_status == ''">
          <v-icon :data-id="props.item.order_id" small class="mr-2" @click="confirm">done</v-icon>
          <v-icon :data-id="props.item.order_id" small class="mr-2" @click="decline">clear</v-icon>
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
        { text: 'Cruise', align: 'left', sortable: false, value: 'cruise'},
        { text: 'Date', align: 'right', value: 'date' },
        { text: 'Start Time', align: 'right', value: 'start' },
        { text: 'End Time', align: 'right', value: 'end' },
        { text: 'Passengers', align: 'right', value: 'num' },
        { text: 'Status', align: 'right', value: 'order_status' }
      ],
      status: 'all',
      orders: [],
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
      change_status (event){
        axios.get('https://www.5degeneve.ch/api/orders?status='+this.status)
        .then(response => (this.orders = response.data))
        .catch(error => console.log(error));
      },
      initialize () {
        axios.get('https://www.5degeneve.ch/api/orders?status='+this.status)
        .then(response => (this.orders = response.data))
        .catch(error => console.log(error));
      },
      confirm (event) {
        let data = {
          order_id : event.target.getAttribute('data-id'),
          status : 'Confirmed',
          lang : this.$ml.current
        }
        axios.post('https://www.5degeneve.ch/api/order_update',{data})
        .then(response => (axios.get('https://www.5degeneve.ch/api/orders')
        .then(response => (this.orders = response.data))
        .catch(error => console.log(error))))
        .catch(error => (console.log(error)))
      },
      decline (event) {
        let data = {
          order_id : event.target.getAttribute('data-id'),
          status : 'Declined',
          lang : this.$ml.current
        }
        axios.post('https://www.5degeneve.ch/api/order_update',{data})
        .then(response => (axios.get('https://www.5degeneve.ch/api/orders')
        .then(response => (this.orders = response.data))
        .catch(error => console.log(error))))
        .catch(error => (console.log(error)))
      },
    }
  }
</script>