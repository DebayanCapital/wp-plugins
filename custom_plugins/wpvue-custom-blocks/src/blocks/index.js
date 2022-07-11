const {__} = wp.i18n
const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;

var coreBlocks=[/*'core/freeform',*/'core/paragraph','core/image','core/gallery','core/heading','core/cover','core/list','core/quote','core/audio','core/video','core/file'/*,'core/code'*/,'core/preformatted','core/pullquote','core/table','core/verse'/*,'core/html'*/,'core/classic','core/button','core/spacer','core/separator','core/more','core/media-text','core/nextpage','core/columns','core/group','core/latest-posts','core/shortcode','core/archives','core/calendar','core/categories','core/rss','core/search','core/tag-cloud','core/embed','core-embed/wordpress','core-embed/twitter','core-embed/youtube','core-embed/facebook','core-embed/instagram','core-embed/soundcloud','core-embed/spotify','core-embed/flickr','core-embed/vimeo','core-embed/animoto','core-embed/cloudup','core-embed/collegehumor','core-embed/dailymotion','core-embed/funnyordie','core-embed/hulu','core-embed/imgur','core-embed/issuu','core-embed/kickstarter','core-embed/meetup-com','core-embed/mixcloud','core-embed/photobucket','core-embed/polldaddy','core-embed/reddit','core-embed/reverbnation','core-embed/screencast','core-embed/scribd','core-embed/slideshare','core-embed/smugmug','core-embed/speaker','core-embed/ted','core-embed/tumblr','core-embed/videopress','core-embed/wordpress-tv'];


const withInspectorControls =  createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
    	const { name,attributes, setAttributes,isSelected } = props;
    	
        return (
            <Fragment>
                <BlockEdit { ...props } />
                { isSelected && coreBlocks.includes( name ) &&
                <InspectorControls>
                    <PanelBody title="Block ID">
                        <TextControl
                        label={__('Block ID')}
                        onChange={value => {
                                setAttributes({ block_id: value });
                            }}
                        value={attributes.block_id}
                        placeholder={__('Unique ID of the block')}
                        /> 
                    </PanelBody>
                </InspectorControls>
            	}
            </Fragment>
        );
    };
}, "withInspectorControl" );


//use any block name,to trigger this function
wp.hooks.addFilter( 'editor.BlockEdit', 'core/paragraph', withInspectorControls );


const addExtraAttribute = props => {	

    const attributes = {
        ...props.attributes,
        block_id: {
            type: "string"
        }
    };

    return { ...props, attributes };
};

for (const [index, value] of coreBlocks) {
  addFilter(
    "blocks.registerBlockType",
    value,
    addExtraAttribute
	);
}



// Add extra props. Here we assign an html
// data-attribute with the extra_attribute value.
const addExtraData = (props, block_type, attributes) => {	
	if(typeof(attributes.block_id) === 'undefined' || attributes.block_id==null || attributes.block_id=='')
	{
		return {
        ...props
    	}
	}

    return {
        ...props,
        "id": attributes.block_id
    }
};
for (const [index, value] of coreBlocks) {
	addFilter(
    "blocks.getSaveContent.extraProps",
    value,
    addExtraData
	);
}