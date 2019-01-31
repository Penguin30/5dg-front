<template>
        <v-stepper v-model="e1">
                <v-stepper-header>
                        <v-stepper-step :complete="e1 > 1" step="1">E-mail</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="e1 > 2" step="2">Code</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="3">New password</v-stepper-step>
                        </v-stepper-header>
                        <v-stepper-items>
                                <v-stepper-content step="1">
                                        <v-card>
                                                <v-form ref="form" v-model="valid" lazy-validation>
                                                        <v-layout justify-space-between column>
                                                                <v-text-field v-model="email" label="E-mail" required :rules="emailRules"></v-text-field>
                                                        </v-layout>
                                                        <v-btn :disabled="!valid" @click="submit">submit</v-btn>
                                                        <v-btn @click="clear">clear</v-btn>
                                                </v-form>
                                        </v-card>
                                </v-stepper-content>

                                      <v-stepper-content step="2">
                                        <v-card>
                                                <v-form ref="form" v-model="code" lazy-validation>
                                                        <v-layout justify-space-between column>
                                                                <v-text-field v-model="code_field" label="Code" required :rules="code_field_rules"></v-text-field>
                                                        </v-layout>
                                                        <v-btn :disabled="!code" @click="check_code">submit</v-btn>
                                                        <v-btn @click="clear">clear</v-btn>
                                                </v-form>
                                        </v-card>
                                      </v-stepper-content>

                                      <v-stepper-content step="3">
                                        <v-card
                                          class="mb-5"
                                          color="grey lighten-1"
                                          height="200px"
                                        ></v-card>

                                        <v-btn
                                          color="primary"
                                          @click="e1 = 1"
                                        >
                                          Continue
                                        </v-btn>

                                        <v-btn flat>Cancel</v-btn>
                                      </v-stepper-content>
                                    </v-stepper-items>
                                  </v-stepper>
                                </template>                                            
</template>

<script>
        import axios from 'axios';
        export default {
                data: () => ({
                        e1: 0,
                        code: false,
                        valid: false,
                        code_field: '',
                        email: '',
                        code_field_rules: [v => !!v || 'Code is required'],
                        emailRules: [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid'],
                }),

                methods: {
                        check_code(event){
                                if (this.$refs.form.validate()) {
                                       if(this.$cookies.get("code") == this.code){
                                        this.e1 = 3;
                                       }
                                }
                        },
                        submit(event) {                         
                                if (this.$refs.form.validate()) {
                                        axios.get('https://www.5degeneve.ch/api/get_reset_code?email='+this.email).then(res => (this.$cookies.set("code",res.data.code),this.e1 = 2))
                                        .catch(error => (console.log(error)));
                                }
                        },
                        clear() {
                                this.$refs.form.reset()
                        },
                },
        };
</script>