/**
 * BLOCK: US Map Block
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

/**
 * External dependencies
 */

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks; 
const { TextControl,TextareaControl,SelectControl,PanelBody,RadioControl } = wp.components
const { RichText,RichTextToolbarButton,MediaUpload} = wp.blockEditor
const { Button } = wp.components
const { FormToggle } = wp.components
const { withState } = wp.compose
const {InspectorControls} = wp.blockEditor;

const state_list = [
            {
			  "name": "Alaska",
			  "abbreviation": "AK"
			},
			{
			  "name": "Alabama",
			  "abbreviation": "AL"
			},
			{
			  "name": "Arkansas",
			  "abbreviation": "AR"
			},
			{
			  "name": "Arizona",
			  "abbreviation": "AZ"
			},
			{
			  "name": "California",
			  "abbreviation": "CA"
			},
			{
			  "name": "Colorado",
			  "abbreviation": "CO"
			},
			{
			  "name": "Connecticut",
			  "abbreviation": "CT"
			},
			{
			  "name": "Delaware",
			  "abbreviation": "DE"
			},
			{
			  "name": "Florida",
			  "abbreviation": "FL"
			},
			{
			  "name": "Georgia",
			  "abbreviation": "GA"
			},
			{
			  "name": "Hawaii",
			  "abbreviation": "HI"
			},
			{
			  "name": "Iowa",
			  "abbreviation": "IA"
			},
			 
			{
			  "name": "Idaho",
			  "abbreviation": "ID"
			},

			{
			  "name": "Illinois",
			  "abbreviation": "IL"
			},
			{
			  "name": "Indiana",
			  "abbreviation": "IN"
			},
			{
			  "name": "Kansas",
			  "abbreviation": "KS"
			},
			{
			  "name": "Kentucky",
			  "abbreviation": "KY"
			},
			{
			  "name": "Louisiana",
			  "abbreviation": "LA"
			},
			{
			  "name": "Massachusetts",
			  "abbreviation": "MA"
			},
			{
			  "name": "Maryland",
			  "abbreviation": "MD"
			},
			{
			  "name": "Maine",
			  "abbreviation": "ME"
			},

			{
			  "name": "Michigan",
			  "abbreviation": "MI"
			},
			{
			  "name": "Minnesota",
			  "abbreviation": "MN"
			},
			{
			  "name": "Missouri",
			  "abbreviation": "MO"
			},
			{
			  "name": "Mississippi",
			  "abbreviation": "MS"
			},
			{
			  "name": "Montana",
			  "abbreviation": "MT"
			},
			{
			  "name": "North Carolina",
			  "abbreviation": "NC"
			},
			{
			  "name": "North Dakota",
			  "abbreviation": "ND"
			},
			{
			  "name": "Nebraska",
			  "abbreviation": "NE"
			},
			{
			  "name": "New Hampshire",
			  "abbreviation": "NH"
			},
			{
			  "name": "New Jersey",
			  "abbreviation": "NJ"
			},
			{
			  "name": "New Mexico",
			  "abbreviation": "NM"
			},
			{
			  "name": "Nevada",
			  "abbreviation": "NV"
			},
			{
			  "name": "New York",
			  "abbreviation": "NY"
			},
			{
			  "name": "Ohio",
			  "abbreviation": "OH"
			},
			 
			{
			  "name": "Oklahoma",
			  "abbreviation": "OK"
			},
			{
			  "name": "Oregon",
			  "abbreviation": "OR"
			},
			{
			  "name": "Pennsylvania",
			  "abbreviation": "PA"
			},
			{
			  "name": "Rhode Island",
			  "abbreviation": "RI"
			},
			{
			  "name": "South Carolina",
			  "abbreviation": "SC"
			},
			{
			  "name": "South Dakota",
			  "abbreviation": "SD"
			},
			{
			  "name": "Tennessee",
			  "abbreviation": "TN"
			},
			{
			  "name": "Texas",
			  "abbreviation": "TX"
			},

			{
			  "name": "Utah",
			  "abbreviation": "UT"
			},
			 
			{
			  "name": "Virginia",
			  "abbreviation": "VA"
			},
			{
			  "name": "Vermont",
			  "abbreviation": "VT"
			},
			{
			  "name": "Washington",
			  "abbreviation": "WA"
			},
			{
			  "name": "Wisconsin",
			  "abbreviation": "WI"
			},
			{
			  "name": "West Virginia",
			  "abbreviation": "WV"
			},
			{
			  "name": "Wyoming",
			  "abbreviation": "WY"
			}
        ];

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

registerBlockType('wpvue/map-block', {
  title: __( 'US Map Block' ),
  icon: 'camera',
  category: 'CasinoPages',
  keywords: [
    __( 'US Map Block' ),
   //    __( 'casino list rows' ), 
  ],
  supports: {
    html: false,
    reusable: false,
    align: false
  },
   
  attributes: {
      info: {
          type: 'array',
          selector: '.info-wrap'
      },
      state_lists:{
        type:'object'
      }, 
      block_id: {
          type: 'string',
	  },
	  heading: {
		type: 'string',
	  },
  },

     // edit function
    edit: (props) => {
      var state_lists = props.attributes.state_lists;
      var block_id = props.attributes.block_id;
      var heading = props.attributes.heading;
      if(typeof state_lists == "undefined"){
              props.setAttributes({
                  state_lists: state_list
              });
      }

      if(!props.attributes.state_lists){
          return 'Loading......';
      }

      if(props.attributes.state_lists && props.attributes.state_lists.length === 0){
          return 'No Testimonial found!';
      }
      var data_arr = [];
      {
          props.attributes.state_lists.map(test => {
            var data =  {label:test.name, value:test.abbreviation}
            data_arr.push(data);
          });
      }

      // var data_arr = [];
      // {
      //     props.attributes.state_list.map(state => {
      //       var data =  {label:state.name, value:state.abbreviation}
      //       data_arr.push(data);
      //     });
	  // }
	  function onChangeHeading(content) {
		props.setAttributes({heading: content});
	  }
      var onChangeBlockId = function onChangeBlockId(content) {
           props.setAttributes({block_id: content});
      }
      const { 
          attributes: { info = [] },
          setAttributes, className
      } = props;

        const infoList = (value) => {
            return(
                value.sort((a, b) => a.index - b.index).map(infoItem => {
                    return(
                        <div className="info-item">
                            <Button
                                className="remove-item cross-button"
                                onClick={ () => {
                                    const newInfo = info.filter(item => item.index != infoItem.index).map(i => {
                                        if(i.index > infoItem.index){
                                            i.index -= 1;
                                        }
                                        return i;
                                    } );
                                    setAttributes({ info: newInfo });
                                } }
                            >&times;</Button>
                            <p className="section-heading">Section {infoItem.index+1}</p>

                            <SelectControl
                                className="info-item-state"
                                label="Select state"
                                value={ infoItem.state } // e.g: value = [ 'a', 'c' ]
                                options={ data_arr }
                                onChange={ state => {
                                    const newObject = Object.assign({}, infoItem, {
                                        state: state
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                            />
                          <TextControl
                               className="info-item-url"
                               label="URL"
                               value={infoItem.url}
                               placeholder="url"
                               onChange={ url => {
                                    const newObject = Object.assign({}, infoItem, {
                                        url: url
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                           />
                            <RadioControl
                                label="State type"
                                value={ infoItem.state_type }
                                options={ [
                                   { label: 'Regulated', value: 'regulated' },
                                   { label: 'Non-Regulated', value: 'non-regulated' },
                                   { label: 'Regulation in progress', value: 'regulation-progress' },
                                 ] }
                                onChange={ state_type => {
                                    const newObject = Object.assign({}, infoItem, {
                                        state_type: state_type
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                            />
                            <hr />
                        </div>
                    )
                })
            )
        }

        return[
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
            <div className={className}>
                <div class="block-header">Map Block</div>
				<TextControl
					label={__('Heading')}
					onChange={onChangeHeading} 
					value={heading}
					placeholder={__('Heading')}
                />
                <div className="info-wrap">{infoList(info)}</div>
                <Button className="add-more-button" onClick={title => {
                    setAttributes({
                        info: [...info, {
                            index: info.length,
                            state: "AL",
                            url: "",
                            state_type:'non-regulated',
                        }]
                    });
                }}>Add state</Button>
            </div>
        ]
    },

    // save function
    save: (props) => {
        const info = props.attributes.info;
        const displayInfoList = (value) => {
            return(
                value.map( infoItem => {
                    return(
                        <div className="info-item">
                            <RichText.Content
                                tagName="h4"
                                className="info-item-title"
                                value={infoItem.title}
                                style={{ height: 58 }}
                            />
                        </div>
                    )
                } )
            )
        }

        return(
            <div className={props.className}>
                <div className="info-wrap">{ displayInfoList(info) }</div>
            </div>
        );
    }
} )