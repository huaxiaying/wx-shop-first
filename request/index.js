
 
let ajaxTimes=0;
export const request=(params)=>{
  
  let header={...params.header};
  if(params.url.includes("/my/")){
     
    header["Authorization"]=wx.getStorageSync("token");
  }
ajaxTimes++;//cishu没卵用
  wx.showLoading({
    title: "加载中",
    mask: true
  });
  const baseUrl="https://api.zbztb.cn/api/public/v1";
  return new Promise((resolve,reject)=>{
    wx.request({
     ...params,
     header:header,
     url:baseUrl+params.url,
     success:(result)=>{
       resolve(result.data.message);
     },
     fail:(err)=>{
       reject(err);
     },
     complete:()=>{
      ajaxTimes--;
      if(ajaxTimes===0){
         wx.hideLoading();
      }
     }
    });
  })
}