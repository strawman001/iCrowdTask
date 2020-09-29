import React from 'react';
import ReactEcharts from 'echarts-for-react';

class Chart extends React.Component{
    constructor(props){
        super();
        
    }

    componentDidUpdate() {
        console.log(this.echarts_react);
        const instance =  this.echarts_react.getEchartsInstance()
        if (instance) {
          instance.setOption(this.props.option);
        }
    }


    render(){
        return(
            <React.Fragment>
                <ReactEcharts 
                 ref={(e) => { this.echarts_react = e; }}
                 option={this.props.option}
                 style={{height: '350px', width: '730px'}}
                 />
            </React.Fragment>
        );
    }
}

export default Chart;