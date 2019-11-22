import React from 'react';
import { TextField } from '@shopify/polaris';

export default function DefaultTextField(props) {
	return (
		<TextField
			label={props.label}
			value={props.value}
			onChange={props.onChange}
			type={props.type}
			maxLength={props.maxLength}
			name={props.name}
			showCharacterCount
		/>
	);
}
