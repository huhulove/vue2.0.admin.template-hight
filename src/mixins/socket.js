export default {
	data() {
		return {
			websock: null
		};
	},
	components: {},
	watch: {},
	computed: {},
	destroyed() {
		this.websock.close(); // 离开路由之后断开websocket连接
	},
	mounted() {
		this.initWebSocket();
	},
	methods: {
		initWebSocket() {
			// 初始化weosocket
			const wsuri = 'ws://192.168.1.210:6700/WebServer';
			// const wsuri = 'ws://192.168.1.64:7681/?version=0.1&cipherSuites=0&sessionID=82c9b43db52c2b775390a57a77d09d36b9ba0eae0a1cd74effc8936fa9a94474';
			this.websock = new WebSocket(wsuri);
			this.websock.onmessage = this.websocketonmessage;
			this.websock.onopen = this.websocketonopen;
			this.websock.onerror = this.websocketonerror;
			this.websock.onclose = this.websocketclose;
		},
		websocketonopen() {
			// 连接建立之后执行send方法发送数据
			console.log('连接建立');
			this.websocketsend();
		},
		websocketonerror() {
			console.log('连接建立失败重连');
			// 连接建立失败重连
			this.initWebSocket();
		},
		websocketonmessage(e) {
			// 数据接收
			const redata = JSON.parse(e.data);
			console.log('接收到的数据');
			console.log(redata);
			console.log('接收到的数据');
		},
		websocketsend(Data) {
			// 数据发送
			this.websock.send(Data);
		},
		websocketclose(e) {
			// 关闭
			console.log('断开连接', e);
		}
	}
};
