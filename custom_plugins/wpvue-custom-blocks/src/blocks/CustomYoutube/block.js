/**
 * BLOCK: Review Details
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

/**
 * External dependencies
 */
const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks; 
const { InspectorControls } = wp.blockEditor

import { Fragment } from '@wordpress/element';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	Placeholder,
	RangeControl,
	TextControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'wpvue/custom-youtube', { 
	title: __( 'Custom Youtube', 'wpvcb-blocks' ), 
	icon: 'format-video', 
	category: 'CasinoPages', 
	attributes: {
		block_id: {
         type: 'string',
        },
		youtube_url: {
			type: 'string',
			default: ''
		},
		thumbnail_type: {
			type: 'string',
			default: 'ASC'
		},
		thumbnail_alt: {
			type: 'string',
			default: ''
		},
		disable_fullscreen: {
			type: 'boolean',
			default: false
		},
		enable_related: {
			type: 'boolean',
			default: false
		},
	},
	example: {},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		const { attributes, setAttributes } = props;
		const {
			youtube_url,
			thumbnail_type,
			thumbnail_alt,
			disable_fullscreen,
			enable_related,
			block_id,
		} = attributes;

		const onChangeBlockId = function onChangeBlockId(content) {
           props.setAttributes({block_id: content});
        }

		return [
			<InspectorControls>
                <PanelBody title="Block ID">                       
                    <TextControl
                    label={__('Block ID')}
                    onChange={onChangeBlockId} 
                    value={block_id}
                    placeholder={__('Unique ID of the block')}
                    />
                </PanelBody>               
            </InspectorControls>,
			<div className="wpvcb-block__selection wpvcb-block-custom-youtube__selection">
				<div className="block-header">Custom YouTube</div>
				<TextControl
					placeholder={ __( 'Add Youtube video url', 'wpvcb-blocks' ) }
					label={ __( 'Youtube Url', 'wpvcb-blocks' ) }
					value={ youtube_url }
					onChange={ ( value ) => {
						setAttributes( { youtube_url: value } );
					} }
				/>
				<SelectControl
					label={ __( 'Video Thumbnail', 'wpvcb-blocks' ) }
					value={ thumbnail_type }
					options={ [
						{ label: 'Max Resolution', value: 'maxres' },
						{ label: 'Default', value: 'default' },
						{ label: 'HQ Default', value: 'high' },
						{ label: 'Medium Default', value: 'medium' },
						{ label: 'Standard Default', value: 'standard' },
					] }
					onChange={ ( value ) =>
						setAttributes( { thumbnail_type: value } )
					}
				/>
				<TextControl
					placeholder={ __( 'Thumbnail Alt Text', 'wpvcb-blocks' ) }
					label={ __( 'Thumbnail Alt Text', 'wpvcb-blocks' ) }
					value={ thumbnail_alt }
					onChange={ ( value ) => {
						setAttributes( { thumbnail_alt: value } );
					} }
				/>
				<ToggleControl
					label={ __(
						'Disable allow fullscreen',
						'wpvcb-blocks'
					) }
					checked={ disable_fullscreen }
					onChange={ ( value ) =>
						setAttributes( { disable_fullscreen: value } )
					}
				/>
				<ToggleControl
					label={ __(
						'Enable related',
						'wpvcb-blocks'
					) }
					checked={ enable_related }
					onChange={ ( value ) =>
						setAttributes( { enable_related: value } )
					}
				/>
			</div>
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		return 'null';
	},
} );