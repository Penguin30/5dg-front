<template>
	<v-stepper v-model="e1">

		<v-stepper-header>
			<v-stepper-step :complete="e1 > 1" step="1">{{ $ml.get('choose_date') }}</v-stepper-step>

			<v-divider></v-divider>

			<v-stepper-step :complete="e1 > 2" step="2">{{ $ml.get('register') }}</v-stepper-step>

			<v-divider></v-divider>

			<v-stepper-step :complete="e1 > 3" step="3">{{ $ml.get('conf') }}</v-stepper-step>

		</v-stepper-header>
    
		<v-stepper-items>
			<v-stepper-content step="1">
				<v-card>                    
					<v-layout row wrap  style="padding: 10px 0 0">
                        <v-flex xs12 style="padding-bottom:20px">
                            <big>
                                <b>{{ formatPrice(this.$store.state.reservation.price) }} CHF</b> (~ {{ formatPrice(Math.round(this.$store.state.reservation.price*rate)) }} {{ $store.state.curr_code }})
                                <p v-if="$store.state.reservation.cruiseID!=0&&$cookies.get('role')=='3'"><b>{{ formatPrice(this.$store.state.reservation.disPrice) }} CHF</b> 
                                (~ {{ formatPrice(Math.round(this.$store.state.reservation.disPrice*rate)) }} {{ $store.state.curr_code }}) [{{ $ml.get('y_disc_p') }}]</p>
                            </big>
                        </v-flex>
                        <v-flex v-if="type == 'custom'" xs6 style="padding-right:10px; padding-bottom:20px">
							<label>{{ $ml.get('s_time') }}</label>
							<datetime :rules="startDateRules" v-model="startDate" class="input-date" type="time" :minute-step=15 />
						</v-flex>
						<v-flex v-if="type == 'custom'" xs6 style="padding-left:10px; padding-bottom:20px">
							<label>{{ $ml.get('e_time') }}</label>
							<datetime :rules="endDateRules" v-model="endDate" class="input-date" type="time" :minute-step=15 />
						</v-flex>
                        <v-flex v-if="type == 'evening'" xs12>
                             <v-radio-group v-model="extended">
                                <v-radio value='20:30:00' label="Normal Cruise"></v-radio>
                                <v-radio value='22:30:00' label="With Restaurant Stop-Over"></v-radio>
                            </v-radio-group>
                        </v-flex>
						<v-flex xs12>
							<v-date-picker
								v-model="date"
                                :allowed-dates="allowedDates"
                                :min='new Date().toISOString().substr(0, 10)'
                                :key="rerenderKey"
							  />
						</v-flex>

						<v-flex xs12 class="m-t-10">
							<label>{{this.dateError}}</label>
						</v-flex>
						<v-btn class="next-btn" color="primary" @click="check_date">
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
									<v-layout row wrap>
										<v-select v-model="gender" :rules="genderRule" :items="genderItems" label="Title" style="width:20%"></v-select>
										<v-text-field v-model="firstName" :rules="nameRules" :counter="25" :label="$ml.get('f_name')" required style="width:40%; padding-left:10px"></v-text-field>
										<v-text-field v-model="laststName" :rules="nameRules" :counter="25" :label="$ml.get('l_name')" required style="width:40%; padding-left:10px"></v-text-field>
									</v-layout>

									<v-text-field v-model="street" :rules="nameRules" :counter="25" :label="$ml.get('street')"></v-text-field>

									<v-layout row wrap>
										<v-autocomplete v-model="country" :items="countries" :label="$ml.get('country')" required style="width:33%"></v-autocomplete>
										<v-text-field v-model="city" :rules="nameRules" style="width:33%; padding-left:10px" :label="$ml.get('city')"></v-text-field>
                                        <v-text-field v-model="zip" style="width:33%; padding-left:10px" label="ZIP"></v-text-field>
									</v-layout>
									<v-text-field v-model="email" :rules="emailRules" :label="$ml.get('email')" required></v-text-field>
									<v-text-field v-model="cell" :rules="phoneRules" :label="$ml.get('phone')" required></v-text-field>

                                    <v-checkbox v-if="type=='evening'" v-model="checkbox" label="Do you want to make a Restaurant stop? If yes the Cruise ends at 22h30 instead of 20h30."></v-checkbox>
									
									<v-text-field v-model="attendees" min="1" max="5" dense label="Number of people that are going to attend" type="number"></v-text-field>
									<v-layout justify-space-between row>
										<v-select v-model="agePerson1" label="Age (1)" :items="ageRanges"></v-select>
										<v-select v-model="agePerson2" label="Age (2)" :items="ageRanges" style="padding-left:20px" v-if="attendees>1"></v-select>
										<v-select v-model="agePerson3" label="Age (3)" :items="ageRanges" style="padding-left:20px" v-if="attendees>2"></v-select>
										<v-select v-model="agePerson4" label="Age (4)" :items="ageRanges" style="padding-left:20px" v-if="attendees>3"></v-select>
										<v-select v-model="agePerson5" label="Age (5)" :items="ageRanges" style="padding-left:20px" v-if="attendees>4"></v-select>
									</v-layout>

                                    <v-checkbox v-model="agree" :rules="[v => !!v || 'You must agree to continue!']" required>
                                        <div slot="label">
                                            Do you agree with the 
                                            <a slot="activator" @click="gtu">terms and conditions ?</a>
                                          </div>
                                    </v-checkbox>
							</v-layout>
							<v-btn :disabled="!valid" @click="submit">submit</v-btn>
							<v-btn @click="clear">clear</v-btn>
						</v-form>
					</template>
				</v-card>
			</v-stepper-content>


			 <v-stepper-content step="3">
				<v-card>
					<p>Thank you for your Order. We will contact you shortly by email and confirm your Booking.</p>
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
	import { Datetime } from 'vue-datetime';
    import GTU from './GTU';
	import 'vue-datetime/dist/vue-datetime.css';

	export default {
		components: {
            GTU,
			UserForm,
			Datetime
		},
		props: ['type','rate','cruise_id','price','dprice','terms'],
		data() {
			return {
                extended: '20:30:00',
                rerenderKey: 0,
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
                startDateRules: [v => !!v || 'Field is required'],
                endDateRules: [v => !!v || 'Field is required'], 
                phoneRules: [v => !!v || 'Field is required', v => (v && v.length <= 255) || 'Name must be less than 255 characters'], 
				checkbox: false,
				attendees: 1,
				agePerson1: null,
				agePerson2: null,
				agePerson3: null,
				agePerson4: null,
                datesAllowed: [],
				ageRanges: ['0 - 3', '3 - 6', '6 - 12', '12 - 18', '18 - 60', '> 60'],
				countries: [
                {"text": "Afghanistan", "value": "AF"},
                {"text": "Albania", "value": "AL"},
                {"text": "Algeria", "value": "DZ"},
                {"text": "American Samoa", "value": "AS"},
                {"text": "Andorra", "value": "AD"},
                {"text": "Angola", "value": "AO"},
                {"text": "Anguilla", "value": "AI"},
                {"text": "Antarctica", "value": "AQ"},
                {"text": "Antigua and Barbuda", "value": "AG"},
                {"text": "Argentina", "value": "AR"},
                {"text": "Armenia", "value": "AM"},
                {"text": "Aruba", "value": "AW"},
                {"text": "Australia", "value": "AU"},
                {"text": "Austria", "value": "AT"},
                {"text": "Azerbaijan", "value": "AZ"},
                {"text": "Bahamas", "value": "BS"},
                {"text": "Bahrain", "value": "BH"},
                {"text": "Bangladesh", "value": "BD"},
                {"text": "Barbados", "value": "BB"},
                {"text": "Belarus", "value": "BY"},
                {"text": "Belgium", "value": "BE"},
                {"text": "Belize", "value": "BZ"},
                {"text": "Benin", "value": "BJ"},
                {"text": "Bermuda", "value": "BM"},
                {"text": "Bhutan", "value": "BT"},
                {"text": "Bolivia", "value": "BO"},
                {"text": "Bosnia and Herzegovina", "value": "BA"},
                {"text": "Botswana", "value": "BW"},
                {"text": "Bouvet Island", "value": "BV"},
                {"text": "Brazil", "value": "BR"},
                {"text": "British Indian Ocean Territory", "value": "IO"},
                {"text": "Brunei Darussalam", "value": "BN"},
                {"text": "Bulgaria", "value": "BG"},
                {"text": "Burkina Faso", "value": "BF"},
                {"text": "Burundi", "value": "BI"},
                {"text": "Cambodia", "value": "KH"},
                {"text": "Cameroon", "value": "CM"},
                {"text": "Canada", "value": "CA"},
                {"text": "Cape Verde", "value": "CV"},
                {"text": "Cayman Islands", "value": "KY"},
                {"text": "Central African Republic", "value": "CF"},
                {"text": "Chad", "value": "TD"},
                {"text": "Chile", "value": "CL"},
                {"text": "China", "value": "CN"},
                {"text": "Christmas Island", "value": "CX"},
                {"text": "Cocos (Keeling) Islands", "value": "CC"},
                {"text": "Colombia", "value": "CO"},
                {"text": "Comoros", "value": "KM"},
                {"text": "Congo", "value": "CG"},
                {"text": "Congo, The Democratic Republic of the", "value": "CD"},
                {"text": "Cook Islands", "value": "CK"},
                {"text": "Costa Rica", "value": "CR"},
                {"text": "Cote D'Ivoire", "value": "CI"},
                {"text": "Croatia", "value": "HR"},
                {"text": "Cuba", "value": "CU"},
                {"text": "Cyprus", "value": "CY"},
                {"text": "Czech Republic", "value": "CZ"},
                {"text": "Denmark", "value": "DK"},
                {"text": "Djibouti", "value": "DJ"},
                {"text": "Dominica", "value": "DM"},
                {"text": "Dominican Republic", "value": "DO"},
                {"text": "Ecuador", "value": "EC"},
                {"text": "Egypt", "value": "EG"},
                {"text": "El Salvador", "value": "SV"},
                {"text": "Equatorial Guinea", "value": "GQ"},
                {"text": "Eritrea", "value": "ER"},
                {"text": "Estonia", "value": "EE"},
                {"text": "Ethiopia", "value": "ET"},
                {"text": "Falkland Islands (Malvinas)", "value": "FK"},
                {"text": "Faroe Islands", "value": "FO"},
                {"text": "Fiji", "value": "FJ"},
                {"text": "Finland", "value": "FI"},
                {"text": "France", "value": "FR"},
                {"text": "French Guiana", "value": "GF"},
                {"text": "French Polynesia", "value": "PF"},
                {"text": "French Southern Territories", "value": "TF"},
                {"text": "Gabon", "value": "GA"},
                {"text": "Gambia", "value": "GM"},
                {"text": "Georgia", "value": "GE"},
                {"text": "Germany", "value": "DE"},
                {"text": "Ghana", "value": "GH"},
                {"text": "Gibraltar", "value": "GI"},
                {"text": "Greece", "value": "GR"},
                {"text": "Greenland", "value": "GL"},
                {"text": "Grenada", "value": "GD"},
                {"text": "Guadeloupe", "value": "GP"},
                {"text": "Guam", "value": "GU"},
                {"text": "Guatemala", "value": "GT"},
                {"text": "Guernsey", "value": "GG"},
                {"text": "Guinea", "value": "GN"},
                {"text": "Guinea-Bissau", "value": "GW"},
                {"text": "Guyana", "value": "GY"},
                {"text": "Haiti", "value": "HT"},
                {"text": "Heard Island and Mcdonald Islands", "value": "HM"},
                {"text": "Holy See (Vatican City State)", "value": "VA"},
                {"text": "Honduras", "value": "HN"},
                {"text": "Hong Kong", "value": "HK"},
                {"text": "Hungary", "value": "HU"},
                {"text": "Iceland", "value": "IS"},
                {"text": "India", "value": "IN"},
                {"text": "Indonesia", "value": "ID"},
                {"text": "Iran, Islamic Republic Of", "value": "IR"},
                {"text": "Iraq", "value": "IQ"},
                {"text": "Ireland", "value": "IE"},
                {"text": "Isle of Man", "value": "IM"},
                {"text": "Israel", "value": "IL"},
                {"text": "Italy", "value": "IT"},
                {"text": "Jamaica", "value": "JM"},
                {"text": "Japan", "value": "JP"},
                {"text": "Jersey", "value": "JE"},
                {"text": "Jordan", "value": "JO"},
                {"text": "Kazakhstan", "value": "KZ"},
                {"text": "Kenya", "value": "KE"},
                {"text": "Kiribati", "value": "KI"},
                {"text": "Korea, Democratic People'S Republic of", "value": "KP"},
                {"text": "Korea, Republic of", "value": "KR"},
                {"text": "Kuwait", "value": "KW"},
                {"text": "Kyrgyzstan", "value": "KG"},
                {"text": "Land Islands", "value": "AX"},
                {"text": "Lao People'S Democratic Republic", "value": "LA"},
                {"text": "Latvia", "value": "LV"},
                {"text": "Lebanon", "value": "LB"},
                {"text": "Lesotho", "value": "LS"},
                {"text": "Liberia", "value": "LR"},
                {"text": "Libyan Arab Jamahiriya", "value": "LY"},
                {"text": "Liechtenstein", "value": "LI"},
                {"text": "Lithuania", "value": "LT"},
                {"text": "Luxembourg", "value": "LU"},
                {"text": "Macao", "value": "MO"},
                {"text": "Macedonia, The Former Yugoslav Republic of", "value": "MK"},
                {"text": "Madagascar", "value": "MG"},
                {"text": "Malawi", "value": "MW"},
                {"text": "Malaysia", "value": "MY"},
                {"text": "Maldives", "value": "MV"},
                {"text": "Mali", "value": "ML"},
                {"text": "Malta", "value": "MT"},
                {"text": "Marshall Islands", "value": "MH"},
                {"text": "Martinique", "value": "MQ"},
                {"text": "Mauritania", "value": "MR"},
                {"text": "Mauritius", "value": "MU"},
                {"text": "Mayotte", "value": "YT"},
                {"text": "Mexico", "value": "MX"},
                {"text": "Micronesia, Federated States of", "value": "FM"},
                {"text": "Moldova, Republic of", "value": "MD"},
                {"text": "Monaco", "value": "MC"},
                {"text": "Mongolia", "value": "MN"},
                {"text": "Montenegro", "value": "ME"},
                {"text": "Montserrat", "value": "MS"},
                {"text": "Morocco", "value": "MA"},
                {"text": "Mozambique", "value": "MZ"},
                {"text": "Myanmar", "value": "MM"},
                {"text": "Namibia", "value": "NA"},
                {"text": "Nauru", "value": "NR"},
                {"text": "Nepal", "value": "NP"},
                {"text": "Netherlands", "value": "NL"},
                {"text": "Netherlands Antilles", "value": "AN"},
                {"text": "New Caledonia", "value": "NC"},
                {"text": "New Zealand", "value": "NZ"},
                {"text": "Nicaragua", "value": "NI"},
                {"text": "Niger", "value": "NE"},
                {"text": "Nigeria", "value": "NG"},
                {"text": "Niue", "value": "NU"},
                {"text": "Norfolk Island", "value": "NF"},
                {"text": "Northern Mariana Islands", "value": "MP"},
                {"text": "Norway", "value": "NO"},
                {"text": "Oman", "value": "OM"},
                {"text": "Pakistan", "value": "PK"},
                {"text": "Palau", "value": "PW"},
                {"text": "Palestinian Territory, Occupied", "value": "PS"},
                {"text": "Panama", "value": "PA"},
                {"text": "Papua New Guinea", "value": "PG"},
                {"text": "Paraguay", "value": "PY"},
                {"text": "Peru", "value": "PE"},
                {"text": "Philippines", "value": "PH"},
                {"text": "Pitcairn", "value": "PN"},
                {"text": "Poland", "value": "PL"},
                {"text": "Portugal", "value": "PT"},
                {"text": "Puerto Rico", "value": "PR"},
                {"text": "Qatar", "value": "QA"},
                {"text": "Reunion", "value": "RE"},
                {"text": "Romania", "value": "RO"},
                {"text": "Russian Federation", "value": "RU"},
                {"text": "RWANDA", "value": "RW"},
                {"text": "Saint Helena", "value": "SH"},
                {"text": "Saint Kitts and Nevis", "value": "KN"},
                {"text": "Saint Lucia", "value": "LC"},
                {"text": "Saint Pierre and Miquelon", "value": "PM"},
                {"text": "Saint Vincent and the Grenadines", "value": "VC"},
                {"text": "Samoa", "value": "WS"},
                {"text": "San Marino", "value": "SM"},
                {"text": "Sao Tome and Principe", "value": "ST"},
                {"text": "Saudi Arabia", "value": "SA"},
                {"text": "Senegal", "value": "SN"},
                {"text": "Serbia", "value": "RS"},
                {"text": "Seychelles", "value": "SC"},
                {"text": "Sierra Leone", "value": "SL"},
                {"text": "Singapore", "value": "SG"},
                {"text": "Slovakia", "value": "SK"},
                {"text": "Slovenia", "value": "SI"},
                {"text": "Solomon Islands", "value": "SB"},
                {"text": "Somalia", "value": "SO"},
                {"text": "South Africa", "value": "ZA"},
                {"text": "South Georgia and the South Sandwich Islands", "value": "GS"},
                {"text": "Spain", "value": "ES"},
                {"text": "Sri Lanka", "value": "LK"},
                {"text": "Sudan", "value": "SD"},
                {"text": "Suriname", "value": "SR"},
                {"text": "Svalbard and Jan Mayen", "value": "SJ"},
                {"text": "Swaziland", "value": "SZ"},
                {"text": "Sweden", "value": "SE"},
                {"text": "Switzerland", "value": "CH"},
                {"text": "Syrian Arab Republic", "value": "SY"},
                {"text": "Taiwan, Province of China", "value": "TW"},
                {"text": "Tajikistan", "value": "TJ"},
                {"text": "Tanzania, United Republic of", "value": "TZ"},
                {"text": "Thailand", "value": "TH"},
                {"text": "Timor-Leste", "value": "TL"},
                {"text": "Togo", "value": "TG"},
                {"text": "Tokelau", "value": "TK"},
                {"text": "Tonga", "value": "TO"},
                {"text": "Trinidad and Tobago", "value": "TT"},
                {"text": "Tunisia", "value": "TN"},
                {"text": "Turkey", "value": "TR"},
                {"text": "Turkmenistan", "value": "TM"},
                {"text": "Turks and Caicos Islands", "value": "TC"},
                {"text": "Tuvalu", "value": "TV"},
                {"text": "Uganda", "value": "UG"},
                {"text": "Ukraine", "value": "UA"},
                {"text": "United Arab Emirates", "value": "AE"},
                {"text": "United Kingdom", "value": "GB"},
                {"text": "United States", "value": "US"},
                {"text": "United States Minor Outlying Islands", "value": "UM"},
                {"text": "Uruguay", "value": "UY"},
                {"text": "Uzbekistan", "value": "UZ"},
                {"text": "Vanuatu", "value": "VU"},
                {"text": "Venezuela", "value": "VE"},
                {"text": "Viet Nam", "value": "VN"},
                {"text": "Virgin Islands, British", "value": "VG"},
                {"text": "Virgin Islands, U.S.", "value": "VI"},
                {"text": "Wallis and Futuna", "value": "WF"},
                {"text": "Western Sahara", "value": "EH"},
                {"text": "Yemen", "value": "YE"},
                {"text": "Zambia", "value": "ZM"},
                {"text": "Zimbabwe", "value": "ZW"}			]
			}
        },
        watch: {
            'startDate': function() {
                let dS = new Date(this.startDate);
                var hS = dS.getHours();
                var mS = dS.getMinutes();

                if (hS<6 || hS==6 && mS<30) {
                    dS.setHours(6);
                    dS.setMinutes(30);
                    this.startDate = dS.toISOString();
                    hS = 6;
                    mS = 30;
                }

                this.$store.state.reservation.timeStart = ('00'+hS).substr(-2) + ':' + ('00'+mS).substr(-2) + ':00';

                if (this.endDate && this.endDate!='') {
                    let dE = new Date(this.endDate);
                    var hE = dE.getHours();
                    var mE = dE.getMinutes();
                    var s = hS * 60 + mS;
                    var e = hE * 60 + mE;
                    var d = e-s;
                    if (d<180) {
                        dE.setHours(hS+3);
                        dE.setMinutes(mS);
                        this.endDate = dE.toISOString();
                        d = 180;
                    }
                    this.$store.state.reservation.price = 320 * d / 60;
                    if ($cookies.get('role')=='3') {
                        this.$store.state.reservation.disPrice = this.$store.state.reservation.price - Math.round(this.$store.state.reservation.price * this.$store.state.reservation.disPerct) / 100;
                    }
                }

                this.loadBlockedDates();
            },

            'endDate': function() {
                let dE = new Date(this.endDate);
                var hE = dE.getHours();
                var mE = dE.getMinutes();

                if (hE==23 && mE!=0) {
                    dE.setMinutes(0);
                    this.endDate = dE.toISOString();
                    mE = 0;
                }

                this.$store.state.reservation.timeEnd = ('00'+hE).substr(-2) + ':' + ('00'+mE).substr(-2) + ':00';

                if (this.startDate && this.startDate!='') {
                    let dS = new Date(this.startDate);
                    var hS = dS.getHours();
                    var mS = dS.getMinutes();
                    var s = hS * 60 + mS;
                    var e = hE * 60 + mE;
                    var d = e-s;
                    if (d<180) {
                        dS.setHours(hE-3);
                        dS.setMinutes(mE);
                        this.startDate = dS.toISOString();
                        d = 180;
                    }
                    this.$store.state.reservation.price = 320 * d / 60;
                    if ($cookies.get('role')=='3') {
                        this.$store.state.reservation.disPrice = this.$store.state.reservation.price - Math.round(this.$store.state.reservation.price * this.$store.state.reservation.disPerct) / 100;
                    }
                }

                this.loadBlockedDates();
            },

            'extended': function() {
                this.$store.state.reservation.timeEnd = this.extended;
                if (this.extended=='20:30:00'){
                    this.$store.state.reservation.price = 960*this.$store.state.rate;
                    this.checkbox = false;
                }
                else{                            
                    this.$store.state.reservation.price = 1280*this.$store.state.rate;
                    this.checkbox = true;
                }

                if ($cookies.get('role')=='3') {
                    this.$store.state.reservation.disPrice = this.$store.state.reservation.price - Math.round(this.$store.state.reservation.price * this.$store.state.reservation.disPerct) / 100;
                }
                
                this.loadBlockedDates();
            }
        },
		methods: {
            gtu(){
                this.terms = true;
            },
            //https://stackoverflow.com/questions/50488703/vuetify-js-datepicker-provide-array-of-allowed-dates/50488938#50488938
            allowedDates(val){
                return this.datesAllowed.indexOf(val) === -1;
            },

            formatPrice(value) {
				let val = (value/1).toFixed(2).replace('.', ',')
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
			},

			check_date(){ 
                if(this.startDate == '' && this.endDate == '' && this.type != 'custom'){
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
    					if(Math.abs(new Date(this.endDate).getTime() - new Date(this.startDate).getTime()) / 3600000 < 3 || Math.abs(new Date(this.endDate).getTime() - new Date(this.startDate).getTime()) / 3600000 > 15) {
    						this.dateError = this.$ml.get('short_time_or_long') 
    					}else{
                            axios.post('https://www.8dg.ch/api/check_time',{data})
                                .then(
                                    response => ((response.data == 'ok') ? (
                                    this.e1 = 2,
                                    this.$store.state.step = 2,
                                    this.$store.state.date = event,
                                    this.$store.state.time_s = new Date(this.startDate).getHours()+':'+new Date(this.startDate).getMinutes(),
                                    this.$store.state.time_e = new Date(this.endDate).getHours()+':'+new Date(this.endDate).getMinutes()
                                ) : this.dateError = this.$ml.get('not_correct_time')))
    					}
    				}else{
    					this.dateError = this.$ml.get('date_less_today');
    				}
                }else if(this.startDate == '' && this.endDate == '' && this.type == 'custom'){
                    this.dateError = 'Select time start and time end';
                }else{
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
                        if(Math.abs(new Date(this.endDate).getTime() - new Date(this.startDate).getTime()) / 3600000 < 3 || Math.abs(new Date(this.endDate).getTime() - new Date(this.startDate).getTime()) / 3600000 > 15) {
                            this.dateError = this.$ml.get('short_time_or_long') 
                        }else{
                            axios.post('https://www.8dg.ch/api/check_time',{data})
                                .then(
                                    response => ((response.data == 'ok') ? (
                                    this.e1 = 2,
                                    this.$store.state.step = 2,
                                    this.$store.state.date = event,
                                    this.$store.state.time_s = new Date(this.startDate).getHours()+':'+new Date(this.startDate).getMinutes(),
                                    this.$store.state.time_e = new Date(this.endDate).getHours()+':'+new Date(this.endDate).getMinutes()
                                ) : this.dateError = this.$ml.get('not_correct_time')))
                        }
                    }else{
                        this.dateError = this.$ml.get('date_less_today');
                    }
                }
			},
			submit(event) {
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
						firstName:  this.firstName,
						email:      this.email,
						gender:     this.gender,
						laststName: this.laststName,
						street:     this.street,
						country:    this.country,
						city:       this.city,
						phone:      this.cell,
						cruise_id:  cruise_id,
						date:       this.$store.state.date,
						time_start: this.$store.state.time_s,
						time_end:   this.$store.state.time_e,
						n_persons:  this.attendees,
						ages:       ages,
						stop:       this.checkbox,
                        lang:       this.$ml.current,
                        zip:        this.zip,
                        agency_email: (this.$cookies.get("email") != '') ? this.$cookies.get("email") : '',
                        price:      this.$store.state.reservation.price,
                        dprice:     this.$store.state.reservation.disPrice
					}
					axios.post('https://www.8dg.ch/api/orders', {data})
						.then( res => (
                            console.log(res),
							this.e1 = 3)
						)
						.catch(error => (console.log(error)));
				}
            },
            
			clear() {
				this.$refs.form.reset()
            },

            loadBlockedDates() {
                let tS = this.$store.state.reservation.timeStart;
                let tE = this.$store.state.reservation.timeEnd;

                if (!tS) tS = "00:00:00";
                if (!tE) tE = "23:59:59";

                var self = this;
                let now = (new Date()).getTime();

                tS = encodeURIComponent(tS);
                tE = encodeURIComponent(tE);

                let url = 'https://www.8dg.ch/api/get_blocked_dates?tS='+tS+'&tE='+tE+'&n='+now;

                axios.get(url)
                     .then((res) => {
                         let data = Array.isArray(res.data) ? res.data : [];
                         self.datesAllowed = [];

                         for (var i=0; i<data.length; i++) {
                             self.datesAllowed.push(data[i].date);
                         }

                         self.rerenderKey++;
                     })
                     .catch(error => (console.log(error)));
            }
		},
		created(){
            this.$store.state.step=0;
            this.loadBlockedDates();
            this.$store.state.reservation.price = this.price;
            this.$store.state.reservation.disPrice = this.dprice;
		}
	}
</script>