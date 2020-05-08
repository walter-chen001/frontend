let exampledata={
  data:[
    {client1:"DDDD1",client2:"DDDD1"}
  ],
  page:1,
  pageSize:10,
  rowTotal:'1110',
  sunData:{}
}
let tableData={
  data:[
    {
      id: 0,
      formid:"SO20180701",
      recordDate:"2018-10-01",
      customer:"张三",
      country:"10",
      totaiQTY:"USD 23.50",
    },
    {
      id: 1,
      formid:"SO20180805",
      recordDate:"2018-10-02",
      customer:"李四",
      country:"30",
      totaiQTY:"HKD 334.00",
    },
    {
      id: 2,
      formid:"SO20181004",
      recordDate:"2018-10-04",
      customer:"老六",
      country:"50",
      totaiQTY:"CNY 1,130.00",
    }
  ],
  page:1,
  pageSize:10,
  rowTotal:'3',
}
let downListData = {
    data:{
      user: [
        {label: "张三", value: "张三"},
        {label: "李四", value: "李四"},
        {label: "老六", value: "老六"},
      ],
      personal:[
        {
          id:'1',
          label:'张三',
          site:'中国/广东省/珠海市/南屏科技工业园屏东六路102号',
          contacts:'张三',
          officePhone:'+86 0756 2213-8989',
          mobilePhone:'+86 13823066996',
          fax:'+86 0756 2213-8989',
          email:'1234567@qq.com'
        },
        {
          id:'2',
          label:'李四',
          site:'中国/广东省/广州市/花都区xxx号xxx',
          contacts:'李四',
          officePhone:'+86 1234 6666-7777',
          mobilePhone:'+86 13823066996',
          fax:'+86 1234 2213-8989',
          email:'1234567@qq.com'
        },
        {
          id:'3',
          label:'老六',
          site:'中国/广东省/中山市/XX区XXX路XXX号',
          contacts:'老六',
          officePhone:'+86 3254 6225-4463',
          mobilePhone:'+86 13823066996',
          fax:'+86 3254 6225-4463',
          email:'1234567@qq.com'
        },
      ]
    }
}
let orderData = [
  {
    order:'SO20180701',
    step:2,
    customer:{
      client:downListData.data.user,
      clientvalue:'张三',
    },
    itemDetalls:{
      tableData: [
        {
            id:'1',
            code:'TS12301',
            describe:'这是一件商品',
            sourceArea:'中国',
            brand:'品牌名',
            SKUcode:'ABC123',
            SKUname:'abc000',
        },
        {
            id:'2',
            code:'TS12301',
            describe:'这是一件商品',
            sourceArea:'中国',
            brand:'品牌名',
            SKUcode:'ABC123',
            SKUname:'abc000',
        },
        {
            id:'3',
            code:'TS12301',
            describe:'这是一件商品',
            sourceArea:'中国',
            brand:'品牌名',
            SKUcode:'ABC123',
            SKUname:'abc000',
        },
    ],
    },
    paymentRecelve:{
      outstanding:1,
      data:[
        {
          title:'Total Amount',
          currency:'HKD',
          num:'250,000.00',
          status:0,
        },
        {
          title:'Outstanding(HKD)',
          currency:'HKD',
          num:'3,000.00',
          status:1,
        },
      ]
    },
    dellvery:{
      deliveried:1,
    },
    documents:{
      recentNumber:4,
      recentDocuments:['Q20190102','INV20190204','DR20190503','DR20190607']
    },
    otherInfo:{}
  },
  {
    order:'SO20180805',
    step:4,
    customer:{
      client:downListData.data.user,
      clientvalue:'李四',
    },
    itemDetalls:{
      tableData: [
        {
            id:'2',
            code:'TS12301',
            describe:'商品1',
            sourceArea:'中国',
            brand:'品牌名',
            SKUcode:'ABC123',
            SKUname:'abc000',
        },
        {
            id:'2',
            code:'TS12302',
            describe:'商品2',
            sourceArea:'中国',
            brand:'品牌名',
            SKUcode:'ABC123',
            SKUname:'abc000',
        },
        {
            id:'3',
            code:'TS12303',
            describe:'商品3',
            sourceArea:'中国',
            brand:'品牌名',
            SKUcode:'ABC123',
            SKUname:'abc000',
        },
        {
            id:'4',
            code:'TS12304',
            describe:'商品4',
            sourceArea:'中国',
            brand:'品牌名',
            SKUcode:'ABC123',
            SKUname:'abc000',
        },
    ],
    },
    paymentRecelve:{
      outstanding:1,
      data:[
        {
          title:'Total Amount',
          currency:'HKD',
          num:'658,246.00',
          status:0,
        },
        {
          title:'Outstanding(HKD)',
          currency:'HKD',
          num:'15,233.00',
          status:1,
        },
      ]
    },
    dellvery:{
      deliveried:1,
    },
    documents:{
      recentNumber:4,
      recentDocuments:['Q20190102','INV20190204','DR20190503','DR20190607']
    },
    otherInfo:{}
  },
  {
    order:'SO20181004',
    step:1,
    customer:{
      client:downListData.data.user,
      clientvalue:'老六',
    },
    itemDetalls:{
      tableData: [
        {
            id:'1',
            code:'TS12301',
            describe:'花瓶',
            sourceArea:'中国',
            brand:'品牌名',
            SKUcode:'ABC123',
            SKUname:'abc000',
        },
        {
            id:'2',
            code:'TS12302',
            describe:'食品',
            sourceArea:'美国',
            brand:'品牌名',
            SKUcode:'ABC123',
            SKUname:'abc000',
        },
        {
            id:'3',
            code:'TS12303',
            describe:'衣服',
            sourceArea:'英国',
            brand:'品牌名',
            SKUcode:'ABC123',
            SKUname:'abc000',
        },
    ],
    },
    paymentRecelve:{
      outstanding:1,
      data:[
        {
          title:'Total Amount',
          currency:'HKD',
          num:'622,210.00',
          status:0,
        },
        {
          title:'Outstanding(HKD)',
          currency:'HKD',
          num:'1,235,602.00',
          status:1,
        },
      ]
    },
    dellvery:{
      deliveried:1,
    },
    documents:{
      recentNumber:4,
      recentDocuments:['Q20190102','INV20190204','DR20190503','DR20190607']
    },
    otherInfo:{}
  }
]
let countData = {
  sales:[
    {
      currency:'HKD',
      count:'1,245',
      amount:'$90,310.00'
    },
    {
      currency:'CNY',
      count:'10,437',
      amount:'￥774,205.00'
    },
  ],
  delivery:[
    {
      count:'942',
      deliveried:'900',
      outstanding:'42'
    },
    {
      count:'7,712',
      deliveried:'7,610',
      outstanding:'102'
    },
  ],
  payment:[
    {
      count:'1,245',
      received:'$90,310.00',
      outstanding:'$0.00'
    },
    {
      count:'10,437',
      received:'￥774,205.00',
      outstanding:'￥0.00'
    },
  ]
}
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate(); 
if(month<10){
  month = '0' + month ;
}
if(day<10){
  day = '0' + day ;
}

export default {
  
  example: config => {
    /*必须这么设置 不然过不了request*/
    let obj ={
      code: 0,
      msg: "",
      status: 200
    }
    /*必须这么设置 不然过不了request*/
    obj.data = exampledata
    return obj
  },

  getOrderData: config => {
    
    let obj ={
      code: 0,
      msg: "",
      status: 200
    }
    var data = JSON.parse(config.body);
    console.log(data)
    for(var i=0;i<orderData.length;i++){
      if(orderData[i].order == data.id){
        obj.data = orderData[i] ;
        return obj
      }
    }
    
    obj.data = {
      order:data.id,
      step:0,
      customer:{
        client:downListData.data.user,
        clientvalue:'',
      },
      itemDetalls:{
        tableData: [],
      },
      paymentRecelve:{
        outstanding:0,
        data:[]
      },
      dellvery:{
        deliveried:0,
      },
      documents:{
        recentNumber:0,
        recentDocuments:[]
      },
      otherInfo:{}
    };

    return obj

    
  },

  getTableData: config => {
    let obj ={
      code: 0,
      msg: "",
      status: 200
    }
    var condition = JSON.parse(config.body);
    obj.data = tableData ;
    return obj
    
  },

  getDownListData: config => {
    let obj ={
      code: 0,
      msg: "",
      status: 200
    }
    obj.data = downListData
    return obj
  },

  addOrder: config => {
    let obj ={
      code: 0,
      msg: "",
      status: 200
    }
    var num = tableData.data.length ;
    let newObj = {
      id: num.toString(),
      formid:"SO"+year+month+day,
      recordDate:"",
      customer:"",
      country:"",
      totaiQTY:"",
    }

    tableData.data.push(newObj);
    obj.data = {
      code:0,
      message:"新增成功!",
      data:newObj
    }
    return obj
  },

  getPersonal: config => {
    let obj ={
      code: 0,
      msg: "",
      status: 200
    }
    var postData = JSON.parse(config.body);
    console.log(downListData.data.personal);
    for(var i=0;i<downListData.data.personal.length;i++){
      if(downListData.data.personal[i].label == postData.label){
        obj.data = downListData.data.personal[i] ;
        return obj
      }
    }

    obj.data = {
      id:'1',
      label:'张三',
      site:'中国/广东省/珠海市/南屏科技工业园屏东六路102号',
      contacts:'张三',
      officePhone:'+86 0756 2213-8989',
      mobilePhone:'+86 13823066996',
      fax:'+86 0756 2213-8989',
      email:'1234567@qq.com'
    }
    
  },

  setPersonal: config => {
    let obj ={
      code: 0,
      msg: "",
      status: 200
    }
    var postData = JSON.parse(config.body);
    for(var i=0;i<downListData.data.personal.length;i++){
      if(downListData.data.personal[i].id == postData.id){
        downListData.data.personal[i].label = postData.label ;
      }
    }
    downListData.data.user[postData.index].label = postData.label ;
    downListData.data.user[postData.index].value = postData.label ;
    for(var i=0;i<orderData.length;i++){
      if(postData.order == orderData[i].order){
        orderData[i].customer.clientvalue = postData.label ;
      }
    }
    obj.data = {
      code:0,
      message:"修改成功!",
    }
    return obj
  },

  addPersonal: config => {
    let obj ={
      code: 0,
      msg: "",
      status: 200
    }
    var postData = JSON.parse(config.body);

    downListData.data.user.push({label:postData.label,value:postData.label});
    downListData.data.personal.push({
      id:downListData.length+1,
      label:postData.label,
      site:postData.site,
      contacts:postData.contacts,
      officePhone:postData.officePhone,
      mobilePhone:postData.mobilePhone,
      fax:postData.fax,
      email:postData.email
    });
    
    obj.data = {
      code:0,
      message:"添加成功!",
    }
    return obj
  },
  
  setCustomer: config => {
    let obj ={
      code: 0,
      msg: "",
      status: 200
    }
    var postData = JSON.parse(config.body);
    for(var i=0;i<tableData.data.length;i++){
      if(tableData.data[i].id == postData.id){
        tableData.data[i].customer = postData.customer ;
      }
    }
    obj.data = {
      code:0,
      message:"修改成功!",
    }
    return obj
  },

  delitemDetalls: config => {
    let obj ={
      code: 0,
      msg: "",
      status: 200
    }
    
    obj.data = {
      code:0,
      message:"删除成功!",
    }
    return obj
  },

  getCountData: config => {
    let obj ={
      code: 0,
      msg: "",
      status: 200
    }

    obj.data = countData ;
    return obj
  },
}