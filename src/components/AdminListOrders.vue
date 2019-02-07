<template>
  <div style="margin: 50px;" class="rounded-top">
    <v-toolbar flat color="white" class="elevation-5 rounded-top">
      <v-toolbar-title>{{ $ml.get('orders_ad_title') }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-radio-group v-on:change="change_status" v-model="status" row>
        <v-radio :label="$ml.get('status_all')" value="all"></v-radio>
        <v-radio :label="$ml.get('status_check')" value=""></v-radio>
        <v-radio :label="$ml.get('status_approved')" value="option1"></v-radio>
        <v-radio :label="$ml.get('status_declined')" value="option2"></v-radio>
      </v-radio-group>
    </v-toolbar>


    <v-data-table :headers="headers" :items="orders" class="elevation-5">
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.date }}</td>
        <td>{{ props.item.cruise }}</td>
        <td class="text-xs-right">{{ props.item.num }}</td>
        <td class="text-xs-right">{{ props.item.start }}</td>
        <td class="text-xs-right">{{ props.item.end }}</td>
        <td>{{ props.item.first_name }}</td>
        <td>{{ props.item.last_name }}</td>
        <td class="text-xs-right">{{ props.item.phone }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="text-xs-right">{{ props.item.dprice }}</td>
        <td class="text-xs-right">{{ props.item.paide }}</td>
         <td class="text-xs-right">{{ props.item.company }}</td>
        <td class="text-xs-right">{{ (props.item.order_status == '') ? 'to be checked' : (props.item.order_status == 'approved') ? 'approved' : 'declined' }}</td>
        {{ d }}
        <td class="justify-center layout px-0">
          <v-icon v-if="props.item.order_status == ''" :data-id="props.item.order_id" small class="mr-2" @click="confirm">done</v-icon>
          <v-icon v-if="props.item.order_status == 'approved'" :data-id="props.item.order_id" small class="mr-2" @click="decline">clear</v-icon>
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
        { text: 'Date', align: 'right', value: 'date' },
        { text: 'Cruise', align: 'left', sortable: false, value: 'cruise'},
        { text: 'Passengers', align: 'right', value: 'num' },
        { text: 'Time Start', align: 'right', value: 'start' },
        { text: 'Time End', align: 'right', value: 'end' },
        { text: 'First Name', value: 'first_name', sortable: false },
        { text: 'Last Name', value: 'last_name', sortable: false },
        { text: 'Phone', align: 'right', value: 'phone', sortable: false },
        { text: 'E-mail', align: 'right', value: 'email', sortable: false },
        { text: 'Price', align: 'right', value: 'price'},
        { text: 'D Price', align: 'right', value: 'dprice'},
        { text: 'Paid', align: 'right', value: 'paide'},
        { text: 'Agency', align: 'right', value: 'company' },
        { text: 'Status', align: 'right', value: 'order_status' }
      ],
      status: 'all',
      d: new Date(2017,1,12),
      allOrders: [],
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
      d.setDate(d.getDate() + 10);
      this.reload();
    },

    methods: {
      change_status (event){
        this.orders = this.filter(this.status);
      },

      reload() {
        axios.get('https://www.5degeneve.ch/api/orders?status=all')
          .then((response) => {
            this.allOrders = response.data;
            this.orders    = this.filter('all');
            console.log(this.allOrders);
          })
          .catch(error => console.log(error));
      },

      filter(type) {
        var result = [];

        for (const item of this.allOrders) {
          if (type=='all' || item.order_status==type) result.push(item);
        }

        return result;
      },

      // TODO: only submit the ID
      confirm (event) {
        let data = {
          order_id : event.target.getAttribute('data-id'),
          status : 'Confirmed',
          lang : this.$ml.current
        }
        axios.post('https://www.5degeneve.ch/api/order_update',{data})
        .then(response => (axios.get('https://www.5degeneve.ch/api/orders?status='+this.status)
        .then(response => (this.orders = response.data))
        .catch(error => console.log(error))))
        .catch(error => (console.log(error)))
      },

      // TODO: only submit the ID
      decline (event) {
        let data = {
          order_id : event.target.getAttribute('data-id'),
          status : 'Declined',
          lang : this.$ml.current
        }
        axios.post('https://www.5degeneve.ch/api/order_update',{data})
        .then(response => (axios.get('https://www.5degeneve.ch/api/orders?status='+this.status)
        .then(response => (this.orders = response.data))
        .catch(error => console.log(error))))
        .catch(error => (console.log(error)))
      },
    }
  }
</script>