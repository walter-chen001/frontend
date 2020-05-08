// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// import elementEnLocale from 'element/locale/zh-CN' // element-ui lang
// import elementZhLocale from 'element/locale/zh-CN'// element-ui lang
// import elementEsLocale from 'element-ui/lib/locale/lang/es'// element-ui lang
import enLocale from './en'
import cnLocale from './cn'
import twLocale from './tw'

// Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale,
        ...ELEMENT.lang.en,
        /*必须先INDEX引入语言包*/
    },
    zh_cn: {
        ...cnLocale,
        ...ELEMENT.lang.zhCN
    },
    zh_tw: {
        ...twLocale,
        ...ELEMENT.lang.zhTW
    },
}

const i18n = new VueI18n({
    locale: localStorage.getItem('lang') || 'zh_cn',
    messages
})
export default i18n
