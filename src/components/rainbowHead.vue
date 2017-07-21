<template>
	<div class="g-hd">
		<div class="g-wrap f-cb">
			<div class="f-fl"></div>
			<div class="f-fr">
				<router-link tag="span" to="/index" exact>首页</router-link>
				<span class="u-line"></span>
            	<router-link tag="span" to="/recharge">账户充值</router-link>			
			</div>
		</div>
	</div>
</template>
<style>
	.g-hd{
		padding:13px 0;
		height: 54px;
		background: rgba(255,255,255,1);
	}
	.g-hd .f-fl{
		background: url(../../static/images/logo.png) no-repeat;
		width: 185px;
		height: 54px;
	}
	.g-hd span{
		display: inline-block;
		/*float: left;*/
		font-size: 18px;
		line-height: 54px;
		margin:0 36px;
		color:#666;
		cursor: pointer;
		vertical-align: middle;
	}	
	.hd-landing{
		background: rgba(255,255,255,0.15);
	}
	.hd-landing span{
		color:#fff;
	}
	.hd-landing .f-fl{
		background: url(../../static/images/logo_index.png) no-repeat;
	}
	.g-hd .u-line{
		margin:13.5px 0;
		width: 2px;
		height: 27px;
		background: #979797;
	}
</style>