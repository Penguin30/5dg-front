<template>
  <div style="margin: 50px;" class="rounded-top">
    <v-toolbar flat color="white" class="elevation-5 rounded-top">
      <v-toolbar-title>List of Travel Agencies</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <!-- <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn> -->
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.company" readonly label="Company"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.title" readonly label="Title"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.first_name" readonly label="First Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.last_name" readonly label="Last Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.street" readonly label="Street"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.zip" readonly label="ZIP"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.city" readonly label="City"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.country" readonly label="Country"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.phone" readonly label="Phone"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.email" readonly label="EMail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.url" readonly label="URL"></v-text-field>
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


    <v-data-table :headers="headers" :items="agencies" class="elevation-5">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.company }}</td>
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.first_name }}</td>
        <td>{{ props.item.last_name }}</td>
        <td>{{ props.item.country }}</td>
        <td class="text-xs-right">{{ props.item.phone }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.url }}</td>

        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="viewAgency(props.item)">search</v-icon>
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
  import { MLBuilder } from 'vue-multilanguage';
  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: 'Company',    value: 'company' },
        { text: 'Title',      value: 'title' },
        { text: 'First Name', value: 'first_name' },
        { text: 'Last Name',  value: 'last_name' },
        { text: 'Country',    value: 'country' },
        { text: 'Email',      value: 'email', align: 'right' },
        { text: 'Phone',      value: 'phone', align: 'right'},
        { text: 'URL',        value: 'url', align: 'right' }
      ],
      agencies: [],
      editedIndex: -1,
      editedItem: {
        agency_id: 0,
        company: '',
        title: '',
        first_name: '',
        last_name: '',
        street: '',
        zip: '',
        city: '',
        country: '',
        email: '',
        phone: '',
        url: ''
      },
      defaultItem: {
        agency_id: 0,
        company: '',
        title: '',
        first_name: '',
        last_name: '',
        street: '',
        zip: '',
        city: '',
        country: '',
        email: '',
        phone: '',
        url: ''
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
      this.initialize()
    },

    methods: {
      initialize () {
        this.agencies = [
          { agency_id: 1, company: 'Some Agency', title: 'Mr.', first_name: 'Francis', last_name: 'Mondo', street: 'Some Street 14', zip: '54546', city: 'Dubai', country: 'Irland', email: 'wrong@email.adr', phone: '+45 654 456 654', url: 'www.iknowyou.com' },
          { agency_id: 2, company: 'Some Agency', title: 'Mr.', first_name: 'Francis', last_name: 'Mondo', street: 'Some Street 14', zip: '54546', city: 'Dubai', country: 'Irland', email: 'wrong@email.adr', phone: '+45 654 456 654', url: 'www.iknowyou.com' },
          { agency_id: 3, company: 'Some Agency', title: 'Mr.', first_name: 'Francis', last_name: 'Mondo', street: 'Some Street 14', zip: '54546', city: 'Dubai', country: 'Irland', email: 'wrong@email.adr', phone: '+45 654 456 654', url: 'www.iknowyou.com' },
          { agency_id: 4, company: 'Some Agency', title: 'Mr.', first_name: 'Francis', last_name: 'Mondo', street: 'Some Street 14', zip: '54546', city: 'Dubai', country: 'Irland', email: 'wrong@email.adr', phone: '+45 654 456 654', url: 'www.iknowyou.com' },
          { agency_id: 5, company: 'Some Agency', title: 'Mr.', first_name: 'Francis', last_name: 'Mondo', street: 'Some Street 14', zip: '54546', city: 'Dubai', country: 'Irland', email: 'wrong@email.adr', phone: '+45 654 456 654', url: 'www.iknowyou.com' },
        ]
      },

      viewAgency (item) {
        this.editedIndex = this.agencies.indexOf(item)
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