/**
 * BLOCK: Newsletter Block
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

registerBlockType('wpvue/newsletter-block', {
    title: __( 'Newsletter Block' ),
    icon: 'email-alt2', 
    category: 'CasinoPages',
    keywords: [
      __( 'Newsletter Block' ),
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
        eighteen_text: {
            type: 'string',
        },
        confirm_text: {
            type: 'string',

        },
        button_text: {
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


    edit: props => {
        var title = props.attributes.title;
        var block_id = props.attributes.block_id;
        var eighteen_text = props.attributes.eighteen_text;
        var confirm_text = props.attributes.confirm_text;
        var button_text = props.attributes.button_text;
        var imgURL = props.attributes.imgURL;

        var onChangeTitle = function( content ) {
            props.setAttributes({title: content})
        }
        var onChangeBlockId = function onChangeBlockId(content) {
           props.setAttributes({block_id: content});
        }
        var onChangeEighteenText = function onChangeEighteenText ( content ) {
            props.setAttributes({eighteen_text: content})
        }   
        var onChangeConfirmText = function onChangeConfirmText(content) {
            props.setAttributes({confirm_text: content})
        }
        var onChangeButtonText = function onChangeButtonText(content) {
            props.setAttributes({button_text: content})
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
            <div id="block-nesletter-options" >
                <div class="block-header">Newsletter Block</div>
               <TextControl
                   label="Title"
                   onChange={onChangeTitle}
                   value={title}
                   placeholder="Title"
               />
               <TextareaControl
                   label={__('Confirm Text 1')}
                   onChange={onChangeEighteenText} 
                   value={eighteen_text}
                   placeholder={__('Content')}
               />
                <TextareaControl
                  label={__('Confirm Text 2')}
                  onChange={onChangeConfirmText} 
                  value={confirm_text}
                  placeholder={__('Content')}
                />
               <TextControl
                  label={__('Button Text')}
                  onChange={onChangeButtonText} 
                  value={button_text}
                  placeholder={__('Button text')}
                />
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
			   Background Image
			   </Button>
			   }
			   />
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