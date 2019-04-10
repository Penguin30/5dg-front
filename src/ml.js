import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
 
Vue.use(MLInstaller)
 
export default new MLCreate({
  initial: 'english',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('english').create({
      btn: 'Schedule',
      date_less_today: "The date can not be less than or equal to today's",
      not_correct_date: "Choose another date!",
      not_correct_time: "Choose another time!",
      no_time: "Choose time please!",
      short_time_or_long: "The date duration should be minimum 3 hours and maximum 15 hours",
      logout:'Logout',
      orders_ad_title:'List of Orders Admin',
      status_all: 'All',
      status_check: 'To be checked',
      status_approved:'Approved',
      status_declined: 'Declined',
      contact_us: 'Contact Us',
      s_from: 'starting from',
      y_disc: 'Your Discount',
      y_disc_p: 'your discounted Price',
      y_pr: 'Your Price',
      next_disc: 'Discount on next order',
      t_c: 'Terms & Conditions',
      c_g: 'CONDITIONS GENERALES',
      list_ta_o_t: 'List of Orders',
      f_name: 'First Name',
      l_name: 'Last Name',
      phone: 'Phone',
      email:'Email',
      cruise: 'Cruise',
      date: 'Date',
      s_time: 'Start Time',
      e_time: 'End Time',
      num: 'Passengers',
      company: 'Company',
      country: 'Country',
      city: 'City',
      street: 'Street',
      status: 'Status',
      price: 'Price',
      d_price: 'D Price',
      paid: 'Paid',
      ta_sign_up_title: 'Travel Agency sign up',
      pass: 'Password',
      submit: 'Submit',
      clear: 'Clear',
      f_pass: 'Forget password?',
      reg_act: 'Not registered yet, please click here!',
      reset_pass_title: 'Travel Agency Reset Password',
      e_req: 'E-mail is required',
      e_valid: 'E-mail must be valid',
      p_req: 'Password is required',
      code: 'Code',
      n_pass: 'New password',
      pass_again: 'Password again',
      code_req: 'Code is required',
      choose_date: 'Choose date',
      register: 'Register',
      conf:'Confirmation',
      soft_drinks:'Soft Drinks',
      term_p1:'The 5 de Genève is a motor boat registered in SWITZERLAND in the Pocket-Yacht category.',
      term_p2:'Recreational leisure activities are offered on Lake Geneva.',
      term_p3:'The Geneva 5 is not intended for the transport of passengers from one point to another. The outings on the lake are circular and for lake recreation. Its guests are brought back to their starting point.',
      term_p4:'The contractual relationship is exercised within the framework of a leisure service and not a transport service, through a service provider who mandates us for this service.',
      term_p5:'The order of this service is made through a dedicated website (www.5degeneve.ch) and the confirmation of the customer\'s email is considered as a contract.',
      term_p6:'The contract may be cancelled at any time in the event of force 4 or higher weather conditions. The boat\'s navigator remains the sole decision-maker for all operations necessary to ensure the safety of all guests.',
      term_p7:'The contract is in full effect (not cancellable) one week before the start of the service.',
      term_p8:'Adress : 10 rue Blavignac',
      term_p9:'1227 Genève',
      term_p10:'Suisse',
      term_p11:'Phone number : + 41 79 944 68 77',
      term_p12:'e-mail :info@5degeneve.ch',
      term_p13:'For judiciaire : Genève'
    }),
 
    new MLanguage('french').create({
      btn: 'Réserver',
      date_less_today: "The date can not be less than or equal to today's",
      not_correct_date: "Choose another date!",
      not_correct_time: "Choose another time!",
      no_time: "Choose time please!",
      short_time_or_long: "The date duration should be minimum 3 hours and maximum 15 hours",
      logout:'Logout',
      orders_ad_title:'List of Orders Admin',
      status_all: 'All',
      status_check: 'To be checked',
      status_approved:'Approved',
      status_declined: 'Declined',
      contact_us: 'Contact Us',
      s_from: 'starting from',
      y_disc: 'Your Discount',
      y_disc_p: 'your discounted Price',
      y_pr: 'Your Price',
      next_disc: 'Discount on next order',
      t_c: 'Terms & Conditions',
      c_g: 'CONDITIONS GENERALES',
      list_ta_o_t: 'List of Orders',
      f_name: 'First Name',
      l_name: 'Last Name',
      phone: 'Phone',
      email:'Email',
      cruise: 'Cruise',
      date: 'Date',
      s_time: 'Start Time',
      e_time: 'End Time',
      num: 'Passengers',
      company: 'Company',
      country: 'Country',
      city: 'City',
      street: 'Street',
      status: 'Status',
      price: 'Price',
      d_price: 'D Price',
      paid: 'Paid',
      ta_sign_up_title: 'Travel Agency sign up',
      pass: 'Password',
      submit: 'Submit',
      clear: 'Clear',
      f_pass: 'Forget password?',
      reg_act: 'Not registered yet, please click here!',
      reset_pass_title: 'Travel Agency Reset Password',
      e_req: 'E-mail is required',
      e_valid: 'E-mail must be valid',
      p_req: 'Password is required',
      code: 'Code',
      n_pass: 'New password',
      pass_again: 'Password again',
      code_req: 'Code is required',
      choose_date: 'Choose date',
      register: 'Register',
      conf:'Confirmation',
      soft_drinks:'Soft Drinks',
      term_p1:'The 5 de Genève is a motor boat registered in SWITZERLAND in the Pocket-Yacht category.',
      term_p2:'Recreational leisure activities are offered on Lake Geneva.',
      term_p3:'The Geneva 5 is not intended for the transport of passengers from one point to another. The outings on the lake are circular and for lake recreation. Its guests are brought back to their starting point.',
      term_p4:'The contractual relationship is exercised within the framework of a leisure service and not a transport service, through a service provider who mandates us for this service.',
      term_p5:'The order of this service is made through a dedicated website (www.5degeneve.ch) and the confirmation of the customer\'s email is considered as a contract.',
      term_p6:'The contract may be cancelled at any time in the event of force 4 or higher weather conditions. The boat\'s navigator remains the sole decision-maker for all operations necessary to ensure the safety of all guests.',
      term_p7:'The contract is in full effect (not cancellable) one week before the start of the service.',
      term_p8:'Adress : 10 rue Blavignac',
      term_p9:'1227 Genève',
      term_p10:'Suisse',
      term_p11:'Phone number : + 41 79 944 68 77',
      term_p12:'e-mail :info@5degeneve.ch',
      term_p13:'For judiciaire : Genève'
    }),

    new MLanguage('deutsch').create({
      btn: 'Reservieren',
      date_less_today: "The date can not be less than or equal to today's",
      not_correct_date: "Choose another date!",
      not_correct_time: "Choose another time!",
      no_time: "Choose time please!",
      short_time_or_long: "The date duration should be minimum 3 hours and maximum 15 hours",
      logout:'Logout',
      orders_ad_title:'List of Orders Admin',
      status_all: 'All',
      status_check: 'To be checked',
      status_approved:'Akzeptiert',
      status_declined: 'Abgelehnt',
      contact_us: 'Kontakt',
      s_from: 'ab',
      y_disc: 'Ihr Discount',
      y_disc_p: 'Ihr discountierter Preis',
      y_pr: 'Ihr Preis',
      next_disc: 'Discount bei der nächsten Bestellung',
      t_c: 'Allgemeine Geschäftsbedingungen',
      c_g: 'CONDITIONS GENERALES',
      list_ta_o_t: 'Liste der Bestellungen',
      f_name: 'Vorname',
      l_name: 'Nachname',
      phone: 'Telefon',
      email:'Email',
      cruise: 'Cruise',
      date: 'Datum',
      s_time: 'Startzeit',
      e_time: 'Stopzeit',
      num: 'Passagiere',
      company: 'Firma',
      country: 'Land',
      city: 'Stadt',
      street: 'Strasse',
      status: 'Status',
      price: 'Preis',
      d_price: 'D Preis',
      paid: 'Paid',
      ta_sign_up_title: 'Travel Agency sign up',
      pass: 'Passwort',
      submit: 'Submit',
      clear: 'Clear',
      f_pass: 'Forget password?',
      reg_act: 'Not registered yet, please click here!',
      reset_pass_title: 'Travel Agency Reset Password',
      e_req: 'E-mail is required',
      e_valid: 'E-mail must be valid',
      p_req: 'Password is required',
      code: 'Code',
      n_pass: 'New password',
      pass_again: 'Password again',
      code_req: 'Code is required',
      choose_date: 'Choose date',
      register: 'Register',
      conf:'Bestätigung',
      soft_drinks:'Soft Drinks',
      term_p1:'The 5 de Genève is a motor boat registered in SWITZERLAND in the Pocket-Yacht category.',
      term_p2:'Recreational leisure activities are offered on Lake Geneva.',
      term_p3:'The Geneva 5 is not intended for the transport of passengers from one point to another. The outings on the lake are circular and for lake recreation. Its guests are brought back to their starting point.',
      term_p4:'The contractual relationship is exercised within the framework of a leisure service and not a transport service, through a service provider who mandates us for this service.',
      term_p5:'The order of this service is made through a dedicated website (www.5degeneve.ch) and the confirmation of the customer\'s email is considered as a contract.',
      term_p6:'The contract may be cancelled at any time in the event of force 4 or higher weather conditions. The boat\'s navigator remains the sole decision-maker for all operations necessary to ensure the safety of all guests.',
      term_p7:'The contract is in full effect (not cancellable) one week before the start of the service.',
      term_p8:'Adress : 10 rue Blavignac',
      term_p9:'1227 Genève',
      term_p10:'Suisse',
      term_p11:'Phone number : + 41 79 944 68 77',
      term_p12:'e-mail :info@5degeneve.ch',
      term_p13:'For judiciaire : Genève'
    }),

    new MLanguage('russian').create({
      btn: 'Расписание',
      date_less_today: "Дата не может быть сегодняшней или более ранней",
      not_correct_date: "Выберите другую дату!",
      not_correct_time: "Выберите другое время!",
      no_time: "Пожалуйста, выберите время",
      short_time_or_long: "Длительность должна быть не менее 3 часов и не более 15",
      logout:'Выход из системы',
      orders_ad_title:'Список заказов',
      status_all: 'Все',
      status_check: 'На проверку',
      status_approved:'Подтверждено',
      status_declined: 'Отклонено',
      contact_us: 'Связаться с нами',
      s_from: 'Начиная с',
      y_disc: 'Ваша скидка',
      y_disc_p: 'Сумма вышей скидки',
      y_pr: 'Итоговая Цена',
      next_disc: 'Скидка на следующий заказ',
      t_c: 'Условия использования',
      c_g: 'CONDITIONS GENERALES',
      list_ta_o_t: 'Список заказов',
      f_name: 'Имя',
      l_name: 'Фамилия',
      phone: 'Номер телефона',
      email:'Адрес эл. почты',
      cruise: 'Круиз',
      date: 'Дата',
      s_time: 'Время начала',
      e_time: 'Время окончания',
      num: 'Пассажиры',
      company: 'Компания',
      country: 'Страна',
      city: 'Город',
      street: 'Улица',
      status: 'Статус',
      price: 'Цена',
      d_price: 'D Price',
      paid: 'Оплаченный',
      ta_sign_up_title: 'Регистрация для тур агенства',
      pass: 'Пароль',
      submit: 'Подтверждено',
      clear: 'Свободный',
      f_pass: 'Забыли пароль?',
      reg_act: 'Незарегистрированный пользователь. Нажмите здесь для регистрации',
      reset_pass_title: 'Сброс пароля для тур агенства',
      e_req: 'Требуется эл. почта',
      e_valid: 'Должна быть существующая Эл. почта',
      p_req: 'Требуется пароль',
      code: 'Код',
      n_pass: 'Новый пароль',
      pass_again: 'Повторите пароль',
      code_req: 'Требуется код',
      choose_date: 'Выберите дату',
      register: 'Регистрация',
      conf:'Подтверждение',
      soft_drinks:'Безалкогольные напитки',
      term_p1:'The 5 de Genève is a motor boat registered in SWITZERLAND in the Pocket-Yacht category.',
      term_p2:'Recreational leisure activities are offered on Lake Geneva.',
      term_p3:'The Geneva 5 is not intended for the transport of passengers from one point to another. The outings on the lake are circular and for lake recreation. Its guests are brought back to their starting point.',
      term_p4:'The contractual relationship is exercised within the framework of a leisure service and not a transport service, through a service provider who mandates us for this service.',
      term_p5:'The order of this service is made through a dedicated website (www.5degeneve.ch) and the confirmation of the customer\'s email is considered as a contract.',
      term_p6:'The contract may be cancelled at any time in the event of force 4 or higher weather conditions. The boat\'s navigator remains the sole decision-maker for all operations necessary to ensure the safety of all guests.',
      term_p7:'The contract is in full effect (not cancellable) one week before the start of the service.',
      term_p8:'Adress : 10 rue Blavignac',
      term_p9:'1227 Genève',
      term_p10:'Suisse',
      term_p11:'Phone number : + 41 79 944 68 77',
      term_p12:'e-mail :info@5degeneve.ch',
      term_p13:'For judiciaire : Genève'
    }),

    new MLanguage('chinese').create({
      btn: '学到更多',
      date_less_today: "The date can not be less than or equal to today's",
      not_correct_date: "Choose another date!",
      not_correct_time: "Choose another time!",
      no_time: "Choose time please!",
      short_time_or_long: "The date duration should be minimum 3 hours and maximum 15 hours",
      logout:'Logout',
      orders_ad_title:'List of Orders Admin',
      status_all: 'All',
      status_check: 'To be checked',
      status_approved:'Approved',
      status_declined: 'Declined',
      contact_us: 'Contact Us',
      s_from: 'starting from',
      y_disc: 'Your Discount',
      y_disc_p: 'your discounted Price',
      y_pr: 'Your Price',
      next_disc: 'Discount on next order',
      t_c: 'Terms & Conditions',
      c_g: 'CONDITIONS GENERALES',
      list_ta_o_t: 'List of Orders',
      f_name: 'First Name',
      l_name: 'Last Name',
      phone: 'Phone',
      email:'Email',
      cruise: 'Cruise',
      date: 'Date',
      s_time: 'Start Time',
      e_time: 'End Time',
      num: 'Passengers',
      company: 'Company',
      country: 'Country',
      city: 'City',
      street: 'Street',
      status: 'Status',
      price: 'Price',
      d_price: 'D Price',
      paid: 'Paid',
      ta_sign_up_title: 'Travel Agency sign up',
      pass: 'Password',
      submit: 'Submit',
      clear: 'Clear',
      f_pass: 'Forget password?',
      reg_act: 'Not registered yet, please click here!',
      reset_pass_title: 'Travel Agency Reset Password',
      e_req: 'E-mail is required',
      e_valid: 'E-mail must be valid',
      p_req: 'Password is required',
      code: 'Code',
      n_pass: 'New password',
      pass_again: 'Password again',
      code_req: 'Code is required',
      choose_date: 'Choose date',
      register: 'Register',
      conf:'Confirmation',
      soft_drinks:'Soft Drinks',
      term_p1:'The 5 de Genève is a motor boat registered in SWITZERLAND in the Pocket-Yacht category.',
      term_p2:'Recreational leisure activities are offered on Lake Geneva.',
      term_p3:'The Geneva 5 is not intended for the transport of passengers from one point to another. The outings on the lake are circular and for lake recreation. Its guests are brought back to their starting point.',
      term_p4:'The contractual relationship is exercised within the framework of a leisure service and not a transport service, through a service provider who mandates us for this service.',
      term_p5:'The order of this service is made through a dedicated website (www.5degeneve.ch) and the confirmation of the customer\'s email is considered as a contract.',
      term_p6:'The contract may be cancelled at any time in the event of force 4 or higher weather conditions. The boat\'s navigator remains the sole decision-maker for all operations necessary to ensure the safety of all guests.',
      term_p7:'The contract is in full effect (not cancellable) one week before the start of the service.',
      term_p8:'Adress : 10 rue Blavignac',
      term_p9:'1227 Genève',
      term_p10:'Suisse',
      term_p11:'Phone number : + 41 79 944 68 77',
      term_p12:'e-mail :info@5degeneve.ch',
      term_p13:'For judiciaire : Genève'
    }),

    new MLanguage('arabic').create({
      btn: 'أعرف أكثر',
      date_less_today: "The date can not be less than or equal to today's",
      not_correct_date: "Choose another date!",
      not_correct_time: "Choose another time!",
      no_time: "Choose time please!",
      short_time_or_long: "The date duration should be minimum 3 hours and maximum 15 hours",
      logout:'Logout',
      orders_ad_title:'List of Orders Admin',
      status_all: 'All',
      status_check: 'To be checked',
      status_approved:'Approved',
      status_declined: 'Declined',
      contact_us: 'Contact Us',
      s_from: 'starting from',
      y_disc: 'Your Discount',
      y_disc_p: 'your discounted Price',
      y_pr: 'Your Price',
      next_disc: 'Discount on next order',
      t_c: 'Terms & Conditions',
      c_g: 'CONDITIONS GENERALES',
      list_ta_o_t: 'List of Orders',
      f_name: 'First Name',
      l_name: 'Last Name',
      phone: 'Phone',
      email:'Email',
      cruise: 'Cruise',
      date: 'Date',
      s_time: 'Start Time',
      e_time: 'End Time',
      num: 'Passengers',
      company: 'Company',
      country: 'Country',
      city: 'City',
      street: 'Street',
      status: 'Status',
      price: 'Price',
      d_price: 'D Price',
      paid: 'Paid',
      ta_sign_up_title: 'Travel Agency sign up',
      pass: 'Password',
      submit: 'Submit',
      clear: 'Clear',
      f_pass: 'Forget password?',
      reg_act: 'Not registered yet, please click here!',
      reset_pass_title: 'Travel Agency Reset Password',
      e_req: 'E-mail is required',
      e_valid: 'E-mail must be valid',
      p_req: 'Password is required',
      code: 'Code',
      n_pass: 'New password',
      pass_again: 'Password again',
      code_req: 'Code is required',
      choose_date: 'Choose date',
      register: 'Register',
      conf:'Confirmation',
      soft_drinks:'Soft Drinks',
      term_p1:'The 5 de Genève is a motor boat registered in SWITZERLAND in the Pocket-Yacht category.',
      term_p2:'Recreational leisure activities are offered on Lake Geneva.',
      term_p3:'The Geneva 5 is not intended for the transport of passengers from one point to another. The outings on the lake are circular and for lake recreation. Its guests are brought back to their starting point.',
      term_p4:'The contractual relationship is exercised within the framework of a leisure service and not a transport service, through a service provider who mandates us for this service.',
      term_p5:'The order of this service is made through a dedicated website (www.5degeneve.ch) and the confirmation of the customer\'s email is considered as a contract.',
      term_p6:'The contract may be cancelled at any time in the event of force 4 or higher weather conditions. The boat\'s navigator remains the sole decision-maker for all operations necessary to ensure the safety of all guests.',
      term_p7:'The contract is in full effect (not cancellable) one week before the start of the service.',
      term_p8:'Adress : 10 rue Blavignac',
      term_p9:'1227 Genève',
      term_p10:'Suisse',
      term_p11:'Phone number : + 41 79 944 68 77',
      term_p12:'e-mail :info@5degeneve.ch',
      term_p13:'For judiciaire : Genève'
    })
  ]
})
