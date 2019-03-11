import request from './http';

// 获取短信验证码
export async function getPhoneCode(params){
    
    return request(`/scm/login/sendCheckCode`, {
        method: 'POST',
        body: params,
        postType:2 
    })
}