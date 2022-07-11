/**
 * BLOCK: BestPaymentMethods
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

registerBlockType('wpvue/windowed-banner', {
	title: __( 'Windowed Banner' ),
	icon: 'nametag',
	category: 'CasinoPages',
	keywords: [
	  __( 'Windowed Banner' ),
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
        banner_sub_heading: {
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
        var banner_sub_heading = props.attributes.banner_sub_heading;

        var block_id = props.attributes.block_id;

        props.setAttributes({post_id: getCurrentPostId()});
          

        var onChangeBannerHeading = function (content) {
            props.setAttributes({banner_heading: content});
        };

        var onChangeBannerSubHeading = function (content) {
            props.setAttributes({banner_sub_heading: content});
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
            title: '',
            state: 'rest-of-world',
            cta: '',
            ctaLink: '',
            activationDate:new Date(),
            expiryDate:null,
            terms:'',
            imgURL:'',
            imgID:'',
			imgAlt:'',
			showCounter:true
          } );
          props.setAttributes( { items } );
        };

        const handleRemoveItem = ( index ) => {
          const items = [ ...props.attributes.items ];
          items.splice( index, 1 );
          props.setAttributes( { items } );
        };

        const handleActivationDateChange = ( activationDate, index ) => {
          const items = [ ...props.attributes.items ];
          items[ index ].activationDate = activationDate;
          props.setAttributes( { items } );
        };

        const handleTitleChange = ( title, index ) => {
          const items = [ ...props.attributes.items ];
          items[ index ].title = title;
          props.setAttributes( { items } );
        };

        const handleStateChange = ( state, index ) => {
          const items = [ ...props.attributes.items ];
          items[ index ].state = state;
          props.setAttributes( { items } );
        };

        const handleCtaChange = ( cta, index ) => {
          const items = [ ...props.attributes.items ];
          items[ index ].cta = cta;
          props.setAttributes( { items } );
        };

        const handleCtaLinkChange = ( ctaLink, index ) => {
          const items = [ ...props.attributes.items ];
          items[ index ].ctaLink = ctaLink;
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

        const handleExpiryDateChange = ( expiryDate, index ) => {
          const items = [ ...props.attributes.items ];
          items[ index ].expiryDate = expiryDate;
          props.setAttributes( { items } );
        };

		const handleShowCounterChange = ( index ) => {
			const items = [ ...props.attributes.items ];
			items[ index ].showCounter = (!props.attributes.items[ index ].showCounter)?true:false;          
			props.setAttributes( { items } );
		};

        const handleTermsChange = ( terms, index ) => {
          const items = [ ...props.attributes.items ];
          items[ index ].terms = terms;
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
                  <div class="components-base-control">
                        <div class="components-base-control__field">
                            <label class="components-base-control__label">Activation Date *</label>
                                <DatePicker dateFormat="dd/MM/yyyy h:mm aa" showTimeInput timeInputLabel="Time:" selected={props.attributes.items[ index ].activationDate} onChange={( activationDate ) => handleActivationDateChange( activationDate, index )} />
                        </div>
                  </div>
                  <TextControl
                    label="Title *"
                    placeholder="Title"
                    value={ props.attributes.items[ index ].title }
                    onChange={ ( title ) => handleTitleChange( title, index ) }
                  />
                  <TextControl
                    label="CTA *"
                    placeholder="CTA Text"
                    value={ props.attributes.items[ index ].cta }
                    onChange={ ( cta ) => handleCtaChange( cta, index ) }
                  />                  
                  <TextControl
                    label="CTA Link *"
                    placeholder="CTA Link"
                    value={ props.attributes.items[ index ].ctaLink }
                    onChange={ ( ctaLink ) => handleCtaLinkChange( ctaLink, index ) }
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
                    <div class="components-base-control">
                        <div class="components-base-control__field">
                            <label class="components-base-control__label">Expiry Date</label>
                              <DatePicker dateFormat="dd/MM/yyyy h:mm aa" showTimeInput timeInputLabel="Time:"  selected={props.attributes.items[ index ].expiryDate} onChange={( expiryDate ) => handleExpiryDateChange( expiryDate, index )} />
                        </div>
                    </div>
					<div class="components-base-control component-toggle">
                        <label class="components-base-control__label">Show Counter</label>    
                        <FormToggle 
                            checked={props.attributes.items[ index ].showCounter}
                            onChange={ ( ) => handleShowCounterChange( index )}        
                        />
                    </div>                  
                  <TextControl
                    label="Terms"
                    placeholder="Terms"
                    value={ props.attributes.items[ index ].terms }
                    onChange={ ( terms ) => handleTermsChange( terms, index ) }
                  />
                  <SelectControl
                  label="Select State"
                  value={ props.attributes.items[ index ].state }
                  options={ [
                    { label: 'Rest of the World', value: 'rest-of-world' },
                    { label: 'US (all states)', value: 'us-all' },
                    { label: 'US (NJ state only)', value: 'us-nj' },
                  ] }
                  onChange={ ( state ) => handleStateChange( state, index ) } 
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
                    <div class="block-header">Windowed Banner</div>
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
                        label={__('Banner Sub-heading')}
                        onChange={onChangeBannerSubHeading} 
                        value={banner_sub_heading}
                        placeholder={__('Banner Sub-heading')}
                        />
                    
                    <div>
                      <div key="2" className={ props.className }>                        
                        { itemDisplay }
                      </div>
                      { itemFields }
                      {
                        (props.attributes.items.length < 50) ? 
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
   