/**
 * BLOCK: Teams
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

//  Import CSS.
import Select from "react-dropdown-select";
const url = cgAdmin.homeUrl+'/wp-json/wp/v2/teams' ;
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

registerBlockType('wpvue/casino-teams', {
  title: __( 'Teams' ),
  icon: 'format-aside',
  category: 'CasinoPages',
  keywords: [
    __( 'teams' ),
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
      selector: 'js-teams-title'
    },
    block_id: {
         type: 'string',
    },
    section_content: {
      type: 'string'
    },
    teams:{
        type:'object'
    },    
    values: {
        type: 'array',
    },    
  },

  // The UI for the WordPress editor
  edit: props => {
      
  
      var section_title = props.attributes.section_title;
      var block_id = props.attributes.block_id;      
      var section_content = props.attributes.section_content;
      var values = props.attributes.values;
      var teams = props.attributes.teams;
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
      if(typeof teams == "undefined"){
          wp.apiFetch({
              url: url
          }).then( teams => {
              props.setAttributes({
                  teams: teams
              })
          } );
      }

      if(!props.attributes.teams){
          return 'Loading......';
      }

      if(props.attributes.teams && props.attributes.teams.length === 0){
          return 'No Member found!';
      }
      var data_arr = [];
      {
          props.attributes.teams.map(team => {
            var data =  {label:team.title["rendered"], value:team.id}
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

          <div id="block-teams" className={props.className}>
            <div class="block-header">Teams</div>    
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
                <Select values={values} placeholder="Choose members" onChange={(values) => setValues(values)} options={data_arr}  multi="{true}"/>         
          </div>
      ]
  },

  // The output on the live site
  save: props => {
    return null
  }
})