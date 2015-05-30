var JPush = require("../lib/JPush/JPush.js");

var client = JPush.buildClient('34eef7dee555acdf29a3f20b', '1d3db0bf3a89c16ab9e46a5b');
var querystring = require('querystring');
//npm install jpusher


function pushMsgHandler2(){
}

pushMsgHandler2.pushMsg=function(req,res){

    req.setEncoding('utf-8');
    var postData = "";
    console.log("ok");
    //console.log("pushMsgHandler----pushMsg()");
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
        console.log(postDataChunk);
    });

    req.addListener("end", function () {

        var params = querystring.parse(postData);

        var m_head = params.head;
        var m_msg = params.msg;
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
        res.end("Push Successful！");

    });
};


module.exports = pushMsgHandler2;

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



