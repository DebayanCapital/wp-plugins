/**
 * BLOCK: Contact Block
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

registerBlockType('wpvue/contact-block', {
    title: __( 'Contact Block' ),
    icon: 'format-aside', 
    category: 'CasinoPages',
    keywords: [
      __( 'Contact Block' ),
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
        address: {
            type: 'string',

        },
        facebook: {
            type: 'string',

        },
        twitter: {
            type: 'string',
            default:''
        },
        recipients: {
            type: 'string',
            default:''
        },
        site_key: {
            type: 'string',
            default:''
        },
    },


    edit: props => {
        var title = props.attributes.title;
        var block_id = props.attributes.block_id;
        var content = props.attributes.content;
        var address = props.attributes.address;
        var facebook = props.attributes.facebook;
        var twitter = props.attributes.twitter;
        var recipients = props.attributes.recipients;
        var site_key = props.attributes.site_key;


        var onChangeTitle = function( content ) {
            props.setAttributes({title: content})
        }
        var onChangeBlockId = function onChangeBlockId(content) {
           props.setAttributes({block_id: content});
        }
        var onChangeContent = function onChangeContent ( content ) {
            props.setAttributes({content: content})
        }   
        var onChangeAddress = function onChangeAddress(content) {
            props.setAttributes({address: content})
        }
        var onChangeFacebook = function onChangeFacebook(content) {
            props.setAttributes({facebook: content})
        }
        var onChangeTwitter = function onChangeTwitter(content) {
            props.setAttributes({twitter: content});
        };
        var onChangeRecipients = function onChangeRecipients(content) {
            props.setAttributes({recipients: content});
        };
        var onChangeSiteKey = function onChangeSiteKey(content) {
            props.setAttributes({site_key: content});
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
                <div class="block-header">Contact Block</div>
               <TextControl
                   label="Title"
                   onChange={onChangeTitle}
                   value={title}
                   placeholder="Title"
               />
               <TextareaControl
                   label={__('Content')}
                   onChange={onChangeContent} 
                   value={content}
                   placeholder={__('Content')}
               />
                <TextareaControl
                  label={__('Address')}
                  onChange={onChangeAddress} 
                  value={address}
                  placeholder={__('Address')}
                />
               <TextControl
                  label={__('Facebook Url')}
                  onChange={onChangeFacebook} 
                  value={facebook}
                  placeholder={__('https://www.facebook.com/pagename')}
                />
                <TextControl
                  label={__('Twitter Url')}
                  onChange={onChangeTwitter} 
                  value={twitter}
                  placeholder={__('https://www.twitter.com/profilename')}
                />
                <TextControl
                  label={__('Recipients')}
                  onChange={onChangeRecipients} 
                  value={recipients}
                  placeholder={__('Give comma seperated email addresses. Ex: abc@gmail.com, def@gmail.com')}
                />
                <TextControl
                  label={__('Google Recaptcha V2 Site key')}
                  onChange={onChangeSiteKey} 
                  value={site_key}
                  placeholder={__('Give Google Recaptcha V2 Site key')}
                />
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