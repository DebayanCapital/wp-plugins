/**
 * BLOCK: free_games
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

//  Import CSS.
import Select from "react-dropdown-select";
const url = cgAdmin.homeUrl+'/wp-json/wp/v2/free_games?per_page=100' ;
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

registerBlockType('wpvue/free-games-category', {
  title: __( 'Casino Games List' ),
  icon: 'format-aside',
  category: 'CasinoPages',
  keywords: [
    __( 'casino games list' ),
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
      selector: 'js-free-games-title'
    },
    block_id: {
         type: 'string',
    },
    section_content: {
      type: 'string'
    },
    free_games:{
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
      var free_games = props.attributes.free_games;
      function onChangeTitle(content) {
          props.setAttributes({section_title: content})
      }
      function onChangeContent(content) {
          props.setAttributes({section_content: content})
      }
      function onChangeBlockId(content) {
          props.setAttributes({block_id: content});
      }

      function setValues(content) {
          props.setAttributes({values: content});
      }
      if(typeof free_games == "undefined"){
          wp.apiFetch({
              url: url
          }).then( free_games => {
              props.setAttributes({
                  free_games: free_games
              })
          } );
      }

      if(!props.attributes.free_games){
          return 'Loading......';
      }

      if(props.attributes.free_games && props.attributes.free_games.length === 0){
          return 'No Fre Games found!';
      }
      var data_arr = [];
      {
          props.attributes.free_games.map(free_game => {
            var data =  {label:free_game.title["rendered"], value:free_game.id}
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
          <div id="block-free-games" className={props.className}>
              <div class="block-header">Free Games</div>  
                <TextControl
                    label="Section Title"
                    onChange={onChangeTitle} 
                    value={section_title}
                    placeholder={__('Section Title')}
                />
                <TextareaControl
                    label="Section Content"
                    onChange={onChangeContent}
                    value={section_content}
                    placeholder="section Content"
                />
                <Select values={values} placeholder="Choose free games" onChange={(values) => setValues(values)} options={data_arr}  multi="{true}"/>         
          </div>
      ]
  },

  // The output on the live site
  save: props => {
    return null
  }
})