<template>
    <v-stepper v-model="e1">
        <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Choose date</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">Register</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 3" step="3">Confirmation</v-stepper-step>

        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content step="1">
                <v-card>
                    <v-layout row wrap  style="padding: 10px 0 0">
                        <v-flex xs12>
                            <v-date-picker
                                v-model="date"
                                color="blue lighten-1"
                                landscape=true
                                year-icon="mdi-calendar-blank"
                                prev-icon="mdi-skip-previous"
                                next-icon="mdi-skip-next"
                              />
                        </v-flex>
                        <v-flex v-if="type == 'custom'" xs6 class="m-t-10" style="padding-right:10px">
                            <label>Start Time</label>
                            <datetime v-model="startDate"
                                      class="input-date"
                                      type="time"
                                      minute-step=15
                                      />
                        </v-flex>
                        <v-flex v-if="type == 'custom'" xs6 class="m-t-10" style="padding-left:10px">
                            <label>End Time</label>
                            <datetime v-model="endDate"
                                      class="input-date"
                                      type=time   
                                      minute-step=15
                                      />
                        </v-flex>
                        <v-flex xs12 class="m-t-10">
                            <label>{{this.dateError}}</label>
                        </v-flex>
                        <v-btn class="next-btn"
                               color="primary"
                               @click="check_date">
                            Continue
                        </v-btn>
                    </v-layout>
                </v-card>

            </v-stepper-content>

            <v-stepper-content step="2">
                <v-card>
                    <template>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-layout justify-space-between column>
                                <v-layout justify-space-between column>
                                    <v-layout row wrap>
                                        <v-select v-model="gender" :rules="genderRule" :items="genderItems" label="Title"
                                                  style="width:20%"></v-select>
                                        <v-text-field v-model="firstName" :rules="nameRules" :counter="25" label="First Name" required
                                                      style="width:40%; padding-left:10px"></v-text-field>
                                        <v-text-field v-model="laststName" :rules="nameRules" :counter="25" label="Last Name" required
                                                      style="width:40%; padding-left:10px"></v-text-field>
                                    </v-layout>


                                    <v-text-field v-model="street" :rules="nameRules" :counter="25" label="Street"></v-text-field>


                                    <v-layout row wrap>
                                        <v-autocomplete v-model="country" :items="countries" label="Country" required style="width:40%">

                                        </v-autocomplete>
                                        <v-text-field v-model="city" :rules="nameRules" style="width:60%; padding-left:10px"
                                                      label="City"></v-text-field>
                                    </v-layout>

                                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                                    <v-text-field v-model="cell" :rules="emailRules" label="Cell-Phone" required></v-text-field>
                                </v-layout>

                                <v-layout justify-space-between column>
                                    <v-checkbox v-if="type=='evening'" v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']"
                                                label="Do you agree?" required></v-checkbox>


                                    <v-text-field v-model="attendees" min="1" max="5" dense
                                                  label="Number of people that are going to attend" type="number"></v-text-field>
                                    <v-layout justify-space-between row>

                                        <v-select v-model="agePerson1" label="Age (1)" :items="ageRanges"></v-select>
                                        <v-select v-model="agePerson2" label="Age (2)" :items="ageRanges" style="padding-left:20px"
                                                  v-if="attendees>1"></v-select>
                                        <v-select v-model="agePerson3" label="Age (3)" :items="ageRanges" style="padding-left:20px"
                                                  v-if="attendees>2"></v-select>
                                        <v-select v-model="agePerson4" label="Age (4)" :items="ageRanges" style="padding-left:20px"
                                                  v-if="attendees>3"></v-select>
                                        <v-select v-model="agePerson5" label="Age (5)" :items="ageRanges" style="padding-left:20px"
                                                  v-if="attendees>4"></v-select>
                                    </v-layout>
                                    <v-text-field type="time" v-model="test" :rules="nameRules" :items="ageRanges"
                                                  label="Last Name"></v-text-field>
                                </v-layout>
                            </v-layout>
                            <v-btn :disabled="!valid" @click="submit">submit</v-btn>
                            <v-btn @click="clear">clear</v-btn>
                        </v-form>
                    </template>
                </v-card>
            </v-stepper-content>


             <v-stepper-content step="3">
                <v-card>
                    <p>thnx</p>
                </v-card>
            </v-stepper-content>

        </v-stepper-items>
    </v-stepper>
</template>

<style>
    .start-date, .end-date {
        margin: 10px 0;
    }

    .input-date {
        border: 1px solid #ddd;
        color: black;
        line-height: 15px;
        border-radius: 3px;
        padding: 10px 10px;
    }

    .m-t-10 {
        margin-top: 10px;
    }
</style>

<script>
    import { MLBuilder } from 'vue-multilanguage';
    import UserForm from './UserForm';
    import axios from 'axios';
    import { Datetime } from 'vue-datetime'
    import 'vue-datetime/dist/vue-datetime.css';

    export default {
        components: {
            UserForm,
            Datetime
        },
        props: ['type','cruise_id'],
        data() {
            return {
                date: new Date().toISOString().substr(0, 10),
                e1: 0,
                startDate: '',
                endDate: '',
                endMinDate: new Date().toISOString(),
                dateError: '',
                valid: true,
                firstName: '',
                laststName: '',
                nameRules: [v => !!v || 'Name is required', v => (v && v.length <= 100) || 'Name must be less than 10 characters'],
                email: '',
                emailRules: [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid'],
                gender: null,
                genderRule: [v => !!v || 'Please select your Gender!'],
                genderItems: ['Mr.', 'Mrs.'],
                checkbox: false,
                attendees: 1,
                agePerson1: null,
                agePerson2: null,
                agePerson3: null,
                agePerson4: null,
                ageRanges: ['0 - 3', '3 - 6', '6 - 12', '12 - 18', '18 - 60', '> 60'],
                countries: [
                    {text: 'ad', value: 'addd', avatar: 'ad'}
                ]
            }
        },
        methods: {
            check_date(){
                let event = this.date;
                let today = new Date();
                let dd = today.getDate();
                let mm = today.getMonth()+1;
                let yyyy = today.getFullYear();
                if(dd<10) {
                  dd = '0'+dd
                } 

                if(mm<10) {
                  mm = '0'+mm
                }
                today = yyyy + '-' + mm + '-' + dd;
                if(event > today){
                    this.$store.state.cruise = this.cruise_id;
                    let data = {
                        date: event,
                        cruise: this.cruise_id,
                        time_start: new Date(this.startDate).getHours()+':'+new Date(this.startDate).getMinutes(),
                        time_end: new Date(this.endDate).getHours()+':'+new Date(this.endDate).getMinutes()
                    };
                    if(Math.abs(new Date(this.endDate).getTime() - new Date(this.startDate).getTime()) / 3600000 < 3 || Math.abs(new Date(this.endDate).getTime() - new Date(this.startDate).getTime()) / 3600000 > 15){
                        this.dateError = this.$ml.get('short_time_or_long') 
                    }else{
                        axios.post('https://srv.5degeneve.ch/api/check_time',{data}).then(response => ((response.data == 'ok') ? (this.e1 = 2,this.$store.state.step = 2,this.$store.state.date = event,this.$store.state.time_s = new Date(this.startDate).getHours()+':'+new Date(this.startDate).getMinutes(),this.$store.state.time_e = new Date(this.endDate).getHours()+':'+new Date(this.endDate).getMinutes()) : this.dateError = this.$ml.get('not_correct_time')))
                    }
                }else{
                    this.dateError = this.$ml.get('date_less_today');
                }
            },
            submit(event) {
                console.log(this.e1);
                if (this.$refs.form.validate()) {
                    let ages = {
                        age1: this.agePerson1,
                        age2: this.agePerson2,
                        age3: this.agePerson3,
                        age4: this.agePerson4,
                        age5: this.agePerson5
                    };
                    let cruise_id = this.$store.state.cruise;
                    let data = {
                        firstName: this.firstName,
                        email: this.email,
                        gender: this.gender,
                        laststName: this.laststName,
                        street: this.street,
                        country: this.country,
                        city: this.city,
                        phone: this.cell,
                        cruise_id: cruise_id,
                        date: this.$store.state.date,
                        time_start: this.$store.state.time_s,
                        time_end: this.$store.state.time_e,
                        n_persons: this.attendees,
                        ages: ages,
                        stop: this.checkbox
                    }
                    axios.post('https://srv.5degeneve.ch/api/orders', {data})
                        .then(
                            this.e1 = 3
                        )
                        .catch(error => console.log(error));
                }
            },
            clear() {
                this.$refs.form.reset()
            },
        },
        created(){
            this.$store.state.step=0;
        }
    }
</script>