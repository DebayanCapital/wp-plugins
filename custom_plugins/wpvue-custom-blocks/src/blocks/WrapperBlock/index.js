/**
 * Wrapper: Section and container wrapper
 */

import classNames from 'classnames'; // Used to to join classes together

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks; 
const { Fragment} = wp.element;
const { InnerBlocks,InspectorControls} = wp.editor;
const {PanelBody,SelectControl} = wp.components;

registerBlockType( 'casinoguidevue/casino-wrapper', {
  title: __( 'Wrapper Block' ), 
  icon: 'editor-table', 
  category: 'CasinoPages',
  keywords: [
    __( 'Wrapper' ),
  ],

  attributes: {
  },

  edit( { attributes, setAttributes, className } ) {
    
    return (
      <Fragment>        
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