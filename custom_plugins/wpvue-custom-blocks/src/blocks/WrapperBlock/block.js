/**
 * BLOCK: Casino Wrapper
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

/**
 * External dependencies 
 */

import classNames from 'classnames'; // Used to to join classes together

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks; 
const { Fragment} = wp.element;
const { InspectorControls,InnerBlocks } = wp.editor;
const {PanelBody,SelectControl,TextControl} = wp.components;

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

registerBlockType( 'wpvue/casino-wrapper', {
  title: __( 'Wrapper Block' ), 
  icon: 'editor-table', 
  category: 'CasinoPages',
  keywords: [
    __( 'Wrapper' ),
  ],

  attributes: {
    block_id: {
          type: 'string',
    },
  },

  edit( { props, attributes, setAttributes, className } ) {
    var block_id = attributes.block_id;
    function onChangeBlockId(content) {
      setAttributes({block_id: content});
    }
    return (
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
      <Fragment>
        <div class="block-header">Wrapper Block</div>        
        <div
          className={ className }
        >
          <InnerBlocks />
        </div>
      </Fragment>
    );
  },

  save( { attributes, className } ) {    

    return (
      <div>BlockId={attributes.block_id}</div>,
      <section 
        className={ className }
      > 
        <div class="container">
          <InnerBlocks.Content />
        </div>
      </section>
    );
  },
} );