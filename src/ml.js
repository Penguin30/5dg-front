import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
 
Vue.use(MLInstaller)
 
export default new MLCreate({
  initial: 'english',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('english').create({
      btn: 'Learn more'
    }),
 
    new MLanguage('french').create({
      btn: 'Apprendre encore plus'
    }),

    new MLanguage('deutsch').create({
      btn: 'Mehr erfahren'
    }),

    new MLanguage('russian').create({
      btn: 'Читать больше'
    }),

    new MLanguage('chinese').create({
      btn: '学到更多'
    }),

    new MLanguage('arabic').create({
      btn: 'أعرف أكثر'
    })
  ]
})