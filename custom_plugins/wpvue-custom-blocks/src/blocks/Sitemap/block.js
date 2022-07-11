/**
 * BLOCK: Sitemap
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

//  Import CSS.
// import Select from "react-dropdown-select";
// const url = cgAdmin.homeUrl+'/wp-json/wp/v2/testimonials' ;
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

registerBlockType('wpvue/casino-sitemap', {
  title: __( 'Sitemap' ),
  icon: 'format-aside',
  category: 'CasinoPages',
  keywords: [
    __( 'sitemap' ),
  ],

  // // Enable or disable support for low-level features
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
      selector: 'js-sitemap-title'
    },
  //   block_id: {
  //        type: 'string',
  //   },
  //   section_content: {
  //     type: 'string'
  //   },
  //   testimonials:{
  //       type:'object'
  //   },    
  //   values: {
  //       type: 'array',
  //   },    
  },

  // // The UI for the WordPress editor
  edit: props => {
      
  
      var section_title = props.attributes.section_title;
  //     var section_content = props.attributes.section_content;
  //     var block_id = props.attributes.block_id;
  //     var values = props.attributes.values;
  //     var testimonials = props.attributes.testimonials;
      function onChangeTitle(content) {
          props.setAttributes({section_title: content})
      }
  //     function onChangeContent(content) {
  //         props.setAttributes({section_content: content})
  //     }
  //     function onChangeBlockId(content) {
  //         props.setAttributes({block_id: content});
  //     }

  //     function setValues(content) {
  //         props.setAttributes({values: content});
  //     }
  //     if(typeof testimonials == "undefined"){
  //         wp.apiFetch({
  //             url: url
  //         }).then( testimonials => {
  //             props.setAttributes({
  //                 testimonials: testimonials
  //             })
  //         } );
  //     }

  //     if(!props.attributes.testimonials){
  //         return 'Loading......';
  //     }

  //     if(props.attributes.testimonials && props.attributes.testimonials.length === 0){
  //         return 'No Testimonial found!';
  //     }
  //     var data_arr = [];
  //     {
  //         props.attributes.testimonials.map(testimonial => {
  //           var data =  {label:testimonial.title["rendered"], value:testimonial.id}
  //           data_arr.push(data);
  //         });
      return [
          <div id="block-sitemap" className={props.className}>
              <div class="block-header">Sitemap</div>  
                <TextControl
                    label="Section Title"
                    onChange={onChangeTitle} 
                    value={section_title}
                    placeholder={__('Section Title')}
                />
                </div>
      ]

      },
      
        
    


  // The output on the live site
  save: props => {
    return null
  }
})