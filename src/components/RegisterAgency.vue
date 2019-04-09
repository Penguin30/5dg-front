<template>
    <div class="text-xs-center">
        <v-menu v-model="menu" :close-on-content-click="false" offset-y nudge-top=-10 offset-x>
            <v-btn round color="error" slot="activator">
                <span class="mr-2">{{ $ml.get('ta_sign_up_title') }}</span>
            </v-btn>

            <v-card class="rounded-card">
                <v-card-text>                    
                    <v-form ref="form" v-model="valid" lazy-validation class="rounded-card">                        
                        <span style="color:red">{{ error_login }}</span>
                        <v-layout justify-space-between column>
                            <v-text-field :rules="emailRules" v-model="email" :label="$ml.get('email')" required></v-text-field>
                            <v-text-field :rules="passwordRules" v-model="password" :label="$ml.get('pass')" :type="'password'" required></v-text-field>
                        </v-layout>

                        <v-btn :disabled="!valid" @click="submit">{{ $ml.get('submit') }}</v-btn>
                        <v-btn @click="clear">{{ $ml.get('clear') }}</v-btn>
                        <v-btn round color="error" flat @click="lost_pass_modal = true" >
                            <span class="mr-2">{{ $ml.get('f_pass') }}</span>
                        </v-btn>
                        
                        <v-dialog v-model="dialog" width="500">
                            <v-btn color="error" flat slot="activator">
                                <span class="mr-2">{{ $ml.get('reg_act') }}</span>
                            </v-btn>
                            <v-card class="rounded-card">   
                                <v-card-title
                                        class="headline grey lighten-2"
                                        style="color: #fff; background: #ff5252 !important;justify-content: center;"
                                        primary-title>
                                    {{ $ml.get('ta_sign_up_title') }}
                                </v-card-title>

                                <v-card-text>                       
                                    <AgencySignUpForm/>
                                </v-card-text>
                                <v-divider></v-divider>
                            </v-card>
                        </v-dialog>
                        
                        <v-dialog v-model="lost_pass_modal" width="500">
                            <v-card class="rounded-card">
                                <v-card-title
                                        class="headline grey lighten-2"
                                        style="color: #fff; background: #ff5252 !important;justify-content: center;"
                                        primary-title>
                                    {{ $ml.get('reset_pass_title') }}
                                </v-card-title>

                                <v-card-text>
                                    <ResetPassAgency/>
                                </v-card-text>
                                <v-divider></v-divider>
                            </v-card>
                        </v-dialog>                       
                    </v-form>
                </v-card-text>
            </v-card>
        </v-menu>
    </div>
</template>

<style>
	.rounded-card {
		border-radius:10px;
	}
</style>

<script>
    import { MLBuilder } from 'vue-multilanguage';
    import AgencySignUpForm from './AgencyFormSignUp';
    import ResetPassAgency from './ResetPassAgency';
    import axios from 'axios';

    export default {
        components: {
            AgencySignUpForm,
            ResetPassAgency
        },
        data() {
            return {
                error_login: '',
                reg_thnx: false,
                reg_text: '',
                dialog: false,
                lost_pass_modal: false,
                email: '',
                emailRules: [v => !!v || $ml.get('e_req'), v => /.+@.+/.test(v) || $ml.get('e_valid')],
                passwordRules: [v => !!v || $ml.get('p_req')],
                password: ''
            }
        },
        methods: {
            submit(event) {
                if (this.$refs.form.validate()) {
                    let form_params = {
                        grant_type: 'password',
                        client_id: 8,
                        client_secret: 's940CvzDLkLQHHoYjjaDxAEbi2L2HVk4OdKX91yu',
                        username: this.email,
                        password: this.password,
                        scope: '*'
                    }
                    this.$cookies.config('7d');
                    let data = {
                        email: this.email,
                        pass: this.password
                    }
                    axios.post('https://www.8dg.ch/oauth/token',form_params)
                    .then(res => {
                        const accessToken = `Bearer ${res.data.access_token}`;
                        const expire = new Date().getTime() + 1000 + res.data.expires_in;
                        this.$cookies.set('token', accessToken);
                        this.$cookies.set('expires_in', expire);
                        this.$cookies.set('refresh_token', res.data.refresh_token);
                        axios.defaults.headers.common['Authorization'] = accessToken;
                        axios.get('https://www.8dg.ch/api/me')
                        .then(res => {
                            this.$cookies.set("email",res.data.email);
                            this.$cookies.set("role",res.data.role_id);
                            location.reload();
                        })
                        .catch(error => console.log(error));
                    })
                    .catch(error => (this.error_login = 'Incorrect data'));
                }
            }
        }
    }
</script>