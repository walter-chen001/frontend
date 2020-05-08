export function sortKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : (x > y) ? 1 : 0)
    })
}
//array 表格数据数组,page 当前页,pageSize 每页显示几条
export function Pagination(array,page,pageSize) {
  var currPage = []
  if(array.length <= pageSize){
    currPage = array
    return currPage
  }else{
    if(page == 1){
      currPage = array.slice(0,pageSize)
      return currPage
    }else{
      currPage = array.slice(pageSize*(page - 1),pageSize*page)
      return currPage
    }
  }
}


//获取唯一标识  example:uuid(8,8)
export function uuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

// 数字分格
export function formatNumber(num) {
  if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) {
      return num;
  }
  var a = RegExp.$1,
      b = RegExp.$2,
      c = RegExp.$3;
  var re = new RegExp("(\\d)(\\d{3})(,|$)");
  while (re.test(b)) b = b.replace(re, "$1,$2$3");
  return a + "" + b + "" + c;
}

// 数字分格
export function createColors(count,color) {
  count = count ? count :10;
  color = color ? color : 0xffffff;
  let colorList =[];
  for (var i = 0; i < count; i++) {
      var colorStr = Math.floor(Math.random() * color).toString(16);
      //如果颜色值是五位，则补零
      if (colorStr.length < 6) {
          colorStr += '0';
      }
      if (colorStr == '005094') {
          i--;
          continue;
      }
      colorList.push('#' + colorStr);
  }
  return colorList
}
