//expressをrequire(import)して定数に代入(定数とは中身が変わらない変数)
const { json } = require("express");
const express = require("express");
//express関数をappに代入(javascriptでは関数を変数に代入できる)
const  app = express();
//Jsonを使うことを指定する(必須)
app.use(express.json());

//app.use(express.static('Web'));
//app.use(express.static('sub3'))
app.use(express.static('public'));
app.use(express.static('public/sub3'));
//app.use(express.static('public/contact'));


//app.listen(8888,console.log("サーバーが開始!!!"));
app.listen(process.env.PORT || 8888,console.log("サーバーが開始!!!"));

//クライアントに送る処理(テンプレ)
// app.get("/sub3/3floor/",(req,res) =>{
//     //app.use(express.static('Web'))
//     console.log("アクセス!!!");
//     res.sendFile(__dirname + "/Web/sub3/3floor.html");
//     //res.render("/main.html");
// });

// app.get("/contact/",(req,res) =>{
//     console.log("アクセス!!!");
//     res.sendFile(__dirname + "/contact/contact.html");
// });

//取得するデータ(json)
const lock_data = [
    {where:"",lock:"no",id:1},
    {where:"",lock:"no",id:2},
    {where:"",lock:"no",id:3},
    {where:"",lock:"no",id:4},
    {where:"",lock:"no",id:5},
    {where:"",lock:"no",id:6},
    {where:"",lock:"no",id:7},
    {where:"",lock:"no",id:8},
    {where:"",lock:"no",id:9},
    {where:"",lock:"no",id:10},
    {where:"",lock:"no",id:11},
    {where:"",lock:"no",id:12},
    {where:"",lock:"no",id:13},
    {where:"",lock:"no",id:14},
    {where:"",lock:"no",id:15}
];

const Distance_Data = [
    
        {id:1,data:0.00},
        {id:2,data:0.00},
        {id:3,data:0.00},
        {id:4,data:0.00},
        {id:5,data:0.00},
        {id:6,data:0.00},
        {id:7,data:0.00},
        {id:8,data:0.00},
        {id:9,data:0.00},
        {id:10,data:0.00},
        {id:11,data:0.00},
        {id:12,data:0.00},
        {id:13,data:0.00},
        {id:14,data:0.00},
        {id:15,data:0.00},
    
]

//データの格納
let Datas = []
for(let i = 0;i < 15;i++){
    Datas[i] = [{id:1,data:0.00},
        {id:2,data:0.00},
        {id:3,data:0.00},
        {id:4,data:0.00},
        {id:5,data:0.00},
        {id:6,data:0.00},
        {id:7,data:0.00},
        {id:8,data:0.00},
        {id:9,data:0.00},
        {id:10,data:0.00}
        ];
}
//console.log(Datas)
//console.log(lock_data)

//データを取得可能にする(GET)
app.get("/api/locks_data",(req,res) =>{
    res.send(lock_data);
});


//データを取得
app.get("/api/get/:id",(req,res) =>{
    const id = lock_data.find((c) => c.id === parseInt(req.params.id));
    res.send(id);
});

app.get("/api/datas",(req,res) =>{
    //const id = lock_data.find((c) => c.id === parseInt(req.params.id));
    console.log("GET");
    res.send(Datas);
});

app.get("/api/datas/:where",(req,res) =>{
    console.log("GET");
    res.send(Datas[req.params.where]);
});

let avg = 0.0;
//データを送信,追加(POST)
app.post("/api/post/:data/:number",(req,res)=>{
    let _data = 0;
    _data = req.params.data;
    if(_data >= 2000){
        _data = 2000;
    }
    const post = {
        id: Datas[req.params.number - 1].length + 1,
        data: _data
    };

    Datas[req.params.number - 1].push(post);
    
    for(let k = 0;k <= 4;k++){
        avg += parseFloat(Datas[req.params.number - 1].find((c) => c.id === parseInt(Datas[req.params.number - 1].length - k)).data);
    }
    //k = 1
    avg /= 5;
    console.log(req.params.number + "の移動平均は" + avg);
    if(avg > 300){
        lock_data.find((c) => c.id === parseInt(req.params.number)).lock = "yes";
    }else{
        lock_data.find((c) => c.id === parseInt(req.params.number)).lock = "no";
    }
    avg = 0.0;
    console.log("push!");
    res.send(Datas);
});

//データの更新(put)
app.put("/api/put/:id/:lock",(req,res) =>{
    const id = lock_data.find((c) => c.id === parseInt(req.params.id));
    id.lock = req.params.lock;
    console.log("put!!");
    res.send(id);
});

//データ削除(delete)
app.delete("/api/put/:id",(req,res) =>{
    const id = lock_data.find((c) => c.id === parseInt(req.params.id));
    //配列の番号取得
    const index = lock_data.indexOf(id);
    //指定したものを一つだけ削除
    lock_data.splice(index,1);
    res.send(id);
});

//setInterval(() => console.log(Datas),10000);