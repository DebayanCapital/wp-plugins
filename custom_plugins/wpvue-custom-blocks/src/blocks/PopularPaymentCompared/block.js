/**
 * BLOCK: Popular payment compared
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

//  Import CSS.
import Select from "react-dropdown-select";
const url = cgAdmin.homeUrl+'/wp-json/wp/v2/payments?per_page=100' ;
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { TextControl,SelectControl,TextareaControl,PanelBody } = wp.components
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

registerBlockType('wpvue/popular-payment-compared', {
  title: __( 'Popular Casino Payment Options Compared' ),
  icon: 'format-aside',
  category: 'CasinoPages',
  keywords: [
    __( 'Popular Casino Payment Options Compared' ),
  ],

  // Enable or disable support for low-level features
  supports: {
    // Turn off ability to edit HTML of block content
    html: false,
    // Turn off reusable block feature
    reusable: false,
    // Add alignwide and alignfull options
    align: false
  },

  // Set up data model for custom block
  attributes: {
    section_title: {
      type: 'string',
      selector: 'js-payment-compared-title'
    },
    block_id: {
         type: 'string',
    },
    payments:{
        type:'object'
    },    
    values: {
        type: 'array',
    },    
  },

  // The UI for the WordPress editor
  edit: props => {
      
  
      var section_title = props.attributes.section_title;
      var section_content = props.attributes.section_content;
      var block_id = props.attributes.block_id;
      var values = props.attributes.values;
      var payments = props.attributes.payments;
      function onChangeTitle(content) {
          props.setAttributes({section_title: content})
      }
      function onChangeBlockId(content) {
          props.setAttributes({block_id: content});
      }

      function setValues(content) {
          props.setAttributes({values: content});
      }
      if(typeof payments == "undefined"){
          wp.apiFetch({
              url: url
          }).then( payments => {
              props.setAttributes({
                  payments: payments
              })
          } );
      }

      if(!props.attributes.payments){
          return 'Loading......';
      }

      if(props.attributes.payments && props.attributes.payments.length === 0){
          return 'No Payment options found!';
      }
      var data_arr = [];
      {
          props.attributes.payments.map(payment => {
            var data =  {label:payment.title["rendered"], value:payment.id}
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
          <div id="block-payments" className={props.className}>
              <div className="block-header">Popular casino payment compared</div>  
                <TextControl
                    label="Section Title"
                    onChange={onChangeTitle} 
                    value={section_title}
                    placeholder={__('Section Title')}
                />
                <Select values={values} placeholder="Choose payment options" onChange={(values) => setValues(values)} options={data_arr}  multi="{true}"/>         
          </div>
      ]
  },

  // The output on the live site
  save: props => {
    return null
  }
})