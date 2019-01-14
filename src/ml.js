import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
 
Vue.use(MLInstaller)
 
export default new MLCreate({
  initial: 'english',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('en').create({
      btn: 'Learn more'
    }),
 
    new MLanguage('fr').create({
      btn: 'apprendre encore plus'
    })
  ]
})