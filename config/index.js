// 配置文件
module.exports = {
    // 基础定时发送功能配置项（必填项）
     NAME: 'A朵老婆大人', //女朋友备注姓名
     NICKNAME: 'ྀི Mo~', //女朋友昵称
    //NAME: '云草桑备注', //女朋友备注姓名
   // NICKNAME: '云草桑', //女朋友昵称
    //NAME: '文件传输助手', //女朋友备注姓名
    //NICKNAME: '文件传输助手', //女朋友昵称
     MEMORIAL_DAY: '2015/02/01', //你和女朋友的纪念日
     CITY: '上海', //女朋友所在城市（城市名称，不要带“市”）
    // CITY: '广州', //女朋友所在城市（城市名称，不要带“市”） 
    //// 每分钟的第30秒触发： '30 * * * * *'
   // SENDDATE: '0 01 8 * * *', //定时发送时间 每天8点06分0秒发送，规则见 /schedule/index.js 
     //SENDDATE: '0 01 6 * * *', //定时发送时间 每天8点06分0秒发送，规则见 /schedule/index.js
     //SENDDATE1: '0 01 23 * * *', //定时发送时间 每天8点06分0秒发送，规则见 /schedule/index.js 
     //SENDDATE2: '0 05 1 * * *', //定时发送时间 每天8点06分0秒发送，规则见 /schedule/index.js 
     SENDDATEsecond30: '30 * * * * *', //定时发送时间 每天8点06分0秒发送，规则见 /schedule/index.js
    SENDDATEsecond40: '40 * * * * *', //定时发送时间 每天8点06分0秒发送，规则见 /schedule/index.js 
     //SENDDATE: '0 01 6 * * *', //定时发送时间 每天8点06分0秒发送，规则见 /schedule/index.js
     //SENDDATE1: '0 01 23 * * *', //定时发送时间 每天8点06分0秒发送，规则见 /schedule/index.js 
     //SENDDATE2: '0 05 1 * * *', //定时发送时间 每天8点06分0秒发送，规则见 /schedule/index.js 

     SENDDATE0: '0 01 0 * * *', 
     SENDDATE1: '0 01 1 * * *',  
     SENDDATE2: '0 01 2 * * *', 
     SENDDATE5: '0 01 5 * * *', 
     SENDDATE6: '0 01 6 * * *',   
     SENDDATE7: '0 01 7 * * *',  
     SENDDATE8: '0 01 8 * * *',  
     SENDDATE9: '0 01 9 * * *',  
     SENDDATE10: '0 01 10 * * *',
     SENDDATE11: '0 01 11 * * *',
     SENDDATE12: '0 01 12 * * *',
     SENDDATE13: '0 01 13 * * *',
     SENDDATE14: '0 01 14 * * *',
     SENDDATE15: '0 01 15 * * *',
     SENDDATE16: '0 01 16 * * *',
     SENDDATE17: '0 01 17 * * *',
     SENDDATE18: '0 01 18 * * *',
     SENDDATE19: '0 01 19 * * *',
     SENDDATE20: '0 01 20 * * *',
     SENDDATE21: '0 01 21 * * *',
     SENDDATE22: '0 01 22 * * *',
     SENDDATE23: '0 01 23 * * *',
     SENDDATE1000: '30 1 0 * * 1', // 每周1的0点1分30秒触发 ：'30 1 1 * * 1'
   


    ONE: 'http://wufazhuce.com/', // ONE的web版网站
    SWEETWORD: 'http://api.tianapi.com/txapi/saylove/', // 天行土味情话api接口
    TIANXINGWEATHER: 'http://api.tianapi.com/txapi/tianqi/', // 天行天气api接口
    TIANXINGlajifenlei: 'http://api.tianapi.com/txapi/lajifenlei/', // 天行host 垃圾分类
    //高级功能配置项（非必填项）

    //AUTOREPLYPERSONtest: '云草桑',// ྀི Mo~指定好友开启机器人聊天功能   指定好友的昵称
    AUTOREPLY:true, //false, //自动聊天功能 默认关闭
    //AUTOREPLYPERSON: '云草桑',// ྀི Mo~指定好友开启机器人聊天功能   指定好友的昵称
    AUTOREPLYPERSON: '春天的脚步',

    AIBOTAPI: 'http://api.tianapi.com/txapi/robot/', //天行机器人API 注册地址https://www.tianapi.com/signup.html?source=474284281
    APIKEY: '', //天行机器人apikey，建议大家自己申请一下

    AUTOREPLYPERSONS: ['A朵老婆大人', '云草桑', '文件传输助手','春天的脚步'], //指定多个好友开启机器人聊天功能   指定好友的备注，最好不要带有特殊字符
    
    
}