/**
 * BLOCK: Casino Image Content Repeater
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
registerBlockType('wpvue/casino-safety-information', {
	title: __( 'Safety Information' ),
	icon: 'tide',
	category: 'CasinoPages',
	keywords: [
	  __( 'Safety Information' ),
	],

	attributes: {
	    info: {
	        type: 'array',
	        selector: '.info-wrap'
	    },
	   	secTitle: {
        	type: 'string',
	    },
      partner_id: {
          type: 'string',
      },
      block_id: {
          type: 'string',
      },
	    group_id: {
	        type: 'string',
	    },
      bottom_content: {
          type: 'string',
      },      
	},

     // edit function
    edit: (props) => {
    	var secTitle = props.attributes.secTitle;
      var partner_id = props.attributes.partner_id;
      var block_id = props.attributes.block_id;
	    var group_id = props.attributes.group_id;
      var bottom_content = props.attributes.bottom_content;
      var btn_txt = props.attributes.btn_txt;
      var btn_url = props.attributes.btn_url;

	    var onChangeTitle = function( content ) {
	        props.setAttributes({secTitle: content})
	    }
	    var onChangeGroupid = function onChangeGroupid ( content ) {
	        props.setAttributes({group_id: content})
	    }  
      var onChangePartnerId = function onChangePartnerId ( content ) {
          props.setAttributes({partner_id: content})
      } 
      var onChangeBlockId = function onChangeBlockId(content) {
           props.setAttributes({block_id: content});
      }

      var onBottomContent = function onBottomContent ( content ){
          props.setAttributes({bottom_content: content});
      }

        const { 
            attributes: { info = [] },
            setAttributes, className
        } = props;

        const infoList = (value) => {
            return(
                value.sort((a, b) => a.index - b.index).map(infoItem => {
                    return(
                        <div className="info-item">
                            <Button
                                className="remove-item"
                                onClick={ () => {
                                    const newInfo = info.filter(item => item.index != infoItem.index).map(i => {
                                        if(i.index > infoItem.index){
                                            i.index -= 1;
                                        }
                                        return i;
                                    } );
                                    setAttributes({ info: newInfo });
                                } }
                            >&times;</Button>
                            <p>Image {infoItem.index+1}</p>
        				            {
        				            (infoItem.imgUrl) ? 
        				            <div class="img-upload-wrapper">
        				            <div className="thumbnail">
        				                <img 
        				                src={infoItem.imgUrl} 
        				                alt={infoItem.imgAlt}
        				                />
        				            </div>
        				                {(props.isSelected)?( <Button className="button button-primary" onClick={image => {
                                            const newObject = Object.assign({}, infoItem, {
                                                imgUrl: null,
                                                imgID: null,
                                                imgAlt: null

                                            });
                                            setAttributes({
                                                info: [...info.filter(
                                                    item => item.index != infoItem.index
                                                ), newObject]
                                            });
                                        }}>Remove image</Button> ):null}

        				            </div>
        				                
        				            : <MediaUpload 
        				         	  value={infoItem.imgID}
        				            onSelect={ image => {
                                            const newObject = Object.assign({}, infoItem, {
                                                imgUrl: image.url,
                                                imgID: image.id,
                                                imgAlt: image.alt

                                            });
                                            setAttributes({
                                                info: [...info.filter(
                                                    item => item.index != infoItem.index
                                                ), newObject]
                                            });
                                        } }
        				            render={({open})=>
        				            <Button
        				            onClick={open}
        				            className="button button-primary"
        				            >
        				            Add Image
        				            </Button>
        				            }
        				            />
                   					}
                            <hr />
                        </div>
                    )
                })
            )
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
            <div className={className}>
                <div class="block-header">Safety Information</div>
               <TextControl
               label="Section Title"
               onChange={onChangeTitle}
               value={secTitle}
               placeholder="Title"
               />
               <TextControl
                    label="Group Id"
                    onChange={onChangeGroupid}
                    value={group_id}
                    placeholder="Group Id" 
                />
               <TextControl
                    label="Partner Id"
                    onChange={onChangePartnerId}
                    value={partner_id}
                    placeholder="Partner Id" 
                />
 
                <TextareaControl
                    label="Content"
                    onChange={onBottomContent}
                    value={bottom_content}
                    placeholder="Content" 
                />
                <div className="info-wrap">{infoList(info)}</div>
                <Button onClick={title => {
                    setAttributes({
                        info: [...info, {
                            index: info.length,
                            title: "",
                            description: ""
                        }]
                    });
                }}>Add New Image</Button>
            </div>
        ]
    },

    // save function
    save: (props) => {
        const info = props.attributes.info;
        const displayInfoList = (value) => {
            return(
                value.map( infoItem => {
                    return(
                        <div className="info-item">
                            <RichText.Content
                                tagName="h4"
                                className="info-item-title"
                                value={infoItem.title}
                                style={{ height: 58 }}
                            />
                        </div>
                    )
                } )
            )
        }

        return(
            <div className={props.className}>
                <div className="info-wrap">{ displayInfoList(info) }</div>
            </div>
        );
    }
} )