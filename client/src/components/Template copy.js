const [ template2, setTemplate2 ] = useState('');

const [ selected2, setSelected2 ] = useState('60');
const [ status2, setStatus2 ] = useState(0);
function myFunction2() {
	tempObj.topic = 2;
	tempObj.time = selected2;
	tempObj.status = status2;

	if (tempObj.time) {
		convertData({
			text: template2
		});
	}
	var x = document.getElementById('snackbar');
	x.className = 'show';
	setTimeout(function() {
		x.className = x.className.replace('show', '');
	}, 2000);
}

const handleTemplate2 = useCallback((newValue) => setTemplate2(newValue), []);

const handleSelectChange2 = useCallback((value) => setSelected2(value), []);
const handleStatus2 = useCallback((value) => setStatus2(value), []);

const option2 = [
	{ label: '60 minutes later', value: '60' },
	{ label: '6 hours later', value: '360' },
	{ label: '10 hours later', value: '600' },
	{ label: '12 hours later', value: '720' }
];
const statusOption2 = [ { label: 'Enabled', value: 1 }, { label: 'Disabled', value: 0 } ];
