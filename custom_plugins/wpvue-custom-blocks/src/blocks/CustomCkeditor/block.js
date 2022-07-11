/**
 *  Classic Editor: Custom classic editor with read more option
 */
//  Import CSS.


import './editor.scss'; 
import './style.scss';
const {__} = wp.i18n
const {registerBlockType} = wp.blocks
const {FormToggle,TextControl,Panel,PanelBody,PanelRow } = wp.components
const {InspectorControls} = wp.blockEditor;

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

registerBlockType('wpvue/custom-ck-editor', {
    title: __('Custom CK Editor'),
    icon: 'editor-paste-word',
    category: 'CasinoPages',
    keywords: [
        __( 'Editor', 'cg' ),
        __( 'Classic Editor', 'cg' ),
        __( 'WYSIWYG Editor', 'cg' ),
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
        content: {
            type: 'string'
        },
        block_id: {
            type: 'string',
        },       
        
    },

    edit(props) {

        var content = props.attributes.content;
        var block_id = props.attributes.block_id;
       
        function onChangeBlockId(content) {
            props.setAttributes({block_id: content});
        }
        
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
                <div className="block-wysiwyg-editor">
                  <div className="block-header">CK Editor</div>
                  <div class="components-base-control">
                    <CKEditor 
                      editor={ ClassicEditor }
                      data={ content }
                      config={config}
                      onChange={ ( event, editor ) => {
                        props.setAttributes({content: editor.getData()});
                        
                      } }
                  />
                  </div>         
                </div>
                ]
    },
    save(props) {
        return null
    },
})