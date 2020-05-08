import Public_template from '@/views/public_template.vue'

import SalesOrder from '@/views/sales/order/index.vue'

const salesRouter = {
    path: '/sales',
    name: 'Sales',
    component: Public_template,
    children: [
        { path: 'order/index', component: SalesOrder, name: 'isorder', meta: {roles:{'r':'ebix999004001','l':1}} },
    ]
}

export default salesRouter
