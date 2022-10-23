import React, { useEffect, useState } from 'react';
import {getLastCoronaPatients} from '../../store/actions/CoronaPatientAction';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CoronaPatientsDiagram = () => {
	const [arr,setArr] = useState([]);
	useEffect(()=>{
        const y = new Date().getFullYear();
        const m = new Date().getMonth()-1;

	    getLastCoronaPatients()
		.then(x=> setArr(x.data))
		.catch(err=> alert("קרתה תקלה זמנית"))
        arr.forEach(element => {
            element.x = new Date(y,m,element.x)
        });
		console.log(arr);
	},[]);

	
	const options = {
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "חולים פעילים בחודש האחרון"
		},
		axisX: {
			valueFormatString: "DD MMM",
			crosshair: {
				enabled: true,
				snapToDataPoint: true
			}
		},
		axisY: {
			title: "מספר חולים",
			crosshair: {
				enabled: true,
				snapToDataPoint: true,
			}
		},
		data: [{
			type: "area",
			xValueFormatString: "DD MMM",
			dataPoints: arr
				// { x: new Date(date.setDate(date.getDate() + 1)), y: 185.3 },
		}]
	}	
		return(
		<div>
			{console.log(options.data)}
		<CanvasJSChart options={options}
		/* onRef={ref => this.chart = ref} */
		/>
	{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/ }
		</div >
		);
}

export default CoronaPatientsDiagram;   