import service from "@/utils/service";
//封装相关的数据请求
const link = (url: string, method: string, data: object, params: object) => {
  return new Promise((resolve, reject) => {
    service
      .request({
        url,
        method,
        data,
        params,
      })
      .then((success: any) => {
        resolve(success);
      })
      .catch((error:any) => {
        reject(error);
      });
  });
};

export default link