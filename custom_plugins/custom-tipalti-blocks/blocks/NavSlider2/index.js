/**
 * BLOCK: Casino Image Content Repeater
 *
 */

//  Import CSS.
//import './editor.scss';
//import './style.scss';

/**
 * External dependencies
 */

import { TextHighlight } from '@wordpress/components';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { TextControl,TextareaControl,SelectControl,FormToggle,Button,Dropdown,PanelBody,RadioControl } = wp.components
const { RichText,RichTextToolbarButton,MediaUpload} = wp.blockEditor
const { withState } = wp.compose
const { InnerBlocks,InspectorControls} = wp.editor;
import {CKEditor} from '@ckeditor/ckeditor5-react';
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

// Register the block
registerBlockType('tipalti-custom-block/nav-slider-2', {
  title: __( 'Nav Slider 2' ),
  icon: 'format-gallery',
  category: 'common',
  keywords: [
    __( 'Nav Slider 2' ),
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
      secSubTitle: {
          type: 'string',
      },
      style: {
          type: 'string',
      },
      show_subtitle: {
          type: 'boolean',
          default: true,
      },
      bottom_content: {
          type: 'string',
      },      
      btn_txt: {
          type: 'string',
      },
      btn_url: {
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
  },

     // edit function
    edit: (props) => {
      var secTitle = props.attributes.secTitle;
      var secSubTitle = props.attributes.secSubTitle;
      var partner_id = props.attributes.partner_id;
      var block_id = props.attributes.block_id;
      var style = props.attributes.style;
      var show_subtitle = props.attributes.show_subtitle;
      var bottom_content = props.attributes.bottom_content;
      var btn_txt = props.attributes.btn_txt;
      var btn_url = props.attributes.btn_url;

      var onChangeTitle = function( content ) {
          props.setAttributes({secTitle: content})
      }
      var onChangeSubtitle = function onChangeSubtitle ( content ) {
          props.setAttributes({secSubTitle: content})
      }  
      var onChangePartnerId = function onChangePartnerId ( content ) {
          props.setAttributes({partner_id: content})
      } 
      var onChangeBlockId = function onChangeBlockId(content) {
           props.setAttributes({block_id: content});
      }
      var onShowSubtitle = function onShowSubtitle ( state ){
          props.setAttributes({show_subtitle: (!show_subtitle)?true:false});
      }
      var onBottomContent = function onBottomContent ( content ){
          props.setAttributes({bottom_content: content});
      }
      var onBtnTxt = function onBtnTxt ( content ){
          props.setAttributes({btn_txt: content});
      }
      var onBtnUrl = function onBtnUrl ( content ){
          props.setAttributes({btn_url: content});
      }
      const { 
          attributes: { info = [] },
          setAttributes, className
      } = props;
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
                            <p className="section-heading">Slider {infoItem.index+1}</p>
                           <TextControl
                               className="info-item-title"
                               label="Title"
                               value={infoItem.title}
                               placeholder="Title"
                               onChange={ title => {
                                    const newObject = Object.assign({}, infoItem, {
                                        title: title
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                           />
                          <TextControl
                               className="info-item-subtitle"
                               label="Subtitle"
                               value={infoItem.subtitle}
                               placeholder="Subtitle"
                               onChange={ subtitle => {
                                    const newObject = Object.assign({}, infoItem, {
                                        subtitle: subtitle
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                           />
                            <div className="block-wysiwyg-editor">
                                <div className="components-base-control">
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={infoItem.description}
                                    onReady={ editor => {
                                        console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const newObject = Object.assign({}, infoItem, {
                                            description: editor.getData()
                                        });
                                        setAttributes({
                                            info: [...info.filter(
                                                item => item.index != infoItem.index
                                            ), newObject]
                                        }); 
                                    }}
                                    onBlur={ ( event, editor ) => {
                                        console.log( 'Blur.', editor );
                                    } }
                                    onFocus={ ( event, editor ) => {
                                        console.log( 'Focus.', editor );
                                    } }
                                />
                                </div>         
                                </div>
                            <br />
                            <TextControl
                               className="info-item-btn"
                               label="Button name"
                               value={infoItem.button}
                               placeholder="Button Name"
                               onChange={ button => {
                                    const newObject = Object.assign({}, infoItem, {
                                        button: button
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                           />
                            <TextControl
                               className="info-item-btn-url"
                               label="Button url"
                               value={infoItem.button_url}
                               placeholder="Button Url"
                               onChange={ button_url => {
                                    const newObject = Object.assign({}, infoItem, {
                                        button_url: button_url
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                           />
                            <div className="components-base-control">
                            Open in a new tab 
                            <FormToggle                    
                                checked={ infoItem.target }
                                onChange={(target ) => {                                 
                                    const newObject = Object.assign({}, infoItem, {
                                        target: !(infoItem.target)?true:false
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                }}
                            />
                            </div>
                            {(style=='multiple_icon_slider' || style=='multiple_image_slider')?
                            (infoItem.imgUrl) ? 
                            <div className="img-upload-wrapper">
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
                            />:null
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
                <div className="block-header">Nav Slider 2</div>
              <SelectControl
              label="Style"
              value={ style }
              options={ [
                  { label: 'Single Image Slider', value: 'single_image_slider' },
                  { label: 'Multiple Image Slider', value: 'multiple_image_slider' },
                  { label: 'Text Only', value: 'text_only' },
                  { label: 'Slider with Multiple Icons', value: 'multiple_icon_slider' },
              ] }
               onChange={ ( style ) => props.setAttributes( { style: style } ) }
              />
              <br />
			   {(style=='' || style=='single_image_slider' || style=='text_only' || style=='multiple_icon_slider')?
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
			   />:null
			   }
			   <br />
                <div className="info-wrap">{infoList(info)}</div>
                <Button onClick={title => {
                    setAttributes({
                        info: [...info, {
                            index: info.length,
                            title: "",
                            subtitle: "",
                            description: "",
                            button: "",
                            button_url: "",
                            target: ""
                        }]
                    });
                }}>Add New Slider</Button>
            </div>
        ]
    },

    // save function
    save: (props) => {
        const info = props.attributes.info;
        if(info!='' && info!=null){
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
        }else{
            null
        }
    }
} )