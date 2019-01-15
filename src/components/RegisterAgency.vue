<template>
    <div class="text-xs-center">
        <v-menu v-model="menu" :close-on-content-click="false" offset-y nudge-top=-10>
            <v-btn round color="error" slot="activator">
                <span class="mr-2">Travel Agency sign up</span>
            </v-btn>

            <v-card class="rounded-card">
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation class="rounded-card">
                        <v-layout justify-space-between column>
                            <v-text-field v-model="email" label="E-mail" required></v-text-field>
                            <v-text-field v-model="password" label="Password" required></v-text-field>
                        </v-layout>
                        <v-btn :disabled="!valid" @click="submit">submit</v-btn>
                        <v-btn @click="clear">clear</v-btn>
                        <v-dialog v-model="dialog" width="500">
                            <v-btn color="error" flat slot="activator">
                                <span class="mr-2">Not registered yet, please click here!</span>
                            </v-btn>
                            <v-card class="rounded-card">
                                <v-card-title
                                        class="headline grey lighten-2"
                                        style="color: #fff; background: #ff5252 !important;justify-content: center;"
                                        primary-title>
                                    Travel Agency sign up
                                </v-card-title>

                                <v-card-text>
                                    <AgencySignUpForm/>
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
    import AgencySignUpForm from './AgencyFormSignUp';

    export default {
        components: {
            AgencySignUpForm
        },
        data() {
            return {
                dialog: false
            }
        }
    }
</script>