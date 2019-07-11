const superagent = require('../config/superagent')

var request = require('request');
 

//= 'http://www.520mus.com/index.js'; 
const config = require('../config/index')

const cheerio = require('cheerio')

async function getOne() {                                 // 获取每日一句
    try {
        let res = await superagent.req(config.ONE, 'GET')
        let $ = cheerio.load(res.text)
        let todayOneList = $('#carousel-one .carousel-inner .item')
        let todayOne = $(todayOneList[0]).find('.fp-one-cita').text().replace(/(^\s*)|(\s*$)/g, "")
        return todayOne;
    } catch (err) {
        console.log('错误', err)
        return err
    }

}

async function getWeather() { //获取墨迹天气（暂时废除）
    let url = config.MOJI_HOST + config.CITY + '/' + config.LOCATION
    try {
        let res = await superagent.req(url, 'GET')
        let $ = cheerio.load(res.text)
        let weatherTips = $('.wea_tips em').text()
        const today = $('.forecast .days').first().find('li');
        let todayInfo = {
            Day: $(today[0]).text().replace(/(^\s*)|(\s*$)/g, ""),
            WeatherText: $(today[1]).text().replace(/(^\s*)|(\s*$)/g, ""),
            Temp: $(today[2]).text().replace(/(^\s*)|(\s*$)/g, ""),
            Wind: $(today[3]).find('em').text().replace(/(^\s*)|(\s*$)/g, ""),
            WindLevel: $(today[3]).find('b').text().replace(/(^\s*)|(\s*$)/g, ""),
            PollutionLevel: $(today[4]).find('strong').text().replace(/(^\s*)|(\s*$)/g, "")
        }
        let obj = {
            weatherTips: weatherTips,
            todayWeather: todayInfo.Day + ':' + todayInfo.WeatherText + '<br>' + '温度:' + todayInfo.Temp + '<br>' +
                todayInfo.Wind + todayInfo.WindLevel + '<br>' + '空气:' + todayInfo.PollutionLevel + '<br>'
        }
        return obj
    } catch (err) {
        console.log('天气获取错误', err)
    }

}

async function getTXweather() { // 获取天行天气
    let url = config.TIANXINGWEATHER
    try {
        let res = await superagent.req(url, 'GET', { key: config.APIKEY, city: config.CITY })
        let content = JSON.parse(res.text)
        if (content.code === 200) {
            let todayInfo = content.newslist[0]
            let obj = {
                weatherTips: todayInfo.tips,
                todayWeather: '今天:' + todayInfo.weather + '<br>' + '温度:' + todayInfo.lowest + '/' + todayInfo.highest + '<br>' +
                    todayInfo.wind + ' ' + todayInfo.windspeed + '<br>' + '空气:' + todayInfo.air_level + ' ' + todayInfo.air + '<br>'
            }
            console.log('获取天行天气成功', obj)
            return obj
        } else {
            console.log('获取接口失败', content.code)
        }
    } catch (err) {
        console.log('获取接口失败', err)
    }
}

async function getReply(word) { // 天行聊天机器人
    let url = config.AIBOTAPI
    let res = await superagent.req(url, 'GET', { key: config.APIKEY, question: word, mode: 1, datatype: 0 })
    let content = JSON.parse(res.text)
    if (content.code === 200) {
        console.log(content)
        let response = ''
        if (content.datatype === 'text') {
            response = content.newslist[0].reply.replace('{robotname}', '小助手').replace('{appellation}', '小主')
        } else if (content.datatype === 'view') {
            response = '虽然我不太懂你说的是什么，但是感觉很高级的样子，因此我也查找了类似的文章去学习，你觉得有用吗<br>' + '《' + content.newslist[0].title + '》' + content.newslist[0].url
        } else {
            response = '你太厉害了，说的话把我难倒了，我要去学习了，不然没法回答你的问题'
        }
        return response
    } else {
        return '我好像迷失在无边的网络中了，你能找回我么'
    }
}

async function getSweetWord() { // 获取土味情话
    let url = config.SWEETWORD
    try {
        let res = await superagent.req(url, 'GET', { key: config.APIKEY })
        let content = JSON.parse(res.text)
        if (content.code === 200) {
            let sweet = content.newslist[0].content
            let str = sweet.replace('\r\n', '<br>')
            return str
        } else {
            console.log('获取接口失败', content.code)
        }
    } catch (err) {
        console.log('获取接口失败', err)
    }
}
/**
 * 获取垃圾分类结果
 * @param {String} word 垃圾名称
 */

async function getRubbishType(word) {
    let url = config.TIANXINGlajifenlei ;
    try {
        let res = await superagent.req(url, 'GET', { key: config.APIKEY, word: word})
        let content = JSON.parse(res.text);
        if (content.code === 200) {
            let type;
            if (content.newslist[0].type == 0) {
                type = '是可回收垃圾';
            } else if (content.newslist[0].type == 1) {
                type = '是有害垃圾';
            } else if (content.newslist[0].type == 2) {
                type = '是厨余(湿)垃圾';
            } else if (content.newslist[0].type == 3) {
                type = '是其他(干)垃圾';
            }
            let response =
              content.newslist[0].name +
              type +
              '<br>解释：' +
              content.newslist[0].explain +
              '<br>主要包括：' +
              content.newslist[0].contain +
              '<br>投放提示：' +
              content.newslist[0].tip;
            return response;
        } else {
            console.log('查询失败提示：', content.msg);
            return '暂时还没找到这个分类信息呢';
        }
    } catch (err) {
        console.log('获取接口失败', err)
    }
}

/**
 * 周公解梦
 * @param {String} word 关键字
 */

async function getzhougongjiemengType(word) {
    let url = config.TIANXINGzhougongjiemeng ;
    try {
        let res = await superagent.req(url, 'GET', { key: config.APIKEY  ,num:config.TIANXINGzhougongjiemengnum, word: word})
        let content = JSON.parse(res.text);
        console.log(content)
        if (content.code === 200) {
            let response ='';
            for(let i=0;i<config.TIANXINGzhougongjiemengnum;i++)
            {    let itemp=i+1
               if(i<content.newslist.length)
                 response+='<br>'+itemp+'。'+content.newslist[i].title+
                '<br>类型：' +content.newslist[i].type+ 
                '<br>解梦：'+  content.newslist[i].result;
            } 
            return response;

            
        } else {
            console.log('查询失败提示：', content.msg);
            return '暂时还没找到这个信息呢';   
        }
    } catch (err) {
        console.log('获取接口失败', err)
    }
}
module.exports = {
    getOne,
    getWeather,
    getTXweather,
    getReply,
    getSweetWord,
  getRubbishType,
  getzhougongjiemengType
    }