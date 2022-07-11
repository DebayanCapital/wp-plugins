/**
 * BLOCK: Casino Payment Options
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

/**
 * External dependencies
 */

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { TextControl,TextareaControl,Button,SelectControl,FormToggle,PanelBody } = wp.components
const { MediaUpload,InspectorControls } = wp.blockEditor

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

registerBlockType('wpvue/casino-payment-options', {
    title: __( 'Payment Options' ),
    icon: 'format-aside', 
    category: 'CasinoPages',
    keywords: [
      __( 'Payment Options' ),
    ],
    supports: {
	   html: false,
	   reusable: false,
	   align: false
	},
  	attributes: {
	   	title: {
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
    	qty: {
            type: 'string',

        },
        group_id: {
            type: 'string',

        },
        show_load_more: {
            type: 'boolean',
            default: false,
        },
        load_more_qty: {
            type: 'string',
        },
        load_more_text: {
            type: 'string',
            default:'Load More Payment'
        },
	},


	edit: props => {
		var title = props.attributes.title;
		var block_id = props.attributes.block_id;
	    var content = props.attributes.content;
	    var imgUrl = props.attributes.imgURL;
	    var style = props.attributes.style;
	    var qty = props.attributes.qty;
        var group_id = props.attributes.group_id;
        var show_load_more = props.attributes.show_load_more;
        // var button_text = props.attributes.button_text;
        var load_more_qty = props.attributes.load_more_qty;
        var load_more_text = props.attributes.load_more_text;


	    var onChangeTitle = function( content ) {
	        props.setAttributes({title: content})
	    }
	    var onChangeBlockId = function onChangeBlockId(content) {
            props.setAttributes({block_id: content});
        }
	    var onChangeContent = function onChangeContent ( content ) {
	        props.setAttributes({content: content})
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
   		var onChangeStyle = function onChangeStyle ( content ){
	        props.setAttributes({style: content});
	    }    
	    var onChangeQty = function onChangeQty(content) {
            props.setAttributes({qty: content})
        }
        var onChangeGroupId = function onChangeGroupId(content) {
            props.setAttributes({group_id: content})
        }
        var onChangeLoadMore = function (state) {
            props.setAttributes({show_load_more: (!show_load_more)?true:false});
        };
        // var onChangeButtonText = function (content) {
        //     props.setAttributes({button_text: content});
        // };
        var onChangeLoadMoreQty = function (content) {
            props.setAttributes({load_more_qty: content});
        };
        var onChangeLoadMoreText = function (content) {
            props.setAttributes({load_more_text: content});
        };
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
	        <div id="block-payment-options" >
				<div className="block-header">Payment Options</div>
	          <SelectControl
	              label="Style "
	              value={ style }
	              options={ [
					  { label: 'Card View With Category', value: 'card-view-category' },
					  { label: 'Card View With Category Description', value: 'card-view-category-desc' },
					  { label: 'Card View Category Description full width', value: 'card-view-category-full-width' },
	              ] }
	            onChange={ ( style ) => props.setAttributes( { style: style } ) }
	          />
	           <TextControl
	               label="Title"
	               onChange={onChangeTitle}
	               value={title}
	               placeholder="Title"
	           />
               <TextControl
                   label={__('Group Id')}
                   onChange={onChangeGroupId} 
                   value={group_id}
                   placeholder={__('Group Id')}
               />
	          {
	           	(props.attributes.style === 'select-view') ?
	            <TextareaControl
	                label="Content"
	                onChange={onChangeContent}
	                value={content}
	                placeholder="Content" 
	            /> : null
			  }
	            {
				(props.attributes.style === 'select-view' ) ? 
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
	            Image
	            </Button>
	            }
	            /> : null
	        	
	            } 
	          { 
	           ( props.attributes.style === 'card-view' ) || ( props.attributes.style === 'card-view-category' ) ?
	            
	            <TextControl
                  label={__('Quantity')}
                  onChange={onChangeQty} 
                  value={qty}
                  placeholder={__('Quantity')}
                /> : null
              }
              {
              	( props.attributes.style === 'card-view' ) || ( props.attributes.style === 'card-view-category' ) ?
                <FormToggle 
                label={__('Display show more button?')}
                  checked={ show_load_more }
                  onChange={ onChangeLoadMore } 
                /> : null
                
              }

              {
	           ( props.attributes.style === 'card-view') || (props.attributes.style === 'card-view-category' ) ?    
               (show_load_more) ?
               
                <TextControl
                    label="Please enter load more quantity"
                    onChange={onChangeLoadMoreQty}
                    value={load_more_qty}
                    placeholder="Load more quantity"
                /> : props.setAttributes({load_more_text: '',load_more_qty: ''}) : null
			   
			  }
              {
	           ( props.attributes.style === 'card-view') || (props.attributes.style === 'card-view-category' ) ?    
               (show_load_more) ?
                <TextControl
                    label="Load more button text"
                    onChange={onChangeLoadMoreText}
                    value={load_more_text}
                    placeholder="Load more button text"
                />
                
                : props.setAttributes({load_more_text: '',load_more_qty: ''}) : null
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