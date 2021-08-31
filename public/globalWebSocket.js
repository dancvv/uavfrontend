export default {
    ws:{},//websocket对象
    delay:1500,//延迟
    //重置websocket对象
    setWs:function (newWs){
        this.ws=newWs
    },
    //重置延迟
    setDelay:function(newDelay){
        this.delay=newDelay
    },
    //重置信息
    sendMsg:function (message){
        this.ws.send(JSON.stringify(message))
    }
}
