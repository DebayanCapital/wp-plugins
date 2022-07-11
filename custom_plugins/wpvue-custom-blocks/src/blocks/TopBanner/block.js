/**
 * BLOCK: BestPaymentMethods
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import { ColorPicker } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * External dependencies
 */

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks; 
const { TextControl,TextareaControl,SelectControl,PanelBody } = wp.components
const { RichText,RichTextToolbarButton,MediaUpload} = wp.blockEditor
const { Button } = wp.components
const { FormToggle } = wp.components
const { withState } = wp.compose
const {InspectorControls} = wp.blockEditor;

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

registerBlockType('wpvue/topbanner', {
	title: __( 'Common Banner' ),
	icon: 'tide',
	category: 'CasinoPages',
	keywords: [
	  __( 'Common banner' ),
   //    __( 'casino list rows' ), 
	],
	supports: {
	  html: false,
	  reusable: false,
	  align: false
	},
   
	// Set up data model for custom block
	attributes: {
	  title: {
		   type: 'string',
	   },
	   subTitle: {
		   type: 'string',
	   },
	   block_id: {
	       type: 'string',
	   },
	   content: {
		   type: 'string',
	   },
	   buttonText: {
		   type: 'string',
	   },
	   buttonUrl: {
		   type: 'string',
	   },
	   target: {
		type: 'string',
	   },
	   buttonText2: {
		   type: 'string',
	   },
	   buttonUrl2: {
		   type: 'string',
	   },
	   target2: {
		type: 'string',
	   },    
	   imgURL: {
		   type: 'string',
		   source:'attribute',
		   attribute: 'src',
		   selector:'img'
	   },
	   imgID:{
		  type:'number'
	   },
	   imgAlt:{
		  type:'string',
		  source:'attribute',
		  attribute:'alt',
		  selector:'img'
	   },
	   add_button: {
		   type: 'boolean',
		   default: true,
	   },
	   style: {
		   type: 'string',
	   },
	   color: {
		type: 'string',
	   },
	   text_color: {
		type: 'string',
	   },
	   text_tag: {
		type: 'string',
	   }
	},
   
	edit: props => {
		
	   var title = props.attributes.title;
	   var subTitle = props.attributes.subTitle;
	   var block_id = props.attributes.block_id;
	   var content = props.attributes.content;
	   var buttonText = props.attributes.buttonText;
	   var buttonUrl = props.attributes.buttonUrl;
	   var target = props.attributes.target;
	   var buttonText2 = props.attributes.buttonText2;
	   var buttonUrl2 = props.attributes.buttonUrl2;
	   var target2 = props.attributes.target2;
	   var imgUrl = props.attributes.imgURL;
	   var add_button = props.attributes.add_button;
	   var style = props.attributes.style;
	   var text_tag = props.attributes.text_tag;
	   var color = props.attributes.color;
	   var text_color = props.attributes.text_color;
	   // var bg_image = props.attributes.mediaId;
   
	   var onChangeTitle = function( content ) {
		   props.setAttributes({title: content})
	   }
	   var onChangeSubtitle = function onChangeSubtitle ( content ) {
		   props.setAttributes({subTitle: content})
	   }  
	   var onChangeBlockId = function onChangeBlockId(content) {
           props.setAttributes({block_id: content});
       }
	   var onChangeContent = function onChangeContent ( content ) {
		   props.setAttributes({content: content})
	   }
	   var onChangeBtntext = function onChangeBtntext ( content ) {
		   props.setAttributes({buttonText: content})
	   }
	   var onChangeBtnurl = function onChangeBtnurl ( content ) {
		   props.setAttributes({buttonUrl: content})
	   }
	   var onChangeTarget = function onChangeTarget ( content ) {
		props.setAttributes({target: content})
	   } 
	   var onChangeBtntext2 = function onChangeBtntext2 ( content ) {
		   props.setAttributes({buttonText2: content})
	   }
	   var onChangeBtnurl2 = function onChangeBtnurl2 ( content ) {
		   props.setAttributes({buttonUrl2: content})
	   }
	   var onChangeTarget2 = function onChangeTarget2 ( content ) {
		props.setAttributes({target2: content})
	   } 
	   var onAddButton = function onShowSubtitle ( state ){
		   props.setAttributes({add_button: (!add_button)?true:false});
	   }
	   var onChangeStyle = function onChangeStyle ( content ){
		   props.setAttributes({style: content});
	   }
	   var onChangeTextTag = function onChangeTextTag ( content ){
		   props.setAttributes({text_tag: content});
	   }    
	   
	   function setColor(value){
		   props.setAttributes({
			color :  value
		  });
		  //console.log(props.attributes.color);
	   }
	   function setTextColor(value){
			props.setAttributes({
			text_color :  value
		});
		//console.log(props.attributes.color);
		}
	   const onFileSelect = (img)=>{
		   props.setAttributes({
			 imgURL :  img.url,
			 imgID : img.id,
			 imgAlt: img.alt
		   });
			 
			 //console.log('It is working!');
	   }
	   const onRemoveImg = () => {
		   props.setAttributes({
			 imgURL :  null,
			 imgID : null,
			 imgAlt: null
		   });
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

		   <div id="block-game-filter" >
			   <div className="block-header">Common Banner</div>
			   <SelectControl
				 label="Style "
				 value={ style }
				 options={ [
					 { label: 'Header Banner', value: 'top-banner' },
					 { label: 'Header Banner Small Title', value: 'top-banner-small' },
					 { label: 'Default Body Banner (Without Background Image)', value: 'default-body-banner' },
					 { label: 'Body Banner', value: 'body-banner' },
					 { label: 'Footer Banner', value: 'bottom-banner' },
					 { label: 'Game Casino Footer Banner', value: 'bottom-banner-game-casino' },
					 { label: 'Responsive banner for us site', value: 'banner-us-site' },
					 { label: 'Banner with custom background color', value: 'banner-custom-background-color' },
					 { label: 'Banner with Icon', value: 'icon-banner' },
				 ] }
			   //onChange={ ( style ) => props.setAttributes( { style: style } ) }
			   onChange={onChangeStyle} 
			   />
			   <SelectControl
				 label="Text Tag"
				 value={ text_tag }
				 options={ [
					 { label: 'H1', value: 'h1' },
					 { label: 'H2', value: 'h2' },
					 { label: 'H3', value: 'h3' },
					 { label: 'H4', value: 'h4' },
					 { label: 'P', value: 'p' },
				 ] }
			   //onChange={ ( style ) => props.setAttributes( { style: style } ) }
			   onChange={onChangeTextTag} 
			   />
			  <TextControl
				  label="Title"
				  onChange={onChangeTitle}
				  value={title}
				  placeholder="Title"
			  />
			  <TextControl
				   label="Sub title"
				   onChange={onChangeSubtitle}
				   value={subTitle}
				   placeholder="Sub title"
			   />
			   <TextareaControl
				   label="Content"
				   onChange={onChangeContent}
				   value={content}
				   placeholder="Content"
			   />
			   <TextControl
				   label="Button Text"
				   onChange={onChangeBtntext}
				   value={buttonText}
				   placeholder="Button Text"
			   />
			   <TextControl
				   label="Button url"
				   onChange={onChangeBtnurl}
				   value={buttonUrl}
				   placeholder="Button url"
			   />
			   <TextControl
				   label="Target"
				   onChange={onChangeTarget}
				   value={target}
				   placeholder="Ex. _blank,_self etc"
			   />
			   <label>Add Second Button?</label>
			   <br />
			   <FormToggle 
			   checked={ add_button }
			   onChange={ onAddButton } 
			   />
			   
			   {(add_button) && (
			   
			   <TextControl
				   label="Button Text"
				   onChange={onChangeBtntext2}
				   value={buttonText2}
				   placeholder="Button Text"
			   />
			   )}
			   {(add_button) && (
			   <TextControl
				   label="Button url"
				   onChange={onChangeBtnurl2}
				   value={buttonUrl2}
				   placeholder="Button url"
			   />
			   )}
			   {(add_button) && (
			   <TextControl
					label="Target"
					onChange={onChangeTarget2}
					value={target2}
					placeholder="Ex. _blank,_self etc"
		   		/>
			   )}
			   <br />
			   {
				(style!='banner-custom-background-color' && style!='default-body-banner')? 
			   (props.attributes.imgURL) ? 
			   <div className="img-upload-wrapper">
			   <div className={ props.className }>
				   <img 
				   src={props.attributes.imgURL} 
				   alt={props.attributes.imgAlt}
				   />
			   </div>
				   {(props.isSelected)?( <Button className="button button-primary" onClick={onRemoveImg}>Remove image</Button> ):null}
			   </div>
				   
			   : <MediaUpload 
			   onSelect={onFileSelect}
			   value={props.attributes.imgID}
			   render={({open})=>
			   <Button
			   onClick={open}
			   className="button button-primary"
			   >
			   Background Image
			   </Button>
			   }
			   /> : null
			   }
			   {
				(style=='banner-custom-background-color')? 
				<div className="custom-color-picker">
				<label>Add Background Color</label>
			   <ColorPicker
			   		onSelect={setColor}
					color={ color }
					onChangeComplete={ ( value ) => setColor( value.hex ) }
					disableAlpha
				/> 
				</div>
				: null
			   }
			   {
				(style=='banner-custom-background-color')? 
				<div className="custom-color-picker">
				<label>Add Text Color</label>
			   <ColorPicker
			   		onSelect={setTextColor}
					color={ text_color }
					onChangeComplete={ ( value ) => setTextColor( value.hex ) }
					disableAlpha
				/> 
				</div>
				: null
			   }
		   </div>
	   ]
	},
	 save: props => {
	   return ( 
		   <div className="img-upload-wrapper">
			   <div className="thumbnail">
				   <img 
				   src={props.attributes.imgURL} 
				   alt={props.attributes.imgAlt}
				   />
			   </div>          
		   </div>
	   )
	 }
   })
   