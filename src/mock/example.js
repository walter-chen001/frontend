let exampledata={
  data:[
    {client1:"DDDD1",client2:"DDDD1"}
  ],
  page:1,
  pageSize:10,
  rowTotal:'1110',
  sunData:{}
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

 
}
