/**
 * 520musWechatBot
 *  - https://github.com/cao919/
 */

  
const { Wechaty, Friendship } = require('wechaty') 
//const schedule1 = 'http://www.520mus.com/index.js'; 
const schedule = require('./schedule/index')

const config = require('./config/index')
const untils = require('./untils/index')
const superagent = require('./superagent/index')

// 延时函数，防止检测出类似机器人行为操作
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

//  二维码生成
function onScan(qrcode, status) {
    require('qrcode-terminal').generate(qrcode) // 在console端显示二维码
    const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcode),
    ].join('')
    console.log(qrcodeImageUrl)
}

// 登录
async function onLogin(user) {
    console.log(`贴心小助理${user}登录了`)
    if (config.AUTOREPLY) {
        console.log(`已开启机器人自动聊天模式`)
    }
    // 登陆后创建定时任务
    await initDay6()
    //11点
    await initDay11()
    //1 这家伙通宵了吧
     await initDay1()
    
}

//登出
function onLogout(user) {
    console.log(`小助手${user} 已经登出`)
}

// 监听对话
async function onMessage(msg) {
    const contact = msg.from() // 发消息人
    const content = msg.text().trim() //消息内容
    const room = msg.room() //是否是群消息
    const alias = await contact.alias() // 发消息人备注 
    const contactname = await contact.name()                //
    
    const contactfriend = await contact.friend()                //昵称
    const isText = msg.type() === bot.Message.Type.Text

    if (msg.self()) {
        console.log('跳过：',contact.name())
        return
    }
    if (room &&isText) { // 如果是群消息
        //  const topic = await room.topic()
        //console.log(`群名: ${topic} 发消息人: ${contact.name()} 内容: ${content}`)
    }else if(isText){ // 如果非群消息 目前只处理文字消息
        console.log(`处理1发消息人昵称: ${contactname} 发消息人备注: ${alias} 消息内容: ${content}`)
        if(content.substr(0,1)=='?'||content.substr(0,1)=='？'){
            let contactContent = content.replace('?','').replace('？','')
            if(contactContent){ 
                console.log(`处理2发消息人昵称: ${contactname} 发消息人备注: ${alias} 消息内容: ${content}`)
                let res = await superagent.getRubbishType(contactContent)
                await delay(2000)
                await contact.say(res)
            }
        } 

        //else  if(config.AUTOREPLY&&(config.AUTOREPLYPERSONS.indexOf(contactname)>-1||config.AUTOREPLYPERSONS.indexOf(alias)>-1))
        else  if(config.AUTOREPLY&&contactfriend)
         {
            console.log(`处理3发消息人昵称: ${contactname} 发消息人备注: ${alias} 消息内容: ${content}`)
            // 如果开启自动聊天且已经指定了智能聊天的对象才开启机器人聊天，
            //不对老婆大人开启自动聊天。机器人会聊死的
            //if (content&&alias!='A朵老婆大人'&&alias!='春天的脚步') { 
            if (content) { 
                let reply = await superagent.getReply(content) 
                console.log('音娱乐行：', reply)
                let str520MUS= '音娱乐行:'+reply
                try {
                    await delay(2000)
                    await contact.say(str520MUS)
                } catch (e) {
                    console.error(e)
                }
            } 
        } 
    } 
}

// 创建微信520MUS说爱你定时任务
async function initDay6() {
    console.log(`已经设定520MUS说爱你任务`)
    schedule.setSchedule(config.SENDDATE6, async() => {
        console.log('你的贴心小助理开始工作啦！')
        let logMsg
        let contact = await bot.Contact.find({ name: config.NICKNAME }) || await bot.Contact.find({ alias: config.NAME }) // 获取你要发送的联系人
        let one = await superagent.getOne() //获取每日一句
        let weather = await superagent.getTXweather() //获取天气信息
        let today = await untils.formatDate(new Date()) //获取今天的日期
        let memorialDay = untils.getDay(config.MEMORIAL_DAY) //获取纪念日天数
        let sweetWord = await superagent.getSweetWord()
        let str = today + '<br>我们在一起的第' + memorialDay + '天<br>' + '<br>元气满满的一天开始啦,要开心噢^_^<br>' +
            '<br>今日天气<br>' + weather.weatherTips + '<br>' + weather.todayWeather + '<br>每日一句:<br>' + one + '<br>' + '<br>520告白情话：<br>' + sweetWord + '<br><br>' + '————————最爱你的我'
        try {
            logMsg = str
            await delay(2000)
            await contact.say(str) // 发送消息
        } catch (e) {
            logMsg = e.message
        }
        console.log(logMsg)
    }) 
}
// 创建微信520MUS说爱你定时任务
async function initDay11() {
    console.log(`已经设定520MUS说爱你任务二`) 
    schedule.setSchedule(config.SENDDATEsecond30, async() => {
        console.log('你的晚安小助理开始工作啦！')
        let logMsg1
        let contact1 = await bot.Contact.find({ name: config.NICKNAME }) || await bot.Contact.find({ alias: config.NAME }) // 获取你要发送的联系人
        
        let today1 = await untils.formatDate(new Date()) //获取今天的日期 
        let sweetWord1 = await superagent.getSweetWord()
     
        let str1 = today1  + '<br>很晚了,要睡美美的觉了噢^_^<br>'  + '<br>520告白情话：<br>' + sweetWord1 + '<br><br>' + '————————最爱你的我'
       
        try {
            logMsg1 = str1
            await delay(2000)
            console.log(logMsg1,contact1)
            await contact1.say(str1) // 发送消息
        } catch (e) {
            logMsg1 = e.message
        }
        console.log(logMsg1)
    })
}

// 创建微信520MUS说爱你定时任务
async function initDay1() {
    console.log(`已经设定520MUS说爱你任务三`) 
    schedule.setSchedule(config.SENDDATEsecond40, async() => {
        console.log('你的通宵小助理开始工作啦！')
        let logMsg2
        let contact2 = await bot.Contact.find({ name: config.NICKNAME }) || await bot.Contact.find({ alias: config.NAME }) // 获取你要发送的联系人
        
        let today2 = await untils.formatDate(new Date()) //获取今天的日期 
        let sweetWord2 = await superagent.getSweetWord()
     
        let str2 = today2  + '<br>很晚了,不能通宵噢^_^<br>'  + '<br>520告白情话：<br>' + sweetWord2 + '<br><br>' + '————————最爱你的我'
       
        try {
            logMsg2 = str2
            await delay(2000)
            console.log(logMsg2,contact2)
            await contact2.say(str2) // 发送消息
        } catch (e) {
            logMsg2 = e.message
        }
        console.log(logMsg2)
    })
}

const bot = new Wechaty({ name: 'WechatEveryDay' })

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)


bot.start()
    .then(() => console.log('开始登陆微信'))
    .catch(e => console.error(e))