/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { IconButton } from '@wordpress/components';

/**
 * Internal dependencies
 */
import URLInput from './';

class URLInputButton extends Component {
	constructor() {
		super( ...arguments );
		this.toggle = this.toggle.bind( this );
		this.submitLink = this.submitLink.bind( this );
		this.state = {
			expanded: false,
		};
	}

	toggle() {
		this.setState( { expanded: ! this.state.expanded } );
	}

	submitLink( event ) {
		event.preventDefault();
		this.toggle();
	}

	render() {
		const { url, onChange } = this.props;
		const { expanded } = this.state;
		const buttonLabel = url ? __( 'Edit Link' ) : __( 'Insert Link' );

		return (
			<div className="editor-url-input__button block-editor-url-input__button">
				<IconButton
					icon="admin-links"
					label={ buttonLabel }
					onClick={ this.toggle }
					className={ classnames( 'components-toolbar__control', {
						'is-active': url,
					} ) }
				/>
				{ expanded &&
					<URLPopover.LinkEditor
						className="editor-format-toolbar__link-container-content block-editor-format-toolbar__link-container-content"
						value={ url }
						onChangeInputValue={ onChange }
						onKeyDown={ this.onKeyDown }
						onKeyPress={ stopKeyPropagation }
						submitLink={ this.submitLink }
						autocompleteRef={ this.autocompleteRef }
					/>
				}
			</div>
		);
	}
}

/**
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/url-input/README.md
 */
export default URLInputButton;
