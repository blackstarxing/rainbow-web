<template>
	<div class="landing">
		<rainbow-head class="hd-landing"></rainbow-head>
		<div class="g-bd">
			<div class="m-download">
				<div class="m-android dl-btn">
					<div class="qr-code"></div>
					<img src="../../static/images/android_dl.png" alt="">
				</div>
				<div class="m-ios dl-btn">
					<img src="../../static/images/ios_dl.png" alt="">
					<div class="qr-code"></div>
				</div>				
			</div>
		</div>
    	<rainbow-foot class="ft-landing"></rainbow-foot>
	</div>
	
</template>
<script>
	import rainbowHead from '../components/rainbowHead.vue'
    import rainbowFoot from '../components/rainbowFoot.vue'
    export default {
        data () {
            return {
                
            }
        },
        mounted: function () {
            $('.dl-btn').hover(function(){
            	$(this).find('.qr-code').stop(true).fadeIn(300);
            },function(){
            	$(this).find('.qr-code').stop(true).fadeOut(300);
            })
        },
        methods:{
            
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
	.landing{
		height: 100%;
		background: url('../../static/images/bg.png') top center no-repeat;
		background-size:cover;
	}
	.m-download{
		position: absolute;
		left: 50%;
		bottom: 150px;
		width: 408px;
		transform: translate(-50%,0);
	}
	.m-download img{
		margin:0 18px;
	}
	.dl-btn{
		position: relative;
		width: 204px;
		display: inline-block;
		float: left;
		cursor: pointer;
	}
	.qr-code{
		position: absolute;
		top:50%;
		transform: translate(0,-50%);
		width: 155px;
		height: 155px;
		background: url('../../static/images/qrcode.png') top center no-repeat;
		display: none;
	}
	.m-android .qr-code{		
		left:-160px;
	}
	.m-ios .qr-code{
		right:-160px;
	}
</style>