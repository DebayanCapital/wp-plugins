/**
 * BLOCK: Partner contact details
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

/**
 * External dependencies
 */

import { TextHighlight } from '@wordpress/components';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { TextControl,TextareaControl,SelectControl,FormToggle,Button,Dropdown,PanelBody } = wp.components
const { RichText,RichTextToolbarButton,MediaUpload} = wp.blockEditor
const { withState } = wp.compose
const { InnerBlocks,InspectorControls} = wp.editor;



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

// Register the block
registerBlockType('wpvue/partner-contact-details', {
	title: __( 'Partner contact details' ),
	icon: 'tide',
	category: 'CasinoPages',
	keywords: [
	  __( 'Partner contact details' ),
	],

	attributes: {
	   	secTitle: {
        	type: 'string',
	    },
      content: {
          type: 'string',
      }, 
      partner_id: {
          type: 'string',
      },
      block_id: {
          type: 'string',
      },   
	},

     // edit function
    edit: (props) => {
    	var secTitle = props.attributes.secTitle;
      var content = props.attributes.content;
      var partner_id = props.attributes.partner_id;
      var block_id = props.attributes.block_id;
	    var group_id = props.attributes.group_id;

	    var onChangeTitle = function( content ) {
	        props.setAttributes({secTitle: content})
	    }

      var onChangePartnerId = function onChangePartnerId ( content ) {
          props.setAttributes({partner_id: content})
      } 
      var onChangeBlockId = function onChangeBlockId(content) {
           props.setAttributes({block_id: content});
      }

      var onChangeContent = function onChangeContent ( content ){
          props.setAttributes({content: content});
      }

        return[
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
            <div className={props.className}>
                <div className="block-header">Partner Contact Details</div>
               <TextControl
               label="Section Title"
               onChange={onChangeTitle}
               value={secTitle}
               placeholder="Title"
               />
                <TextareaControl
                    label="Content"
                    onChange={onChangeContent}
                    value={content}
                    placeholder="Content" 
                />
               <TextControl
                    label="Partner Id"
                    onChange={onChangePartnerId}
                    value={partner_id}
                    placeholder="Partner Id" 
                />
            </div>
        ]
    },

    // save function
    save: (props) => {
        return null
    }
} )