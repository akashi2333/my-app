import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type='GET') {  //注意对象和拼串

    return new Promise ((resolve, reject) => {
        let promise
        if(type==='GET') {
            promise = axios.get(url,{
                params: data
            })
        } else {
            promise = axios.post(url,data)
        }
        promise.then(Response => {
            resolve(Response.data)
        }).catch(error => {
            message.error('请求出错了：'+error.message)
        })
    })

    
}

