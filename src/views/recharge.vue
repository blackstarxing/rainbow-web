<template>
    <div class="g-recharge bgc-grey">
        <rainbow-head></rainbow-head>
        <div class="m-recharge">
        	 <ul class="recharge-tab">
        		<li class="bgc-wt fs-20 fc-81">彩虹糖充值</li>
       		 </ul>
       		 <div class="recharge-box bgc-wt">
       		    <!-- 登录 -->
       		 	<div class="m-login bdc-btm" v-show='login'>
					<div class="g-bd1 f-cb">
					    <div class="g-sd1">
					    	<img src="../../static/images/defaultIcon.png" alt="">
					    </div>
					    <div class="g-mn1">
					        <div class="g-mn1c" >
					            <span class="u-login-clue fs-20 fc-b6">你还没有登录</span>
					            <div class="u-login-text fs-15 fc-b9">登录后即可充值<span class="recharge-login fc-login" @click='rechargeLogin'>登录</span></div>
					        </div>
					    </div>
					</div>
       		 	</div>
       		 	 <!-- 登录后 -->
       		 	<div class="m-login bdc-btm" v-show='logined'>
					<div class="g-bd1 f-cb">
					    <div class="g-sd1">
					    	<img v-if='loginedIcon'  v-bind:src="loginedIcon" alt="没有图片">
					    	<img v-else  src="../../static/images/defaultIcon.png" alt="没有图片">
					    </div>
					    <div class="g-mn1">
						    <div class="g-mn1c" >
						        <span class="u-logined-nickName fs-18">{{loginedNickname}}</span>
						        <div class="u-logined-account fs-15 f-cb">ID:<span class="recharge-login">{{loginedUserId}}</span><span class="u-logined-switchCount f-fr fs-20 fc-f36" @click="switchCount">切换账号</span></div>
						    </div>
					    </div>
					</div>
       		 	</div>
       		 	<!-- 充值金额 -->
       		 	<div class="m-recharge-item f-cb" v-show='login'>
       		 		<div class="fs-18 fc-b6">选择充值金额</div>
       		 		<div v-if='is_first == 1'>
       		 			<div v-for='(valuelist,index) in sweetList' :id='valuelist.id' :class="{active:isCur==index}" class="u-recharge-item bdc-b5 f-fl" @click='switchCash(index,valuelist.rmb)'>
	       		 			<div class="first-award fc-wt fs-13">首充奖励{{valuelist.first_charge_value}}</div>
	       		 			<div class="recharge-item-candy bdc-grey"><span class="fc-bk fs-24">{{valuelist.value}}</span><span class="fs-14 fc-f74">彩虹糖</span></div>
	       		 			<div class="recharge-item-cash fs-20 fc-bk">￥{{valuelist.rmb}}元</div>
	       		 			<div v-show='rechargeClue' class="recharge-clue"></div>
       		 			</div>
       		 		</div>
       		 		<div  v-else-if='is_first != 1'>
       		 			<div v-for='(valuelist,index) in sweetList' :id='valuelist.id' :class="{active:isCur==index}" class="u-recharge-item bdc-b5 f-fl" @click='switchCash(index,valuelist.rmb)'>
	       		 			<div class="recharge-item-candy bdc-grey"><span class="fc-bk fs-24">{{valuelist.candy}}</span><span class="fs-14 fc-f74">彩虹糖</span></div>
	       		 			<div class="recharge-item-cash fs-20 fc-bk">￥{{valuelist.rmb}}元</div>
	       		 			<div class="choose"></div>
       		 			</div>
       		 		</div>
       		 	</div>
       		 	<!-- 登录后充值金额 -->
       		 	<div class="m-recharge-item f-cb" v-show="logined">
       		 		<div class="fs-18 fc-b6">选择充值金额</div>
       		 		<div v-if='is_first == 1'>
       		 			<div v-for='(valuelist,index) in sweetList' :id='valuelist.id' :class="{active:isCur==index}" class="u-recharge-item bdc-b5 f-fl" @click='switchCash(index,valuelist.rmb)'>
	       		 			<div class="first-award fc-wt fs-13">首充奖励{{valuelist.first_charge_value}}</div>
	       		 			<div class="recharge-item-candy bdc-grey"><span class="fc-bk fs-24">{{valuelist.value}}</span><span class="fs-14 fc-f74">彩虹糖</span></div>
	       		 			<div class="recharge-item-cash fs-20 fc-bk">￥{{valuelist.rmb}}元</div>
	       		 			<div v-show='rechargeClue' class="recharge-clue"></div>
       		 			</div>
       		 		</div>
       		 		<div  v-else-if='is_first != 1'>
       		 			<div v-for='(valuelist,index) in sweetList' :id='valuelist.id' :class="{active:isCur==index}" class="u-recharge-item bdc-b5 f-fl" @click='switchCash(index,valuelist.rmb)'>
	       		 			<div class="recharge-item-candy bdc-grey"><span class="fc-bk fs-24">{{valuelist.value}}</span><span class="fs-14 fc-f74">彩虹糖</span></div>
	       		 			<div class="recharge-item-cash fs-20 fc-bk">￥{{valuelist.rmb}}元</div>
	       		 			<div class="choose"></div>
       		 			</div>
       		 		</div>
       		 	</div>
       		 	<!-- 选择支付方式 -->
       		 	<div class="m-pay-style bdc-grey">
       		 		<div class="pay-style-text fs-18 fc-b6">选择支付方式</div>
       		 		<div class="u-pay-style">
       		 			<div class="pay-wechat active" @click='payWechat'></div>
       		 			<div class="pay-alipay" @click='payAlipay'></div>
       		 		</div>
       		 	</div>
       		 	<!-- 支付金额 -->
       		 	<div class="m-pay-cash fs-18 fc-81 ">
       		 		<span>支付金额:</span><span class="fc-f36 fs-30 u-pay-cash">{{payCash}}</span><span>元</span>
       		 		<button class="confirm-pay bgc-btn fs-18 fc-wt" @click='rechargePay'>确认支付</button>
       		 	</div>
       		 </div>
        </div>
        <rainbow-foot></rainbow-foot>
        <!-- 彩虹ID登录 -->
		<div class="g-idLogin-mask" v-show='loginMask'>
			<div class="m-idLogin-container bgc-wt">
				<div class="u-mask-close" @click='maskClose'></div>
				<div class=" fc-idLogin fs-30">彩虹ID登录</div>
				<input class="u-idLogin-ipt fc-b3 fs-24" type="text" placeholder="请输入彩虹id" onkeyup="this.value=this.value.replace(/\D/g,'')" oninput="if(value.length>7)value=value.slice(0,7);" v-model='userId'>
				<div class="u-idlogin-error fs-22 fc-login">{{loginErrorClue}}</div>
				<button class="u-idLogin-btn fs-32 fc-wt bgc-btn" @click='confirmLogin'>确认</button>
			</div>
		</div>
		<!-- 支付金额弹框 -->
		<div class="g-pay-mask" v-show='payMask'>
			<div class="m-pay-mask bgc-wt">
				<div class="u-mask-close" @click='payMaskClose'></div>
				<div class="pay-cash fc-b6 fs-32">支付金额:<span class="pay-mask-cash fc-login">{{payCash}}元</span></div>
				<div class="m-pay-clue fc-ltgrey fs-20">为确保安全,请尽快完成支付</div>
				<div class="pay-mask-pic"><img v-bind:src="payMaskCode" alt="没有图片"></div>
				<div class="code-pay-clue fs-24 fc-codePay">请使用微信扫描二维码进行支付</div>
			</div>
		</div>
		<!-- 支付成功弹窗 -->
		<div class="g-pay-success" v-show='paySuccessMask'>
			<div class="m-pay-success bgc-wt"> 
				<div class="u-mask-close" @click='paySuccessClose'></div>
				<div class="pay-success-icon"></div>
				<div class="fc-f15 fs-36">支付成功</div>
			</div>
		</div>
    </div>
</template>
<script>
	import rainbowHead from '../components/rainbowHead.vue'
    import rainbowFoot from '../components/rainbowFoot.vue'
    export default {
	    data () {
	        return {
	            is_first:1,
	            sweetList:[],
	            payCash:'',
	            //tab当前位置
	    		isCur:0,
	            //选中提示
	            rechargeClue:false,
	            // 登录之前
	            login:true,
	            // 登录之后
	            logined:false,
	            // 登录弹框
	        	loginMask:false,
	        	//id输入错误提示
	        	loginErrorClue:'',
	        	//输入的id
	        	userId:'',
	        	// 支付弹框
	        	payMask:false,
	        	payMaskCode:'',
	        	// 支付成功弹框
	        	paySuccessMask:false,
	        	// 支付方式选择
	        	type:1,
	        	// 登录成功后(昵称和id和头像)
	        	loginedIcon:'',
	        	loginedUserId:'',
	        	loginedNickname:'',
	        	// 微信订单号
	        	outTradeNo:'',
	        	outTradeNoAli:'111',
	        	// 轮循定时器
	        	time:'',
	        }
	    },
	    mounted: function () {
	         this.$nextTick(function () {
	         	var _this = this;
	         	var userId = window.localStorage.getItem('userId');
	         	var nickname = window.localStorage.getItem('nickname');
	         	var icon = window.localStorage.getItem('icon');
	         	if(userId && nickname){
	         		_this.login = false;
	         		_this.logined = true;
	         		_this.loginMask = false;
	         		_this.loginedUserId = userId;
	         		_this.loginedNickname = nickname;
	         		_this.loginedIcon = icon;
	         	}else{
	   				_this.login = true;
	   				_this.logined = false;
	         	} 

	         	_this.$http.get('/webapi/pay/websiteSweets').then(function(response) {
	                _this.sweetList = response.data.object;
	                _this.payCash = response.data.object[0].rmb;
	            },function(response) {
	                layer.open({
						content: '网络异常,请检查后重试',
						scrollbar: false
					});
	            });

	         	// 支付宝支付
	         	_this.outTradeNoAli = this.$route.query.out_trade_no;
	         	var productId = _this.isCur + 1;
		       	// var parm = {};
		       	var userId = window.localStorage.getItem('userId');
		       	// parm.userId = userId;
				if(_this.outTradeNoAli != null && _this.outTradeNoAli != ''){
					_this.$http.get('/webapi/pay/rechargeOrder',{params:{userId:userId,outTradeNo:_this.outTradeNoAli}}).then(function(response){

						if(response.data.code == 0){
							if(response.data.object.status == 1){
								_this.paySuccessMask = true;
								window.history.replaceState(null, "充值", "#/recharge");
								console.log('success');

								_this.$http.get('/webapi/pay/myGold').then(function(response) {
			                   		if(response.data.code == 0){
			                   			_this.sweetList = response.data.object.sweetList;
			                   			_this.is_first = response.data.object.is_first;
			                   		}else if(replace.data.code == -5){
			                   			layer.open({
										  content: '参数出错',
										  scrollbar: false
										});
			                   		}else{
			                   			layer.open({
										  content: '服务器出错',
										  scrollbar: false
										});
			                   		}
					                
					            },function(response) {
					                console.log(response);
					            });

							}else{
								console.log('error');
								layer.open({
									content: '支付正在审核',
									scrollbar: false
								});
							}
						}else{
							layer.open({
								content: '服务器出错',
								scrollbar: false
							});
						}
				   },function(response) {
				       layer.open({
							content: '网络异常,请检查后重试',
							scrollbar: false
						});
				   });
				}else{
					console.log('payAlipay');
				}
	         })
	    },
	    methods:{
	    	rechargeLogin:function(){
	    		var _this = this;
	    		_this.loginMask = true;
	    		_this.userId = '';
	    	},
	    	maskClose:function(){
	    		var _this = this;
	    		_this.loginMask = false;
	    	},
	    	payMaskClose:function(){
	    		var _this = this;
	    		_this.payMask = false;
	    		clearInterval(_this.time);
	    	},
	    	paySuccessClose:function(){
	    		var _this = this;
	    		_this.paySuccessMask = false;
	    		window.location.href = '#/recharge';
	    	},
	        switchCash:function(index,value){
	        	var _this = this;
	        	_this.isCur = index;
	        	_this.payCash = value;
       		},
       		 // 确认登录
       		confirmLogin:function(){
       		 	var _this = this;
	            if(_this.userId.length == 7){
	                _this.$http.get('/webapi/pay/userInfo', {params:{userId:_this.userId}}).then(function(response) {
	                	if(response.data.code == 0){
	                		_this.loginMask = false;
		                   	_this.login = false;
		                   	_this.logined = true;
		                   	_this.loginedIcon = response.data.object.icon?response.data.object.icon:'';
		                   	_this.loginedUserId = response.data.object.id;
		                   	_this.loginedNickname = response.data.object.nickname;
		                   	window.localStorage.setItem("userId", _this.loginedUserId);
		                   	window.localStorage.setItem("nickname", _this.loginedNickname);
		                   	window.localStorage.setItem("icon", _this.loginedIcon);

		                   	_this.$http.get('/webapi/pay/myGold').then(function(response) {
		                   		if(response.data.code == 0){
		                   			_this.sweetList = response.data.object.sweetList;
		                   			_this.is_first = response.data.object.is_first;
		                   		}else if(replace.data.code == -5){
		                   			layer.open({
									  content: '参数出错',
									  scrollbar: false
									});
		                   		}else{
		                   			layer.open({
									  content: '服务器出错',
									  scrollbar: false
									});
		                   		}
				                
				            },function(response) {
				                console.log(response);
				            });

	                	}else{
	                		_this.loginErrorClue = '输入有误,请检查后重试';
			                setTimeout(function(){
			                	_this.loginErrorClue = '';
			                },2000);
	                	}
	                }, function(response) {
	                    layer.open({
							content: '网络异常,请检查后重试',
							scrollbar: false
						});
	                });
	            }else if(_this.userId == ''){
	                _this.loginErrorClue = '请输入ID';
	                setTimeout(function(){
	                	_this.loginErrorClue = '';
	                },2000);
	            }else if(_this.userId.length != 7){
	                _this.loginErrorClue = '输入有误,请检查后重试';
	                setTimeout(function(){
	                	_this.loginErrorClue = '';
	                },2000);
	            }
       		 },
       		 //微信支付
       		 payWechat:function(){
       		 	$('.pay-alipay').removeClass('active');
       		 	$('.pay-wechat').addClass('active');
       		 	var _this = this;
       		 	_this.type = 1;
       		 },
       		 //支付宝支付
       		 payAlipay:function(){
       		 	$('.pay-wechat').removeClass('active');
       		 	$('.pay-alipay').addClass('active');
       		 	var _this = this;
       		 	_this.type = 2;
       		 },
       		 //充值支付
       		 rechargePay:function(){
       		 	var _this = this;
       		 	var productId = _this.isCur + 1;
       		 	var parm = {};
       		 	var userId = window.localStorage.getItem('userId');
       		 	parm.userId = userId;
       		 	parm.productId = productId;
       		 	if(parm.userId){
       		 		if(_this.type == 1){
	       		 		_this.$http.get('/webapi/pay/weixinNativeRecharge', {params:parm}).then(function(response) {
	       		 			if(response.data.code == 0){
			                   	_this.payMask = true;
			                   	_this.payMaskCode = response.data.object.visitUrl;
			                   	_this.outTradeNo = response.data.object.outTradeNo;

			                   	 //进行轮询
			                   	 var parms = {};
			                   	 parms.userId = userId;
			                   	 parms.outTradeNo = _this.outTradeNo;
			                   	 _this.time = setInterval(function(){
			                   	 	_this.$http.get('/webapi/pay/rechargeOrder',{params:parms}).then(function(response){
			                   	 		if(response.data.code == 0){
			                   	 			if(response.data.object.status == 1){
			                   	 				clearInterval(_this.time);
			                   	 				_this.paySuccessMask = true;
			                   	 				_this.payMask = false;
			                   	 				console.log('success');

							                   	_this.$http.get('/webapi/pay/myGold').then(function(response) {
							                   		if(response.data.code == 0){
							                   			_this.sweetList = response.data.object.sweetList;
							                   			_this.is_first = response.data.object.is_first;
							                   		}else if(replace.data.code == -5){
							                   			layer.open({
														  content: '参数出错',
														  scrollbar: false
														});
							                   		}else{
							                   			layer.open({
														  content: '服务器出错',
														  scrollbar: false
														});
							                   		}
									                
									            },function(response) {
									                console.log(response);
									            });

			                   	 			}else{
			                   	 				console.log('error');
			                   	 			}
			                   	 		}else{
			                   	 			layer.open({
												content: '服务器出错',
												scrollbar: false
											});
											clearInterval(_this.time);
			                   	 		}
								    },function(response) {
								        layer.open({
											content: '网络异常,请检查后重试',
											scrollbar: false
										});
										clearInterval(_this.time);
							        });
			                   	 },5000);
			                   	 setTimeout(function(){
			                   	 	_this.payMask = false;
			                   	 	clearInterval(_this.time);
			                   	 },300000);
	       		 			}else{
	       		 				layer.open({
									content: '服务器出错',
									scrollbar: false
								});
	       		 			}
		                }, function(response) {
		                    layer.open({
								content: '网络异常,请检查后重试',
								scrollbar: false
							});
		                });
					}else if(_this.type == 2){
						var _this = this;
		       		 	var productId = _this.isCur + 1;
		       		 	var userId = window.localStorage.getItem('userId');
		       		 	if(userId){
		       		 		window.location.href = '/webapi/pay/websiteAlipay?userId='+userId+'&productId='+productId;
		       		 	}else{
		       		 		layer.open({
								content: '请登录',
								scrollbar: false
							});
		       		 	}
		       		}
       		 	}else{
       		 		layer.open({
						content: '请登录',
						scrollbar: false
					});
       		 	}
       		 },
       		 //切换账号
       		 switchCount:function(){
       		 	var _this = this;
       		 	_this.login = true;				
       		 	_this.logined = false;
				window.localStorage.removeItem('icon');
				window.localStorage.removeItem('userId');
				window.localStorage.removeItem('nickname');
				window.location.href = '#/recharge';
       		 },
	    },
	    computed: {

	    },
	    components: {
	        rainbowHead,
	        rainbowFoot
	    },   
    }
</script>
<style>

	/* 两列右侧自适应布局 */
	.g-bd1{margin:0 0 6px;}
	.g-sd1{position:relative;float:left;width:64px;height:64px;margin-right:-64px;}
	.g-sd1 img{width: 100%;height: 100%;border-radius: 50%;}
	.g-mn1{position:relative;float:right;width:100%;margin-top: 8px;}
	.g-mn1c{margin-left:70px;}
	.recharge-login{
		cursor: pointer;
	}

	.g-recharge{
		width: 100%;
		height:100%;
		margin: 0 auto;
	}
	.m-recharge{
		width: 1245px;
		margin: 0 auto;
		padding: 37px 60px 73px;
		box-sizing: border-box;
	}
	.recharge-tab li{
		display: inline-block;
		width: 139px;
		height: 62px;
		line-height: 62px;
		text-align: center;
		border-radius: 6px 6px 0 0;
		letter-spacing: -0.48px;
	}
	.recharge-box{
		min-height:743px;
		padding: 0 54px;
	}
	.m-login{
		height: 122px;
		padding: 32px 0 26px;
		box-sizing: border-box;
	}
	.u-login-clue{
		min-width: 118px;
		height: 28px;
		line-height: 28px;
	}
	.u-login-text{
		min-width: 103px;
		height: 21px;
		line-height: 21px;
		margin-left: 3px;
	}
	.u-login-text span{
		margin-left: 3px;
	}
	.u-logined-nickName{
		min-width: 70px;
		height: 28px;
		line-height: 28px;
		margin-left: 11px;
		color:#818181;
	}
	.u-logined-account{
		min-width: 86px;
		height: 21px;
		line-height: 21px;
		margin-left: 11px;
	}
	.u-logined-switchCount{
		position: absolute;
		top:0;
		right: 0;
		min-width: 80px;
		height: 49px;
		line-height: 49px;
		cursor: pointer;
	}
	.u-recharge-item{
		position: relative;
		width: 156px;
		height: 163px;
		margin: 37px 45px  0 0;
		padding: 0 16px;
		text-align: center;
		box-sizing: border-box;
		cursor: pointer;
	}
	.u-recharge-item.active{
		border: 2px solid #FF3366;
		background: url(../../static/images/rechargeActive.png) no-repeat;
		background-size: 38px 38px;
		background-position: 100% 100%;
	}
	.first-award{
		position: absolute;
		top: -8px;
		left:-8px;
		width: 106px;
		height: 25px;
		line-height: 20px;
		text-align: center;
		background: url('../../static/images/firstAward.png') no-repeat;
		background-size: 106px 25px;
	}
	.m-recharge-item{
		margin: 38px 0 56px 0;
	}
	.recharge-item-candy{
		width: 100%;
		height: 110px;
		line-height: 136px;
	}
	.recharge-item-cash{
		width: 100%;
		height: 50px;
		line-height: 50px;
	}
	.recharge-clue{
		position: absolute;
		right: 0;
		bottom:0;
		width: 38px;
		height: 38px;
		background: url(../../static/images/rechargeActive.png) no-repeat;
		background-size: 38px 38px;
	}
	.m-pay-style{
		width: 100%;
		height: 217px;
	}
	.pay-style-text{
		min-width: 106px;
		height: 25px;
		line-height: 25px;
	}
	.u-pay-style{
		width: 100%;
		height: 137px;
		padding: 39px 0 44px;
	}
	.pay-wechat,.pay-alipay{
		float: left;
		width: 210px;
		height: 54px;
		margin-right: 24px;	
		cursor: pointer;
	}
	.pay-wechat{
		background: url(../../static/images/wechat.png) no-repeat;
		background-size: 210px 54px;
	}
	.pay-wechat.active{
		background: url(../../static/images/wechatActive.png) no-repeat;
	}
	.pay-alipay{
		background: url(../../static/images/alipay.png) no-repeat;
		background-size: 210px 54px;
	}
	.pay-alipay.active{
		background: url(../../static/images/alipayActive.png) no-repeat;
	}
	.m-pay-cash{
		position: relative;
		width: 100%;
		height: 137px;
		line-height: 137px;
	}
	.u-pay-cash{
		margin:0 7px;
	}
	.pay-mask-cash{
		margin-left: 14px;
	}
	.confirm-pay{
		position: absolute;
		right: 52px;
		top: 43px;
		width: 147px;
		height: 42px;
		line-height: 42px;
		border-radius: 6px;
	}

	.g-idLogin-mask,.g-pay-mask,.g-pay-success{
		background: rgba(0,0,0,0.5);
		width: 100%;
		height:100%;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		text-align: center;
		cursor: pointer;
		z-index: 999;
	}
	.m-idLogin-container{
		padding: 87px 100px 124px;
		cursor: pointer;
	}
	.m-idLogin-container,.m-pay-mask{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		width: 586px;
		min-height: 570px;
		border-radius: 8px;
		box-sizing: border-box;
	}
	.u-mask-close{
		position: absolute;
		top:15px;
		right: 15px;
		width: 26px;
		height: 26px;
		background: url(../../static/images/closed.png) no-repeat;
		background-size: 26px 26px;
	}
	
	.u-idLogin-ipt{
		width: 100%;
		height: 50px;
		line-height: 50px;
		margin:109px 0 8px;
		border:none;
		border-bottom: 2px solid #e6e6e6;
	}
	.u-idlogin-error{
		width: 100%;
		height: 30px;
		margin-bottom:60px;
	}
	.u-idLogin-btn{
		width: 386px;
		height: 64px;
		margin: 0 auto;
		border-radius: 8px;
	}
	/*支付弹框*/
	.pay-cash{
		width: 100%;
		height: 45px;
		line-height: 45px;
		margin-top:69px; 
	}
	.m-pay-clue{
		width: 100%;
		height: 28px;
		line-height: 28px;
		margin: 6px auto 16px;
	}
	.m-pay-mask img{
		width: 315px;
		height: 315px;
	}
	.code-pay-clue{
		margin-top:27px;
	}
	/*支付成功*/
	.m-pay-success{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		width: 440px;
		padding-top:120px;
		min-height: 400px;
		border-radius: 8px;
		text-align: center;
		box-sizing: border-box;
	}
	.pay-success-icon{
		width: 100px;
		height: 100px;
		margin: 0 auto 14px;
		background: url(../../static/images/paySuccess.png) no-repeat;
		background-size: 100px 100px;
	}
</style>