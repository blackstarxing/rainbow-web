<template>
    <div class="g-recharge bgc-grey">
        <rainbow-head></rainbow-head>
        <div class="m-recharge">
        	 <ul class="recharge-tab">
        		<li class="bgc-wt fs-20 fc-81">彩虹糖充值</li>
       		 </ul>
       		 <div class="recharge-box bgc-wt">
       		    <!-- 登录 -->
       		 	<div class="m-login bdc-btm">
					<div class="g-bd1 f-cb">
					    <div class="g-sd1"></div>
					    <div class="g-mn1">
					        <div class="g-mn1c" v-show='login'>
					            <span class="u-login-clue fs-20 fc-b6">你还没有登录</span>
					            <div class="u-login-text fs-15 fc-b9">登录后即可充值<span class="recharge-login fc-login" @click='rechargeLogin'>登录</span></div>
					        </div>
					        <div class="g-mn1c" v-show='logined'>
					            <span class="u-login-clue fs-20 fc-b6">你还没有登录</span>
					            <div class="u-login-text fs-15 fc-b9">登录后即可充值<span class="recharge-login fc-login" @click='rechargeLogin'>登录</span></div>
					        </div>
					    </div>
					</div>
       		 	</div>
       		 	<!-- 充值金额 -->
       		 	<div class="m-recharge-item f-cb">
       		 		<div class="fs-18 fc-b6">选择充值金额</div>
       		 		<div v-if='is_first == 1'>
       		 			<div v-for='(valuelist,index) in sweetList' :id='valuelist.id' :class="{active:isCur==index}" class="u-recharge-item bdc-b5 f-fl" @click='switchCash(index,valuelist.first_charge_value)'>
	       		 			<div class="first-award fc-wt fs-13">首充奖励600</div>
	       		 			<div class="recharge-item-candy bdc-grey"><span class="fc-bk fs-24">{{valuelist.candy}}</span>彩虹糖</div>
	       		 			<div class="recharge-item-cash fs-20 fc-bk">￥{{valuelist.cash}}元</div>
	       		 			<div v-show='rechargeClue' class="recharge-clue"></div>
       		 			</div>
       		 		</div>
       		 		<div  v-else-if='is_first != 1'>
       		 			<div v-for='(valuelist,index) in sweetList' :id='valuelist.id' :class="{active:isCur==index}" class="u-recharge-item bdc-b5 f-fl" @click='switchCash(index,valuelist.first_charge_value)'>
	       		 			<div class="recharge-item-candy bdc-grey"><span class="fc-bk fs-24">600</span>彩虹糖</div>
	       		 			<div class="recharge-item-cash fs-20 fc-bk">￥6元</div>
	       		 			<div class="choose"></div>
       		 			</div>
       		 		</div>
       		 	</div>
       		 	<!-- 选择支付方式 -->
       		 	<div class="m-pay-style bdc-grey">
       		 		<div class="pay-style-text fs-18 fc-b6">选择支付方式</div>
       		 		<div class="u-pay-style">
       		 			<div class="pay-wechat"></div>
       		 			<div class="pay-alipay"></div>
       		 		</div>
       		 	</div>
       		 	<!-- 支付金额 -->
       		 	<div class="m-pay-cash fs-18 fc-81 ">
       		 		<span>支付金额:</span><span class="fc-f36 fs-30 u-pay-cash">6</span><span>元</span>
       		 		<button class="confirm-pay bgc-confirm fs-18 fc-wt">确认支付</button>
       		 	</div>
       		 </div>
        </div>
        <rainbow-foot></rainbow-foot>
            <!-- 彩虹ID登录 -->
		<div class="g-idLogin-mask" v-show='loginMask'>
			<div class="m-idLogin-container bgc-wt">
				<div class="u-mask-close" @click='maskClose'></div>
				<div class=" fc-idLogin fs-30">彩虹ID登录</div>
				<input class="u-idLogin-ipt fc-b3 fs-24" type="number" placeholder="请输入彩虹id" onkeyup="this.value=this.value.replace(/\D/g,'')" oninput="if(value.length>7)value=value.slice(0,7);" v-model='userId'>
				<div class="u-idlogin-error fs-22 fc-login">{{loginErrorClue}}</div>
				<button class="u-idLogin-btn fs-32 fc-wt bgc-btn" @click='confirmLogin'>确认</button>
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
	            sweetList:[
	            	{"candy":600,"cash":6,"id":1},
	            	{"candy":3000,"cash":30,"id":2},
	            	{"candy":8800,"cash":88,"id":3},
	            	{"candy":18800,"cash":188,"id":4},
	            	{"candy":28800,"cash":288,"id":5},
	            	{"candy":69800,"cash":698,"id":6},
	            	{"candy":777777,"cash":10000,"id":7}
	            ],
	            firstAward:600,
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
	        }
	    },
	    mounted: function () {
	        
	    },
	    methods:{
	    	rechargeLogin:function(){
	    		var _this = this;
	    		_this.loginMask = true;
	    	},
	    	maskClose:function(){
	    		var _this = this;
	    		_this.loginMask = false;
	    	},
	        switchCash:function(index,value){
	        	console.log(index);
	        	var _this = this;
	        	_this.isCur = index;
	        	_this.firsrAward = value;
	        	// _this.rechargeClue = true;	
       		 },
       		 // 确认登录
       		 confirmLogin:function(){
       		 	var _this = this;
	            if(_this.userId.length == 7){
	            	console.log('go go go');
	                // $.ajax({
	                //   url: '/webapi/pay/userInfo?userId='+_this.userId,
	                //   type: 'get',
	                //   dataType:'json',
	                //   success: function(data) {
	                //     if(data.code == 0){
	                //        //userID缓存
	                //        window.localStorage.setItem("userId", _this.userId);
	                //        window.location.href = '/Recharge/rainbowCandy';
	                //     }else{
	                //       layer.open({
	                //         content: 'id输入有误,请重新输入'
	                //         ,skin: 'msg'
	                //         ,time: 2 //2秒后自动关闭
	                //       });
	                //     }
	                //   },  
	                //   error: function() {
	                //       layer.open({
	                //         content: '网络异常，请刷新重试',
	                //         btn: '好的',
	                //         shadeClose: false,
	                //       });
	                //   }
	                // });
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
	.g-sd1{position:relative;float:left;width:64px;height:64px;margin-right:-64px;background: url('../../static/images/bg.png') no-repeat;background-size: 64px 64px;border-radius: 50%;}
	.g-mn1{float:right;width:100%;margin-top: 8px;}
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
		padding: 37px 60px 73px;
		box-sizing: border-box;
	}
	.recharge-tab li{
		width: 139px;
		height: 62px;
		line-height: 62px;
		text-align: center;
		border-radius: 6px 6px 0 0;
		letter-spacing: -0.48px;
	}
	.recharge-box{
		min-height:743px;
		padding: 0 17px 0 43px;
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
	.u-recharge-item{
		position: relative;
		width: 156px;
		height: 163px;
		margin: 37px 48px  0 0;
		padding: 0 16px;
		text-align: center;
		font-size: 0;
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
		line-height: 110px;
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
	}
	.pay-wechat{
		background: url(../../static/images/wechat.png) no-repeat;
		background-size: 210px 54px;
	}
	.pay-alipay{
		background: url(../../static/images/alipay.png) no-repeat;
		background-size: 210px 54px;
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
	.confirm-pay{
		position: absolute;
		right: 52px;
		top: 43px;
		width: 147px;
		height: 42px;
		line-height: 42px;
		border-radius: 6px;
	}

	.g-idLogin-mask{
		/*图形验证码弹框*/
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
		z-index: 999;
	}
	.m-idLogin-container{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		width: 586px;
		min-height: 570px;
		border-radius: 8px;
		padding: 87px 100px 124px;
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
</style>