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
                    <UserForm :step="e1" :type='type'/>
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
                step: 0,
                date: new Date().toISOString().substr(0, 10),
                e1: 0,
                startDate: '',
                endDate: '',
                endMinDate: new Date().toISOString(),
                dateError: '',
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
                        axios.post('http://5dg.utest.space/api/check_time',{data}).then(response => (console.log(response),(response.data == 'ok') ? (this.e1 = 2,this.$store.state.step = 2,this.$store.state.date = event,this.$store.state.time_s = new Date(this.startDate).getHours()+':'+new Date(this.startDate).getMinutes(),this.$store.state.time_e = new Date(this.endDate).getHours()+':'+new Date(this.endDate).getMinutes()) : this.dateError = this.$ml.get('not_correct_time')))
                    }
                }else{
                    this.dateError = this.$ml.get('date_less_today');
                }
            }
        },
        created(){
            this.$store.state.step=0;
        }
    }
</script>