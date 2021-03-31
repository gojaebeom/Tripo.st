import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Description1, Description2, Description3 } from '../../utils/Tos';

class Tos extends React.Component{
    constructor(){
        super();
        this.state = {
            value : 0,
        }
    }

    componentDidMount(){
        if(this.getQuerystring('type') == '1'){
            this.setState({value : 0});
        }else if(this.getQuerystring('type') == '2'){
            this.setState({value : 1});
        }
        else if(this.getQuerystring('type') == '3'){
            this.setState({value : 2});
        }
    }

    getQuerystring(key){
        return new URLSearchParams(location.search).get(key);
    }

    handleChange(e){
        console.log(e.currentTarget.id);
        if(e.currentTarget.id == 'tos1') this.setState({value : 0});
        else if(e.currentTarget.id == 'tos2') this.setState({value : 1});
        else if(e.currentTarget.id == 'tos3') this.setState({value : 2});
    }

    render(){
        return(
            <React.Fragment>
                <div className="tos-v2 layout_grid">
                    <div className="tos-v2-top">
                        <Tabs
                            value={this.state.value}
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="disabled tabs example"
                        >
                            <Tab label="이용약관" id="tos1" onClick={this.handleChange.bind(this)}/>
                            <Tab label="개인정보 처리방침" id="tos2" onClick={this.handleChange.bind(this)} />
                            <Tab label="Privacy policy(EN)" id="tos3" onClick={this.handleChange.bind(this)} />
                        </Tabs>
                    </div>
                    <div className="tos-v2-bottom">
                        { this.state.value == 0 && <Description2 /> }
                        { this.state.value == 1 && <Description1 /> }
                        { this.state.value == 2 && <Description3 /> }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Tos;