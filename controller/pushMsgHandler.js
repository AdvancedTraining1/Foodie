var JPush = require("../lib/JPush/JPush.js");

var client = JPush.buildClient('fe28690dfbd70fe511ea5a3d', '89cde66f94f449d97599005f');

//npm install jpusher


function pushMsgHandler(){
}

pushMsgHandler.pushMsg=function(req,res){

    console.log("pushMsgHandler----pushMsg()");


    var m_msg = req.body.msg;
    var m_head = req.body.head;
    //console.log("DishDao Add 成功!!！");
    if(m_msg && m_msg.length>0){
       console.log(m_msg);

    client.push().setPlatform(JPush.ALL)
        .setAudience(JPush.ALL)
        .setNotification('Hi, JPush', JPush.android(m_head,m_msg, 5))
        .send(function(err, res) {
            if (err) {
                if (err instanceof JPush.APIConnectionError) {
                    console.log(err.message);
                } else if (err instanceof  JPush.APIRequestError) {
                    console.log(err.message);
                }
            } else {
                console.log('Sendno: ' + res.sendno);
                console.log('Msg_id: ' + res.msg_id);
            }
        });
        //var temp = {
        //    res: "Push Successful！"
        //}
        //res.send(JSON.stringify(temp));
        res.end("Push Successful！");
    }
};


module.exports = pushMsgHandler;

//easy push
//client.push().setPlatform(JPush.ALL)
//    .setAudience(JPush.ALL)
//    .setNotification('Hi, JPush', JPush.android('you!!!', 'Fuck', 5))
//    .send(function(err, res) {
//        if (err) {
//            if (err instanceof JPush.APIConnectionError) {
//                console.log(err.message);
//            } else if (err instanceof  JPush.APIRequestError) {
//                console.log(err.message);
//            }
//        } else {
//            console.log('Sendno: ' + res.sendno);
//            console.log('Msg_id: ' + res.msg_id);
//        }
//    });

//full push
//
//client.push().setPlatform('ios', 'android')
//    .setAudience(JPush.tag('555', '666'), JPush.alias('666,777'))
//    .setNotification('Hi, JPush', JPush.ios('ios alert'), JPush.android('android alert', null, 1))
//    .setMessage('msg content')
//    .setOptions(null, 60)
//    .send(function(err, res) {
//        if (err) {
//            if (err instanceof JPush.APIConnectionError) {
//                console.log(err.message);
//                //Response Timeout means your request to the server may have already received, please check whether or not to push
//                console.log(err.isResponseTimeout);
//            } else if (err instanceof  JPush.APIRequestError) {
//                console.log(err.message);
//            }
//        } else {
//            console.log('Sendno: ' + res.sendno);
//            console.log('Msg_id: ' + res.msg_id);
//        }
//    });



