/**
 * BLOCK: Detail Page Banner Block
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

registerBlockType('wpvue/detail-page-banner', {
    title: __( 'Detail Page Banner' ),
    icon: 'welcome-view-site', 
    category: 'CasinoPages',
    keywords: [
      __( 'Detail Page Banner' ),
    ],
    supports: {
       html: false,
       reusable: false,
       align: false
    },
    attributes: {
        block_id: {
            type: 'string',
        },
        title: {
            type: 'string',
        },
        subtitle: {
            type: 'string',
        },
        partnerId: {
            type: 'string',

        },
        group_id: {
            type: 'string',
        }, 
        gameUrl: {
            type: 'string',
        },
        videoLink: {
            type: 'string',
        },
        bannerOption:{
            type:'string',
            default:'ReviewBanner',
        },
        urlType:{
            type:'string',
            default:'gameUrl'
        },
    },


    edit: props => {
        var block_id = props.attributes.block_id;
        var title = props.attributes.title;
        var subtitle = props.attributes.subtitle;
        var partnerId = props.attributes.partnerId;
        var group_id = props.attributes.group_id;
        var gameUrl = props.attributes.gameUrl;
        var videoLink = props.attributes.videoLink;
        var bannerOption = props.attributes.bannerOption;
        var urlType = props.attributes.urlType;

        var onChangeTitle = function( content ) {
            props.setAttributes({title: content})
        }
        var onChangeBlockId = function onChangeBlockId(content) {
           props.setAttributes({block_id: content});
        }
        var onChangeSubtitle = function onChangeSubtitle ( content ) {
            props.setAttributes({subtitle: content})
        }  
        var onChangeGroupId = function onChangeGroupId ( content ) {
            props.setAttributes({group_id: content})
        } 
        var onChangePartnerId = function onChangePartnerId(content) {
            props.setAttributes({partnerId: content})
        }
        var onChangeGameUrl = function onChangeGameUrl(content) {
            props.setAttributes({gameUrl: content})
        }
        var onChangeVideoLink = function onChangeVideoLink(content) {
            props.setAttributes({videoLink: content})
        }
        function onChangeBannerOption(content) {
            props.setAttributes({bannerOption: content});
        }
        function onChangeUrlType(content) {
            props.setAttributes({urlType: content});
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
                <div className="block-header">Detail Page Banner</div>
               <SelectControl
                label="Banner Options"
                value={ bannerOption }
                options={ [
            
                { label: 'Casino Review Banner', value: 'ReviewBanner' },
                { label: 'Free Game Detail Banner', value: 'GameDetailBanner' },
                
                ] }
                onChange={onChangeBannerOption} 
               /> 
               <TextControl
                   label="Title"
                   onChange={onChangeTitle}
                   value={title}
                   placeholder="Title"
               />
               <TextControl
                   label={__('Subtitle')}
                   onChange={onChangeSubtitle} 
                   value={subtitle}
                   placeholder={__('Subtitle')}
               />
                <TextControl
                    label="Group Id"
                    onChange={onChangeGroupId}
                    value={group_id}
                    placeholder="Group Id" 
                />
                <TextControl
                  label={__('Partner Id')}
                  onChange={onChangePartnerId} 
                  value={partnerId}
                  placeholder={__('Partner Id')}
                />
                {
                (bannerOption=='GameDetailBanner')? 
                <SelectControl
                label="Url type"
                value={ urlType }
                options={ [
            
                { label: 'Game url', value: 'gameUrl' },
                { label: 'Video link', value: 'videoLink' },
                
                ] }
                onChange={onChangeUrlType} 
               />
               : null
               }
                {
                (bannerOption=='GameDetailBanner' && urlType=='gameUrl')? 
                <TextControl
                  label={__('Game Url')}
                  onChange={onChangeGameUrl} 
                  value={gameUrl}
                  placeholder={__('Game Url')}
                />
                : null 
                }
                {
                (bannerOption=='GameDetailBanner' && urlType=='videoLink')? 
                <TextControl
                  label={__('Video Link')}
                  onChange={onChangeVideoLink} 
                  value={videoLink}
                  placeholder={__('Video Link')}
                />  
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