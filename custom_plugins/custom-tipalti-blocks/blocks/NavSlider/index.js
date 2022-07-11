/**
 * BLOCK: Nav Slider
 *
 */

//  Import CSS.

const {__} = wp.i18n
const {registerBlockType} = wp.blocks
const {Button,IconButton,PanelBody,TextControl,SelectControl,RadioControl,FormToggle} = wp.components;
const {RichText,InspectorControls} = wp.blockEditor;
const {Fragment} = wp.element;
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

registerBlockType('tipalti-custom-block/nav-slider', {
    title: __('Nav Slider'),
    icon: 'tide',
    category: 'common',
    keywords: [
      __( 'nav' ),
      __( 'slider' ),
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
        },
    },

    edit(props) {

        const style = props.attributes.style;
        const handleAddItem = () => {
        const items = [ ...props.attributes.items ];
          items.push( {
            nav_text: '',
            content_heading: '',
            content: '',
            button_name: '',
            button_url: '',
            target: false,
          } );
          props.setAttributes( { items } );
         
        };
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
        const onChangeStyle = function onChangeStyle ( content ){
          props.setAttributes({style: content});
        }   
        const handleRemoveItem = ( index ) => {
          const items = [ ...props.attributes.items ];
          items.splice( index, 1 );          
          props.setAttributes( { items } );
        };

        const handleNavTextChange = ( nav_text, index ) => {
          const items = [ ...props.attributes.items ];
          items[ index ].nav_text = nav_text;
          props.setAttributes( { items } );          
        };
        const handleContentHeadingChange = ( content_heading, index ) => {          
          const items = [ ...props.attributes.items ];
          items[ index ].content_heading = content_heading;
          props.setAttributes( { items } );
        };
        const handleButtonNameChange = ( button_name, index ) => {          
          const items = [ ...props.attributes.items ];
          items[ index ].button_name = button_name;
          props.setAttributes( { items } );
        };
        const handleButtonUrlChange = ( button_url, index ) => {          
          const items = [ ...props.attributes.items ];
          items[ index ].button_url = button_url;
          props.setAttributes( { items } );
        };
        const handleContentChange = ( content, index ) => {          
          const items = [ ...props.attributes.items ];
          items[ index ].content = content;
          props.setAttributes( { items } );
        };
        const handleTargetChange = (  index ) => { 
          const items = [ ...props.attributes.items ];
          items[ index ].target = !(items[ index ].target)?true:false;
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
                label="Nav name"                
                placeholder="Nav Text Here"
                value={ props.attributes.items[ index ].nav_text }
                onChange={ ( nav_text ) => handleNavTextChange( nav_text, index ) }
              />
              </div>
              <div class="item-field">  
              <TextControl
                label="Content Heading"                
                placeholder="Content Heading Here"
                value={ props.attributes.items[ index ].content_heading }
                onChange={ ( content_heading ) => handleContentHeadingChange( content_heading, index ) }
              />              
              </div>
                <div className="block-wysiwyg-editor">
                  <div className="components-base-control">
                  <CKEditor
                    editor={ ClassicEditor }
                    data={props.attributes.items[ index ].content}
                    onReady={ editor => {
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                      handleContentChange( editor.getData(), index );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                  </div>         
                </div>
                  <br />
                <TextControl
                    className="info-item-btn"
                    label="Button name"
                    value={ props.attributes.items[ index ].button_name }
                    placeholder="Button Name"
                    onChange={ ( button_name ) =>  handleButtonNameChange( button_name, index ) }
                />
                <TextControl
                    className="info-item-btn-url"
                    label="Button url"
                    value={ props.attributes.items[ index ].button_url }
                    placeholder="Button Url"
                    onChange={ ( button_url ) =>  handleButtonUrlChange( button_url, index ) }
                /> 
                <div className="components-base-control">
                Open in a new tab 
                <FormToggle                    
                    checked={ props.attributes.items[ index ].target }
                    onChange={(value ) => {                                 
                        handleTargetChange(index);
                    }}
                />
                </div>    
              <div class="remove-item-wrapper">
                <a href="javascript:void(0);" class="remove-nav-item" onClick={ () => handleRemoveItem( index ) }>Remove Item</a>
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
            <div class="block-header">Nav Slider</div>
                { /*itemDisplay*/ }
              <SelectControl
               label="Style "
               value={ style }
               options={ [
                 { label: 'Benefits', value: 'benefits' },
                 { label: 'Another Style', value: 'side-menu' },
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