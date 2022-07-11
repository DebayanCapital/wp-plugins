/**
 * BLOCK: Bullet Points
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
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

registerBlockType('wpvue/bullet-points', {
    title: __('Bullet Points'),
    icon: 'editor-ol',
    category: 'CasinoPages',
    keywords: [
        __('Bullet Points')
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
        block_id: {
          type: 'string',
        },
        heading: {
          type: 'string',
        },
        bottom_content: {
          type: 'string',
        },
        style: {
          type: 'srting'
        }
    },

    edit(props) {
        var block_id = props.attributes.block_id;
        var heading = props.attributes.heading;
        var bottom_content = props.attributes.bottom_content;
        const config = {
          heading: {
           options: [
               { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
               { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
               { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
               { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
               { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
               { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
               { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
           ]
          }
       };
        const style = props.attributes.style;
        const handleAddItem = () => {
        const items = [ ...props.attributes.items ];
          items.push( {
            text: '',
          } );
          props.setAttributes( { items } );
         
        };
        function onChangeBlockId(content) {
          props.setAttributes({block_id: content});
        }
        function onChangeHeading(content) {
          props.setAttributes({heading: content});
        }
        var onBottomContent = function onBottomContent ( content ){
          props.setAttributes({bottom_content: content});
        }
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
        

        let itemFields,
          itemDisplay;
       

        if ( props.attributes.items.length ) {
          itemFields = props.attributes.items.map( ( item, index ) => {
            return <Fragment key={ index }>
            <div class="item-wrap">
               <div class="item-field">  
              <TextControl                
                placeholder="Write single bullet point text Here"
                value={ props.attributes.items[ index ].text }
                onChange={ ( text ) => handleTextChange( text, index ) }
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
          <div key="2" className={ props.className }>
            <div class="block-header">Bullet Points</div>
                { /*itemDisplay*/ }
                <TextControl
                label={__('Heading')}
                onChange={onChangeHeading} 
                value={heading}
                placeholder={__('Heading')}
                />
                <div className="block-wysiwyg-editor">
	              <div className="components-base-control">
	                <CKEditor 
	                  editor={ ClassicEditor }
	                  data={ bottom_content }
	                  config={config}
	                  onChange={ ( event, editor ) => {
	                    props.setAttributes({bottom_content: editor.getData()});
	                    
	                  } }
	              />
                </div>         
	            </div>
              <SelectControl
               label="Style "
               value={ style }
               options={ [
                 { label: '1 Column', value: 'one-column' },
                 { label: '2 Columns', value: 'two-columns' },
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