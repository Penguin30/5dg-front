<template>
  <div style="margin: 50px;" class="rounded-top">
    <v-toolbar flat color="white" class="elevation-5 rounded-top">
      <v-toolbar-title>List of Orders</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.first_name" readonly label="First Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.last_name" readonly label="Last Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.phone" readonly label="Phone"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.email" readonly label="EMail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.date" readonly label="Date"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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

        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="viewOrder(props.item)">search</v-icon>
        </td>
      </template>

      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
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
      dialog: false,
      headers: [
        { text: 'First Name', value: 'first_name', sortable: false },
        { text: 'Last Name', value: 'last_name', sortable: false },
        { text: 'Phone', align: 'right', value: 'phone', sortable: false },
        { text: 'Email', align: 'right', value: 'email', sortable: false },
        { text: 'Cruise', align: 'left', sortable: false, value: 'cruise'},
        { text: 'Date', align: 'right', value: 'date' },
        { text: 'Start Time', align: 'right', value: 'start' },
        { text: 'End Time', align: 'right', value: 'end' },
        { text: 'Passengers', align: 'right', value: 'num' }
      ],
      orders: [],
      editedIndex: -1,
      editedItem: {
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
      },
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

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize();
      axios.get('https://srv.5degeneve.ch/api/get_ta_orders?email='+this.$cookies.get('email'))
      .then(response => (console.log(this.info = response)))
      .catch(error => console.log(error));
    },

    methods: {
      initialize () {
        this.orders = [
          { order_id: 1, cruise: 'A', date: '10.10.2019', start: '11:00', end: '17:00', num: 0, first_name: 'Peter', last_name: 'Pan', phone: '+41 56 5465 212', email: 'no@useful.mail'},
          { order_id: 2, cruise: 'A', date: '10.10.2019', start: '11:00', end: '16:00', num: 0, first_name: 'Peter', last_name: 'Pan', phone: '+41 56 5465 212', email: 'no@useful.mail'},
          { order_id: 3, cruise: 'A', date: '10.10.2019', start: '11:00', end: '17:00', num: 0, first_name: 'Peter', last_name: 'Pan', phone: '+41 56 5465 212', email: 'no@useful.mail'},
          { order_id: 4, cruise: 'A', date: '10.10.2019', start: '11:00', end: '16:00', num: 0, first_name: 'Peter', last_name: 'Pan', phone: '+41 56 5465 212', email: 'no@useful.mail'},
          { order_id: 5, cruise: 'A', date: '10.10.2019', start: '11:00', end: '17:00', num: 0, first_name: 'Peter', last_name: 'Pan', phone: '+41 56 5465 212', email: 'no@useful.mail'}
        ]
      },

      viewOrder (item) {
        this.editedIndex = this.orders.indexOf(item)
        this.editedItem  = Object.assign({}, item)
        this.dialog      = true
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      }
    }
  }
</script>