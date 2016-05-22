function parseQuery(qstr) {
	var q = {};
	var a = qstr.substr(1).split('&');
	for (var i = 0; i < a.length; i++) {
		var b = a[i].split('=');
		q[b[0]] = b[1] || '';
	}
	return q;
}
function loadURL(url, no) {
	var iframe = document.getElementsByTagName('iframe')[no];
	iframe.url = url;
	var script = document.createElement('script');
	script.src = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20data.headers%20where%20url%3D%22' + encodeURIComponent(url) + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=getData' + no;
	document.body.appendChild(script);
	setTimeout(function () {
		var spinner = '<style>@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }</style><div style="border: 6px solid #eee; border-top-color: #999; border-radius: 50%; position: absolute; top: 50%; left: 50%; margin: -20px 0 0 -20px; height: 40px; width: 40px; animation: rotate 1s infinite linear;"></div>';
		if ('srcdoc' in iframe)
			iframe.srcdoc = spinner;
		else
			iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(spinner);
	}, 100);
}
function getData0(data) {
	getData(data, 0);
}
function getData1(data) {
	getData(data, 1);
}
function getData2(data) {
	getData(data, 2);
}
function getData(data, no) {
	if (data && data.query && data.query.results && data.query.results.resources && data.query.results.resources.content && data.query.results.resources.status == 200)
		loadHTML(data.query.results.resources.content, no);
	else if (data && data.error && data.error.description)
		loadHTML(data.error.description, no);
	else {
		loadHTML('Error loading URL. <a href="javascript:parent.loadURL(' + document.getElementsByTagName('iframe')[no].url + ', ' + no + ');">Try again</a>', no);
	}
}
function loadHTML(html, no) {
	var iframe = document.getElementsByTagName('iframe')[no];
	html = html.replace(/<head>/i, '<head><base href="' + iframe.url + '"><style>.topinfo { display: none; }</style><scr' + 'ipt>document.addEventListener("click", function(e) { if(e.target && e.target.nodeName == "A") { window.url = e.target.href; } }); window.addEventListener("unload", function(e) { parent.loadURL(window.url, ' + no + '); });</scr' + 'ipt>');
	if ('srcdoc' in iframe)
		iframe.srcdoc = html;
	else
		iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
}
