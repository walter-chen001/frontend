/** When your routing table is too long, you can split it into small modules**/

import Public_template from '@/views/public_template.vue'

import StockSettings from '@/views/stock/stockSettings.vue'

const stockRouter = {
    path: '/stock',
    name: 'Stock',
    component: Public_template,
    children: [
      	{path: 'stockSettings', component: StockSettings, name: 'StockSettings'}
    ]
}

export default stockRouter
