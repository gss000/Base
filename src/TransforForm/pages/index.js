import React from 'react';
import UploadLogo from './uploadLogo.png';
import './index.less';

export default class TransforForm extends React.Component {
	handleChange = e => {
		console.info(e.files);
	};

	render() {
		const inputProps = {
			type: 'file',
			className: 'upload-input',
			onChange: this.handleChange,
		};

		return (
			<section className="transforForm">
				<div className="form-wrap">
					<div className="upload-wrap">
						<input {...inputProps} />
						<div className="upload-show">
							<img src={UploadLogo} alt="uploadLogo" className="upload-logo" />
							<div className="upload-text">Upload your file</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
