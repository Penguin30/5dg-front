<template>
        <v-stepper v-model="e1">
                <v-stepper-header>
                        <v-stepper-step :complete="e1 > 1" step="1">{{ $ml.get('email') }}</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="e1 > 2" step="2">{{ $ml.get('code') }}</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="3">{{ $ml.get('n_pass') }}</v-stepper-step>
                        </v-stepper-header>
                        <v-stepper-items>
                                <v-stepper-content step="1">
                                        <v-card>
                                                <v-form ref="form" v-model="valid" lazy-validation>
                                                        <v-layout justify-space-between column>
                                                                <v-text-field v-model="email" :label="$ml.get('email')" required :rules="emailRules"></v-text-field>
                                                        </v-layout>
                                                        <v-btn :disabled="!valid" @click="submit">{{ $ml.get('submit') }}</v-btn>
                                                        <v-btn @click="clear">{{ $ml.get('clear') }}</v-btn>
                                                </v-form>
                                        </v-card>
                                </v-stepper-content>

                                      <v-stepper-content step="2">
                                        <v-card>
                                                <v-form ref="form_code" v-model="code" lazy-validation>
                                                        <v-layout justify-space-between column>
                                                                <v-text-field v-model="code_field" :label="$ml.get('code')" required :rules="code_field_rules"></v-text-field>
                                                        </v-layout>
                                                        <v-btn :disabled="!code" @click="check_code">{{ $ml.get('submit') }}</v-btn>
                                                        <v-btn @click="clear">{{ $ml.get('clear') }}</v-btn>
                                                </v-form>
                                        </v-card>
                                      </v-stepper-content>

                                      <v-stepper-content step="3">
                                        <v-card>
                                            <v-form ref="set_pass_form" v-model="set_pass_form" lazy-validation>
                                                        <v-layout justify-space-between column>
                                                                <v-text-field v-model="pass" :label="$ml.get('pass')" required></v-text-field>
                                                                <v-text-field v-model="pass2" :label="$ml.get('pass_again')" required></v-text-field>
                                                        </v-layout>
                                                        <v-btn :disabled="!set_pass_form" @click="set_pass">{{ $ml.get('submit') }}</v-btn>
                                                        <v-btn @click="clear">{{ $ml.get('clear') }}</v-btn>
                                                </v-form>
                                        </v-card>
                                      </v-stepper-content>
                                    </v-stepper-items>
                                  </v-stepper>
                                </template>                                            
</template>

<script>
    import { MLBuilder } from 'vue-multilanguage';
        import axios from 'axios';
        export default {
                data: () => ({
                        e1: 0,
                        pass: '',
                        pass2: '',
                        code: false,
                        valid: false,
                        set_pass_form: false,
                        code_field: '',
                        email: '',
                        code_field_rules: [v => !!v || $ml.get('code_req')],
                        emailRules: [v => !!v || $ml.get('e_req'), v => /.+@.+/.test(v) || $ml.get('e_valid')],
                }),

                methods: {
                        set_pass(event){
                            if (this.$refs.set_pass_form.validate() && this.pass == this.pass2) {
                                let data = {
                                    email: this.email,
                                    pass: this.pass
                                }
                                axios.post('https://www.8dg.ch/api/set_pass',{data}).then(res => ((res.data == 200) ? location.reload() : '')).catch(error => (console.log(error)));
                            }
                        },
                        check_code(event){
                                if (this.$refs.form_code.validate()) {
                                       if(this.$cookies.get("code") == this.code_field){
                                        this.e1 = 3;
                                       }
                                }
                        },
                        submit(event) {                         
                                if (this.$refs.form.validate()) {
                                        axios.get('https://www.8dg.ch/api/get_reset_code?email='+this.email).then(res => (this.$cookies.set("code",res.data),this.e1 = 2))
                                        .catch(error => (console.log(error)));
                                }
                        },
                        clear() {
                                this.$refs.form.reset()
                        },
                },
        };
</script>