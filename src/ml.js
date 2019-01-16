import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
 
Vue.use(MLInstaller)
 
export default new MLCreate({
  initial: 'english',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('english').create({
      btn: 'Learn more',
      date_less_today: "The date can not be less than or equal to today's",
      not_correct_date: "Choose another date!",
      not_correct_time: "Choose another time!",
      no_time: "Choose time please!",
      short_time_or_long: "The date duration should be minimum 3 hours and maximum 15 hours"
    }),
 
    new MLanguage('french').create({
      btn: 'En savoir plus'
    }),

    new MLanguage('deutsch').create({
      btn: 'Mehr erfahren'
    }),

    new MLanguage('russian').create({
      btn: 'Читать больше',
      date_less_today: "Дата не может быть меньше или равняться сегодняшней"
    }),

    new MLanguage('chinese').create({
      btn: '学到更多'
    }),

    new MLanguage('arabic').create({
      btn: 'أعرف أكثر'
    })
  ]
})
