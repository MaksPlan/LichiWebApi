import axios from 'axios';

const $api = axios.create({
    baseURL: 'https://api.lichi.com',
    timeout: 10000,
    // withCredentials: true,
//  headers: {
//     'Set-Cookie': cookie,
//  },
    params: {
        lang: 1,
        shop: 1,
        id: 88250
    }
});

export const getDataList = async () => {
    try {
   const res = await $api.get('/cart/list')
   const {headers, data} = await res

   return {headers, data}

       
    } catch (error) {
        throw error
    }
    
};

export const postData = async (data: any) => {
  const res = await axios.post(`${$api}/cart/add`, data,)

  return res
}