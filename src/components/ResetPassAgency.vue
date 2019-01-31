<template>
                <v-form ref="form" v-model="valid" lazy-validation>
                        <v-layout justify-space-between column>
                        <v-text-field           v-model="email"                 label="E-mail"                  required :rules="emailRules"                                            ></v-text-field>
                        </v-layout>
                        <v-btn      :disabled="!valid"      @click="submit">submit</v-btn>
                        <v-btn @click="clear">clear</v-btn>
                </v-form>
</template>

<script>
        import axios from 'axios';
        export default {
                data: () => ({
                        valid: false,
                        email: '',
                        emailRules: [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid'],
                }),

                methods: {
                        submit(event) {                         
                                if (this.$refs.form.validate()) {
                                        
                                }
                        },
                        clear() {
                                this.$refs.form.reset()
                        },
                },
        };
</script>