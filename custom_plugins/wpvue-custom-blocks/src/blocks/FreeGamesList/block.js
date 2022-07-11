/**
 * BLOCK: Free Games List
 *
 */

//  Import CSS.
import './editor.scss'; 
import './style.scss';

//  Import CSS.
import Select from "react-dropdown-select";
const { __ } = wp.i18n
const url = cgAdmin.homeUrl+'/wp-json/wp/v2/free_game_category' ;
const { registerBlockType } = wp.blocks
const { MediaUpload} = wp.blockEditor
const { TextControl,FormToggle,Button,PanelBody,SelectControl } = wp.components
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

registerBlockType('wpvue/free-games-list', {
    title: __('Free Games List'),
    icon: 'tide',
    category: 'CasinoPages',
    keywords: [
        __('Casino Free Games')
    ],
    supports: {
       html: false,
       reusable: false,
       align: false
    },

    attributes: {
        secTitle: {
            type: 'string',
        },
        block_id: {
           type: 'string',
        },
        btntxt: {
            type: 'string',
        },
        style: {
          type: 'string',
        },
        values: {
            type: 'array',
        },
        countQty: {
            type: 'string',
            default: '2'
        },
        show_more: {
            type: 'boolean',
            default: false,
        },
        qty: {
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
        var secTitle = props.attributes.secTitle;
        var block_id = props.attributes.block_id;
        var style = props.attributes.style;
        var show_more = props.attributes.show_more;
        var btntxt = props.attributes.btntxt;
        var countQty = props.attributes.countQty;
        var qty = props.attributes.qty;
        var imgUrl = props.attributes.imgURL;
        var values = props.attributes.values;

        var onShowmore = function onShowmore(state){
            props.setAttributes({show_more: (!show_more)?true:false});
        }
        var onChangeBlockId = function onChangeBlockId(content) {
            props.setAttributes({block_id: content});
        }
        var onSecTitle = function onSecTitle(content){
            props.setAttributes({secTitle: content});
        }
        var onChangeStyle = function onChangeStyle ( content ){
          props.setAttributes({style: content});
        }  
        var onChangeQty = function onChangeQty(content) {
            props.setAttributes({qty: content})
        }
        var onChangeBtnTxt = function onChangeBtnTxt(content){
            props.setAttributes({btntxt: content});
        }

        var onChangeLmQty = function onChangeLmQty(content){
            props.setAttributes({countQty: content});
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
        function setValues(content) {
            props.setAttributes({values: content});
        }
        if(typeof game_category == "undefined"){
            wp.apiFetch({
                url: url
            }).then( game_category => {
                props.setAttributes({
                    game_category: game_category
                })
            } );
        }
  
        if(!props.attributes.game_category){
            return 'Loading......';
        }
  
        if(props.attributes.game_category && props.attributes.game_category.length === 0){
            return 'No match found!';
        }
        var data_arr = [];
        {
        props.attributes.game_category.map(game_category => {
          var data =  {label:game_category.name, value:game_category.id}
          data_arr.push(data);
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
                <div className="block-header">Free Games With Category</div>
              <SelectControl
                  label="Style "
                  value={ style }
                  options={ [
                      { label: 'List with category view', value: 'list-cat' },
                      { label: 'List slide view', value: 'list-slide' },
                      { label: 'List with user defined category', value: 'list-with-defined-category' },
                  ] }
                  onChange={ ( style ) => props.setAttributes( { style: style } ) }
              />
              {
                (style=='list-with-defined-category')? 
              <Select values={values} placeholder="Choose Free Games Category as per order" onChange={(values) => setValues(values)} options={data_arr} multi="{true}"/>
              :null
              }
               <TextControl
                label="Section Title"
                onChange={onSecTitle}
                value={secTitle}
                placeholder="Section Title"
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
                checked={ show_more }
                onChange={ onShowmore } 
               />
               <br />
               {(show_more) && (
                <TextControl
                    label="Button Text"
                    onChange={onChangeBtnTxt}
                    value={btntxt}
                    placeholder="Button text"
                />
                )}
                {(show_more) && (
                <TextControl
                    label="Load More Quantity"
                    onChange={onChangeLmQty}
                    value={countQty}
                    placeholder="Load more quantity"
                />
               )}

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
   