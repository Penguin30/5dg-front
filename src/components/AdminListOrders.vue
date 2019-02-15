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

      <v-dialog v-model="item_dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Order #{{ editedItem.order_id }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text>Cruise {{ editedItem.cruise }}</v-text>
                </v-flex>
                <v-flex xs12 sm12 md12>
                   <v-text>Date {{ editedItem.date }}</v-text>
                </v-flex>
               <v-flex xs12 sm12 md12>
                   <v-text>Status {{ (editedItem.order_status == '') ? 'To be check' : editedItem.order_status }}</v-text>
                </v-flex>
                <v-flex xs12 sm12 md12>
                   <v-text>Start at {{ editedItem.start }}</v-text>
                </v-flex>
                <v-flex xs12 sm12 md12>
                   <v-text>End at {{ editedItem.end }}</v-text>
                </v-flex>
                <v-flex xs12 sm12 md12>
                   <v-text>Passengers {{ editedItem.num }}</v-text>
                </v-flex>
                <v-flex xs12 sm12 md12>
                   <v-text>Ages: {{ editedItem.ages }}</v-text>
                </v-flex>
                <v-flex xs12 sm12 md12>
                   <v-text>First Name {{ editedItem.first_name }}</v-text>
                </v-flex>
                <v-flex xs12 sm12 md12>
                   <v-text>Last Name {{ editedItem.last_name }}</v-text>
                </v-flex>
                <v-flex xs12 sm12 md12>
                   <v-text>Company {{ editedItem.company }}</v-text>
                </v-flex>
                <v-flex xs12 sm12 md12>
                   <v-text>Phone {{ editedItem.phone }}</v-text>
                </v-flex>
                <v-flex xs12 sm12 md12>
                   <v-text>Email {{ editedItem.email }}</v-text>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text>Price {{ editedItem.price}}</v-text>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text>Discount price {{ editedItem.dprice }}</v-text>
                </v-flex>
                <v-flex xs12 sm12 md12>
                   <v-text>Paid {{ editedItem.paide }}</v-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
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
        <td class="text-xs-right">{{ (props.item.order_status == '') ? 'to be checked' : props.item.order_status }}</td>
        <td class="justify-center layout px-0">
          <v-icon v-if="props.item.order_status == ''" :data-id="props.item.order_id" small class="mr-2" @click="confirm">done</v-icon>
          <v-icon :data-id="props.item.order_id" v-if="props.item.order_status == ''" small class="mr-2" @click="decline">clear</v-icon>
          <v-icon v-if="props.item.order_status == 'approved' && props.item.date > d.toISOString().substr(0, 10)" :data-id="props.item.order_id" small class="mr-2" @click="cancel">assignment_return</v-icon>
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            loupe
          </v-icon>
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
      item_dialog: false,
      editedItem: {
      },
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
      d: new Date(),
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
      this.d.setDate(this.d.getDate() + 10);
      this.reload();
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.allOrders.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.item_dialog = true
      },
      cancel(){
        let data = {
          order_id : event.target.getAttribute('data-id'),
          status : 'cancel',
          lang : this.$ml.current
        }
        axios.post('https://www.5degeneve.ch/api/order_update',{data})
        .then(response => (axios.get('https://www.5degeneve.ch/api/orders?status='+this.status)
        .then(response => (this.orders = response.data))
        .catch(error => console.log(error))))
        .catch(error => (console.log(error)))
      },
      change_status (event){
        this.orders = this.filter(this.status);
      },

      reload() {
        axios.get('https://www.5degeneve.ch/api/orders?status=all')
          .then((response) => {
            this.allOrders = response.data;
            this.orders    = this.filter('all');
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
          status : 'approved',
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
          status : 'declined',
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