import React, { useEffect, useState } from 'react';
import Main from './main';
import axios from 'axios';


const Index = ({data, cookie}) => {
    // const [cookie, setCookie] = useState(cookie)
   

    useEffect( () => {
    
      async function postData() {
        try {

          
             const res = await axios.post(`https://api.lichi.com/cart/add?lang=1&shop=1&id=88247`,
            {data: [1, 2, 3]}, 
       
            ) 
         const { data } = await res
         console.log('getData', data)
     

        } catch (error) {
            console.log('error')
        }
        
        
      }

      async function getData() {
        const res = await axios.post(`https://api.lichi.com/cart/list?lang=1&shop=1`, )
        const {headers, data} = await res

     console.log('getData', data)
     console.log('headers', headers)

      }
    
    postData()
       getData()
     
 
    }, [])

// console.log(cookie, data)


    return( <div>
        <Main />
        </div>)
};


export async function getServerSideProps() {
    const res = await axios.post('https://api.lichi.com/cart/list?lang=1&shop=1',);
    const { headers, data } = await res;
   const cookie = headers["set-cookie"]?.[0].split(';')?.[0].slice(4)
   console.log(cookie, data)

   axios.interceptors.request.use(
    config => {
     config.headers['set-cookie'] = cookie
     return config
    }
   )

    return {
      props: { data: data, cookie: JSON.parse(JSON.stringify(cookie)) },
    }
}

export default Index;