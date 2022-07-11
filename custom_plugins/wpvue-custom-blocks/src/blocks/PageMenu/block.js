/**
 * BLOCK: Page Menu
 *
 */

//  Import CSS.
import './editor.scss'; 
import './style.scss';

const {__} = wp.i18n
const {registerBlockType} = wp.blocks
const {Button,IconButton,PanelBody,TextControl,SelectControl} = wp.components;
const {RichText,InspectorControls} = wp.blockEditor;
const {Fragment} = wp.element;

registerBlockType('wpvue/page-menu', {
    title: __('Page Menu'),
    icon: 'tide',
    category: 'CasinoPages',
    keywords: [
        __('Page Menu')
    ],
    supports: {
        html: false,
        reusable: false,
        align: false
    },
    example: {
    },
    // Set up data model for custom block
    attributes: {
        items: {
          type: 'array',
          default: [],
        },
        style: {
          type: 'srting'
        }
    },

    edit(props) {

        const style = props.attributes.style;
        const handleAddItem = () => {
        const items = [ ...props.attributes.items ];
          items.push( {
            text: '',
            link: '',
          } );
          props.setAttributes( { items } );
         
        };
        const onChangeStyle = function onChangeStyle ( content ){
          props.setAttributes({style: content});
        }   
        const handleRemoveItem = ( index ) => {
          const items = [ ...props.attributes.items ];
          items.splice( index, 1 );          
          props.setAttributes( { items } );
        };

        const handleTextChange = ( text, index ) => {
          const items = [ ...props.attributes.items ];
          items[ index ].text = text;
          props.setAttributes( { items } );          
        };
        const handleLinkChange = ( link, index ) => {          
          const items = [ ...props.attributes.items ];
          items[ index ].link = link;
          props.setAttributes( { items } );
        };
        

        let itemFields,
          itemDisplay;
       

        if ( props.attributes.items.length ) {
          itemFields = props.attributes.items.map( ( item, index ) => {
            return <Fragment key={ index }>
            <div class="item-wrap">
               <div class="item-field">  
              <TextControl                
                placeholder="Text Here"
                value={ props.attributes.items[ index ].text }
                onChange={ ( text ) => handleTextChange( text, index ) }
              />
              </div>
              <div class="item-field">  
              <TextControl                
                placeholder="link Here"
                value={ props.attributes.items[ index ].link }
                onChange={ ( link ) => handleLinkChange( link, index ) }
              />              
              </div>     
              <div class="remove-item-wrapper">
                <a href="javascript:void(0);" class="remove-item" onClick={ () => handleRemoveItem( index ) }>Remove Item</a>
              </div>     
              
            </div>
            </Fragment>;
          } );

          itemDisplay = props.attributes.items.map( ( item, index ) => {
            return <p key={ index }>{ item.content }</p>;
          } );
        }

        return [          
          <div key="2" className={ props.className }>
            <div class="block-header">Page Menu</div>
                { /*itemDisplay*/ }
              <SelectControl
               label="Style "
               value={ style }
               options={ [
                 { label: 'Top Menu', value: 'top-menu' },
                 { label: 'Side Menu', value: 'side-menu' },
               ] }
               onChange={onChangeStyle} 
              />
          </div>,
          <div key="1">            
              { itemFields }
            <div class="add-item-wrapper">
              <Button
                isDefault
                onClick={ handleAddItem.bind( this ) }
                className="add-item"
              >
                { __( 'Add Item' ) }
              </Button>
            </div>
          </div>
        ];
    },
    save(props) {
        return null
    },
})