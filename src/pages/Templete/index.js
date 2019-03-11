// import styles from './index.css';
// import { formatMessage } from 'umi-plugin-locale';
import { observer , inject} from "mobx-react";
import Store from "../../stores/Store";
import React , { Component }  from 'react';
import { Button } from 'antd';

const s = new Store();

const IndexApp = observer(class IndexApp extends Component{

	constructor(props){
		super(props);
	}

	// 点击触发事件
	handleClick = () => {
		s.tick();
	}

	componentDidMount = () => {
		
	}

	componentWillReact() {
		
        console.log("I will re-render, since the todo has changed!");
    }

	handleAsync = () => {
		s.fetchProjects({
			payload:{
				tel:'13666335555'
			}
		})
	}

    render () {
        return (
          	<div>
			  	<div>123{s.current}</div>
			  	<div>{s.elapsedTime}</div>
			  	<div>{s.state}</div>
			  	<div>{s.githubProjects}</div>
				<Button type="primary" onClick={this.handleClick}>惦记我</Button>
				<Button type="primary" onClick={this.handleAsync}>异步触发</Button>
				{
					s.msg?
					<h2>{s.msg.msg}</h2>
					:
					<h2>我一直在等待</h2>
				}
			</div>
        )
    }
})
export default IndexApp;
