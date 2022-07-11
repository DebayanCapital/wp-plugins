/**
 * BLOCK: Casino Image Content Repeater
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

/**
 * External dependencies
 */

import { TextHighlight } from '@wordpress/components';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { TextControl,TextareaControl,SelectControl,FormToggle,Button,Dropdown,PanelBody } = wp.components
const { RichText,RichTextToolbarButton,MediaUpload} = wp.blockEditor
const { withState } = wp.compose
const { InnerBlocks,InspectorControls} = wp.editor;



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

// Register the block
registerBlockType('wpvue/jackpot-winner', {
  title: __( 'Jackpot Winner' ),
  icon: 'format-gallery',
  category: 'CasinoPages',
  keywords: [
    __( 'Jackpot Winner' ),
  ],

  attributes: {
      info: {
          type: 'array',
          selector: '.info-wrap'
      },
      secTitle: {
          type: 'string',
      },
      block_id: {
          type: 'string',
      },

  },

     // edit function
    edit: (props) => {
      var secTitle = props.attributes.secTitle;
      var secSubTitle = props.attributes.secSubTitle;
      var block_id = props.attributes.block_id;


      var onChangeTitle = function( content ) {
          props.setAttributes({secTitle: content})
      }
      var onChangeSubtitle = function onChangeSubtitle ( content ) {
          props.setAttributes({secSubTitle: content})
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
                                className="remove-item"
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
                            <p>Section {infoItem.index+1}</p>
                           <TextControl
                               className="info-item-title"
                               label="Title"
                               value={infoItem.title}
                               placeholder="Title"
                               onChange={ title => {
                                    const newObject = Object.assign({}, infoItem, {
                                        title: title
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                           />
                            <TextControl
                                className="info-item-date"
                                label="Date"
                                value={infoItem.date}
                                placeholder="Date"
                                onChange={ date => {
                                    const newObject = Object.assign({}, infoItem, {
                                        date: date
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                            />
                            <TextControl
                                className="info-item-game"
                                label="Game"
                                value={infoItem.game}
                                placeholder="Game"
                                onChange={ game => {
                                    const newObject = Object.assign({}, infoItem, {
                                        game: game
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                            />
                            <TextControl
                                className="info-item-software"
                                label="Software"
                                value={infoItem.software}
                                placeholder="Software"
                                onChange={ software => {
                                    const newObject = Object.assign({}, infoItem, {
                                        software: software
                                    });
                                    setAttributes({
                                        info: [...info.filter(
                                            item => item.index != infoItem.index
                                        ), newObject]
                                    });
                                } }
                            />
                            <TextControl
                                className="info-item-casino"
                                label="Casino"
                                value={infoItem.casino}
                                placeholder="Casino"
                                onChange={ casino => {
                                    const newObject = Object.assign({}, infoItem, {
                                        casino: casino
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
                <div className="block-header">Jackpot Winner</div>
               <TextControl
               label="Section Title"
               onChange={onChangeTitle}
               value={secTitle}
               placeholder="Title"
               />
               
                <div className="info-wrap">{infoList(info)}</div>
                <Button onClick={title => {
                    setAttributes({
                        info: [...info, {
                            index: info.length,
                            title: "",
                            date: "",
                            game: "",
                            software: "",
                            casino: ""
                        }]
                    });
                }}>Add New Section</Button>
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