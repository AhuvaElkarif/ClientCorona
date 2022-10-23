import React, { useEffect, useState } from 'react';
import { getLastCoronaPatients } from '../../store/actions/CoronaPatientAction';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CoronaPatientsDiagram = () => {
	const [arr, setArr] = useState([]);
	useEffect(() => {
		getLastCoronaPatients()
			.then(x => setArr(x.data))
			.catch(err => alert("קרתה תקלה זמנית"))
	}, []);

	const options = {
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "חולי קורונה בחודש האחרון"
		},
		axisX: {
			valueFormatString: "DD MMM",
			crosshair: {
				enabled: true,
				snapToDataPoint: true
			}
		},
		axisY: {
			title: "מספר חולים פעילים",
			crosshair: {
				enabled: true,
				snapToDataPoint: true,

			}
		},
		data: [{
			type: "area",
			xValueFormatString: "DD MMM",
			dataPoints: arr
		}]
	}
	return (
		<div>
			<CanvasJSChart options={options}
			/>
		</div >
	);
}

export default CoronaPatientsDiagram;   