这是一个React做增删改查的项目练习
准备工作：
A.ES6语法
B.基本的React.js知识
C.Bootstrapt
D.可供练习的虚拟API
E.jQuery或是axios请求API（这个练习我们用的是axios）
*********************************************************
1.创建项目：
step1.
打开cmd

step2.
进入本地项目位置
$ cd React Project  （我的项目是放在React Project目录里的）

step3.
新增项目目录react-app
$ create-react-app react-app

step4.
进入react-app项目位置
$ cd react-app

step5.
启动react-app项目
$ yarn start

******************************************************************
2.实现records的静态列表页

step1.建立Reacord类
修改App.js的显示内容，只剩下import React.....,中间render渲染的内容都删掉留div给他，
最后留个export default App。

在src目录里新增一个components目录，并在里面添加Records.js
把app.js的内容，复制给Records.js,并把类都改成Records

在index.js的地方把api都改成Records，这边表示项目交由Records这个类来显示

step2.Record静态页面
在Records.js里把基本的table表格写好，表头是Date,Title,Amount
到www.bootech.cn里面找到bootstrapt4的css的cdn,把cdn引用的链接贴到public目录里面的index.html

table里写的是用thead及tbody来区分表头和生成的内容,再把tr td 包在里面
而目前tbody里面的内容是写死的数据

step3.Reacord显示的动态组件
在components目录，新增Record.js组件，把App.js内容拷贝到Record.js并修改类名为Record
把Records.js里tbody里的内容剪贴到Record.js要渲染的位置，
回到Records.js的头部import Record...把Record.js导入到Records.js，tbody的地方也把原先写 tr td 的地方改成<recod /> 
（如此一来Records.js就是Record.js的父类,<Record/>则可以加入显示Record.js的动态数据）

step4.手写虚拟数据
在Records.js添加一个建构函数，super()继承父类的特性之后,在写this.state添加要传递给<record />组件的数据
在this.state里面我们写一个records对象,这个对象里写几个数组，每条数组代表一条数据,数据的键名"id","date","title","amount"
将tbody里面的内容改成 ｛this.state.records.map((record, i)=> <Record />)｝
map可以将records对象里的内容传递给<Record />

在Record.js里的内容要继承父类遍历的结果要在显示数据的地方改成{this.props.record.date}(这里的date是传递过来的date值,其他照着改)
而在Records.js是他的父类,将tbody里面的内容改成 ｛this.state.records.map((record, i)=> <Record  key={record.id} record={record}/>)｝

***********************************************************************************************
3.模拟API数据
模拟数据的方式有两种,一种是使用mockAPI的网站（www.mockapi.io），另一种是json-server

mockAPI建立数据：
用github帐号登录之后,进入project兴建项目,输入项目名称之后,然后创建资源records（和Records.js里的this.state里的对象对应）
而records资源里面的键名也要和Records.js里的this.state的records对象一样，数据类型 id，date，title都设置为string，amount设置为number
按下Create就可以创建这个API资源了,之后新增数据可以拉动records下方的动态添加达成

查看API数据内容的方法:
1）curl
打开cmd，输入$ curl%
然后输入$ curl API链接/资源名

2）Postman（这是一个工具,需要下载）
选择GET请求,在网址的地方输入API链接/资源名

3）json-server (http://github.com/typicode/json-server)
cmd安装 $ npm install -g json-server 
回到根目录兴建db.json，在db.json新增数据
cmd监听数据 $ json-server --watch db.json-server --port 端口号
把在cmd生成的本地地址(http://localhost:........)用Postman的GET请求读取
用Postman新增数据的时候在POST模式下选择Body的x-www-form-urlencoded里添加
添加完成之后点击Send就可以添加数据了

Postman也可以新增mockAPI的数据,同样是在POST模式下,但是要选择Body的raw,把要添加的这些数据用对象的形式填写

4）浏览器的自带方法
console里面这么写，
fetch("API链接/资源名").then(function(response){
   return response.json();
}).then(funcion(json){
	console.log(json);
})
***************************************************************************
4.请求API
step1.
在Records.js写一个周期函数componentDidMount(){},在页面加载完成的时候运行这个函数里的代码

step2.导入请求API的库
头部写上import $ from 'jquery';
cmd安装jquery输入 $ yarn add jquery,之后重启项目 $ yarn start

step3.请求API
在componentDidMount(){}里面这么写：
$.getJSON("API链接/资源名").then(
	response =>console.log(response),
	error =>console.log(error.responseText)
)

step4.将请求的结果加载
在建构函数里面初始化参数
this.state ={
	error：null，
	isLoaded: false，
	records：[]
}
在componentDidMount里面
$.getJSON("API链接/资源名").then(
	response =>this.setState({
		records: response,
		isLoaded: true
	}),
	error =>this.setState({
		isLoaded: true，
		error
	})
)

在上面写的是jQuery里面所有的写法，如果要只使用getJSON方法的时候，就要写成
getJSON("API链接/资源名").then()
在头部写上import { getJSON } from 'jquery';


(使用axios库) https://github.com/axios/axios

step1.安装
cmd安装axios输入 $ yarn add axios,之后重启项目 $ yarn start

step2.使用axios
导入头部写上import axios from 'axios';
使用的时候这么写:
axios.get("API链接/资源名").then(
	response =>this.setState({
		records: response,
		isLoaded: true
	}),).catch(
		error =>this.setState({
		isLoaded: true，
		error
	})
	)
*******************************************************************************
5.静态类型的检查
静态类型检查可以保证使用的数据类型，有时候API传过来的数据类型和我们要用的数据是不一样的
要是类型不同会报错

导入数据类型的库
头部导入 import PropTypes from 'prop-types';

调用方法运用在Records类里使用到的参数

Records.propType = {
  id:PropTypes.number,
}
*************************************************************************************
6.给API链接配置环境变量
在create-react-app里有提供配置环境变量的方法

step1.新建配置环境变量的文件
在项目src里兴建utils/RecordsAPI.js

step2.设定API的开头是REACT_APP（文档中规范是这个开头）
export const api = process.env.REACT_APP_变量 || "http://localhost:xxxx"(不存在的位置)

export是导出之后可以引用

step3.在需要引用的文件头部导入
import * as 代替变量 from '../utils/RecordsAPI'

step4.axios请求的API则改成

axios.get('${代替变量.api｝/资源名').then(.......

上面''是左斜的单引号

step5.在根目录新建.env.development.local文件
这个文件可以加入很多的变量
在文件里写 REACT_APP_变量 = API链接

step6.重启项目npm start
他就会先去找.env.development.local文件

step7.将axios.get('${代替变量.api｝/资源名')重构

到RecordsAPI.js增加一个方法
export const getAll = （）=>axios.get('${代替变量.api｝/资源名')

把 代替变量.api 改为 api,之前写的export const api方法的export删掉
const api = process.env.REACT_APP_变量 || "http://localhost:xxxx"
export const getAll = （）=>axios.get('${api｝/资源名')


并在RecordsAPI.js将axios导入
import axios from 'axios';

回到Records.js把axios.get('${代替变量.api｝/资源名').then(.......
改成

RecordsAPI.getAll('${代替变量.api｝/资源名').then(.......

step8.将API不含资源名的位址替换到api的默认地址中
const api = process.env.REACT_APP_变量 || "API不含资源名的位址"

**********************************************************************************
7.创建表单 （增删改查的~增）

A.静态页面和动态效果：

step1.整理代码
定义参数 let recordsComponent 再利用这个来做渲染

step2.兴建recordForm组件
（参考 2.实现records的静态列表页  step1.建立Reacord类）

step3.写recordForm.js的静态页面
用 form 来写提交表单，提交用button按钮

step4.做提交按钮的禁用/可用效果
思路：先判断input里面有没有值，再去操作提交键是否禁用

在建构函数里的this.state里面做初始设定,date title amount 三个为空

之后写个方法 valid（）｛ return this.state.date && this.state.title && this.state.amount｝

这个方法要是三个同时有值,则启用按键,否则就禁用(false是禁用)
button加上 disable=｛!this.valid()｝

动态确认input框的输入状况
每一个input加上 onChange=｛this.handleChange.bind(this)｝
handleChange(event){
  let name, obj;
  name = event.target.name;
  this.setState((
    obj={},
    obj[""+name]=event.target.value,  （[""+name] 是换成字符串的意思）
    obj
  ))
}

B.新增一条数据给Record.js：
思路：这里我们要做两个步骤，第一步是要发送创建record请求，第二部是更新列表Records Component的state的record的值

step1.onSubmit提交数据
在form 写 onSubmit=｛this.handleSubmit.bind(this)｝

新建方法 handleSubmit（event）｛
  event.preventDefault（）；           （event.preventDefault（）是用来取消默认的效果,就是url出现的get方法的值）

｝

step2.发送record请求
到RecordsAPI.js里面新增方法
export const create =（body）=>
   axios.post('${代替变量.api｝/资源名',body)   (body是用来传送date title amont这些参数用的)

在RecordForm.js头部导入RecordsAPI之后

回到handleSubmit方法,新增一条数据
const data =｛date:this.state.date,title:this.state.title,amount:Number.parseInt(this.state.amount,0)｝；
RecordsAPI.create（data）.then(
  response => console.log(response.data)
).catch(
  error => console.log(error.message)
)


Number.parseInt是转成整型数据的


step3.更新列表Records Component的state的record的值
思路：将RecordForm.js的值传给Records.js，然后更新列表

回到Records.js里对RecordForm组件传一个方法
<RcordForm handelNewRecord=｛this.addRecord.bind(this)｝/>

添加addRecord函数
addRecord（record）｛｝

回到RecordForm里的handleSubmit方法
RecordsAPI.create（data）.then(
  response =>this.props.handelNewRecord(response.data);
).catch(
  error => console.log(error.message)
)


handleSubmit这时候再做一个提交后清空input显示的值
RecordsAPI.create（data）.then(
  response =>this.props.handelNewRecord(response.data);
  this.setState（{
      date:"",
      title:"",
      amount:""
  }）
    
).catch(
  error => console.log(error.message)
)


回到Records.js更新列表的值
addRecord（record）｛
   this.setState({
     error:null,
     isLoaded:true,
     records:[
     ...this.state.records,
     record
     ]
  })
｝
****************************************************************************************
8.修改表单单条记录 （增删改查的~改）
step1.在Record.js做静态的按钮 Edit 和 Delete
写完这两个button之后，在建构函数里面初始化
this.state=｛
  edit:false

｝

将代码重构成this.state.edit要是为true显示为可编辑的input框状态（这个input的默认值是defaultValue=｛this.props.date｝）,false的时候是默认状态

完成后再把Edit点击事件做一个切换效果
onClick = ｛this.handleToggle.bind(this)｝

新增一个切换方法
handleToggle（）｛
  this.setState({
   edit: !this.state.edit  (true和 false切换)
  });


｝


step2.更新record的this.state
首先发送请求
到RecordsAPI.js里面添加一个方法
export const update = （id,body）=>axios.put('${api｝/资源名/${id｝',body)

回到Record.js在头部导入RecordsAPI


在update新加一个点击事件
onClick = ｛this.handleEdit.bind(this)｝

新增一个方法

handleEdit（event）｛
  event.preventDefault();

｝

在input里新增ref属性,里面分别写着 ref="date"  ref="title"  ref="amount"



在handleEdit方法里提交修改后的数据，先取得修改的最终的值提交给API，
以服务器端显示的为主，然后在用服务器端的数据来显示更新的数据

handleEdit（event）｛
  event.preventDefault();
  const record = ｛
    date:this.refs.date.value,
    title:this.refs.title.value,
    amount:Numner.parseInt(this.refs.amount.value, 0)
  ｝
  RecordsAPI.update(this.props.id, record).then(
   response => console.log(response.record)
  ).catch(
   error => console.log(error.massage)
  )  

｝

到Records.js找到map循环出来的Record组件，加上handleEditRecord方法处理传递的数据

handleEditRecord=｛this.updateRecord.bind(this)｝

新增updateRecord方法   (使用redux插件,用来更新代码，因为这里用到了record,所以在Records.js里面继承的参数都要从this.props.date改成了this.props.record.date)
updateRecord(record,data){
   const recordIndex = this.state.records.indexOf(record);
   const newRcords = this.state.records.map((item, index) => {

    if(index !==recordIndex){ return item; }
    return{
    ...item,
    ...data
    };
 });
    this.setState({
    records: newRcords
  })
}

在Record.js里面修改API的返回
response => ｛
  this.props.handleEditRecord(response.data);
  this.setState({edit:false}); 
｝
***************************************************************************************************

9.删除表单单条记录 （增删改查的~删）

step1.在Records.js的record组件新增删除数据的方法
handleDeleteRecord=｛this.deleteRecord.bind(this)｝

step2.到Record.js做删除的请求
找到Delete键，加上点击事件
onClick=｛this.handleDelete.bind(this)｝


到RecordAPI.js写一个删除的方法
export const remove = （id）=>axios.delete('${api｝/资源名/${id｝')

新建一个删除的方法
handleDelete（event）｛
  event.preventDefault();
  RecordsAPI.remove(this.props.record.id).then(
    response=>this.props.handleDeleteRecord(this.props.record)
  ).catch(
    error=>console.log(error.message)
  )
｝

step3.将数据更新从新渲染
回到Records.js
deleteRecord（record）｛
  const recordIndex = this.state.records.indexOf(record);
  const newRecords = this.state.records.filter((item, index) => index !==recordIndex);
  this.setState({
    records:newRecords
  })
｝

******************************************************************************************
10.金额统计
step1.兴建AmountBox.js做组件的静态页面  （这步就不要再重复说明了）
const AmountBox =({text})=>{
  <div className="col">
    <div className="card">
      <div className="card-header">{text}</div>
      <div className="card-body"></div>
    </div>
  </div>
}

step2.在Records.js写三个组件导入AmountBox.js
<AmountBox text="Credit" amount={this.credit()}/>
<AmountBox text="Debit" amount={this.debit()}/>
<AmountBox text="Balance" amount={this.balance()}/>

step3.实现显示的三个函数
credit(){
 let credits = this.state.records.filter((record)=>{
   return record.amount >=0;
 })
  
 return credits.reduce((prev, curr)=>{
   return prev + Number.parseInt(curr.amount,0)
 },0)

}
debit(){
 let credits = this.state.records.filter((record)=>{
   return record.amount <0;
 })
  
 return credits.reduce((prev, curr)=>{
   return prev + Number.parseInt(curr.amount,0)
 },0)

}
balance(){
  return this.credit() + this.debit()
}

step4.在AmountBox加上amount
const AmountBox =({text,amount})=>{
  <div className="col">
    <div className="card">
      <div className="card-header">{text}</div>
      <div className="card-body">{amount}</div>
    </div>
  </div>
}











