/**
 * BLOCK: Google Map Block
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

registerBlockType('wpvue/google-map', {
    title: __( 'Google Map' ),
    icon: 'format-aside', 
    category: 'CasinoPages',
    keywords: [
      __( 'Google Map' ),
    ],
    supports: {
       html: false,
       reusable: false,
       align: false
    },
    attributes: {
        latitude: {
            type: 'string',
        },
        longitude: {
            type: 'string',
        },
        block_id: {
         type: 'string',
        },
    },


    edit: props => {
        var latitude = props.attributes.latitude;
        var longitude = props.attributes.longitude;
        var block_id = props.attributes.block_id;

        var onChangeLatitude = function onChangeLatitude( content ) {
            props.setAttributes({latitude: content})
        }
        var onChangeLongitude = function onChangeLongitude ( content ) {
            props.setAttributes({longitude: content})
        }
        var onChangeBlockId = function onChangeBlockId(content) {
            props.setAttributes({block_id: content});
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
            <div id="block-payment-options" >
                <div class="block-header">Google Map</div>
               <TextControl
                   label="Latitude"
                   onChange={onChangeLatitude}
                   value={latitude}
                   placeholder="latitude"
               />
               <TextControl
                   label={__('Longitude')}
                   onChange={onChangeLongitude} 
                   value={longitude}
                   placeholder={__('longitude')}
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