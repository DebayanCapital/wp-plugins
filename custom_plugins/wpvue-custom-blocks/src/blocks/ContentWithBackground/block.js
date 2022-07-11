/**
 * BLOCK: Content With Background
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
const { TextControl,TextareaControl,SelectControl,PanelBody } = wp.components
const { RichText,RichTextToolbarButton,MediaUpload} = wp.blockEditor
const { Button } = wp.components
const { FormToggle } = wp.components
const { withState } = wp.compose
const {InspectorControls} = wp.blockEditor;


import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
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

registerBlockType('wpvue/content-with-background', {
	title: __( 'Content With Image' ),
	icon: 'camera',
	category: 'CasinoPages',
	keywords: [
	  __( 'Content With Image' ),
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
	   style: {
		   type: 'string',
	   },
	   show_btn: {
	   		type: 'boolean',
	   		default: false,
	   },
	   info: {
	        type: 'array',
	        selector: '.info-wrap'
	   },
	},
   
	edit: props => {
		
	   var title = props.attributes.title;
	   var subTitle = props.attributes.subTitle;
	   var block_id = props.attributes.block_id;
	   var content = props.attributes.content;
	   var imgUrl = props.attributes.imgURL;
	   var style = props.attributes.style;
	   var show_btn = props.attributes.show_btn;
   
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
	   var onChangeStyle = function onChangeStyle ( content ){
		   props.setAttributes({style: content});
	   }
	   var onShowBtn = function onShowBtn ( state ){
	   	   props.setAttributes({show_btn: (!show_btn)?true:false});
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
                            <p>Button {infoItem.index+1}</p>
                           <TextControl
                               className="info-item-name"
                               label="Button Name"
                               value={infoItem.btntext}
                               placeholder="Button name"
                               onChange={ btntext => {
                                    const newObject = Object.assign({}, infoItem, {
                                        btntext: btntext
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                           />
                           <TextControl
                               className="info-item-url"
                               label="Button Url"
                               value={infoItem.btnurl}
                               placeholder="Button url"
                               onChange={ btnurl => {
                                    const newObject = Object.assign({}, infoItem, {
                                        btnurl: btnurl
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                           />
						   <TextControl
                               className="info-item-target"
                               label="Target"
                               value={infoItem.target}
                               placeholder="Example: _blank,_self etc"
                               onChange={ target => {
                                    const newObject = Object.assign({}, infoItem, {
                                        target: target
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                           />
                        </div>
                    )
                })
            )
        }

        const config = {
	       heading: {
	        options: [
	            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
	            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
	            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
	            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
	            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
	            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
	            { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
	        ]
	       }
        };
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
			  <div className="block-header">Content With Image</div>
				<SelectControl
				 label="Style "
				 value={ style }
				 options={ [
					 { label: 'Background', value: 'background' },
					 { label: 'Parallax Background', value: 'parallax-background' },
					 { label: 'Right Image Review details Page', value: 'image-right-review' },
					 { label: 'Left Image Review details', value:'image-left-review' },
					 { label: 'Left Image free game Details page', value:'image-left-free-game' },
					 { label: 'Right Image free game Details page', value:'image-right-free-game' },
					 { label: 'Thank you page', value: 'thank-you' },
				 ] }
			   //onChange={ ( style ) => props.setAttributes( { style: style } ) }
			   onChange={onChangeStyle} 
			   />
			  {(style != 'thank-you') && (
			  <TextControl
				  label="Title"
				  onChange={onChangeTitle}
				  value={title}
				  placeholder="Title"
			  />
			  )}
			  {(style != 'thank-you') && (
			  <TextControl
				   label="Sub title"
				   onChange={onChangeSubtitle}
				   value={subTitle}
				   placeholder="Sub title"
			   />
			   )}
	            <div className="block-wysiwyg-editor">
	              <div className="components-base-control">
	                <CKEditor 
	                  editor={ ClassicEditor }
	                  data={ content }
	                  config={config}
	                  onChange={ ( event, editor ) => {
	                    props.setAttributes({content: editor.getData()});
	                    
	                  } }
	              />
	              </div>         
	            </div>
			   <br />
			   {
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
			   Upload Image
			   </Button>
			   }
			   />
			   }
			   <br />
			   <label>Do you want to diaplay button?</label>
			   <br />
               <FormToggle 
                checked={ show_btn }
                onChange={ onShowBtn } 
               />
               <br />
               {(show_btn) && (
                <div className="info-wrap">{infoList(info)}</div>
               )}
               {(show_btn) && (
                <Button onClick={title => {
                    setAttributes({
                        info: [...info, {
                            index: info.length,
                            btntext: "",
							btnurl: "",
							target: ""
                        }]
                    });
                }}>Add New Button</Button>
                )}
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
   