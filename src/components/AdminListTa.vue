<template>
  <div style="margin: 50px;" class="rounded-top">
    <v-toolbar flat color="white" class="elevation-5 rounded-top">
      <v-toolbar-title>List of Travel Agencies Admin</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-radio-group v-on:change="change_status" v-model="status" row>
        <v-radio label="All" value="all"></v-radio>
        <v-radio label="To be checked" value=""></v-radio>
        <v-radio label="Approved" value="1"></v-radio>
        <v-radio label="Declined" value="0"></v-radio>
      </v-radio-group>
    </v-toolbar>


    <v-data-table :headers="headers" :items="agencies" class="elevation-5">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.company }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.last_name }}</td>
        <td class="text-xs-right">{{ props.item.phone }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.url }}</td>
        <td class="text-xs-right">{{ props.item.country }}</td>
        <td class="text-xs-right">{{ (props.item.status == null) ? 'to be checked' : (props.item.status == '1') ? 'approved' : 'declined' }}</td>
        <td class="justify-center layout px-0" v-if="props.item.status == null">
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
  import { MLBuilder } from 'vue-multilanguage';
  export default {
    data: () => ({
      headers: [
        { text: 'Company', align: 'right', value: 'company', sortable: false },
        { text: 'First Name', value: 'first_name', sortable: true },
        { text: 'Last Name', value: 'last_name', sortable: true },
        { text: 'Phone', align: 'right', value: 'phone', sortable: false },
        { text: 'E-mail', align: 'right', value: 'email', sortable: false },
        { text: 'URL', align: 'right', value: 'url', sortable: false },
        { text: 'Country', align: 'right', value: 'country', sortable: true },
        { text: 'Status', align: 'right', value: 'status', sortable: true },
      ],
      status: 'all',
      allAgencies: [],
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
      this.reload();
    },

    methods: {
      change_status (event){
        this.agencies = this.filter(this.status);
      },

      reload() {
        axios.defaults.headers.common['Authorization'] = this.$cookies.get('token');
        axios.get('https://www.8dg.ch/api/travel_agencies?status=all')
          .then((response) => {
            this.allAgencies = response.data;
            this.agencies    = this.filter('all');
          })
          .catch(error => console.log(error));
      },

      filter(type) {
        var result = [];

        for (const item of this.allAgencies) {
          if (type=='all' || item.status==type || item.status==null && type=='') result.push(item);
        }

        return result;
      },


      // TODO: only submit the ID
      confirm (event) {
        let data = {
          ta_id : event.target.getAttribute('data-id'),
          status : '1',
          lang : this.$ml.current
        }
        axios.post('https://www.8dg.ch/api/ta_update',{data})
        .then(response => (axios.get('https://www.8dg.ch/api/travel_agencies?status='+this.status)
        .then(response => (this.agencies = response.data,console.log(response.data)))
        .catch(error => console.log(error))))
        .catch(error => (console.log(error)))
      },

      // TODO: only submit the ID
      decline (event) {
        let data = {
          ta_id : event.target.getAttribute('data-id'),
          status : '0',
          lang : this.$ml.current
        }
        axios.post('https://www.8dg.ch/api/ta_update',{data})
        .then(response => (axios.get('https://www.8dg.ch/api/travel_agencies?status='+this.status)
        .then(response => (this.agencies = response.data,console.log(response.data)))
        .catch(error => console.log(error))))
        .catch(error => (console.log(error)))
      },
    }
  }
</script>