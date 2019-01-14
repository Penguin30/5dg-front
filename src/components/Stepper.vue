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
                            <DataPicker/>
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
                                      type="time"
                                      minute-step=15
                                      :min-datetime="endMinDate"/>
                        </v-flex>
                        <v-flex xs12 class="m-t-10">
                            <label>{{this.dateError}}</label>
                        </v-flex>
                        <v-btn class="next-btn"
                               disabled="disabled"
                               color="primary"
                               @click="check_date">
                            Continue
                        </v-btn>
                    </v-layout>
                </v-card>

            </v-stepper-content>

            <v-stepper-content step="2">
                <v-card>
                    <UserForm/>
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
    import UserForm from './UserForm';
    import DataPicker from './DataPicker';
    import 'vue-datetime/dist/vue-datetime.css';


    export default {
        components: {
            UserForm,
            DataPicker
        },
        props: ['type'],
        data() {
            return {
                e1: 0,
                startDate: '',
                endDate: '',
                endMinDate: new Date().toISOString(),
                dateError: ''
            }
        },
        watch: {
            startDate() {
                this.endMinDate = this.startDate;
                console.log("start Date", this.startDate);
            },
            endDate() {
                let hourDiff = Math.abs(new Date(this.endDate).getTime() - new Date(this.startDate).getTime()) / 3600000;
                if (hourDiff < 3 || hourDiff > 15){
                    this.dateError="The date duration should be minimum 3 hours and maximum 15 hours";
                }
            }
        },
        methods: {
            check_date: function(){
                console.log(document.getElementsByClassName('v-picker'));
            }
        }
    }
</script>