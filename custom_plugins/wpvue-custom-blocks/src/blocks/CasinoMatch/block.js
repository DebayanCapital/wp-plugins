/**
 * BLOCK: Casino Match
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

//  Import CSS.
import Select from "react-dropdown-select";
const url = cgAdmin.homeUrl+'/wp-json/wp/v2/casino_match_category' ;
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { TextControl,SelectControl,TextareaControl,PanelBody,FormToggle,Button } = wp.components
const {InspectorControls,MediaUpload} = wp.blockEditor;

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

registerBlockType('wpvue/casino-match', {
  title: __( 'Casino match' ),
  icon: 'format-aside',
  category: 'CasinoPages',
  keywords: [
    __( 'Casino match' ),
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
    title: {
      type: 'string',
      selector: 'js-testimonial-title'
    },
    subTitle: {
		   type: 'string',
    },
    lightbox_title: {
      type: 'string',
    },
    lightbox_subtitle: {
		   type: 'string',
	  },
    block_id: {
         type: 'string',
    },
    content: {
      type: 'string'
    },
    casino_match:{
        type:'object'
    },    
    values: {
        type: 'array',
    }, 
    buttonText: {
	   type: 'string',
   },
   buttonUrl: {
	   type: 'string',
   },
   buttonText2: {
	   type: 'string',
   },
   buttonUrl2: {
	   type: 'string',
   },    
   imgURL: {
	   type: 'string',
   },
   imgID:{
	  type:'number'
   },
   imgAlt:{
	  type:'string',
	  source:'attribute',
	  attribute:'alt',
	  selector:'img'
   },
   resultImgURL: {
    type: 'string',
  },
  resultImgID:{
   type:'number'
  },
  resultImgAlt:{
   type:'string',
   source:'attribute',
   attribute:'alt',
   selector:'img'
  },
   add_button: {
	   type: 'boolean',
	   default: false,
   },

  },

  // The UI for the WordPress editor
  edit: props => {
      
  
      var title = props.attributes.title;
      var subTitle = props.attributes.subTitle;
      var lightbox_title = props.attributes.lightbox_title;
      var lightbox_subtitle = props.attributes.lightbox_subtitle;
      var content = props.attributes.content;
      var block_id = props.attributes.block_id;
      var values = props.attributes.values;
      var casino_match = props.attributes.casino_match;
      var buttonText = props.attributes.buttonText;
	  var buttonUrl = props.attributes.buttonUrl;
	  var buttonText2 = props.attributes.buttonText2;
	  var buttonUrl2 = props.attributes.buttonUrl2;
	  //var imgUrl = props.attributes.imgURL;
	  var add_button = props.attributes.add_button;

      function onChangeTitle(content) {
          props.setAttributes({title: content})
      }
      function onChangeContent(content) {
          props.setAttributes({content: content})
      }
      function onChangeLightboxTitle(content) {
        props.setAttributes({lightbox_title: content})
      }
      function onChangeLightboxSubtitle(content) {
          props.setAttributes({lightbox_subtitle: content})
      }
      function onChangeBlockId(content) {
          props.setAttributes({block_id: content});
      }
	  var onChangeSubtitle = function onChangeSubtitle ( content ) {
		   props.setAttributes({subTitle: content})
	   } 
      var onChangeBtntext = function onChangeBtntext ( content ) {
		   props.setAttributes({buttonText: content})
	   }
	   var onChangeBtnurl = function onChangeBtnurl ( content ) {
		   props.setAttributes({buttonUrl: content})
	   } 
	   var onChangeBtntext2 = function onChangeBtntext2 ( content ) {
		   props.setAttributes({buttonText2: content})
	   }
	   var onChangeBtnurl2 = function onChangeBtnurl2 ( content ) {
		   props.setAttributes({buttonUrl2: content})
	   } 
	   var onAddButton = function onAddButton ( state ){
		   props.setAttributes({add_button: (!add_button)?true:false});
	   }

	   const onFileSelect = (img)=>{
       props.setAttributes({imgURL: img.url});
       props.setAttributes({imgID: img.id});
       props.setAttributes({imgAlt: img.alt});
       //console.log('It is working1!');
       //console.log(img.url);
       //console.log(props.attributes);
     }
     const onResultImgSelect = (img)=>{
      props.setAttributes({resultImgURL: img.url});
      props.setAttributes({resultImgID: img.id});
      props.setAttributes({resultImgAlt: img.alt});
      //console.log('It is working2!');
      //console.log(img.url);
      //console.log(props.attributes);
    }
	   const onRemoveImg = () => {
		   props.setAttributes({
			 imgURL :  null,
			 imgID : null,
			 imgAlt: null
		   });
     }
     const onRemoveResultImg = () => {
      props.setAttributes({
      resultImgURL :  null,
      resultImgID : null,
      resultImgAlt: null
      });
    } 

      function setValues(content) {
          props.setAttributes({values: content});
      }
      if(typeof casino_match == "undefined"){
          wp.apiFetch({
              url: url
          }).then( casino_match => {
              props.setAttributes({
                  casino_match: casino_match
              })
          } );
      }

      if(!props.attributes.casino_match){
          return 'Loading......';
      }

      if(props.attributes.casino_match && props.attributes.casino_match.length === 0){
          return 'No match found!';
      }
      var data_arr = [];
      {
      props.attributes.casino_match.map(casino_match => {
        var data =  {label:casino_match.name, value:casino_match.id}
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
          <div id="block-casino-match" className={props.className}>
              <div className="block-header">Casino match</div>
              <SelectControl values={values} placeholder="Choose match type" onChange={(values) => setValues(values)} options={data_arr}/>  
                <TextControl
                    label="Title"
                    onChange={onChangeTitle} 
                    value={title}
                    placeholder={__('Title')}
                />
                <TextControl
				   label="Sub title"
				   onChange={onChangeSubtitle}
				   value={subTitle}
				   placeholder="Sub title"
			   />
                <TextareaControl
                    label="Content"
                    onChange={onChangeContent}
                    value={content}
                    placeholder="Content"
                />
			   <TextControl
				   label="Casino match button"
				   onChange={onChangeBtntext}
				   value={buttonText}
				   placeholder="Button Text"
			   />
         <TextControl
				   label="Lightbox Title"
				   onChange={onChangeLightboxTitle}
				   value={lightbox_title}
				   placeholder="Lightbox Title"
			   />
         <TextControl
				   label="Lightbox Sub Title"
				   onChange={onChangeLightboxSubtitle}
				   value={lightbox_subtitle}
				   placeholder="Lightbox Sub Title"
			   />
			   <label>Add General Button?</label>
			   <br />
			   <FormToggle 
			   checked={ add_button }
			   onChange={ onAddButton } 
			   />
			   {(add_button) ? 
			   <TextControl
				   label="Button Text"
				   onChange={onChangeBtntext2}
				   value={buttonText2}
				   placeholder="Button Text"
			   /> : null
			   }
			   {(add_button) ?
			   <TextControl
				   label="Button url"
				   onChange={onChangeBtnurl2}
				   value={buttonUrl2}
				   placeholder="Button url"
			   /> : null
			   }
			   <br />
			   {
			   (props.attributes.resultImgURL) ? 
			   <div className="img-upload-wrapper-result">
			   <div className={ props.className }>
				   <img 
				   src={props.attributes.resultImgURL} 
				   alt={props.attributes.resultImgAlt}
				   />
			   </div>
				   {(props.isSelected)?( <Button className="button button-primary" onClick={onRemoveResultImg}>Remove image</Button> ):null}
			   </div>
				   
			   : <MediaUpload 
			   onSelect={onResultImgSelect}
			   value={props.attributes.resultImgID}
			   render={({open})=>
			   <Button
			   onClick={open}
			   className="button button-primary"
			   >
			   Result Section Image
			   </Button>
			   }
			   />
			   }
			   <br />
			   {
			   (props.attributes.imgURL) ? 
			   <div className="img-upload-wrapper-bg">
			   <div className={ props.className }>
				   <img 
				   src={props.attributes.imgURL} 
				   alt={props.attributes.imgAlt}
				   />
			   </div>
				   {(props.isSelected)?( <Button className="button button-primary" onClick={onRemoveImg}>Remove image</Button> ):null}
			   </div>
				   
			   : <MediaUpload 
			   onSelect={onFileSelect}
			   value={props.attributes.imgID}
			   render={({open})=>
			   <Button
			   onClick={open}
			   className="button button-primary"
			   >
			   Background Image
			   </Button>
			   }
			   />
			   }         
          </div>
      ]
  },

 save: (props) => {
   return (
    <div className="img-upload-wrapper-result">
    <div className="thumbnail">
        <img 
        src={props.attributes.resultImgURL} 
        alt={props.attributes.resultImgAlt}
        />
    </div>          
</div>, 
	   <div className="img-upload-wrapper-bg">
		   <div className="thumbnail">
			   <img 
			   src={props.attributes.imgURL} 
			   alt={props.attributes.imgAlt}
			   />
		   </div>          
	   </div>
   )
 }
})
   