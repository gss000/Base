import React from 'react';
import TodoList from '../../components/TodoList/index';
import TodoInput from '../../components/TodoInput/index';
import './main.less';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todoList: [],
		};
	}

	componentDidMount() {
		if (0) {
			console.log(0);
		} else if (1) {
			console.log(1);
		}

		let a;
		if (a) {
			console.log('undefined');
		} else {
			console.log('不存在值');
		}

		if (1) {
			var b = 'bbbb';
			const c = 'cccc';
			let d = 'dddd';
		}

		console.log(b);
		console.log(c);
		console.log(d);
	}

	handleClick = () => {
		console.log('111');
	};

	handleAdd = value => {
		console.log(value);
		if (value) {
			this.setState(preState => ({
				todoList: preState.todoList.concat(value),
			}));
		}
	};

	handleCancel = () => {
		this.setState({
			todoList: [],
		});
	};

	render() {
		const { todoList } = this.state;
		console.warn(todoList);
		return (
			<section className="MainPage">
				<div className="head">totdo list</div>
				<TodoInput handleAdd={this.handleAdd} handleCancel={this.handleCancel} />
				<TodoList list={todoList} />
			</section>
		);
	}
}
