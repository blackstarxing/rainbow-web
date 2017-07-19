<template>
	<div class="landing">
		<rainbow-head class="hd-landing"></rainbow-head>
		<div class="g-bd">
			<div class="m-download">
				<img src="../../static/images/android_dl.png" alt="">
				<img src="../../static/images/ios_dl.png" alt="">
			</div>
		</div>
    	<rainbow-foot></rainbow-foot>
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
</style>