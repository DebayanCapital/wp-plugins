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
const { MediaUpload} = wp.blockEditor
const { TextControl,TextareaControl,FormToggle,Button,PanelBody,SelectControl } = wp.components
const { withState } = wp.compose
const {InspectorControls} = wp.blockEditor;

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

registerBlockType('wpvue/slot-information', {
    title: __('Slot Information'),
    icon: 'tide',
    category: 'CasinoPages',
    keywords: [
        __('Slot Information')
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
        software: {
            type: 'string',
        },
        released: {
            type: 'string',
        },
        rtp: {
            type: 'string',
        },
        volatility: {
            type: 'string',
        },
        max_win: {
            type: 'string',
        },
        min_max_bet: {
            type: 'string',
        },
        layout: {
            type: 'string',
        },
        lines: {
            type: 'string',
        },
        mobile_compatible: {
            type: 'string',
        },
        block_id: {
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
        content: {
            type: 'string',
        },
    },

    edit: props => {
        var title = props.attributes.title;
        var block_id = props.attributes.block_id;
        var software = props.attributes.software;
        var released = props.attributes.released;
        var rtp = props.attributes.rtp;
        var volatility = props.attributes.volatility;
        var max_win = props.attributes.max_win;
        var min_max_bet = props.attributes.min_max_bet;
        var layout = props.attributes.layout;
        var lines = props.attributes.lines;
        var mobile_compatible = props.attributes.mobile_compatible;
        var imgUrl = props.attributes.imgURL;
        var content = props.attributes.content;

        var onShowmore = function onShowmore(state){
            props.setAttributes({show_more: (!show_more)?true:false});
        }
        var onChangeBlockId = function onChangeBlockId(content) {
            props.setAttributes({block_id: content});
        }
        var onChangeTitle = function onChangeTitle(content){
            props.setAttributes({title: content});
        }
        var onChangeSoftware = function onChangeSoftware(content){
            props.setAttributes({software: content});
        }
        var onChangeReleased = function onChangeReleased(content){
            props.setAttributes({released: content});
        }
        var onChangeRtp = function onChangeRtp(content){
            props.setAttributes({rtp: content});
        }
        var onChangeVolatility = function onChangeVolatility(content){
            props.setAttributes({volatility: content});
        }
        var onChangeMaxWin = function onChangeMaxWin(content){
            props.setAttributes({max_win: content});
        }
        var onChangeMinMaxBet = function onChangeMinMaxBet(content){
            props.setAttributes({min_max_bet: content});
        }
        var onChangeLayout = function onChangeLayout(content){
            props.setAttributes({layout: content});
        }
        var onChangeLines = function onChangeLines(content){
            props.setAttributes({lines: content});
        }
        var onChangeMobileCompatible = function onChangeMobileCompatible(content){
            props.setAttributes({mobile_compatible: content});
        }
        var onChangeContent = function onChangeContent(content){
            props.setAttributes({content: content});
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
            <div id="casino-game-lists">
                <div className="block-header">Slot Information</div>
               <TextControl
                label="Title"
                onChange={onChangeTitle}
                value={title}
                placeholder="Title"
               /> 
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
               Image
               </Button>
               }
               />
               }
              <TextControl
                label="Software"
                onChange={onChangeSoftware}
                value={software}
                placeholder="Software"
              /> 
              <TextControl
                label="Released"
                onChange={onChangeReleased}
                value={released}
                placeholder="Released"
              /> 
              <TextControl
                label="RTP"
                onChange={onChangeRtp}
                value={rtp}
                placeholder="RTP"
              /> 
              <TextControl
                label="Volatility"
                onChange={onChangeVolatility}
                value={volatility}
                placeholder="Volatility"
              /> 
              <TextControl
                label="Max Win"
                onChange={onChangeMaxWin}
                value={max_win}
                placeholder="Max win"
              /> 
              <TextControl
                label="Min / Max Bet"
                onChange={onChangeMinMaxBet}
                value={min_max_bet}
                placeholder="Min / Max Bet"
              /> 
              <TextControl
                label="Layout"
                onChange={onChangeLayout}
                value={layout}
                placeholder="Layout"
              /> 
              <TextControl
                label="Lines / Ways"
                onChange={onChangeLines}
                value={lines}
                placeholder="Lines / Ways"
              /> 
              <TextControl
                label="Mobile Compatible"
                onChange={onChangeMobileCompatible}
                value={mobile_compatible}
                placeholder="Mobile Compatible"
              /> 
              <TextareaControl
                    label="Content"
                    onChange={onChangeContent}
                    value={content}
                    placeholder="Content" 
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
   