/**
 * BLOCK: Schema Banner
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import React,{ useState } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
const {__} = wp.i18n
const {registerBlockType} = wp.blocks
const {RichText,MediaUpload} = wp.blockEditor
const { TextControl,Button,FormToggle,IconButton,TextareaControl,SelectControl,Panel,PanelBody,PanelRow } = wp.components
const {InspectorControls} = wp.blockEditor;
const { getCurrentPostId } = wp.data.select("core/editor");
const { Fragment } = wp.element;

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

registerBlockType('wpvue/schema-banner', {
	title: __( 'Banner With Schema' ),
	icon: 'nametag',
	category: 'CasinoPages',
	keywords: [
	  __( 'Banner With Schema' ),
   //    __( 'casino list rows' ), 
	],
	supports: {
	  html: false,
	  reusable: false,
	  align: false
	},
   
	// Set up data model for custom block
	attributes: {        
        banner_heading: {
            type: 'string',
        },
        banner_description: {
            type: 'string',
        },        
        imgURL: {
            type: 'string',        
        },
        imgID:{
            type:'number'
        },
        imgAlt:{
            type:'string',            
        },
        items: {
            type: 'array',
            default: [],
        },
        locations: {
          type: 'array',
          default: [],
        },
        post_id: {
            type: 'string',
        },
        block_id: {
            type: 'string',
        },
    },

    edit(props) {       
       
        var banner_heading = props.attributes.banner_heading;
        var banner_description = props.attributes.banner_description;

        var block_id = props.attributes.block_id;

        props.setAttributes({post_id: getCurrentPostId()});
          

        var onChangeBannerHeading = function (content) {
            props.setAttributes({banner_heading: content});
        };

        var onChangeBannerDescription = function (content) {
            props.setAttributes({banner_description: content});
        };

        
        function onChangeBlockId(content) {
            props.setAttributes({block_id: content});
        }  

        const onFileSelect = (img)=>{
           props.setAttributes({
              imgURL :  img.url,
              imgID : img.id,
              imgAlt: img.alt
           });          
         
         }
         const onRemoveImg = () => {
             props.setAttributes({
                  imgURL :  null,
                  imgID : null,
                  imgAlt: null
               });
         } 

        const handleAddItem = () => {
          const items = [ ...props.attributes.items ];
          items.push( {
            name: '',
            text: '',
            ctaLink: '',
            caption:'',
            imgURL:'',
            imgID:'',
			      imgAlt:'',
          } );
          props.setAttributes( { items } );
        };

        const handleRemoveItem = ( index ) => {
          const items = [ ...props.attributes.items ];
          items.splice( index, 1 );
          props.setAttributes( { items } );
        };

        const handleNameChange = ( name, index ) => {
          const items = [ ...props.attributes.items ];
          items[ index ].name = name;
          props.setAttributes( { items } );
        };

        const handleTextChange = ( text, index ) => {
          const items = [ ...props.attributes.items ];
          items[ index ].text = text;
          props.setAttributes( { items } );
        };

        const handleImageChange = (img, index)=>{  
          const items = [ ...props.attributes.items ];
          items[ index ].imgURL = img.url;
          items[ index ].imgID = img.id;
          items[ index ].imgAlt = img.imgAlt;
          props.setAttributes( { items } );        
         
         }

        const handleRemoveImage = (index) => {
              const items = [ ...props.attributes.items ];
              items[ index ].imgURL = null;
              items[ index ].imgID = null;
              items[ index ].imgAlt = null;
              props.setAttributes( { items } );     
         }

        const handleCaptionChange = ( caption, index ) => {
          const items = [ ...props.attributes.items ];
          items[ index ].caption = caption;
          props.setAttributes( { items } );
        };
        
  
        let itemFields,
        itemDisplay;

        if ( props.attributes.items.length ) {
          itemFields = props.attributes.items.map( ( item, index ) => {

            if(props.attributes.items[ index ].activationDate!=null && typeof props.attributes.items[ index ].activationDate !== "undefined")
                props.attributes.items[ index ].activationDate=new Date(props.attributes.items[ index ].activationDate);
            /*else
                props.attributes.items[ index ].activationDate=null;*/

            if(props.attributes.items[ index ].expiryDate!=null && typeof props.attributes.items[ index ].expiryDate !== "undefined")
                props.attributes.items[ index ].expiryDate=new Date(props.attributes.items[ index ].expiryDate);
            /*else
                props.attributes.items[ index ].expiryDate=null;*/

            return <Fragment key={ index }>

              <div class="info-item">
                   <p className="section-heading">Item {index+1}</p>
                  <TextControl
                    label="Name *"
                    placeholder="Name"
                    value={ props.attributes.items[ index ].name }
                    onChange={ ( name ) => handleNameChange( name, index ) }
                  />
                  <TextControl
                    label="Text *"
                    placeholder="Text"
                    value={ props.attributes.items[ index ].cta }
                    onChange={ ( text ) => handleTextChange( text, index ) }
                  />                  
                  
                  {
                        (props.attributes.items[ index ].imgURL) ? 
                        <div class="img-upload-wrapper">
                        <div className={ props.className }>
                            <img 
                            src={props.attributes.items[ index ].imgURL} 
                            alt={props.attributes.items[ index ].imgAlt}
                            />
                        </div>
                            {(props.isSelected)?( <div class="components-base-control upload-bg-img"><Button className="button button-primary" onClick={() => handleRemoveImage(index)}>Remove</Button></div> ):null}
                        </div>
                            
                        : <MediaUpload 
                        onSelect={( image ) => handleImageChange( image, index )}
                        value={props.attributes.items[ index ].imgID}
                        render={({open})=>
                        <div class="components-base-control upload-bg-img"><Button
                        onClick={open}
                        className="button button-primary"
                        >
                        Upload Image *
                        </Button></div>
                                }
                    />
                    }                 
                  <TextControl
                    label="Caption"
                    placeholder="Caption"
                    value={ props.attributes.items[ index ].caption }
                    onChange={ ( caption ) => handleCaptionChange( caption, index ) }
                  />
                  <div class="components-base-control upload-bg-img"><Button
                    onClick={() => handleRemoveItem( index )}
                    className="button button-primary"
                    >
                    Remove Item
                    </Button>
                  </div>
                  
              </div>
            </Fragment>;
          } );

          itemDisplay = props.attributes.items.map( ( item, index ) => {
            return <p key={ index }>{ item.address }</p>;
          } );
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
                <div class="block-windowed-banner" >
                    <div class="block-header">Banner With "HowTo" Schema</div>
                    {
                        (props.attributes.imgURL) ? 
                        <div class="img-upload-wrapper">
                        <div className={ props.className }>
                            <img 
                            src={props.attributes.imgURL} 
                            alt={props.attributes.imgAlt}
                            />
                        </div>
                            {(props.isSelected)?( <div class="components-base-control upload-bg-img"><Button className="button button-primary" onClick={onRemoveImg}>Remove</Button></div> ):null}
                        </div>
                            
                        : <MediaUpload 
                        onSelect={onFileSelect}
                        value={props.attributes.imgID}
                        render={({open})=>
                        <div class="components-base-control upload-bg-img"><Button
                        onClick={open}
                        className="button button-primary"
                        >
                        Upload Background Image
                        </Button></div>
                                }
                    />
                    }
                    <TextControl
                        label={__('Banner Heading')}
                        onChange={onChangeBannerHeading} 
                        value={banner_heading}
                        placeholder={__('Banner Heading')}
                        /> 
                    <TextareaControl
                        label={__('Banner Description')}
                        onChange={onChangeBannerDescription} 
                        value={banner_description}
                        placeholder={__('Banner Description')}
                        />
                    
                    <div>
                      <div key="2" className={ props.className }>                        
                        { itemDisplay }
                      </div>
                      { itemFields }
                      {
                        (props.attributes.items.length < 4) ? 
                          <div class="components-base-control upload-bg-img">
                          <Button
                            isDefault
                            onClick={ handleAddItem.bind( this ) }
                          >
                            { 'Add New Item'}
                          </Button>
                          </div>:''
                      }
                    </div>
                </div>
                
                ]
    },
    save(props) {
        return null
    },
})
   