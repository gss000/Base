import React from 'react';

export default class TodoList extends React.PureComponent {
	render() {
		const { list = [] } = this.props;
		return (
			<section>
				<ul className="todoList">
					{list.length > 0
						? list.map(item => <li className="todo-item">{item}</li>)
						: '暂无'}
				</ul>
			</section>
		);
	}
}
