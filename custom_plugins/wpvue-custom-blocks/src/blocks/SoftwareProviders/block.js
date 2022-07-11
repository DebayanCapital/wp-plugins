/**
 * BLOCK: Free Games List
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

//  Import CSS.
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

registerBlockType('wpvue/casino-software-list', {
    title: __( 'Software Providers' ),
    icon: 'format-aside', 
    category: 'CasinoPages',
    keywords: [
      __( 'Software Providers' ),
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
        var content = props.attributes.content;
        var block_id = props.attributes.block_id;
        var qty = props.attributes.qty;
        var group_id = props.attributes.group_id;
        var show_load_more = props.attributes.show_load_more;
        var load_more_qty = props.attributes.load_more_qty;
        var load_more_text = props.attributes.load_more_text;


        var onChangeTitle = function( content ) {
            props.setAttributes({title: content})
        }
        var onChangeContent = function onChangeContent ( content ) {
            props.setAttributes({content: content})
        }  
        var onChangeBlockId = function onChangeBlockId(content) {
            props.setAttributes({block_id: content});
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
                <div className="block-header">Software Providers</div>
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
                <TextControl
                  label={__('Quantity')}
                  onChange={onChangeQty} 
                  value={qty}
                  placeholder={__('Quantity')}
                />
                <label>Do you want to diaplay show more button?</label>
                <br />
                <FormToggle 
                  checked={ show_load_more }
                  onChange={ onChangeLoadMore } 
                />
                
              {
               (show_load_more) ?
                <TextControl
                    label="Please enter load more quantity"
                    onChange={onChangeLoadMoreQty}
                    value={load_more_qty}
                    placeholder="Load more quantity"
                /> : null
              }
              {
               (show_load_more) ?
                <TextControl
                    label="Load more button text"
                    onChange={onChangeLoadMoreText}
                    value={load_more_text}
                    placeholder="Load more button text"
                />: null
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