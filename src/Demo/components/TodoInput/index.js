import React from 'react';
import './index.less';

export default class TodoInput extends React.PureComponent {
	handleAdd = () => {
		this.props.handleAdd && this.props.handleAdd(this.input.value);
	};

	handleCancel = () => {
		this.props.handleCancel && this.props.handleCancel();
	};

	render() {
		return (
			<section className="todoInput">
				<input type="text" className="input-text" ref={node => (this.input = node)} />
				<button className="input-btn" onClick={this.handleAdd}>
					添加
				</button>
				<button className="input-btn" onClick={this.handleCancel}>
					清除
				</button>
			</section>
		);
	}
}
